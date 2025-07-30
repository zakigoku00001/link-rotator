const express = require('express');
const app = express();

const links = [
  'https://afflat3e3.com/trk/lnk/B9668DD2-EB51-47EF-A4B0-ED0B359C8F70/?o=6365&c=918277&a=744563&k=BF40FC282716BA496C23E54153D0AD11&l=5077',
  'https://afflat3e3.com/trk/lnk/B9668DD2-EB51-47EF-A4B0-ED0B359C8F70/?o=6365&c=918277&a=744563&k=BF40FC282716BA496C23E54153D0AD11&l=5077',
  'https://afflat3e3.com/trk/lnk/B9668DD2-EB51-47EF-A4B0-ED0B359C8F70/?o=6365&c=918277&a=744563&k=BF40FC282716BA496C23E54153D0AD11&l=5077'
];

let currentIndex = 0;

app.get('/', (req, res) => {
  const link = links[currentIndex];
  currentIndex = (currentIndex + 1) % links.length;
  res.redirect(link);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
