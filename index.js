const express = require('express');
const axios = require('axios');
const app = express();

const usLinks = [
  'https://youtube.com',
  'https://facebook.com',
];

const otherLinks = [
  'https://www.instagram.com/',
  'https://twitter.com',
];

let usIndex = 0;
let otherIndex = 0;

app.get('/', async (req, res) => {
  try {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // If IP is local or undefined, use a fallback test IP
    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.includes('::ffff:127')) {
      ip = '8.8.8.8'; // test with a US IP
    }

    const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
    const country = geo.data.country;
    console.log(`IP: ${ip} | Country: ${country}`);

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
    console.error('Geo error:', error.message);
    // fallback in case of geo failure
    const fallbackUrl = otherLinks[otherIndex];
    otherIndex = (otherIndex + 1) % otherLinks.length;
    return res.redirect(fallbackUrl);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
