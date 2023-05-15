const express = require('express')
const connectDB = require('./config/connection')
const dotenv = require('dotenv')
const calculationRoutes = require('./routes/calculationRoutes')
const cors = require('cors')

const app = express();

dotenv.config();

connectDB();

app.use(express.json({limit: "30mb", extended: true}))
app.use(cors())

app.use('/', calculationRoutes)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started running on PORT ${PORT}`)) 