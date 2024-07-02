require('dotenv').config();

const express = require('express');
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute')
const driverRouter = require('./routes/driverRoute')
const serviceRouter = require('./routes/serviceRoute')
const driverServiceRouter = require('./routes/driverServiceRoute')
const reportRouter = require('./routes/reportRoute')
const ratingRouter = require('./routes/ratingRoute')
const bookingRouter = require('./routes/bookingRoute')
const pricingRouter = require('./routes/pricingRoute')
const scheduleRouter = require('./routes/scheduleRoute')
const notificationRouter = require('./routes/notificationRoute')
const customRouter = require('./routes/customRoute')
const sequelize = require('./config/database');
const cors = require('cors');

const {  getTopDrivers } = require('./controller/driverController');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your Next.js application's domain
    credentials: true // If you're using cookies or authentication headers, set this to true
  }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
});

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/driver',driverRouter)
app.use('/api/v1/service',serviceRouter)
app.use('/api/v1/report',reportRouter)
app.use('/api/v1/rating',ratingRouter)
app.use('/api/v1/booking',bookingRouter)
app.use('/api/v1/pricing',pricingRouter)
app.use('/api/v1/schedule',scheduleRouter)
app.use('/api/v1/notification',notificationRouter)
app.use('/api/v1/driverService',driverServiceRouter)

app.use('/api/v1/',customRouter)


app.use('*', (req, res) => {
    res.status(404).json()
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Route to fetch all users

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});