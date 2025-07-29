const express = require('express');
const axios = require('axios');
const app = express();

const usLinks = [
  'https://youtube.com',
  'https://facebook.com',
];

const otherLinks = [
  'https://www.instagram.com',
  'https://twitter.com',
];

let usIndex = 0;
let otherIndex = 0;

app.get('/', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
    const countryCode = geo.data.country_code;

    if (countryCode === 'US') {
      const redirectUrl = usLinks[usIndex];
      usIndex = (usIndex + 1) % usLinks.length;
      return res.redirect(redirectUrl);
    } else {
      const redirectUrl = otherLinks[otherIndex];
      otherIndex = (otherIndex + 1) % otherLinks.length;
      return res.redirect(redirectUrl);
    }
  } catch (error) {
    // fallback: redirect to first non-US link
    return res.redirect(otherLinks[0]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
