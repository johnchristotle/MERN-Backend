const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
require('dotenv').config();
const connectDB = require('./config/db');
const goalRoutes = require('./routes/goalRoute');
const userRoutes = require('./routes/userRoute');

connectDB();


app.get('/', (req, res) => {
    res.json('Christotle Goal App API')
})


app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)


app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`)
})