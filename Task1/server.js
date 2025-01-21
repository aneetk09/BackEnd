const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Max log size (in bytes), e.g., 1MB
const MAX_LOG_SIZE = 1024 * 1024; // 1MB

// Helper function to rotate log file if necessary
function rotateLogFile() {
    const logFilePath = path.join(__dirname, 'requests.log');
    
    if (fs.existsSync(logFilePath)) {
        const stats = fs.statSync(logFilePath);
        
        if (stats.size > MAX_LOG_SIZE) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const archivedLogPath = path.join(__dirname, `requests-${timestamp}.log`);
            fs.renameSync(logFilePath, archivedLogPath);
        }
    }
}

// Enhanced Logging Middleware
app.use((req, res, next) => {
    rotateLogFile(); // Rotate the log file if needed

    const logData = {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        url: req.originalUrl,
        protocol: req.protocol,
        method: req.method,
        hostname: req.hostname,
        queryParams: req.query,  // Query parameters
        headers: req.headers,    // Request headers
        userAgent: req.get('User-Agent'),  // User-Agent
    };

    const logEntry = JSON.stringify(logData) + '\n';

    const logFilePath = path.join(__dirname, 'requests.log');
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    next();
});

// Sample route
app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
