const express = require('express');
const app = express();

const links = [
  'https://youtube.com',
  'https://facebook.com',
  'https://google.com'
];

let currentIndex = 0;

app.get('/', (req, res) => {
  const link = links[currentIndex];
  currentIndex = (currentIndex + 1) % links.length;
  res.redirect(link);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
