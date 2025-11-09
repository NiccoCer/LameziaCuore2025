const fs = require('fs');
const path = require('path');

const thumbsDir = path.join(__dirname, '../public/images/thumbs');
const outFile = path.join(__dirname, 'gallery.js');

if (!fs.existsSync(thumbsDir)) {
  console.error('Cartella thumbs non trovata:', thumbsDir);
  process.exit(1);
}

const files = fs.readdirSync(thumbsDir)
  .filter(f => /\.(jpg|jpeg)$/i.test(f));

if (files.length === 0) {
  console.error('Nessuna thumb trovata in:', thumbsDir);
  process.exit(1);
}

const output = `window.galleryImages = ${JSON.stringify(files, null, 2)};`;
fs.writeFileSync(outFile, output);
console.log('✨ gallery.js generato con', files.length, 'file!');
