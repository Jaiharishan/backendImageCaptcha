const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const request = require('request');
const { stringify } = require('querystring');


router.get('/', (req, res) => {
    res.render('index');
})


router.post('/', async (req, res) => {
    if (!req.body.captcha)
      return res.json({ success: false, msg: 'Please choose the captcha image'});
  
    // Secret key for server side
    const secretKey = '6LfdYxMcAAAAAG6b_FxpyYSlKn3lM2GXToG83phJ';
  
    // Verify URL Google recaptcha
    const query = stringify({
      secret: secretKey,
      response: req.body.captcha,
      remoteip: req.connection.remoteAddress
    });
    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  
    // Make a request to verifyURL and await for response
    const body = await fetch(verifyURL).then(res => res.json());
  
    // if not a success
    if (body.success !== undefined && !body.success)
      return res.json({ success: false, msg: 'Failed captcha verification' });
  
    // if success
    return res.json({ success: true, msg: 'Captcha passed' });
});


module.exports = router;