import sharp from 'sharp';
await sharp('public/og-image.svg').png().toFile('public/og-image.png');
console.log('Created 1200 × 630 social image.');
