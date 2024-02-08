// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors()); 
app.use(bodyParser.json());

app.post('/check-eligibility', (req, res) => {
    const { age, gender, employment, annualIncome, community, firstGraduate } = req.body;

    // Spawn a Python process
    const pythonProcess = spawn('python', ['filter_schemes.py', age, gender, employment, annualIncome, community, firstGraduate]);

    let result = '';

    // Collect data from the Python process
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    // Handle the end of the Python process
    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        res.json(JSON.parse(result));
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
