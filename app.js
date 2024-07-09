const express = require('express');
const logger = require('./middlewares/logger');
const routes = require('./routes/routes');

const app = express();

app.use(logger);

app.use('/', routes);

const PORT =8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
