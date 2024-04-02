const fs = require("fs");
const key = "Ajkl@12345";
const { login, uploadpg, selectFile } = require("./Methods/method");
const os = require("os");
const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();
let password;
console.log("running");

// Default storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Dynamic destination based on user's name
//     const userDir = `./uploads/${req.body.name}`;
//     if (!fs.existsSync(userDir)) {
//       fs.mkdirSync(userDir);
//     }
//     cb(null, userDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Default upload middleware
// const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.set("view engine", "ejs");

const getLocalIPAddress = () => {
  const interfaces = os.networkInterfaces();
  let localIPAddress = "";

  Object.keys(interfaces).forEach((interfaceName) => {
    interfaces[interfaceName].forEach((interfaceInfo) => {
      if (!interfaceInfo.internal && interfaceInfo.family === "IPv4") {
        localIPAddress = interfaceInfo.address;
      }
    });
  });

  return localIPAddress;
};

const localIP = getLocalIPAddress();
console.log("Local IP address:", localIP);

app.get("/", login);

app.post("/File", (req, res) => {
  const name=req.body.name
  console.log(name)
  const userDir = `./uploads/${name}`;
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir);
  }
  console.log(userDir)

  var storage = multer.diskStorage({
    destination: function (re, file, cb) {
      // Dynamic destination based on user's name
return cb(null, userDir);
    },
    filename: function (req, file, cb) {
return cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  // Default upload middleware
  var upload = multer({ storage: storage });
  password = req.body.password;
  if (password === key) {
    res.render("index", { title: "File" });
  } else {
    res.send("Password not valid");
  }

  app.post("/upload", upload.array("files"), uploadpg);

});

// Use the upload middleware to handle file upload


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log(`Server is running on http://${localIP}:${PORT}`);
});
