# Andlo's OVOS Skills Directory

A curated directory of skills, plugins, and tools **I've personally
created**, distinct from
["Andlo's skill list"](https://github.com/OpenVoiceOS/ovos_skill_manager) -
that one is a different, older project entirely: an unmaintained,
auto-generated web scrape of 900+ skills from across all of GitHub,
recognized by `osm` as an appstore option but not a curated list of my
own work. This directory is the opposite: small, hand-maintained, and
specifically about what I've built or designed myself - not a
discovery tool for the wider ecosystem.

**Not included**: the many OVOS skills I've contributed Danish
translations to (weather, Wolfram Alpha, Pokepedia, and many more) -
those are contributions to other people's skills, not mine to list
here.

**Open enhancement proposals** (features that fit an existing skill
better than a new one - waiting on review, not yet built):
- [ovos-skill-calculator#1](https://github.com/andlo/ovos-skill-calculator/issues/1) - everyday calculations (BMI, age, tip/bill-splitting)
- [OpenVoiceOS/ovos-skill-alerts#159](https://github.com/OpenVoiceOS/ovos-skill-alerts/issues/159) - stopwatch
- [OpenVoiceOS/ovos-skill-date-time#274](https://github.com/OpenVoiceOS/ovos-skill-date-time/issues/274) - general date arithmetic

---

## Fully built & published to PyPI (16)

| Skill | PyPI | Category | What it does |
|---|---|---|---|
| [ovos-skill-convert](https://github.com/andlo/ovos-skill-convert) | [v0.0.5](https://pypi.org/project/ovos-skill-convert/) | Utility | Offline unit converter - 19 categories, no cloud dependency |
| [ovos-skill-sound-like](https://github.com/andlo/ovos-skill-sound-like) | [v0.0.1](https://pypi.org/project/ovos-skill-sound-like/) | Entertainment | "What does a cow sound like?" - bundled sounds + optional online fallback |
| [ovos-skill-metronome](https://github.com/andlo/ovos-skill-metronome) | [v0.0.1](https://pypi.org/project/ovos-skill-metronome/) | Utility | Deterministic BPM click track, fully offline |
| [ovos-skill-rhythm-box](https://github.com/andlo/ovos-skill-rhythm-box) | [v0.0.1](https://pypi.org/project/ovos-skill-rhythm-box/) | Entertainment | Simple drum-machine, looped beat patterns |
| [ovos-skill-tuning-fork](https://github.com/andlo/ovos-skill-tuning-fork) | [v0.0.1](https://pypi.org/project/ovos-skill-tuning-fork/) | Utility | Reference-tone generator for tuning instruments |
| [ovos-skill-nato-alphabet](https://github.com/andlo/ovos-skill-nato-alphabet) | [v0.0.1](https://pypi.org/project/ovos-skill-nato-alphabet/) | Utility | Spells words using the NATO phonetic alphabet |
| [ovos-skill-morse-code](https://github.com/andlo/ovos-skill-morse-code) | [v0.0.1](https://pypi.org/project/ovos-skill-morse-code/) | Utility | Encodes text to Morse code, played as beeps |
| [ovos-skill-white-noise](https://github.com/andlo/ovos-skill-white-noise) | [v0.0.1](https://pypi.org/project/ovos-skill-white-noise/) | Utility | White/pink/brown noise for sleep or focus |
| [ovos-skill-calculator](https://github.com/andlo/ovos-skill-calculator) | [v0.0.1](https://pypi.org/project/ovos-skill-calculator/) | Utility | Basic calculator - all operations, fully offline |
| [ovos-skill-math-practice](https://github.com/andlo/ovos-skill-math-practice) | [v0.0.3](https://pypi.org/project/ovos-skill-math-practice/) | Education | Counting, times tables, teach-then-quiz across all 4 operations |
| [ovos-skill-network-scanner](https://github.com/andlo/ovos-skill-network-scanner) | [v0.0.1](https://pypi.org/project/ovos-skill-network-scanner/) | Utility | mDNS + ping/ARP/MAC-vendor local network discovery |
| [ovos-skill-geometry](https://github.com/andlo/ovos-skill-geometry) | [v0.0.3](https://pypi.org/project/ovos-skill-geometry/) | Education | Geometry glossary (24 terms/shapes) + formulas, recited and applied numerically |
| [ovos-skill-geography](https://github.com/andlo/ovos-skill-geography) | [v0.0.3](https://pypi.org/project/ovos-skill-geography/) | Education | Capital, continent, land borders, area, currency, language for all 194 UN member states |
| [ovos-skill-geometry-practice](https://github.com/andlo/ovos-skill-geometry-practice) | [v0.0.1](https://pypi.org/project/ovos-skill-geometry-practice/) | Education | Quiz + teach-then-practice on top of ovos-skill-geometry, with a real numeric tolerance band |
| [ovos-skill-geography-practice](https://github.com/andlo/ovos-skill-geography-practice) | [v0.0.3](https://pypi.org/project/ovos-skill-geography-practice/) | Education | Quiz + teach-then-practice on top of ovos-skill-geography (capitals/continents/borders) |
| [ovos-skill-wiki-offline](https://github.com/andlo/ovos-skill-wiki-offline) | [v0.0.7](https://pypi.org/project/ovos-skill-wiki-offline/) | Utility | Offline general-knowledge fallback covering Wikipedia's ~10,000 Level 4 Vital Articles (en/es/fr native, any other language via on-demand translation) |

**In the official [OVOS Skill Store](https://openvoiceos.github.io/OVOS-skills-store/)?**
Not yet for any of them - none have gone through the submission PR to
[OpenVoiceOS/OVOS-skills-store](https://github.com/OpenVoiceOS/OVOS-skills-store)
yet. This column will get more interesting once some are.

---

## Design docs / ideas, not built yet (14)

Investigated and documented before writing code - some are realistic
future builds, a couple concluded genuinely blocked by the current
platform. See each README for the actual technical reasoning, not
just a one-line status here.

| Idea | Status | Category | The core idea |
|---|---|---|---|
| [ovos-skill-soundboard](https://github.com/andlo/ovos-skill-soundboard) | Skeleton only | Entertainment | Sound-effects board - flagged as possibly better merged into sound-like |
| [ovos-skill-language-practice](https://github.com/andlo/ovos-skill-language-practice) | Investigated, mostly resolved | Education | Hear a phrase in a target language, repeat it - platform already supports most of what this needs |
| [ovos-skill-science-practice](https://github.com/andlo/ovos-skill-science-practice) | Data sources found, ready to build | Education | Periodic table, solar system, physical constants |
| [ovos-skill-morse-practice](https://github.com/andlo/ovos-skill-morse-practice) | Architecture designed | Education | Quiz layer on top of ovos-skill-morse-code |
| [ovos-skill-nato-practice](https://github.com/andlo/ovos-skill-nato-practice) | Architecture designed | Education | Quiz layer on top of ovos-skill-nato-alphabet |
| [ovos-skill-note-practice](https://github.com/andlo/ovos-skill-note-practice) | Architecture designed | Education | Quiz layer on top of ovos-skill-tuning-fork |
| [ovos-skill-unit-practice](https://github.com/andlo/ovos-skill-unit-practice) | Architecture designed | Education | Quiz layer on top of ovos-skill-convert |
| [ovos-skill-spelling-practice](https://github.com/andlo/ovos-skill-spelling-practice) | Open question flagged (STT + bare letters) | Education | Quiz layer on top of the existing ovos-skill-spelling |
| [ovos-skill-trivia-quiz](https://github.com/andlo/ovos-skill-trivia-quiz) | Architecture designed | Entertainment | General-knowledge trivia game - could now be built fully offline using ovos-skill-wiki-offline's dataset instead of the originally-planned hybrid online/offline approach |
| [ovos-skill-sampler](https://github.com/andlo/ovos-skill-sampler) | **Concluded not buildable today** | Entertainment | Live-looping sampler - needs raw mic access no skill API exposes |
| [ovos-skill-intercom](https://github.com/andlo/ovos-skill-intercom) | Architecture designed, security boundary resolved | Utility | LAN messaging between OVOS devices - deliberately speak-only, never command execution (see README for why raw messagebus access was rejected) |
| [ovos-skill-nameday](https://github.com/andlo/ovos-skill-nameday) | Idea, sourcing investigation started | Daily | Name-day (navnedag) lookups - multi-locale (DK/SE/FI/PL/CZ/HU/... all have this tradition, not Danish-specific) |
| [ovos-skill-holidays](https://github.com/andlo/ovos-skill-holidays) | **Built, tested (41/41), blocked on PyPI setup** | Daily | Public holidays (incl. Easter) + calendar-date math, computed via the `holidays` Python library. 5 locales. Not yet pip-installable - new PyPI project needs a one-time trusted-publisher registration before CI's automated release can succeed. |
| [ovos-skill-recipe-helper](https://github.com/andlo/ovos-skill-recipe-helper) | Idea, data source identified | Daily | Offline recipes sourced from Wikibooks Cookbook (CC-BY-SA-4.0), unit conversion via ovos-skill-convert |

---

## Earlier original work (16)

Genuine creations from before this batch, not translation
contributions to other people's skills.

**The common-reading ecosystem** - a pipeline plugin plus provider
skills, so any of them can be asked to "read something aloud" through
one shared bus protocol:

- [ovos-common-reading-pipeline-plugin](https://github.com/andlo/ovos-common-reading-pipeline-plugin)
- [ovos-skill-365tomorrows-stories](https://github.com/andlo/ovos-skill-365tomorrows-stories)
- [ovos-skill-andersen-tales](https://github.com/andlo/ovos-skill-andersen-tales)
- [ovos-skill-andrew-lang-tales](https://github.com/andlo/ovos-skill-andrew-lang-tales)
- [ovos-skill-arxiv-papers](https://github.com/andlo/ovos-skill-arxiv-papers)
- [ovos-skill-bechstein-tales](https://github.com/andlo/ovos-skill-bechstein-tales)
- [ovos-skill-cosquin-tales](https://github.com/andlo/ovos-skill-cosquin-tales)
- [ovos-skill-grimm-tales](https://github.com/andlo/ovos-skill-grimm-tales)
- [ovos-skill-horoscope-readings](https://github.com/andlo/ovos-skill-horoscope-readings)
- [ovos-skill-ovosblog](https://github.com/andlo/ovos-skill-ovosblog)
- [ovos-skill-voices-of-tomorrow](https://github.com/andlo/ovos-skill-voices-of-tomorrow)
- [ovos-skill-worldtales](https://github.com/andlo/ovos-skill-worldtales)
- [ovos-skill-common-reading-example](https://github.com/andlo/ovos-skill-common-reading-example) - a template for building new providers

**Standalone**, from before the pipeline existed (still works, since superseded):

- [ovos-skill-fairytales](https://github.com/andlo/ovos-skill-fairytales) - the original, since November 2018 (Mycroft era)

**Tools, not skills:**

- [ovos-tui-client](https://github.com/andlo/ovos-tui-client) - a terminal UI for testing OVOS without a mic/speaker
- [ovos-skill-web-terminal](https://github.com/andlo/ovos-skill-web-terminal) - a web terminal/CLI client on an OVOS device

---

## Maintenance

This directory is manually curated, not auto-generated - update it by
hand as new skills land or design docs get built. Given how quickly
today's batch grew, worth revisiting whether a lightweight generation
script (reading each repo's own README/skill.json rather than
retyping descriptions here) is worth building if this keeps growing
at the same rate.
