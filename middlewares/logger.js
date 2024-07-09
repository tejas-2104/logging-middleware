// middlewares/logger.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs', 'requests.log');

// Ensure the logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath));
}

const convertToIST = (date) => {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    return new Date(date.getTime() + istOffset).toISOString().replace('T', ' ').replace('Z', ' IST');
};

const logger = (req, res, next) => {
    const start = process.hrtime();
    const userName = 'Tejas'; 

    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const elapsedTime = (seconds * 1e3 + nanoseconds / 1e6).toFixed(3); // ms
        const timestamp = convertToIST(new Date());
        const log = `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedTime}ms by ${userName}\n`;

        fs.appendFile(logFilePath, log, (err) => {
            if (err) {
                console.error('Error writing to log file', err);
            }
        });
    });

    next();
};

module.exports = logger;
