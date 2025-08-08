const express = require('express');
const app = express();

const links = [
  'https://afflat3d2.com/trk/lnk/01A64732-5ECB-4F5A-A67E-A974C3441DA1/?o=26175&c=918277&a=743272&k=AE26A5D871F142E64B69657663F9EDE3&l=27558',
  'https://afflat3d2.com/trk/lnk/01A64732-5ECB-4F5A-A67E-A974C3441DA1/?o=26175&c=918277&a=743272&k=AE26A5D871F142E64B69657663F9EDE3&l=27558',
  'https://afflat3d2.com/trk/lnk/01A64732-5ECB-4F5A-A67E-A974C3441DA1/?o=26175&c=918277&a=743272&k=AE26A5D871F142E64B69657663F9EDE3&l=27558',
  'https://rewarrdsgiant.com/aff_c?offer_id=2593&aff_id=58197'
];

let currentIndex = 0;

app.get('/', (req, res) => {
  const link = links[currentIndex];
  currentIndex = (currentIndex + 1) % links.length;
  res.redirect(link);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



