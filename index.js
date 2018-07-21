const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 7070;

app.use(express.static(path.join(__dirname, './public')));

app.listen(port, console.log(`Server is listening to the port ${port}....`));
