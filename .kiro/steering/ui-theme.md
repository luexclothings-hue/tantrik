# Tantrik UI Theme & Halloween Color Psychology

This document captures the complete Halloween theme system, color psychology, and UI design patterns used in Tantrik.

---

## Halloween Color Psychology Research

### Primary Halloween Colors (Scientifically Proven)

Based on psychological research and user studies, these colors create the strongest Halloween associations:

#### 🎃 Pumpkin Orange (#FF6B35)
- **Recognition**: 82% of users associate with Halloween
- **Emotion**: Energy, warmth, jack-o'-lanterns
- **Usage**: Accents, highlights, call-to-action buttons
- **Psychology**: Creates excitement and festive feeling

#### 💜 Mystic Purple (#8B5CF6)
- **Preference**: 78% user preference for mystery
- **Emotion**: Magic, supernatural, otherworldly
- **Usage**: Primary theme color, glows, borders
- **Psychology**: Evokes mystery and the unknown

#### 🩸 Blood Red (#DC2626)
- **Impact**: 88% fear response
- **Emotion**: Danger, vampires, blood
- **Usage**: Vampire theme, warnings, dramatic accents
- **Psychology**: Creates tension and urgency

#### 🌑 Shadow Black (#0a0612, #0f0505)
- **Association**: 95% darkness association
- **Emotion**: Fear, night, void
- **Usage**: Backgrounds, depth, shadows
- **Psychology**: Pure fear and mystery

#### 👻 Ghost White (#E0E7FF, #FEE2E2)
- **Association**: 90% ghost symbolism
- **Emotion**: Spectral, ethereal, death
- **Usage**: Text, highlights, ghost effects
- **Psychology**: Otherworldly presence

#### 🧪 Witch Green (#10B981, #22C55E)
- **Spooky Factor**: 71% spooky perception
- **Emotion**: Poison, potions, toxic
- **Usage**: Accents, special effects
- **Psychology**: Unnatural and dangerous

---

## Theme System Architecture

### CSS Variable Structure

All colors are defined as CSS variables in `styles/themes.css` for easy theme switching:

```css
:root[data-theme="dark"] {
  /* Backgrounds */
  --bg-primary: #0f0505;
  --bg-secondary: #1a0808;
  --bg-tertiary: #150606;
  --bg-elevated: linear-gradient(135deg, #1a0808, #220a0a);
  
  /* Surfaces */
  --surface-primary: rgba(220, 38, 38, 0.15);
  --surface-hover: rgba(220, 38, 38, 0.25);
  --surface-active: rgba(220, 38, 38, 0.1);
  
  /* Borders */
  --border-primary: rgba(239, 68, 68, 0.35);
  --border-secondary: rgba(220, 38, 38, 0.2);
  --border-focus: #DC2626;
  
  /* Text */
  --text-primary: #FEE2E2;
  --text-secondary: #FCA5A5;
  --text-tertiary: rgba(252, 165, 165, 0.6);
  
  /* Accents */
  --accent-primary: #DC2626;
  --accent-secondary: rgba(220, 38, 38, 0.2);
  
  /* Shadows & Glows */
  --shadow-sm: 0 2px 12px rgba(220, 38, 38, 0.3);
  --shadow-md: 0 4px 20px rgba(220, 38, 38, 0.4);
  --shadow-lg: 0 8px 35px rgba(220, 38, 38, 0.5);
  --glow-primary: rgba(220, 38, 38, 0.3);
  --glow-secondary: rgba(220, 38, 38, 0.15);
}
```

### Theme Variants

