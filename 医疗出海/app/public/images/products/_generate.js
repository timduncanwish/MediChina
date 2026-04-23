// Run with: node _generate.js
const fs = require('fs');
const path = require('path');

const products = [
  { file: 'whole-body-mri.svg', title: 'Whole Body MRI', price: '$1,800', icon: 'M0-120a60 60 0 1 1 0 120a60 60 0 1 1 0-120M0 40a90 130 0 1 1 0 260a90 130 0 1 1 0-260' },
  { file: 'mri-health-checkup.svg', title: 'MRI + Health Checkup', price: '$2,000', icon: 'M-80-60 L-80 60 L80 60 L80-60 Z M-40-20 L-40 20 L40 20 L40-20 Z M-20-60 L0-90 L20-60' },
  { file: 'baseline-checkup.svg', title: 'Baseline Health Checkup', price: '$299', icon: 'M0-80 L20-40 L60-40 L30-10 L40 30 L0 5 L-40 30 L-30-10 L-60-40 L-20-40 Z' },
  { file: 'expanded-checkup.svg', title: 'Expanded Health Checkup', price: '$890', icon: 'M-60-80 L60-80 L60 80 L-60 80 Z M-30-50 L30-50 M-30-20 L30-20 M-30 10 L30 10 M-30 40 L10 40' },
  { file: 'intensive-checkup.svg', title: 'Intensive Health Checkup', price: '$1,630', icon: 'M0-90 C50-90 90-50 90 0 C90 50 50 90 0 90 C-50 90-90 50-90 0 C-90-50-50-90 0-90 M0-50 L0 50 M-30 0 L30 0' },
  { file: 'comprehensive-checkup.svg', title: 'Comprehensive Health Checkup', price: '$2,815', icon: 'M-20-90 L20-90 L20-30 L70-30 L70 10 L20 10 L20 90 L-20 90 L-20 10 L-70 10 L-70-30 L-20-30 Z' },
  { file: 'skin-analysis.svg', title: 'Skin Analysis', price: '$77', icon: 'M0-70 C40-70 70-40 70 0 C70 40 40 70 0 70 C-40 70-70 40-70 0 C-70-40-40-70 0-70 M-25-15 A8 8 0 1 1-25-14.9 M15-15 A8 8 0 1 1 15-14.9 M-15 25 A25 20 0 0 0 15 25' },
  { file: 'hair-analysis.svg', title: 'Hair Analysis', price: '$77', icon: 'M0-80 C30-80 50-60 50-30 C50 0 30 20 0 30 C-30 20-50 0-50-30 C-50-60-30-80 0-80 M-20-80 C-10-60-5-40-15-20 M0-80 C0-60 5-40 0-20 M20-80 C10-60 5-40 15-20' },
  { file: 'vision-exam.svg', title: 'Vision Eye Exam', price: '$150', icon: 'M-70 0 C-70-40-40-60 0-60 C40-60 70-40 70 0 C70 40 40 60 0 60 C-40 60-70 40-70 0 M-20-10 A20 20 0 1 1-20 10 A20 20 0 1 1-20-10 M0-5 A5 5 0 1 1 0 5 A5 5 0 1 1 0-5' },
  { file: 'womens-health.svg', title: "Women's Health Screening", price: '$577', icon: 'M0-80 C50-80 80-40 80 10 C80 60 40 80 0 80 C-40 80-80 60-80 10 C-80-40-50-80 0-80 M-30-30 A30 30 0 0 1 30-30 A30 30 0 0 1 30 30 M-30 30 A30 30 0 0 0 0 60' },
];

function generateSVG({ title, price, icon }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e8eefb"/>
      <stop offset="100%" style="stop-color:#dbeafe"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <g transform="translate(400,360)" fill="none" stroke="#1a56db" stroke-width="3" opacity="0.5">
    <path d="${icon}"/>
  </g>
  <text x="400" y="590" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="600" fill="#1a56db" opacity="0.6">${title}</text>
  <text x="400" y="630" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" fill="#6b7280" opacity="0.5">${price}</text>
</svg>`;
}

products.forEach(p => {
  const filePath = path.join(__dirname, p.file);
  fs.writeFileSync(filePath, generateSVG(p));
  console.log(`Created: ${p.file}`);
});

console.log('Done!');
