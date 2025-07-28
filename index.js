const express = require('express');
const axios = require('axios');
const app = express();

const usLinks = [
  'https://youtube.com',
  'https://youtube.com',
];

const otherLinks = [
  'https://google.com',
  'https://google.com',
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
