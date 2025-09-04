const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')


dotenv.config()
connectDb();
const app = express()
app.use(cors({
  origin: ["http://localhost:5173", "https://first-project-pi-orpin.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  
}));
const port = process.env.PORT
app.use(express.json());

app.use('/api/v1/auth', require("./routes/authRoutes"))
app.use('/api/v1/user', require("./routes/userRoutes"))
app.use('/api/v1/place', require("./routes/restuarantRoutes"))
app.use('/api/v1/category', require("./routes/categoryRoutes"))
app.use('/api/v1/food', require("./routes/foodRoutes"))
app.use('/api/v1/contact', require("./routes/contactRoutes"))
app.get('/', (req, res) => {
  return res.send('Hello World!')
})
module.exports = app;