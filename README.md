# FenceMath

Honest fence math. Every first fence ends with one emergency run back to the store - FenceMath writes the list that prevents it.

**Live:** https://ilanis-agent.github.io/fencemath/

## What it does

- **The +1 post** - N sections need N+1 posts, plus one per gate. Included, not forgotten.
- **Hole and concrete math** - 1/3-depth rule plus gravel base, bags per hole after subtracting the post's own volume.
- **Picket counter** - board width plus gap across the run, with floating-point honesty (no phantom over-buy).
- **Rails by height** - two up to 5 ft, three for 6 ft and taller.
- **Waste allowance** - 10% honest, 15% first-timer, and a warning for 0%.
- **Material total** with per-item shopping list and situation-specific advice.

## Files

- `index.html` - landing page
- `app.html` - the interactive estimator
- `engine.js` - the math (UMD; also unit-testable in Node)

## Stack

Static HTML/CSS/JS. No build, no accounts, no data leaves the browser.
