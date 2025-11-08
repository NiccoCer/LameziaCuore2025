const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const outFile = path.join(__dirname, '../gallery.js');

const files = fs.readdirSync(imagesDir)
  .filter(f => /\.(jpg|jpeg)$/i.test(f));

const output = `window.galleryImages = ${JSON.stringify(files.map(f => 'public/images/' + f), null, 2)};`;
fs.writeFileSync(outFile, output);

console.log('🖼 gallery.js generato!');
