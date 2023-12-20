const express = require('express');
const router = express.Router();
const config = require('../config');
var request = require('request');

router.post('/', async function (req, res, next) {
  try {


    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    const moduleName = req.body.module;
    const values = req.body.values;
    const recordId = req.body.recordId;
    const portal_username = req.body.username
    const portal_password = req.body.password;

    // // Define the PHP API URL
    const customerPortalURL = config.portal_api_url;

    // Encode the username and password
    const credentials = `${portal_username}:${portal_password}`;

    // Base64 encode the credentials
    const token = Buffer.from(credentials).toString('base64');

    var options = {
      'method': 'POST',
      'url': customerPortalURL,
      headers: {
        'Authorization': `Basic ${token}`,
      },
      formData: {
        '_operation': 'SaveRecord',
        'username': portal_username,
        'password': portal_password,
        'module': moduleName,
        'values': JSON.stringify(values)
      }
    };
    //console.log(values);
    // var options = {
    //   'method': 'POST',
    //   'url': 'http://localhost/vtigercrm_8/modules/CustomerPortal/api.php',
    //   'headers': {
    //     'Authorization': `Basic ${token}`,
    //   },
    //   formData: {
    //     '_operation': 'SaveRecord',
    //     'username': 'chothani@illiquidx.com',
    //     'password': 'Admin@123',
    //     'module': 'HelpDesk',
    //     'values': JSON.stringify(values)
    //   }
    // };

    if (recordId != undefined && recordId) {
      options.formData['recordId'] = recordId; // Add recordId conditionally
    }

    console.log(JSON.stringify(options));
    //return res.status(200).json(JSON.stringify(options));

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