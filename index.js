const express = require('express');
const axios = require('axios');
const app = express();

const usLinks = [
  'https://afflat3e1.com/trk/lnk/B9668DD2-EB51-47EF-A4B0-ED0B359C8F70/?o=6365&c=918277&a=744563&k=BF40FC282716BA496C23E54153D0AD11&l=5077',
  'https://afflat3e1.com/trk/lnk/B9668DD2-EB51-47EF-A4B0-ED0B359C8F70/?o=6365&c=918277&a=744563&k=BF40FC282716BA496C23E54153D0AD11&l=5077',
];

const otherLinks = [
  'https://afflat3d3.com/trk/lnk/D5A23BFE-BDBB-4041-B360-629FE48048AC/?o=26153&c=918277&a=746332&k=5EACBE6E42489A50DE9ECCF3CC5FE327&l=28794',
  'https://afflat3d3.com/trk/lnk/D5A23BFE-BDBB-4041-B360-629FE48048AC/?o=26153&c=918277&a=746332&k=5EACBE6E42489A50DE9ECCF3CC5FE327&l=28794',
];

let usIndex = 0;
let otherIndex = 0;

app.set('trust proxy', true); // Important for getting real IP from x-forwarded-for

app.get('/', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;

    // Fallback in case IP is localhost or internal
    if (!ip || ip.startsWith('127.') || ip.startsWith('::1')) {
      console.log(`Fallback IP used: ${ip}`);
      return res.redirect(otherLinks[otherIndex++ % otherLinks.length]);
    }

    const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
    const country = geo.data.country;

    if (country === 'US') {
      const redirectUrl = usLinks[usIndex++ % usLinks.length];
      return res.redirect(redirectUrl);
    } else {
      const redirectUrl = otherLinks[otherIndex++ % otherLinks.length];
      return res.redirect(redirectUrl);
    }
  } catch (error) {
    console.error('Geo lookup failed:', error.message);
    return res.redirect(otherLinks[otherIndex++ % otherLinks.length]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
