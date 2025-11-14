/**
 * 🎃 TANTRIK - ON CHECK HOOK
 * Runs before writing new code to prevent duplicates and violations
 * Checks for existing logic, similar components, and theme compliance
 */

module.exports = async (context) => {
  const { filePath, content, operation, workspace } = context;
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 TANTRIK PRE-GENERATION CHECK');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📁 Target: ${filePath}`);
  console.log(`⚡ Operation: ${operation || 'create'}`);
  
  const warnings = [];
  const errors = [];
  
  // Check for duplicate components
  if (filePath.includes('/components/')) {
    checkDuplicateComponent(filePath, warnings);
  }
  
  // Check for duplicate utilities
  if (filePath.includes('/lib/')) {
    checkDuplicateUtility(filePath, warnings);
  }
  
  // Check for color theme violations
  if (filePath.endsWith('.css') || filePath.endsWith('.tsx')) {
    checkColorThemeCompliance(content, warnings, errors);
  }
  
  // Check naming conventions
  checkNamingConventions(filePath, warnings);
  
  // Check for architectural violations
  checkArchitecture(filePath, content, warnings);
  
  // Display results
  if (errors.length > 0) {
    console.log('\n❌ ERRORS (must fix):');
    errors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (review recommended):');
    warnings.forEach((warning, index) => {
      console.log(`   ${index + 1}. ${warning}`);
    });
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All checks passed');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Allow generation but log warnings
  return { 
    allow: true,
    warnings: warnings,
    errors: errors
  };
};

function checkDuplicateComponent(filePath, warnings) {
  const componentName = filePath.split('/').pop().replace('.tsx', '');
  
  // List of existing components
  const existingComponents = [
    'Sidebar',
    'ThemeToggle',
    'SoundToggle',
    'SpiritSelector',
    'HorrorTyping',
    'TantrikLoading',
    'DaylightWarning',
    'HistoryPanel',
    'SaveChatModal'
  ];
  
  if (existingComponents.includes(componentName)) {
    warnings.push(`Component "${componentName}" already exists - consider modifying instead of recreating`);
  }
  
  // Check for similar names
  const similarComponents = existingComponents.filter(comp => 
    comp.toLowerCase().includes(componentName.toLowerCase()) ||
    componentName.toLowerCase().includes(comp.toLowerCase())
  );
  
  if (similarComponents.length > 0 && !existingComponents.includes(componentName)) {
    warnings.push(`Similar components exist: ${similarComponents.join(', ')} - avoid duplication`);
  }
}

function checkDuplicateUtility(filePath, warnings) {
  const utilityName = filePath.split('/').pop().replace('.ts', '');
  
  // List of existing utilities
  const existingUtilities = [
    'tantrikApi',
    'soundManager',
    'chatStorage',
    'horrorGreetings',
    'pdfExport'
  ];
  
  if (existingUtilities.includes(utilityName)) {
    warnings.push(`Utility "${utilityName}" already exists - consider extending instead of recreating`);
  }
}

function checkColorThemeCompliance(content, warnings, errors) {
  // Halloween theme colors (approved palette)
  const approvedColors = [
    '#8B5CF6', '#6D28D9', '#A78BFA', // Purple spectrum
    '#DC2626', '#991B1B', '#FCA5A5', '#FEE2E2', // Red spectrum
    '#FF6B35', // Pumpkin orange
    '#10B981', '#22C55E', // Green spectrum
    '#0F0505', '#1A0808', '#0A0612', '#0D0819', // Dark backgrounds
    '#FFFFFF', '#F3F4F6', '#E0E7FF', '#C4B5FD', // Light colors
    '#000000' // Pure black
  ];
  
  // Extract hex colors from content
  const hexColors = content.match(/#[0-9A-Fa-f]{6}/gi) || [];
  const uniqueColors = [...new Set(hexColors.map(c => c.toUpperCase()))];
  
  // Check for non-approved colors
  const nonApprovedColors = uniqueColors.filter(color => 
    !approvedColors.some(approved => approved.toUpperCase() === color)
  );
  
  if (nonApprovedColors.length > 0) {
    warnings.push(`Non-theme colors detected: ${nonApprovedColors.join(', ')} - use Halloween palette`);
  }
  
  // Check for CSS variable usage (preferred)
  if (content.includes('#') && !content.includes('var(--')) {
    warnings.push('Consider using CSS variables (var(--accent-primary)) instead of hardcoded colors');
  }
  
  // Check for light theme violations
  if (content.toLowerCase().includes('light') && content.includes('background')) {
    warnings.push('Light theme should be discouraged - Halloween is about darkness!');
  }
}

function checkNamingConventions(filePath, warnings) {
  const fileName = filePath.split('/').pop();
  
  // React components must be PascalCase
  if (filePath.includes('/components/') && fileName.endsWith('.tsx')) {
    const componentName = fileName.replace('.tsx', '');
    if (componentName[0] !== componentName[0].toUpperCase()) {
      warnings.push(`Component "${componentName}" should be PascalCase`);
    }
  }
  
  // Python files must be snake_case
  if (fileName.endsWith('.py')) {
    const pythonName = fileName.replace('.py', '');
    if (pythonName.includes('-') || (pythonName !== pythonName.toLowerCase() && !pythonName.includes('_'))) {
      warnings.push(`Python file "${pythonName}" should be snake_case`);
    }
  }
  
  // CSS files should be kebab-case
  if (fileName.endsWith('.css')) {
    const cssName = fileName.replace('.css', '');
    if (cssName[0] === cssName[0].toUpperCase()) {
      warnings.push(`CSS file "${cssName}" should be kebab-case`);
    }
  }
  
  // Lib utilities should be camelCase
  if (filePath.includes('/lib/') && fileName.endsWith('.ts')) {
    const utilName = fileName.replace('.ts', '');
    if (utilName.includes('-') || utilName.includes('_')) {
      warnings.push(`Utility "${utilName}" should be camelCase`);
    }
  }
}

function checkArchitecture(filePath, content, warnings) {
  // Components should not contain API calls directly
  if (filePath.includes('/components/') && content.includes('fetch(')) {
    warnings.push('Components should use API utilities from /lib instead of direct fetch calls');
  }
  
  // Check for proper imports
  if (content.includes('import') && content.includes('../../../')) {
    warnings.push('Avoid deep relative imports - use path aliases (@/)');
  }
  
  // Context should be in /context
  if (content.includes('createContext') && !filePath.includes('/context/')) {
    warnings.push('Context providers should be in /context directory');
  }
  
  // Hooks should be in /hooks
  if (content.includes('use') && content.match(/^export (function|const) use[A-Z]/m) && !filePath.includes('/hooks/')) {
    warnings.push('Custom hooks should be in /hooks directory');
  }
  
  // Check for inline styles (discouraged)
  if (content.includes('style={{') && !filePath.includes('ThemeToggle')) {
    warnings.push('Avoid inline styles - use CSS classes or CSS modules');
  }
  
  // Check for proper TypeScript usage
  if (filePath.endsWith('.tsx') && content.includes(': any')) {
    warnings.push('Avoid "any" type - use proper TypeScript types');
  }
  
  // Check for modular code
  const lines = content.split('\n').length;
  if (lines > 500) {
    warnings.push(`File has ${lines} lines - consider breaking into smaller modules`);
  }
}
