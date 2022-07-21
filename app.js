const express = require("express");

const authRoutes = require("./routes/authRoutes");
const otherRoutes = require("./routes/appRoutes");
const connectDB = require("./db/db");
require("dotenv/config");

const app = express();

app.use(express.json())

app.use("/auth", authRoutes);
app.use(otherRoutes);

app.use((error, req, res, next) => {
    res.status(error.httpStatusCode).json(error.message)
})

connectDB(() => {
    const port = process.env.PORT || 5050
    app.listen(port, () => console.log(`connected to port ${port}`))
});