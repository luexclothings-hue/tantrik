/**
 * 🎃 TANTRIK - ON GENERATE HOOK
 * Logs every time Kiro generates new code
 * Tracks component/file creation for project consistency
 */

module.exports = async (context) => {
  const { filePath, content, operation } = context;
  
  // Log generation event
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎃 TANTRIK CODE GENERATION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📁 File: ${filePath}`);
  console.log(`⚡ Operation: ${operation || 'create/modify'}`);
  console.log(`📏 Size: ${content.length} characters`);
  console.log(`⏰ Time: ${new Date().toISOString()}`);
  
  // Detect file type and component
  const fileType = detectFileType(filePath);
  const componentName = extractComponentName(filePath);
  
  if (componentName) {
    console.log(`🧩 Component: ${componentName}`);
  }
  console.log(`📦 Type: ${fileType}`);
  
  // Check for Halloween theme compliance
  if (fileType === 'CSS' || fileType === 'TypeScript/React') {
    checkHalloweenThemeCompliance(content, filePath);
  }
  
  // Check for naming convention compliance
  checkNamingConvention(filePath, fileType);
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Always allow generation to proceed
  return { allow: true };
};

function detectFileType(filePath) {
  if (filePath.endsWith('.tsx')) return 'TypeScript/React';
  if (filePath.endsWith('.ts')) return 'TypeScript';
  if (filePath.endsWith('.css')) return 'CSS';
  if (filePath.endsWith('.py')) return 'Python';
  if (filePath.endsWith('.json')) return 'JSON';
  if (filePath.endsWith('.md')) return 'Markdown';
  return 'Unknown';
}

function extractComponentName(filePath) {
  const match = filePath.match(/\/([A-Z][a-zA-Z]+)\.(tsx|ts|py)$/);
  return match ? match[1] : null;
}

function checkHalloweenThemeCompliance(content, filePath) {
  const halloweenColors = [
    '#8B5CF6', // Purple
    '#DC2626', // Blood Red
    '#FF6B35', // Pumpkin Orange
    '#10B981', // Witch Green
  ];
  
  const hasHalloweenColors = halloweenColors.some(color => 
    content.includes(color) || content.includes(color.toLowerCase())
  );
  
  if (hasHalloweenColors) {
    console.log('🎃 ✅ Halloween theme colors detected');
  }
  
  // Check for horror-themed class names
  const horrorKeywords = ['horror', 'ghost', 'vampire', 'haunted', 'spooky', 'blood', 'spirit'];
  const hasHorrorTheme = horrorKeywords.some(keyword => 
    content.toLowerCase().includes(keyword)
  );
  
  if (hasHorrorTheme) {
    console.log('👻 ✅ Horror theme elements detected');
  }
}

function checkNamingConvention(filePath, fileType) {
  // React components should be PascalCase
  if (fileType === 'TypeScript/React') {
    const fileName = filePath.split('/').pop().replace('.tsx', '');
    if (fileName[0] === fileName[0].toUpperCase()) {
      console.log('✅ Naming: PascalCase (correct for React component)');
    } else {
      console.log('⚠️  Naming: Should be PascalCase for React components');
    }
  }
  
  // Python files should be snake_case
  if (fileType === 'Python') {
    const fileName = filePath.split('/').pop().replace('.py', '');
    if (fileName.includes('_') || fileName === fileName.toLowerCase()) {
      console.log('✅ Naming: snake_case (correct for Python)');
    } else {
      console.log('⚠️  Naming: Should be snake_case for Python files');
    }
  }
  
  // CSS files should be kebab-case
  if (fileType === 'CSS') {
    const fileName = filePath.split('/').pop().replace('.css', '');
    if (fileName.includes('-') || fileName === fileName.toLowerCase()) {
      console.log('✅ Naming: kebab-case (correct for CSS)');
    }
  }
}
