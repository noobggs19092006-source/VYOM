const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.jsx')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('a:\\vyom\\vyom-club\\src\\pages');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace single quotes: 'http://localhost:5000/api/...' -> (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000') + '/api/...'
  content = content.replace(/'http:\/\/localhost:5000/g, "(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000') + '");
  
  // Replace template literals: `http://localhost:5000/api/...` -> `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/...`
  content = content.replace(/`http:\/\/localhost:5000/g, "`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}");
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Finished refactoring localhost URLs to dynamic production environment variables.');
