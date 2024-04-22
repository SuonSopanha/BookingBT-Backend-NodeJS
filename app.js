require('dotenv').config();

const express = require('express');
const authRouter = require('./routes/authRoute')
const sequelize = require('./config/database');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World'
    });
});

app.use('/api/v1/auth',authRouter)

app.use('*', (req, res) => {
    res.status(404).json()
});

// Route to fetch all users


const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});