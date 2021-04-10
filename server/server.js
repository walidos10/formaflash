const express = require("express");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");

const server = express();
const connectDB = require("./config/ConnectDB");
const admin = require("./routes/Admin");
const user = require("./routes/User");

require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 8080;
server.use(express.json());

connectDB();
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload());

server.post("/upload", (req, res) => {
  console.log(req.body);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/../client/public/upload/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
  });
});

server.use(helmet());
server.use("/admin", admin);
server.use("/user", user);

if (process.env.NODE_ENV === "production") {
  server.use(express.static("client/build"));
}
server.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`server connect on http://localhost:${port}`);
});
