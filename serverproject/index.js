'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file-upload-routes');
const port = process.env.PORT || 8080;
//creating APP
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connection -------
require('./database')();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', fileRoutes.routes);
app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));