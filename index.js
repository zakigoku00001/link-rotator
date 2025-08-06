const express = require('express');
const app = express();

const links = [
  'https://afflat3d2.com/trk/lnk/01A64732-5ECB-4F5A-A67E-A974C3441DA1/?o=26175&c=918277&a=743272&k=AE26A5D871F142E64B69657663F9EDE3&l=27558',
  'https://afflat3d2.com/trk/lnk/01A64732-5ECB-4F5A-A67E-A974C3441DA1/?o=26175&c=918277&a=743272&k=AE26A5D871F142E64B69657663F9EDE3&l=27558',
  'https://afflat3d2.com/trk/lnk/01A64732-5ECB-4F5A-A67E-A974C3441DA1/?o=26175&c=918277&a=743272&k=AE26A5D871F142E64B69657663F9EDE3&l=27558',
  'https://afflat3e1.com/trk/lnk/6EF68319-E3B5-4F1B-97B2-F26EC53230CB/?o=6365&c=918277&a=752842&k=92AC6329A709B55F5AE017721B6470BE&l=5077',
  'https://afflat3e1.com/trk/lnk/CDF22B93-9B70-4B2A-88FE-49DF6698DCA8/?o=6365&c=918277&a=753433&k=8B441691ABE8760EA83A84AA968F3D8B&l=5077'
];

let currentIndex = 0;

app.get('/', (req, res) => {
  const link = links[currentIndex];
  currentIndex = (currentIndex + 1) % links.length;
  res.redirect(link);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


