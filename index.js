const express = require('express');
const axios = require('axios');
const app = express();

const usLinks = [
  'https://afflat3d2.com/trk/lnk/E7696302-A93D-48B1-9037-EC68132AFA55/?o=6365&c=918277&a=744274&k=CFF27779031DA8439CE37AC297BDA0A3&l=5077',
  'https://afflat3e3.com/trk/lnk/B9668DD2-EB51-47EF-A4B0-ED0B359C8F70/?o=6365&c=918277&a=744563&k=BF40FC282716BA496C23E54153D0AD11&l=5077',
];

const otherLinks = [
  'https://afflat3d3.com/trk/lnk/D5A23BFE-BDBB-4041-B360-629FE48048AC/?o=26153&c=918277&a=746332&k=5EACBE6E42489A50DE9ECCF3CC5FE327&l=28794',
  'https://afflat3d3.com/trk/lnk/D5A23BFE-BDBB-4041-B360-629FE48048AC/?o=26153&c=918277&a=746332&k=5EACBE6E42489A50DE9ECCF3CC5FE327&l=28794',
];

let usIndex = 0;
let otherIndex = 0;

app.get('/', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
    const country = geo.data.country;

    if (country === 'US') {
      const redirectUrl = usLinks[usIndex];
      usIndex = (usIndex + 1) % usLinks.length;
      return res.redirect(redirectUrl);
    } else {
      const redirectUrl = otherLinks[otherIndex];
      otherIndex = (otherIndex + 1) % otherLinks.length;
      return res.redirect(redirectUrl);
    }
  } catch (error) {
    return res.redirect(otherLinks[0]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
