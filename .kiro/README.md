# 🎃 Tantrik Kiro Setup

This directory contains the Kiro configuration that automates and enforces Tantrik's development patterns.

---

## 📁 Directory Structure

```
.kiro/
├── hooks/              # Automated event hooks
│   ├── on_generate.js  # Runs when Kiro generates code
│   ├── on_save.js      # Runs when files are saved
│   └── on_check.js     # Runs before code generation
│
└── steering/           # Development guidelines
    ├── coding-style.md # Code formatting & patterns
    ├── ui-theme.md     # Halloween theme & colors
    └── rules.md        # Core development rules
```

---

## 🪝 Hooks

### on_generate.js
**Triggers**: When Kiro generates new code

**What it does**:
- Logs file creation/modification events
- Detects component names and file types
- Validates naming conventions (PascalCase, snake_case, kebab-case)
- Checks Halloween theme compliance
- Tracks code generation metrics

**Example Output**:
```
🎃 TANTRIK CODE GENERATION
📁 File: components/SpiritCard.tsx
🧩 Component: SpiritCard
📦 Type: TypeScript/React
✅ Naming: PascalCase (correct for React component)
```

---

### on_save.js
**Triggers**: When you save a file

**What it does**:
- Validates code formatting (spacing, semicolons, quotes)
- Checks for proper indentation
- Warns about console.log statements
- Detects TODO/FIXME comments
- Suggests improvements (non-blocking)

**Example Output**:
```
💾 TANTRIK FILE SAVE CHECK
📁 File: components/Sidebar.tsx
✅ No formatting issues detected
```

---

### on_check.js
**Triggers**: Before Kiro writes new code

**What it does**:
- Checks for duplicate components/utilities
- Validates color theme compliance
- Ensures naming conventions
- Prevents architectural violations
- Warns about hardcoded colors

**Example Output**:
```
🔍 TANTRIK PRE-GENERATION CHECK
📁 Target: components/NewButton.tsx
⚠️  WARNINGS:
   1. Similar components exist: TestButton - avoid duplication
   2. Consider using CSS variables instead of hardcoded colors
```

---

## 📚 Steering Files

### coding-style.md
Defines the exact coding patterns used in Tantrik:
- TypeScript/React component structure
- Python class patterns
- CSS formatting rules
- Import organization
- Naming conventions
- File organization

**Key Rules**:
- Components: PascalCase (e.g., `SpiritSelector.tsx`)
- Utilities: camelCase (e.g., `tantrikApi.ts`)
- Python: snake_case (e.g., `spirit_agent.py`)
- CSS: kebab-case (e.g., `horror-typing.css`)

---

### ui-theme.md
Complete Halloween theme system and color psychology:
- Halloween color palette (scientifically proven)
- CSS variable system
- Theme variants (Vampire, Haunted)
- Typography (Creepster font)
- Animation patterns
- Component styling rules

**Key Colors**:
- 🎃 Pumpkin Orange: `#FF6B35`
- 💜 Mystic Purple: `#8B5CF6`
- 🩸 Blood Red: `#DC2626`
- 🌑 Shadow Black: `#0f0505`
- 👻 Ghost White: `#FEE2E2`

---

### rules.md
Core development philosophy and architectural rules:
- **Minimal but Complete**: Write only what's needed
- **Never All in One File**: Separate concerns properly
- **Avoid Redundancies**: Check for existing code first
- **Keep Code Modular**: Single responsibility principle

**Architecture**:
- `/components` - UI only
- `/lib` - Business logic & API calls
- `/context` - Global state
- `/hooks` - Reusable stateful logic
- `/styles` - CSS files

---

## 🚀 How It Works

### Automatic Enforcement
When you work with Kiro, these rules are automatically applied:

1. **You ask**: "Create a button component"
2. **Kiro checks**: on_check.js validates no duplicates exist
3. **Kiro generates**: Following coding-style.md patterns
4. **Kiro applies**: Halloween theme from ui-theme.md
5. **Hook logs**: on_generate.js records the creation
6. **You save**: on_save.js validates formatting

### Manual Testing
Test hooks manually:
```bash
# Test all hooks
node test-hooks.js

# Test individual hooks
node .kiro/hooks/on_generate.js
node .kiro/hooks/on_save.js
node .kiro/hooks/on_check.js
```

---

## ✅ What This Ensures

### Consistency
- All components follow the same structure
- Naming conventions are enforced
- Code style is uniform across the project

### Quality
- No duplicate code
- Proper separation of concerns
- Halloween theme compliance
- Type safety with TypeScript

### Maintainability
- Clear architectural patterns
- Modular code organization
- Self-documenting structure
- Easy to onboard new developers

---

## 🎃 Halloween Theme Enforcement

The hooks automatically ensure:
- ✅ CSS variables used instead of hardcoded colors
- ✅ Halloween color palette compliance
- ✅ Creepster font for horror text
- ✅ Proper theme structure (dark/haunted)
- ✅ No light theme violations

---

## 📝 Modifying the Setup

### Adding New Rules
Edit steering files:
```bash
.kiro/steering/rules.md        # Add architectural rules
.kiro/steering/coding-style.md # Add style patterns
.kiro/steering/ui-theme.md     # Add theme rules
```

### Customizing Hooks
Edit hook files:
```bash
.kiro/hooks/on_generate.js  # Modify generation logging
.kiro/hooks/on_save.js      # Adjust validation rules
.kiro/hooks/on_check.js     # Change pre-checks
```

### Disabling Hooks
Rename or remove hook files:
```bash
mv .kiro/hooks/on_save.js .kiro/hooks/on_save.js.disabled
```

---

## 🔍 Verification

To verify the setup is working:

1. **Check hooks exist**:
   ```bash
   ls .kiro/hooks/
   ```

2. **Check steering files**:
   ```bash
   ls .kiro/steering/
   ```

3. **Test hooks**:
   ```bash
   node test-hooks.js
   ```

4. **Generate code with Kiro**:
   Ask Kiro to create a component and watch the console output

---

## 📖 Documentation

- **Hooks**: See individual hook files for detailed comments
- **Steering**: Each steering file is comprehensive and self-documenting
- **Examples**: Look at existing components to see patterns in action

---

## 🎯 Benefits

### For You
- Faster development (patterns are automatic)
- Consistent code quality
- No need to remember all rules
- Automatic validation

### For the Project
- Maintainable codebase
- Clear patterns for contributors
- Enforced best practices
- Halloween theme consistency

---

## 🆘 Troubleshooting

### Hooks not running?
- Check file permissions
- Verify Node.js is installed
- Check hook file syntax

### Steering files not applied?
- Ensure files are in `.kiro/steering/`
- Check file format (must be `.md`)
- Restart Kiro if needed

### Want to bypass a check?
- Hooks are non-blocking (warnings only)
- You can always proceed with generation
- Review warnings and fix later

---

**This setup ensures Tantrik maintains its spooky, consistent, high-quality codebase! 🎃**
