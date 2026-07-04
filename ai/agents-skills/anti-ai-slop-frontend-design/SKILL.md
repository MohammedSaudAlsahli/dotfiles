## Curation Note

This skill addresses a widespread problem in AI-generated interfaces: the tendency toward generic, forgettable designs that all look the same. Sourced from Anthropic's official skills repository, this pattern has gained significant traction in the developer community as teams struggle with AI outputs that feel "soulless" or "corporate generic." The core insight is that specificity and intentionality in design direction produces dramatically better results than vague requests for "a nice looking page."

## Design Thinking Framework

Before coding, understand the context and commit to a BOLD aesthetic direction:

### 1. Purpose Analysis

```
What problem does this interface solve?
Who uses it?
What emotion should it evoke?
```

### 2. Tone Selection

Pick an extreme aesthetic direction rather than playing it safe:

- **Brutally Minimal** - Maximum whitespace, stark contrast, surgical precision
- **Maximalist Chaos** - Layered elements, bold overlaps, controlled visual noise
- **Retro-Futuristic** - CRT glows, scan lines, terminal aesthetics with modern polish
- **Organic/Natural** - Flowing curves, earth tones, hand-drawn textures
- **Luxury/Refined** - Subtle animations, premium typography, restrained elegance
- **Playful/Toy-like** - Rounded corners, bright colors, bouncy interactions
- **Editorial/Magazine** - Strong typographic hierarchy, asymmetric layouts, pull quotes
- **Brutalist/Raw** - Exposed structure, system fonts, functional honesty
- **Art Deco/Geometric** - Gold accents, symmetry, decorative patterns
- **Industrial/Utilitarian** - Exposed grids, monospace type, mechanical precision

### 3. Differentiation Question

```
What makes this UNFORGETTABLE?
What's the one thing someone will remember?
```

## Frontend Aesthetics Guidelines

### Typography

Choose fonts that are beautiful, unique, and interesting:

**AVOID:**

- Inter, Roboto, Arial, system fonts
- Generic sans-serif stacks
- Overused Google Fonts

**PREFER:**

- Distinctive display fonts for headers
- Refined body fonts with personality
- Unexpected pairings that create tension

```css
/* Example: Editorial feel */
font-family: 'Playfair Display', serif; /* Headlines */
font-family: 'Source Serif Pro', serif; /* Body */

/* Example: Technical/modern */
font-family: 'Space Mono', monospace; /* Headlines */
font-family: 'IBM Plex Sans', sans-serif; /* Body */
```

### Color & Theme

Commit to a cohesive aesthetic. Dominant colors with sharp accents outperform timid, evenly-distributed palettes:

```css
:root {
  /* Bold primary with restrained accents */
  --color-primary: #1a1a2e;
  --color-accent: #e94560;
  --color-surface: #16213e;
  --color-text: #edf2f4;

  /* Or warm editorial palette */
  --color-cream: #faf7f2;
  --color-ink: #2d2a26;
  --color-rust: #c45d35;
  --color-gold: #b8860b;
}
```

### Motion & Animation

Focus on high-impact moments:

```css
/* Staggered page load reveals */
.card {
  opacity: 0;
  transform: translateY(20px);
  animation: reveal 0.6s ease forwards;
}

.card:nth-child(1) {
  animation-delay: 0.1s;
}
.card:nth-child(2) {
  animation-delay: 0.2s;
}
.card:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Spatial Composition

Break expectations with layout:

- Asymmetric grids instead of centered containers
- Overlapping elements that create depth
- Diagonal flow and rotated text
- Generous negative space OR controlled density
- Grid-breaking elements that draw attention

### Backgrounds & Visual Details

Create atmosphere rather than defaulting to solid colors:

- Gradient meshes with subtle color shifts
- Noise textures (SVG or CSS grain)
- Geometric patterns as backgrounds
- Layered transparencies
- Dramatic shadows (not just box-shadow defaults)
- Custom cursors

## Anti-Patterns to Avoid

The following patterns signal generic AI output:

1. **Purple gradients on white backgrounds** - The most overused AI color scheme
2. **Inter or Roboto everywhere** - Default font choices
3. **Centered hero with stock illustration** - Predictable layout
4. **Blue CTA buttons** - Safe, forgettable
5. **Perfect 12-column symmetry** - Too balanced, lacks character
6. **Generic testimonial cards** - Identical rounded rectangles
7. **Cookie-cutter pricing tables** - Three columns, check marks

## Implementation Approach

Match complexity to vision:

**Maximalist designs** require:

- Multiple animation libraries or extensive CSS keyframes
- Layered SVG backgrounds
- Complex hover states on every interactive element
- Rich micro-interactions

**Minimalist designs** require:

- Surgical precision in spacing (every pixel matters)
- Perfect typography scale
- Subtle details that reward close inspection
- Restraint and confidence in negative space

## Example Prompts

### Creating a Landing Page

```
Build a landing page for a developer tools startup.

Aesthetic direction: Brutalist/technical
- Monospace typography dominates
- Exposed grid lines visible
- Terminal-inspired color scheme (green on black splashes)
- ASCII art decorative elements
- Code snippets as design elements, not just content

Make it memorable. No generic startup vibes.
```

### Redesigning a Dashboard

```
Redesign this analytics dashboard.

Current problem: Looks like every other dashboard
Direction: Art Deco meets data viz
- Geometric patterns as section dividers
- Gold accent color for important metrics
- Strong vertical rhythm
- Charts with custom styling (not default chart.js)
- Dark theme with warm undertones

The CEO should walk in and immediately notice this is different.
```

## Best Practices

1. **Commit fully** - Half-measures produce forgettable results
2. **Reference real design** - Look at Awwwards, Dribbble, or specific designers for inspiration
3. **Vary between projects** - Never converge on the same aesthetic twice
4. **Details matter** - Custom scrollbars, selection colors, focus states
5. **Test assumptions** - Share early and iterate based on feedback

## Related Resources

- [Awwwards](https://www.awwwards.com/) - Award-winning web design inspiration
- [Dribbble](https://dribbble.com/) - Design community and inspiration
- [Typewolf](https://www.typewolf.com/) - Font pairing recommendations
- [Coolors](https://coolors.co/) - Color palette generation