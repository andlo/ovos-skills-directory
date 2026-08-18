#!/usr/bin/env python3
"""
Generates this directory's skill data automatically:

1. Finds candidate repos: any repo owned by `andlo` containing a
   skill.json file anywhere. This is a robust discovery signal - a
   design-doc-only repo has no code yet, so it has no skill.json.
   Name-pattern matching would miss non-"ovos-skill-*" repos (e.g.
   ovos-common-reading-pipeline-plugin); a manually-maintained list
   goes stale, which is exactly the problem this script replaces.

2. Filters to PyPI-published skills only. "Has a skill.json" alone
   isn't a strong enough signal that a skill is actually finished -
   ovos-skill-soundboard has one but is an explicit skeleton, not a
   working skill. Being live on PyPI is the strongest available
   proof that a skill is real and installable.

3. For each confirmed skill, fetches its own locale/en-us/skill.json
   as the single source of truth for name/description/examples/tags/
   icon - never hand-transcribed, so it can't drift out of sync with
   what the skill itself claims to do.

4. Writes one JSON file per skill to skills/ (matching the pattern
   OpenVoiceOS/OVOS-skills-store uses for its own raw_jsons/), plus
   an aggregate feed at docs/skills.json for the GitHub Pages site.
"""
import base64
import json
import subprocess
import urllib.error
import urllib.request
from pathlib import Path

GITHUB_USER = "andlo"
ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = ROOT / "skills"
DOCS_DIR = ROOT / "docs"
FEED_PATH = DOCS_DIR / "skills.json"


def gh_json(*args):
    result = subprocess.run(["gh", *args], capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


def find_candidate_repos():
    """All repos owned by GITHUB_USER containing a skill.json file,
    deduplicated - see module docstring for why this beats name
    patterns or a hand-maintained list."""
    names = set()
    page = 1
    while True:
        items = gh_json(
            "api",
            f"search/code?q=filename:skill.json+user:{GITHUB_USER}&per_page=100&page={page}",
        )["items"]
        if not items:
            break
        for item in items:
            names.add(item["repository"]["name"])
        if len(items) < 100:
            break
        page += 1
    return sorted(names)


def pypi_version(package_name):
    """Latest published version, or None if not on PyPI at all."""
    url = f"https://pypi.org/pypi/{package_name}/json"
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            data = json.load(resp)
        return data["info"]["version"]
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise
    except Exception:
        return None


def fetch_skill_json(repo):
    """Fetches locale/en-us/skill.json (falling back to en-US for a
    couple of older repos using that casing) directly from the
    repo's default branch via the GitHub contents API."""
    for path in ("locale/en-us/skill.json", "locale/en-US/skill.json"):
        try:
            content = gh_json("api", f"repos/{GITHUB_USER}/{repo}/contents/{path}")
            return json.loads(base64.b64decode(content["content"]).decode("utf-8"))
        except subprocess.CalledProcessError:
            continue
    return None


def main():
    SKILLS_DIR.mkdir(exist_ok=True)
    DOCS_DIR.mkdir(exist_ok=True)

    candidates = find_candidate_repos()
    print(f"Found {len(candidates)} candidate repos with a skill.json")

    entries = []
    for repo in candidates:
        skill_json = fetch_skill_json(repo)
        if skill_json is None:
            print(f"  SKIP {repo}: could not read locale/en-us/skill.json")
            continue

        package_name = skill_json.get("package_name")
        version = pypi_version(package_name) if package_name else None
        if version is None:
            print(f"  SKIP {repo}: not published on PyPI (package_name={package_name})")
            continue

        entry = {
            "skill_id": skill_json.get("skill_id"),
            "name": skill_json.get("name"),
            "description": skill_json.get("description"),
            "examples": skill_json.get("examples", []),
            "tags": skill_json.get("tags", []),
            "icon": skill_json.get("icon"),
            "source": skill_json.get("source"),
            "package_name": package_name,
            "pypi_version": version,
            "license": skill_json.get("license"),
            "author": skill_json.get("author", GITHUB_USER),
        }
        entries.append(entry)

        out_name = (entry["skill_id"] or repo).replace(".", "-") + ".json"
        with open(SKILLS_DIR / out_name, "w") as f:
            json.dump(entry, f, indent=2)
            f.write("\n")
        print(f"  OK   {repo} -> {out_name} (v{version})")

    entries.sort(key=lambda e: (e["name"] or "").lower())
    with open(FEED_PATH, "w") as f:
        json.dump(entries, f, indent=2)
        f.write("\n")

    print(f"\nWrote {len(entries)} skills to {SKILLS_DIR} and {FEED_PATH}")


if __name__ == "__main__":
    main()
