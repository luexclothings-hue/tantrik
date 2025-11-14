# Tantrik Development Rules

Core principles and rules that govern how code is written in the Tantrik project.

---

## Core Philosophy

### 1. Minimal but Complete

**Rule**: Write the absolute minimum code needed to solve the problem completely.

**What this means**:
- No speculative features ("we might need this later")
- No over-engineering or premature optimization
- No unnecessary abstractions
- Every line of code must serve a purpose

**Examples**:

✅ **GOOD** - Minimal and focused:
```typescript
function formatDate(date: Date): string {
  return date.toLocaleDateString();
}
```

❌ **BAD** - Over-engineered:
```typescript
class DateFormatter {
  private locale: string;
  private options: Intl.DateTimeFormatOptions;
  
  constructor(locale = 'en-US') {
    this.locale = locale;
    this.options = { /* complex config */ };
  }
  
  format(date: Date): string {
    // 50 lines of unnecessary complexity
  }
}
```

---

### 2. Never Put All Logic in Single File

**Rule**: Separate concerns into appropriate files and directories.

**What this means**:
- Components handle UI only
- Business logic goes in `/lib`
- State management in `/context`
- Reusable hooks in `/hooks`
- API calls in dedicated API utilities

**File Size Limits**:
- Components: < 300 lines
- Utilities: < 200 lines
- If larger, split into multiple files

**Examples**:

✅ **GOOD** - Separated concerns:
```
components/SpiritSelector.tsx  (UI only)
lib/tantrikApi.ts              (API calls)
hooks/useSounds.ts             (Sound logic)
context/ThemeContext.tsx       (Theme state)
```

❌ **BAD** - Everything in one file:
```
components/SpiritSelector.tsx  (1000 lines with UI, API, state, logic)
```

---

### 3. Avoid Redundancies

**Rule**: Check for existing code before creating new code.

**What this means**:
- Search codebase for similar functionality
- Reuse existing components and utilities
- Extract common patterns into shared functions
- Don't duplicate logic across files

**Before Creating New Code**:
1. Search for existing similar components
2. Check if utility already exists in `/lib`
3. Look for reusable hooks in `/hooks`
4. Review if context already provides needed state

**Examples**:

✅ **GOOD** - Reuse existing:
```typescript
import { sendStreamingMessage } from "@/lib/tantrikApi";
// Use existing API utility
```

❌ **BAD** - Duplicate logic:
```typescript
// Reimplementing API call that already exists
async function myCustomApiCall() {
  const response = await fetch(/* same logic as tantrikApi */);
}
```

---

### 4. Keep Code Modular

**Rule**: Each module should have a single, well-defined responsibility.

**What this means**:
- Functions do one thing well
- Components render one concept
- Files contain related functionality
- Clear boundaries between modules

**Module Organization**:

```
/components     - UI components (presentation)
/lib            - Business logic (utilities)
/hooks          - Reusable stateful logic
/context        - Global state management
/styles         - Styling (separated by component)
```

**Examples**:

✅ **GOOD** - Single responsibility:
```typescript
// soundManager.ts - Only handles sounds
export class SoundManager {
  play(sound: string) { }
  stop(sound: string) { }
  toggleMute() { }
}
```

❌ **BAD** - Multiple responsibilities:
```typescript
// soundManager.ts - Handles sounds, API calls, state, UI
export class SoundManager {
  play(sound: string) { }
  fetchUserData() { }
  updateTheme() { }
  renderUI() { }
}
```

---

## Specific Rules

### Component Rules

1. **Client vs Server Components**
   - Add `"use client"` for interactive components
   - Keep server components for static content
   - Don't mix concerns

2. **Props Interface**
   - Always define TypeScript interface for props
   - Use optional props with `?` when appropriate
   - Provide default values in destructuring

3. **Hook Order**
   - Hooks first (useState, useEffect, custom hooks)
   - Event handlers second
   - Helper functions third
   - Return/render last

4. **No Inline Styles**
   - Use CSS classes or CSS modules
   - Exception: Dynamic styles from props
   - Use CSS variables for theming

**Example Component Structure**:
```typescript
"use client";

import { useState, useEffect } from "react";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  // 1. Hooks
  const [state, setState] = useState("");
  
  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 3. Handlers
  const handleClick = () => {
    onAction?.();
  };
  
  // 4. Render
  return <div className="my-component">{title}</div>;
}
```

---

### API Rules

1. **Centralized API Calls**
   - All API calls in `/lib/tantrikApi.ts`
   - Never call `fetch()` directly in components
   - Use typed response interfaces

2. **Error Handling**
   - Always wrap API calls in try-catch
   - Provide user-friendly error messages
   - Log errors for debugging

3. **Loading States**
   - Show loading indicators during API calls
   - Disable buttons while processing
   - Handle timeout scenarios

**Example**:
```typescript
// ✅ GOOD - In lib/tantrikApi.ts
export async function sendMessage(data: MessageData): Promise<Response> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

// ❌ BAD - Direct fetch in component
function MyComponent() {
  const handleClick = async () => {
    const response = await fetch(/* ... */);
  };
}
```

---

