/**
 * 🎃 TANTRIK - ON SAVE HOOK
 * Auto-formats code and maintains consistency
 * Warns about issues but doesn't block saves
 */

module.exports = async (context) => {
  const { filePath, content } = context;
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💾 TANTRIK FILE SAVE CHECK');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📁 File: ${filePath}`);
  
  const warnings = [];
  const fileType = detectFileType(filePath);
  
  // Check formatting based on file type
  if (fileType === 'TypeScript/React' || fileType === 'TypeScript') {
    checkTypeScriptFormatting(content, warnings);
  } else if (fileType === 'Python') {
    checkPythonFormatting(content, warnings);
  } else if (fileType === 'CSS') {
    checkCSSFormatting(content, warnings);
  }
  
  // Check for common issues
  checkCommonIssues(content, filePath, warnings);
  
  // Display warnings
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS DETECTED:');
    warnings.forEach((warning, index) => {
      console.log(`   ${index + 1}. ${warning}`);
    });
    console.log('\n💡 These are suggestions - file will still be saved');
  } else {
    console.log('✅ No formatting issues detected');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Always allow save (non-blocking)
  return { allow: true };
};

function detectFileType(filePath) {
  if (filePath.endsWith('.tsx')) return 'TypeScript/React';
  if (filePath.endsWith('.ts')) return 'TypeScript';
  if (filePath.endsWith('.css')) return 'CSS';
  if (filePath.endsWith('.py')) return 'Python';
  return 'Unknown';
}

function checkTypeScriptFormatting(content, warnings) {
  // Check for consistent spacing
  if (content.includes('function(') || content.includes('if(')) {
    warnings.push('Missing space after keywords (function, if, etc.)');
  }
  
  // Check for semicolons (project uses semicolons)
  const lines = content.split('\n');
  const codeLines = lines.filter(line => {
    const trimmed = line.trim();
    return trimmed && 
           !trimmed.startsWith('//') && 
           !trimmed.startsWith('/*') &&
           !trimmed.startsWith('*') &&
           !trimmed.endsWith('{') &&
           !trimmed.endsWith('}');
  });
  
  const missingSemicolons = codeLines.filter(line => {
    const trimmed = line.trim();
    return trimmed.length > 0 && 
           !trimmed.endsWith(';') && 
           !trimmed.endsWith(',') &&
           !trimmed.endsWith('{') &&
           !trimmed.endsWith('}') &&
           !trimmed.endsWith('>') &&
           !trimmed.startsWith('import') &&
           !trimmed.startsWith('export');
  });
  
  if (missingSemicolons.length > 3) {
    warnings.push('Some statements may be missing semicolons');
  }
  
  // Check for proper imports organization
  if (content.includes('import') && !content.match(/^import.*from/m)) {
    warnings.push('Import statements should use "from" syntax');
  }
  
  // Check for consistent quote usage (project uses double quotes)
  const singleQuotes = (content.match(/'/g) || []).length;
  const doubleQuotes = (content.match(/"/g) || []).length;
  if (singleQuotes > doubleQuotes * 2) {
    warnings.push('Consider using double quotes for consistency');
  }
}

function checkPythonFormatting(content, warnings) {
  // Check for proper indentation (4 spaces)
  const lines = content.split('\n');
  const indentedLines = lines.filter(line => line.startsWith(' '));
  const hasTabIndents = indentedLines.some(line => line.startsWith('\t'));
  
  if (hasTabIndents) {
    warnings.push('Use spaces (4) instead of tabs for indentation');
  }
  
  // Check for docstrings in functions/classes
  if (content.includes('def ') && !content.includes('"""')) {
    warnings.push('Consider adding docstrings to functions');
  }
  
  // Check for proper imports
  if (content.includes('import *')) {
    warnings.push('Avoid wildcard imports (import *)');
  }
}

function checkCSSFormatting(content, warnings) {
  // Check for consistent spacing
  if (content.includes('{') && !content.includes(' {')) {
    warnings.push('Add space before opening braces');
  }
  
  // Check for proper indentation
  const lines = content.split('\n');
  const propertyLines = lines.filter(line => line.includes(':') && !line.trim().startsWith('/*'));
  const unindentedProperties = propertyLines.filter(line => !line.startsWith('  '));
  
  if (unindentedProperties.length > propertyLines.length / 2) {
    warnings.push('CSS properties should be indented (2 spaces)');
  }
  
  // Check for color consistency with Halloween theme
  const colors = content.match(/#[0-9A-Fa-f]{6}/g) || [];
  const halloweenColors = ['#8B5CF6', '#DC2626', '#FF6B35', '#10B981'];
  const hasNonThemeColors = colors.some(color => 
    !halloweenColors.includes(color.toUpperCase()) &&
    !color.toUpperCase().startsWith('#0') && // Allow dark colors
    !color.toUpperCase().startsWith('#F') // Allow light colors
  );
  
  if (hasNonThemeColors && colors.length > 3) {
    warnings.push('Consider using Halloween theme colors from themes.css');
  }
}

function checkCommonIssues(content, filePath, warnings) {
  // Check for console.log in production code (except in lib/hooks)
  if (content.includes('console.log') && 
      !filePath.includes('/lib/') && 
      !filePath.includes('/hooks/') &&
      !filePath.includes('soundManager')) {
    warnings.push('Remove console.log statements before production');
  }
  
  // Check for TODO comments
  const todoCount = (content.match(/TODO|FIXME|HACK/gi) || []).length;
  if (todoCount > 0) {
    warnings.push(`Found ${todoCount} TODO/FIXME comment(s)`);
  }
  
  // Check for very long lines (>120 chars)
  const lines = content.split('\n');
  const longLines = lines.filter(line => line.length > 120);
  if (longLines.length > 5) {
    warnings.push(`${longLines.length} lines exceed 120 characters`);
  }
  
  // Check for duplicate code patterns
  if (content.includes('useState') && content.split('useState').length > 10) {
    warnings.push('Consider extracting repeated state logic into custom hooks');
  }
}
