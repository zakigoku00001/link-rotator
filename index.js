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
