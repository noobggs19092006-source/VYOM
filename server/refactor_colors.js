import fs from 'fs';
import path from 'path';

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace references
  content = content.replace(/brand-purple/g, 'brand-primary');
  content = content.replace(/brand-pink/g, 'brand-secondary');
  
  // Replace exact hex codes I injected in ShinyText
  content = content.replace(/#6b21a8/g, '#0D5274');
  content = content.replace(/#db2777/g, '#9FD1E0');
  
  fs.writeFileSync(filePath, content);
};

const walk = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      replaceInFile(fullPath);
    }
  }
};

walk('a:\\vyom\\vyom-club\\src');

// Finally, manually force update index.css variables 
const indexCssPath = 'a:\\vyom\\vyom-club\\src\\index.css';
let indexCss = fs.readFileSync(indexCssPath, 'utf8');
indexCss = indexCss.replace(/--color-brand-primary:.*/, '--color-brand-primary: #0D5274;');
indexCss = indexCss.replace(/--color-brand-secondary:.*/, '--color-brand-secondary: #9FD1E0;');
indexCss = indexCss.replace(/--color-brand-dark:.*/, '--color-brand-dark: #0A1C29;');
fs.writeFileSync(indexCssPath, indexCss);

console.log('Colors successfully updated to the blue palette!');
