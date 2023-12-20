const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const { exec } = require('child_process');
const md5 = require('md5');
const helper = require('../helper');
const config = require('../config');
const db = require('../services/db');

/* POST file upload */
router.post('/', async function (req, res, next) {
  try {
    const currentDateTime = await helper.getCurrentDateTime();
    const contactid = req.session.userId;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }

    const query = `SELECT * FROM vtiger_crmentity_seq`;
    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);
    var crmentity_seq = data[0]['id'];

    const form = new formidable.IncomingForm();
    // Set the directory where uploaded files will be stored
    var crmpath = config.crm_root_path;
    var uploadDir = 'storage/';
    //var dbSavePath = uploadDir;

    var now = new Date();
    var year = now.getFullYear();
    var month = now.toLocaleString('default', { month: 'long' });
    var day = now.getDate();
    var week = ''; // You can calculate the week based on the date if needed
    var permissions = 777;

    //var uploadDir = uploadDir + year
    if (!fs.existsSync(crmpath + uploadDir + year)) {
      fs.mkdirSync(crmpath + uploadDir + year);
      var yearPath = crmpath + uploadDir + year;
      exec(`chown -R ${permissions} ${yearPath}`, (error, stdout, stderr) => { });
    }

    if (!fs.existsSync(crmpath + uploadDir + year + "/" + month)) {
      //create new folder
      var monthFilePath = year + "/" + month;
      var monthPath = crmpath + uploadDir + monthFilePath;
      fs.mkdirSync(crmpath + uploadDir + monthFilePath);
      exec(`chown -R ${permissions} ${monthPath}`, (error, stdout, stderr) => { });
      // exec("chown -R $permissions  monthPath");
    }

    if (day > 0 && day <= 7) {
      week = 'week1';
    } else if (day > 7 && day <= 14) {
      week = 'week2';
    } else if (day > 14 && day <= 21) {
      week = 'week3';
    } else if (day > 21 && day <= 28) {
      week = 'week4';
    } else {
      week = 'week5';
    }


    if (!fs.existsSync(crmpath + uploadDir + year + "/" + month + "/" + week)) {
      //create new folder
      weekFilePath = year + '/' + month + '/' + week;
      weekPath = crmpath + uploadDir + weekFilePath;
      fs.mkdirSync(crmpath + uploadDir + weekFilePath);
      exec(`chown -R ${permissions} ${weekPath}`, (error, stdout, stderr) => { });
    }

    var folderPath = year + "/" + month + "/" + week + "/";
    var uploadDir = crmpath + uploadDir + folderPath;
    var dbSavePath = 'storage/' + year + "/" + month + "/" + week + "/";


    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'File upload failed.' });
      }

      const fileFieldNames = Object.keys(files.file);
      const numberOfFiles = fileFieldNames.length;
      var crmentity_seq1 = crmentity_seq;
      for (let i = 0; i < numberOfFiles; i++) {

        var crmid = crmentity_seq1 + i + 1;
        var attachmentsid = crmid + 1;
        form.uploadDir = uploadDir;
        const oldPath = files.file[i].filepath;
        const newFileName = files.file[i].originalFilename;
        const newFileNameArray = newFileName.split(".");
        const mimeType = files.file[i].mimetype;
        const fileSize = files.file[i].size;

        const encryptedFileName = md5(helper.microtime() + newFileNameArray[0]) + '.' + newFileNameArray[1];
        const folderSaveFileName = attachmentsid + "_" + encryptedFileName;
        const newPath = uploadDir + folderSaveFileName;


        const vtiger_crmentity = `INSERT INTO vtiger_crmentity (crmid, smcreatorid, smownerid, modifiedby, setype, description, createdtime, modifiedtime, viewedtime, status, version, presence, deleted, smgroupid, source, label) VALUES
        (${attachmentsid}, 1, 1, 0, 'Documents Attachment', NULL, '${currentDateTime}', '${currentDateTime}', NULL, NULL, 0, 1, 0, NULL, NULL, NULL),
        (${crmid}, 1, 1, 1, 'Documents', NULL, '${currentDateTime}', '${currentDateTime}', NULL, NULL, 0, 1, 0, 0, 'CRM', '${newFileNameArray[0]}')`;
        db.query(vtiger_crmentity);

        const vtiger_notes = `INSERT INTO vtiger_notes (notesid, note_no, title, filename, notecontent, folderid, filetype, filelocationtype, filedownloadcount, filestatus, filesize, fileversion, tags) VALUES(${crmid}, 'DOC5', '${newFileNameArray[0]}', '${newFileName}', '', 1, '${mimeType}', 'I', NULL, 1, '${fileSize}', '', '')`;
        db.query(vtiger_notes);

        const vtiger_attachments = `INSERT INTO vtiger_attachments (attachmentsid, name, description, type, path, storedname, subject) VALUES
        (${attachmentsid}, '${newFileName}', NULL, '${mimeType}', '${dbSavePath}', '${encryptedFileName}', NULL)`;
        db.query(vtiger_attachments);

        const vtiger_notescf = `INSERT INTO vtiger_notescf (notesid) VALUES(${crmid})`;
        db.query(vtiger_notescf);

        const vtiger_seattachmentsrel = `INSERT INTO vtiger_seattachmentsrel (crmid, attachmentsid) VALUES(${crmid}, ${attachmentsid})`;
        db.query(vtiger_seattachmentsrel);

        const vtiger_senotesrel = `INSERT INTO vtiger_senotesrel(crmid, notesid) VALUES (${contactid},${crmid})`;
        db.query(vtiger_senotesrel);

        console.log(vtiger_crmentity);
        console.log(vtiger_notes);
        console.log(vtiger_attachments);
        console.log(vtiger_notescf);
        console.log(vtiger_seattachmentsrel);
        console.log(vtiger_senotesrel);

        fs.rename(oldPath, newPath, (err) => { });
        crmentity_seq1++;
      }
      const vtiger_crmentity_seq = `UPDATE vtiger_crmentity_seq SET id=${attachmentsid} WHERE 1`;
      console.log(vtiger_crmentity_seq);
      db.query(vtiger_crmentity_seq);
      return res.status(200).json({ message: 'File uploaded and moved!', numberOfFiles: numberOfFiles });
    });
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;