### State Management Rules

1. **Local vs Global State**
   - Use `useState` for component-local state
   - Use Context for truly global state (theme, auth)
   - Don't over-use Context

2. **State Updates**
   - Use functional updates for state based on previous state
   - Batch related state updates
   - Keep state minimal and derived

3. **Context Organization**
   - One context per concern (ThemeContext, SessionContext)
   - Provide clear provider components
   - Export custom hooks (useTheme, useSession)

**Example**:
```typescript
// ✅ GOOD - Functional update
setState(prev => prev + 1);

// ❌ BAD - Direct update with stale state
setState(state + 1);
```

---

### Styling Rules

1. **CSS Variables Only**
   - Never hardcode colors
   - Use variables from `themes.css`
   - Exception: Defining variables in themes.css

2. **Class Naming**
   - Use kebab-case for CSS classes
   - Be descriptive but concise
   - Follow BEM-like patterns when needed

3. **Responsive Design**
   - Mobile-first approach
   - Use media queries for larger screens
   - Test on multiple screen sizes

4. **Animations**
   - Use CSS animations, not JavaScript
   - Keep animations subtle (< 0.5s)
   - Respect `prefers-reduced-motion`

**Example**:
```css
/* ✅ GOOD - Using variables */
.component {
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* ❌ BAD - Hardcoded colors */
.component {
  background: #0f0505;
  color: #FEE2E2;
}
```

---

### Python Rules

1. **Type Hints**
   - Always use type hints for function parameters
   - Use return type annotations
   - Import from `typing` module

2. **Error Handling**
   - Use try-except for external calls
   - Log errors with logger
   - Return structured error responses

3. **Class Structure**
   - Use docstrings for classes and methods
   - Private methods start with `_`
   - Keep classes focused (single responsibility)

4. **Logging**
   - Use Python logging module
   - Log at appropriate levels (INFO, ERROR, DEBUG)
   - Include context in log messages

**Example**:
```python
# ✅ GOOD - Proper structure
def process_data(input: str) -> Dict[str, any]:
    """Process input data and return result."""
    try:
        result = _internal_process(input)
        logger.info(f"Processed data successfully")
        return {"success": True, "data": result}
    except Exception as e:
        logger.error(f"Processing failed: {str(e)}")
        return {"success": False, "error": str(e)}

# ❌ BAD - No types, no error handling
def process_data(input):
    result = _internal_process(input)
    return result
```

---

### Testing Rules

1. **Test What Matters**
   - Test user-facing functionality
   - Test error scenarios
   - Don't test implementation details

2. **Test Organization**
   - Test files next to source files
   - Name tests clearly: `test_feature.py` or `Component.test.tsx`
   - Group related tests

3. **Mock External Dependencies**
   - Mock API calls
   - Mock file system operations
   - Use test fixtures for data

---

### Git Rules

1. **Commit Messages**
   - Use conventional commits format
   - Be descriptive but concise
   - Reference issues when applicable

2. **Branch Strategy**
   - Feature branches for new features
   - Bug fix branches for fixes
   - Merge to main when complete

3. **Code Review**
   - Review for logic correctness
   - Check for code style consistency
   - Verify tests pass

---

### Security Rules

1. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` for templates
   - Document required variables

2. **Input Validation**
   - Validate all user input
   - Sanitize data before use
   - Use TypeScript types for compile-time safety

3. **API Security**
   - Use HTTPS for all API calls
   - Implement CORS properly
   - Rate limit API endpoints

---

### Performance Rules

1. **Optimize When Needed**
   - Don't optimize prematurely
   - Measure before optimizing
   - Focus on user-perceived performance

2. **React Performance**
   - Use `React.memo` for expensive components
   - Memoize callbacks with `useCallback`
   - Lazy load heavy components

3. **Asset Optimization**
   - Compress images
   - Lazy load images
   - Use appropriate image formats

---

### Documentation Rules

1. **Code Comments**
   - Comment "why", not "what"
   - Keep comments up to date
   - Remove commented-out code

2. **README Files**
   - Include setup instructions
   - Document environment variables
   - Provide usage examples

3. **API Documentation**
   - Document endpoints
   - Include request/response examples
   - Note error codes

---

## Enforcement

These rules are enforced through:
1. **Kiro Hooks** - Automated checks on save/generate
2. **Code Review** - Manual review process
3. **Linting** - ESLint for TypeScript, Flake8 for Python
4. **Type Checking** - TypeScript compiler, mypy for Python

---

## When to Break Rules

Rules can be broken when:
1. **Performance Critical** - Optimization requires different approach
2. **External Constraints** - Third-party library requirements
3. **Temporary Workaround** - Document with TODO comment
4. **Better Alternative** - Discuss with team first

**Always document why you're breaking a rule.**

---

## Summary

The core principles are:
1. ✅ Write minimal, complete code
2. ✅ Separate concerns into modules
3. ✅ Avoid duplication and redundancy
4. ✅ Keep code modular and focused
5. ✅ Follow consistent patterns
6. ✅ Prioritize readability and maintainability

These rules ensure Tantrik remains maintainable, scalable, and consistent as it grows.
