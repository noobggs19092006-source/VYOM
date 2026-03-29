import fs from 'fs';
import path from 'path';

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace references
  // Previous: primary: #0D5274, secondary: #9FD1E0
  // New: primary: #334155, secondary: #38bdf8
  content = content.replace(/#0D5274/g, '#334155');
  content = content.replace(/#9FD1E0/g, '#38bdf8');
  
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

// Finally, manually force update index.css to the deep slate void theme
const indexCssPath = 'a:\\vyom\\vyom-club\\src\\index.css';
let indexCss = fs.readFileSync(indexCssPath, 'utf8');
indexCss = indexCss.replace(/--color-brand-primary:.*/, '--color-brand-primary: #1e293b;');
indexCss = indexCss.replace(/--color-brand-secondary:.*/, '--color-brand-secondary: #0ea5e9;');
indexCss = indexCss.replace(/--color-brand-dark:.*/, '--color-brand-dark: #020617;');

// Replace glass card styling
indexCss = indexCss.replace(/rgba\(13, 82, 116, 0.2\)/g, 'rgba(30, 41, 59, 0.5)'); // primary
indexCss = indexCss.replace(/rgba\(159, 209, 224, 0.1\)/g, 'rgba(15, 23, 42, 0.6)'); // secondary
indexCss = indexCss.replace(/rgba\(159, 209, 224, 0.2\)/g, 'rgba(14, 165, 233, 0.15)'); // hover cyan glow

fs.writeFileSync(indexCssPath, indexCss);

// Update LightRays in App.jsx
const appPath = 'a:\\vyom\\vyom-club\\src\\App.jsx';
let appCss = fs.readFileSync(appPath, 'utf8');
appCss = appCss.replace('raysColor="#ffffff"', 'raysColor="#0ea5e9"');
appCss = appCss.replace('lightSpread={0.5}', 'lightSpread={0.2}'); // subtle focused rays
fs.writeFileSync(appPath, appCss);

console.log('Applies dark sleek slate theme');
