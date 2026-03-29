const express = require('express')
const app = express()
const path = require('path')
app.use('/audio', express.static(path.join(__dirname, 'uploads/audio')));
const cors = require('cors');

app.use(express.static(path.join(__dirname, "frontend")));

app.use(cors())
app.use(express.json())


app.use('/audio', express.static(path.join(__dirname, "uploads/audio")))

app.use('/api/auth', require("./routes/authRoutes"))
app.use('/api/chant', require('./routes/chantRoutes'))

module.exports = app;