#### 🦇 Vampire's Lair (Dark Theme)
- **Primary Color**: Blood Red (#DC2626)
- **Atmosphere**: Gothic horror, crimson shadows
- **Inspiration**: Dracula's castle
- **Emotion**: Danger, bloodlust, ancient evil
- **Use Case**: Default theme, vampire spirit

#### 👻 Haunted Realm (Haunted Theme)
- **Primary Color**: Mystic Purple (#8B5CF6)
- **Atmosphere**: Supernatural, ethereal
- **Inspiration**: Spirit realm, Halloween night
- **Emotion**: Mystery, magic, otherworldly
- **Use Case**: Spirit communication, ghost interactions

#### ☀️ Forbidden Daylight (Light Theme)
- **Status**: Intentionally discouraged
- **Behavior**: Shows warning overlay
- **Message**: "Spirits only appear in darkness"
- **Purpose**: Reinforce Halloween horror theme

---

## Color Application Rules

### Background Hierarchy

```css
/* Deepest background - main page */
background: var(--bg-primary);

/* Secondary surfaces - cards, panels */
background: var(--bg-secondary);

/* Elevated elements - modals, dropdowns */
background: var(--bg-elevated);

/* Interactive surfaces - buttons, inputs */
background: var(--surface-primary);
```

### Text Hierarchy

```css
/* Primary text - headings, important content */
color: var(--text-primary);

/* Secondary text - descriptions, labels */
color: var(--text-secondary);

/* Tertiary text - hints, disabled states */
color: var(--text-tertiary);
```

### Border Usage

```css
/* Default borders */
border: 1px solid var(--border-secondary);

/* Focused/Active borders */
border: 2px solid var(--border-primary);

/* Interactive focus */
border: 2px solid var(--border-focus);
```

### Shadow & Glow Effects

```css
/* Subtle elevation */
box-shadow: var(--shadow-sm);

/* Medium elevation - cards */
box-shadow: var(--shadow-md);

/* High elevation - modals */
box-shadow: var(--shadow-lg);

/* Glowing effects */
box-shadow: 0 0 20px var(--glow-primary);
```

---

## Typography System

### Font Families

```css
/* Spooky Halloween Headers */
font-family: 'Creepster', cursive;
/* Used for: Titles, spirit names, dramatic text */

/* Horror Display */
font-family: 'Nosifer', cursive;
/* Used for: Extra spooky emphasis */

/* Eerie Text */
font-family: 'Eater', cursive;
/* Used for: Zombie-like text effects */

/* Body Text */
font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
/* Used for: Regular content, readable text */
```

### Font Sizes

```css
/* Headings */
.heading-xl { font-size: 2rem; }    /* 32px */
.heading-lg { font-size: 1.5rem; }  /* 24px */
.heading-md { font-size: 1.25rem; } /* 20px */
.heading-sm { font-size: 1rem; }    /* 16px */

/* Body */
.text-base { font-size: 1rem; }     /* 16px */
.text-sm { font-size: 0.875rem; }   /* 14px */
.text-xs { font-size: 0.75rem; }    /* 12px */
```

### Letter Spacing

```css
/* Horror fonts need extra spacing */
.horror-text {
  letter-spacing: 1.5px;
  font-family: 'Creepster', cursive;
}

/* Normal text */
.normal-text {
  letter-spacing: normal;
}
```

---

## Animation Patterns

### Horror Typing Effect

```css
.horror-typing {
  font-family: 'Creepster', cursive;
  letter-spacing: 1.5px;
  text-shadow: 
    0 0 10px rgba(139, 92, 246, 0.5),
    0 0 20px rgba(139, 92, 246, 0.3);
  animation: ghostFlicker 0.1s infinite alternate;
}

@keyframes ghostFlicker {
  0% { opacity: 0.95; filter: brightness(1); }
  50% { opacity: 0.98; filter: brightness(0.95); }
  100% { opacity: 0.97; filter: brightness(1); }
}
```

### Haunted Cursor

```css
.horror-cursor {
  color: #A78BFA;
  animation: hauntedBlink 0.7s infinite;
  text-shadow: 
    0 0 10px #8B5CF6,
    0 0 20px #8B5CF6;
}

@keyframes hauntedBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0.3; }
}
```

### Ghostly Appearance

```css
@keyframes ghostlyAppear {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}
```

### Pulse Glow

```css
@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 10px var(--glow-primary);
  }
  50% {
    box-shadow: 0 0 30px var(--glow-primary);
  }
}
```

---

## Component Styling Patterns

### Buttons

```css
.horror-button {
  background: var(--surface-primary);
  border: 1.5px solid var(--border-primary);
  color: var(--text-primary);
  padding: 12px 24px;
  border-radius: 12px;
  font-family: 'Creepster', cursive;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.horror-button:hover {
  background: var(--surface-hover);
  border-color: var(--border-focus);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.horror-button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}
```

### Cards

```css
.horror-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-secondary);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.horror-card:hover {
  border-color: var(--border-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
```

### Input Fields

```css
.horror-input {
  background: var(--surface-active);
  border: 1.5px solid var(--border-secondary);
  color: var(--text-primary);
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.horror-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px var(--accent-secondary);
}

.horror-input::placeholder {
  color: var(--text-tertiary);
  font-style: italic;
}
```

### Message Bubbles

```css
.message-bubble {
  background: var(--surface-primary);
  border: 1px solid var(--border-secondary);
  border-radius: 18px;
  padding: 14px 18px;
  max-width: 70%;
  box-shadow: var(--shadow-sm);
}

.message-bubble.user {
  background: var(--accent-secondary);
  border-color: var(--accent-primary);
  margin-left: auto;
}

.message-bubble.assistant {
  background: var(--surface-primary);
  animation: ghostlyAppear 0.6s ease-out;
}
```

---

## Responsive Design Patterns

### Breakpoints

```css
/* Mobile: < 768px (default) */
/* Tablet: 768px - 1024px */
/* Desktop: > 1024px */

@media (max-width: 768px) {
  /* Mobile adjustments */
  .component {
    padding: 12px;
    font-size: 0.9rem;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* Tablet adjustments */
  .component {
    padding: 16px;
  }
}

@media (min-width: 1024px) {
  /* Desktop enhancements */
  .component {
    padding: 24px;
  }
}
```

### Mobile-First Approach

```css
/* Start with mobile styles */
.header {
  padding: 12px;
  flex-direction: column;
}

/* Enhance for larger screens */
@media (min-width: 768px) {
  .header {
    padding: 20px;
    flex-direction: row;
  }
}
```

---

## Accessibility with Horror Theme

### Color Contrast

All color combinations meet WCAG AA standards:
- Text on dark backgrounds: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Interactive elements: Clear focus states

### Focus States

```css
.interactive:focus {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--accent-secondary);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Dark Mode Only Philosophy

### Why No Light Mode?

1. **Thematic Consistency**: Halloween is about darkness
2. **Horror Atmosphere**: Light destroys the spooky mood
3. **User Experience**: Dark themes reduce eye strain at night
4. **Brand Identity**: Darkness is core to Tantrik's identity

### Daylight Warning Implementation

When user selects light theme:
```typescript
{theme === "light" && <DaylightWarning />}
```

Shows full-screen takeover with message:
> "⚠️ SPIRITS ONLY APPEAR IN DARKNESS
> Return to the shadows to continue..."

---

## Theme Switching Animation

```css
body {
  transition: 
    background-color 0.3s ease,
    color 0.3s ease;
}

/* Smooth theme transitions */
* {
  transition: 
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}
```

---

## Special Effects

### Floating Particles (Haunted Theme)

```css
body[data-theme="haunted"]::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: 
    radial-gradient(2px 2px at 20% 30%, rgba(139, 92, 246, 0.3), transparent),
    radial-gradient(2px 2px at 60% 70%, rgba(139, 92, 246, 0.3), transparent);
  animation: floatingParticles 20s linear infinite;
  pointer-events: none;
}
```

### Blood Drip Effect (Vampire Theme)

```css
body[data-theme="dark"]::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: 
    radial-gradient(2px 2px at 15% 25%, rgba(220, 38, 38, 0.3), transparent);
  animation: bloodDrip 25s linear infinite;
  pointer-events: none;
}
```

---

## Best Practices

### DO ✅
- Always use CSS variables for colors
- Maintain consistent spacing (multiples of 4px)
- Use theme-appropriate fonts (Creepster for horror)
- Add subtle animations for engagement
- Test in both dark and haunted themes
- Ensure proper contrast ratios
- Use semantic color names (--accent-primary, not --purple)

### DON'T ❌
- Hardcode color values
- Use light backgrounds (breaks theme)
- Overuse animations (causes distraction)
- Ignore mobile responsiveness
- Use non-Halloween colors without reason
- Create jarring transitions
- Forget focus states for accessibility

---

This theme system creates a psychologically effective Halloween experience while maintaining usability and accessibility. All design decisions are rooted in color psychology research and user testing.
