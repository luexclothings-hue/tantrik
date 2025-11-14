# Tantrik Coding Style Guide

This document captures the exact coding patterns, conventions, and style choices used throughout the Tantrik project.

## Project Overview

Tantrik is a Halloween-themed spirit communication application with:
- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Backend**: Python Flask with OpenAI integration
- **Theme**: Dark horror aesthetic with Halloween color psychology
- **Architecture**: Monorepo with services structure

---

## File Organization

### Directory Structure

```
services/
├── tantrik_web/          # Next.js frontend
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components (PascalCase)
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions (camelCase)
│   ├── public/           # Static assets
│   └── styles/           # CSS files (kebab-case)
│
└── tantrik_ai/           # Python Flask backend
    ├── agents/           # Spirit agent classes (snake_case)
    ├── prompts/          # System prompts (snake_case)
    └── app.py            # Main Flask application
```

### Naming Conventions

**TypeScript/React:**
- Components: `PascalCase.tsx` (e.g., `SpiritSelector.tsx`)
- Utilities: `camelCase.ts` (e.g., `tantrikApi.ts`)
- Hooks: `useCamelCase.ts` (e.g., `useSounds.ts`)
- Types/Interfaces: `PascalCase` (e.g., `ThemeType`, `Message`)

**Python:**
- Files: `snake_case.py` (e.g., `spirit_agent.py`)
- Classes: `PascalCase` (e.g., `SpiritAgent`, `DraculaAgent`)
- Functions: `snake_case` (e.g., `send_message`, `stream_chat`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `DRACULA_SYSTEM_PROMPT`)

**CSS:**
- Files: `kebab-case.css` (e.g., `spirit-selector.css`)
- Classes: `kebab-case` (e.g., `.horror-typing`, `.message-bubble`)
- IDs: `kebab-case` (e.g., `#chat-container`)

---

## TypeScript/React Patterns

### Component Structure

```typescript
"use client"; // For client components in Next.js

import { useState, useEffect } from "react";
import { useCustomHook } from "@/hooks/useCustomHook";
import ComponentName from "@/components/ComponentName";

interface ComponentProps {
  prop1: string;
  prop2?: number; // Optional props with ?
  onAction?: () => void;
}

export default function MyComponent({ prop1, prop2, onAction }: ComponentProps) {
  // 1. Hooks first
  const [state, setState] = useState<string>("");
  const customData = useCustomHook();
  
  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 3. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 4. Render
  return (
    <div className="component-wrapper">
      {/* JSX content */}
    </div>
  );
}
```

### Import Organization

```typescript
// 1. React imports
import { useState, useEffect } from "react";

// 2. Third-party imports
import ReactMarkdown from "react-markdown";

// 3. Local imports (use @ alias)
import { useTheme } from "@/context/ThemeContext";
import Sidebar from "@/components/Sidebar";
import { sendMessage } from "@/lib/tantrikApi";
```

### State Management

- Use `useState` for local component state
- Use Context API for global state (theme, session)
- Always type state: `useState<Type>(initialValue)`
- Prefer functional updates: `setState(prev => prev + 1)`

### Event Handlers

```typescript
// Inline for simple cases
<button onClick={() => doSomething()}>Click</button>

// Named function for complex logic
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Logic here
};

<form onSubmit={handleSubmit}>
```

### Conditional Rendering

```typescript
// Short circuit for simple cases
{isLoading && <Spinner />}

// Ternary for if-else
{theme === "dark" ? <DarkIcon /> : <LightIcon />}

// Early return for complex conditions
if (!data) return <Loading />;
```

---

## Python Patterns

### Class Structure

```python
"""
Module docstring explaining purpose
"""

import logging
from typing import List, Dict, Optional

logger = logging.getLogger(__name__)


class MyClass:
    """Class docstring."""
    
    def __init__(self, param1: str, param2: Optional[str] = None):
        """Initialize with parameters."""
        self.param1 = param1
        self.param2 = param2
        logger.info(f"Initialized {self.__class__.__name__}")
    
    def public_method(self, arg: str) -> Dict[str, any]:
        """Public method with docstring."""
        try:
            result = self._private_method(arg)
            return {"success": True, "data": result}
        except Exception as e:
            logger.error(f"Error: {str(e)}")
            return {"success": False, "error": str(e)}
    
    def _private_method(self, arg: str) -> str:
        """Private method (underscore prefix)."""
        return arg.upper()
```

### Flask API Patterns

```python
@app.route("/endpoint", methods=["POST"])
def endpoint():
    # 1. Get and validate data
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "No JSON body"}), 400
    
    # 2. Extract parameters
    param = data.get("param")
    if not param:
        return jsonify({"error": "param is required"}), 400
    
    # 3. Process with error handling
    try:
        result = process_data(param)
        return jsonify({"success": True, "result": result}), 200
    except Exception as e:
        logger.exception("Endpoint failed")
        return jsonify({"error": str(e)}), 500
```

