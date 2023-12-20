const express = require('express');
const router = express.Router();
const config = require('../config');
var request = require('request');

router.post('/', async function (req, res, next) {
  try {

    const contactid = req.session.userId;
    const username = req.session.username;
    const password = req.session.password;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    const moduleName = req.body.module;
    const values = req.body.values;

    // // Define the PHP API URL
    const customerPortalURL = config.portal_api_url;

    // Encode the username and password
    const credentials = `${username}:${password}`;

    // Base64 encode the credentials
    const token = Buffer.from(credentials).toString('base64');

    var options = {
      'method': 'POST',
      'url': customerPortalURL,
      headers: {
        'Authorization': `Basic ${token}`,
      },
      formData: {
        '_operation': 'AddComment',
        'username': username,
        'password': password,
        'module': moduleName,
        'values': JSON.stringify(values)
      }
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      return res.status(200).json(JSON.parse(response.body));
    });
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;