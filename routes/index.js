const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { stringify } = require('querystring');


router.get('/', (req, res) => {
    res.render('index');
})


router.post('/', async (req, res) => {

    const imageCaptcha = req.body.captcha;
    // the form credentials are got here
    if (!imageCaptcha)
      return res.json({ success: false, msg: 'Please choose the captcha image'});
  
    // Secret key for server side
    const secretKey = '6LfdYxMcAAAAAG6b_FxpyYSlKn3lM2GXToG83phJ';
  
    
    // queries to be sent on the verifyurl gets stringfied by using inbuilt querystring library
    const query = stringify({
      secret: secretKey,
      response: imageCaptcha,
      remoteip: req.connection.remoteAddress
    });

    // Verify URL Google recaptcha
    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  

    // Make a fetch request to verifyURL(google) and await for response
    const body = await fetch(verifyURL).then(res => res.json());
  
    // if not a success
    if (body.success !== undefined && !body.success) {
        return res.json({ success: false, msg: 'Failed captcha verification' });
    }
    
    // if success
    return res.json({ success: true, msg: 'Captcha passed' });
});


module.exports = router;