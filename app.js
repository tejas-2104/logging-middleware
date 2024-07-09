// app.js
const express = require('express');
const logger = require('./middlewares/logger');
const routes = require('./routes/routes');

const app = express();

// Use the logger middleware
app.use(logger);

// Set up routes
app.use('/', routes);

const PORT =8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
