const express = require('express');
const router = express.Router();
const config = require('../config');
const request = require('request');
const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async function (req, res, next) {
  try {

    //const contactid = req.session.userId;
    var username = req.body.username;
    var password = req.body.password;

    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    const moduleName = req.body.module;
    const valuesJson = req.body.values;
    const recordId = req.body.recordId;
    const fileName = req.body.filename;

    const customerPortalURL = config.portal_api_url;
    const credentials = `${username}:${password}`;
    const token = Buffer.from(credentials).toString('base64');

    var options = {
      'method': 'POST',
      'url': customerPortalURL,
      headers: {
        'Authorization': `Basic ${token}`,
      },
      formData: {
        '_operation': 'SaveRecord',
        'username': username,
        'password': password,
        'module': moduleName,
        'values': valuesJson
      },
    };

    if (moduleName == 'Documents') {
      options.formData['filename'] = fileName;
      // If a file is uploaded, add it to the formData
      if (req.file) {
        options.formData.file = {
          value: req.file.buffer,
          options: {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
          },
        };
      }
    }

    if (recordId != undefined && recordId) {
      options.formData['recordId'] = recordId;
    }

    //console.log(options);
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