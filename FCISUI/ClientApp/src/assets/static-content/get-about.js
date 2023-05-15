const fs = require('fs');
const path = require('path');

const sourceFolderPath = 'C:/code/NIHRepos/FCISPortal/FCISPortal';
const destFolderPath = 'C:/code/NIHRepos/FCISPortal2/FCISUI/ClientApp/src/assets/static-content/about'

// Loop through all files in the folder
fs.readdir(sourceFolderPath, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach(file => {
    
    // Check if file name matches the pattern '{facilityName}_Main.aspx'
    const fileNamePattern = /(.*)_Main\.aspx/;
    const facilityName = fileNamePattern.exec(file);
    if (facilityName !== null) {
      const fileContent = fs.readFileSync(path.join(sourceFolderPath, file), 'utf8');
      
      // Find the text between the opening and closing span tag in the file
      const spanPattern = /(<span class="cardContent">\s*)([\s\S]*?)(\s*<\/span>)/;
      const spanMatches = spanPattern.exec(fileContent);
      
      if (spanMatches !== null && spanMatches.length >= 4) {
        const spanContent = spanMatches[0];
        const outputFilePath = path.join(destFolderPath, `${facilityName[1]}.about.html`);
        
        // Write the text between the span tag to a new file named {facilityName}.about.html
        fs.writeFile(outputFilePath, spanContent, (err) => {
          if (err) {
            throw err;}
          console.log(`Saved ${outputFilePath}`);
        });
      }
    }
  });
});

