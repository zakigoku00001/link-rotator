const express = require('express');
const app = express();

const links = [
  'https://afflat3d2.com/trk/lnk/E7696302-A93D-48B1-9037-EC68132AFA55/?o=6365&c=918277&a=744274&k=CFF27779031DA8439CE37AC297BDA0A3&l=5077',
  'http://remotwork.us/Netflix1',
  'https://glstrk.com/?offer_ids=MjU5Mw%3D%3D&affiliate_id=NTgxOTc%3D'
];

let currentIndex = 0;

app.get('/', (req, res) => {
  const link = links[currentIndex];
  currentIndex = (currentIndex + 1) % links.length;
  res.redirect(link);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




