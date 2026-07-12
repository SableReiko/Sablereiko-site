# sablereiko.com — Fix List

Apply these edits to the live pages. Each is a find → replace you can do in your editor.

---

## 1. Upload the new essay page

Add `garden-remembers.html` (provided) to the site root. It's fully self-contained — its own styling, matching nav, filled repo links. If you'd rather it use your site stylesheet, send me the CSS file and I'll restyle it to match exactly.

---

## 2. work.html — link fixes

**Find:**
> Built from hundreds of sessions of live play, then distilled into something anyone can pick up and run. [Available on GitHub](https://github.com/SableReiko).

**Replace with:**
> Built from months of continuous play — hundreds of turns, dozens of context resets, multiple model versions — then distilled into something anyone can pick up and run. [Available on GitHub](https://github.com/theobliviax/Text-based-rpg-claude).

*(Two fixes in one: the claim now matches the essay's honest framing, and the link goes to the actual repository instead of the profile.)*

---

## 3. work.html — The Garden Remembers section

**Find:**
> A design essay on memory, continuity, and long-form collaborative storytelling — why persistence is the thing that separates a world from a stage set, and what it takes to build systems that honor it. Written in the voice the work deserves: honey and venom, deep-time patience.

**Replace with:**
> A design essay on memory, continuity, and long-form collaborative storytelling — why persistence is the thing that separates a world from a stage set — and a technical post-mortem of the failure modes that shaped the framework's rules: voice drift, canon contamination, silent state corruption. Written in the voice the work deserves: honey and venom, deep-time patience. [Read the essay](garden-remembers.html).

*(Adds the missing link and signals the engineering content to the audience that hires.)*

---

## 4. work.html — Vespergate section + bottom link

In the Vespergate paragraph and the standalone [GitHub] link at the bottom of the page:

**Find (both instances):** `https://github.com/SableReiko`
**Replace with:** `https://github.com/theobliviax/Text-based-rpg-claude`

---

## 5. play.html — link fixes

**Find (both instances):** `https://github.com/SableReiko`
**Replace with:** `https://github.com/theobliviax/Text-based-rpg-claude`

---

## Optional: unify the identity later

If you'd rather everything live under the SableReiko account (cleaner long-term): on GitHub, go to the repo → Settings → scroll to Danger Zone → **Transfer ownership** → transfer to `SableReiko`. GitHub permanently redirects the old theobliviax URL, so nothing breaks — but after transferring, update all the links above to `https://github.com/SableReiko/Text-based-rpg-claude` anyway, and update the essay page's two repo links to match.

Either destination is fine. The only wrong state is the current one, where the site points at a profile that doesn't contain the work.
