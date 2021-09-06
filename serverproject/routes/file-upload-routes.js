'use strict';
const express = require('express');

const { upload } = require('../helpers/filehelper');
const { multipleFileUpload, getallMultipleFiles } = require('../controllers/fileuploaderController');
const { UserRegistration, UserLogin } = require('../controllers/userController')

const router = express.Router();

router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.post('/register', upload.array('files'), UserRegistration);
router.post('/login', upload.array('files'), UserLogin);
router.get('/getMultipleFiles', getallMultipleFiles);

module.exports = {
  routes: router
}