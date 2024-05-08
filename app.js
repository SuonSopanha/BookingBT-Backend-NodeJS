require('dotenv').config();

const express = require('express');
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute')
const driverRouter = require('./routes/driverRoute')
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your Next.js application's domain
    credentials: true // If you're using cookies or authentication headers, set this to true
  }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World',

    });
});

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/driver',driverRouter)

app.use('*', (req, res) => {
    res.status(404).json()
});

// Route to fetch all users


const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});