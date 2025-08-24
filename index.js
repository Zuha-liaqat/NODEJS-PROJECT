const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')


dotenv.config()
connectDb();
const app = express()
app.use(cors({
  origin: ["http://localhost:3000", "https://reactproject-lemon-seven.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
const port = process.env.PORT
app.use(express.json());

app.use('/api/v1/auth', require("./routes/authRoutes"))
app.use('/api/v1/user', require("./routes/userRoutes"))
app.get('/', (req, res) => {
  return res.send('Hello World!')
})
module.exports = app;