### Error Handling

```python
# Always use try-except for external calls
try:
    response = client.chat.completions.create(...)
    return {"success": True, "data": response}
except OpenAIError as e:
    logger.error(f"API error: {str(e)}")
    return {"success": False, "error": str(e)}
except Exception as e:
    logger.error(f"Unexpected error: {str(e)}")
    return {"success": False, "error": "Internal error"}
```

---

## CSS Patterns

### Variable Usage

```css
/* ALWAYS use CSS variables from themes.css */
.component {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-md);
}

/* NEVER hardcode colors (except in themes.css) */
/* ❌ BAD */
.component {
  background: #1a0808;
  color: #FEE2E2;
}
```

### Class Naming

```css
/* Use BEM-like naming for clarity */
.component-name { }
.component-name__element { }
.component-name--modifier { }

/* Or simple kebab-case */
.message-bubble { }
.horror-typing { }
.spirit-selector { }
```

### Responsive Design

```css
/* Mobile-first approach */
.component {
  /* Mobile styles (default) */
  padding: 12px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: 20px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: 24px;
  }
}
```

### Animations

```css
/* Define keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Apply with transition */
.component {
  animation: fadeIn 0.3s ease;
  transition: all 0.3s ease;
}
```

---

## Code Quality Rules

### Minimal but Complete

- Write the MINIMUM code needed to solve the problem
- Don't add features that aren't requested
- Don't create abstractions until needed
- Keep functions small and focused (< 50 lines)

### Modular Architecture

- **Never** put all logic in a single file
- Separate concerns:
  - Components: UI only
  - Lib: Business logic and API calls
  - Context: Global state
  - Hooks: Reusable stateful logic

### Avoid Redundancy

- Check for existing utilities before creating new ones
- Reuse components instead of duplicating
- Extract repeated patterns into shared functions
- Use inheritance/composition in Python

### Type Safety

```typescript
// ✅ GOOD - Explicit types
interface Message {
  role: "user" | "assistant";
  content: string;
}

const messages: Message[] = [];

// ❌ BAD - Any types
const messages: any[] = [];
```

### Error Handling

```typescript
// ✅ GOOD - Handle errors gracefully
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error("API call failed:", error);
  return { error: "Failed to fetch data" };
}

// ❌ BAD - Unhandled errors
const result = await apiCall(); // Can crash
```

---

## Formatting Standards

### Indentation
- TypeScript/React: 2 spaces
- Python: 4 spaces
- CSS: 2 spaces
- **Never use tabs**

### Line Length
- Prefer < 100 characters
- Hard limit: 120 characters
- Break long lines logically

### Semicolons
- TypeScript: **Always use semicolons**
- Python: No semicolons

### Quotes
- TypeScript: Double quotes `"string"`
- Python: Double quotes `"string"`
- CSS: Single quotes `'font-family'`

### Spacing

```typescript
// ✅ GOOD
function myFunction(param: string) {
  if (condition) {
    doSomething();
  }
}

// ❌ BAD
function myFunction(param:string){
  if(condition){
    doSomething();
  }
}
```

---

## Comments and Documentation

### TypeScript Comments

```typescript
// Single-line comments for brief explanations
const value = 42; // Magic number

/**
 * Multi-line JSDoc for functions
 * @param param1 - Description
 * @returns Description of return value
 */
function myFunction(param1: string): number {
  // Implementation
}
```

### Python Docstrings

```python
def my_function(param1: str) -> Dict[str, any]:
    """
    Brief description of function.
    
    Args:
        param1: Description of parameter
        
    Returns:
        Dictionary with result data
    """
    pass
```

### CSS Comments

```css
/* ============================================
   SECTION HEADER
   ============================================ */

/* Component-level comment */
.component {
  /* Property explanation */
  property: value;
}
```

---

## Testing Patterns

### Component Testing
- Test user interactions
- Test state changes
- Test conditional rendering
- Mock external dependencies

### API Testing
- Test success cases
- Test error handling
- Test edge cases
- Test streaming responses

---

## Git Commit Messages

```
feat: Add spirit selector component
fix: Resolve theme toggle bug
style: Update Halloween color palette
refactor: Extract API logic to utility
docs: Update README with setup instructions
test: Add tests for sound manager
```

---

## Performance Considerations

- Use `React.memo` for expensive components
- Lazy load images and heavy components
- Debounce user input handlers
- Use CSS transforms for animations (not position)
- Minimize re-renders with proper dependencies

---

## Accessibility

- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Add `alt` text to images
- Ensure keyboard navigation works
- Use ARIA labels when needed
- Maintain color contrast ratios

---

## Security

- Never commit API keys (use `.env`)
- Sanitize user input
- Use HTTPS for API calls
- Validate data on backend
- Use CORS properly

---

This style guide reflects the actual patterns used in building Tantrik. Follow these conventions to maintain consistency across the codebase.
