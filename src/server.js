const express = require('express');
const routes = require('./router/index')
const cors = require('cors')
const port = 3001;

const app = express() 

app.use(cors())

app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;