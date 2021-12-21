const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

dotenv.config({ path: "./config.env" });
require("./DB/moongose");
const PORT = process.env.PORT;
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(require("./router/User"));

app.use(require("./router/Admin"));
app.use(require("./router/Order"));

app.use(require("./router/auth"));
app.use(require("./router/payment"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
