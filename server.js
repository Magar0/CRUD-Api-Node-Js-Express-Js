const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./notes.js')
const dotEnv = require('dotenv')
const dbConnect = require('./mongoose/dbConnect.js')

dotEnv.config()
const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();
app.use(cors({ origin: "*" }))
app.use(express.json());
app.use("/api/notes", noteRoutes);


app.get('/', (req, res) => {
    res.status(200).json({ message: "Api is working" })
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'something went wrong' })
})

app.listen(PORT, () => {
    console.log("app is listening on port no", PORT);
})

module.exports = app;