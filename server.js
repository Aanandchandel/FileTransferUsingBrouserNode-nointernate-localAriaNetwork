const router=require("./Routes/user")
const fs = require("fs");
const key = "Ajkl@12345";
const {
  login,
  uploadpg,
  selectFile,
  trimStringFromWord,
  getLocalIPAddress,
} = require("./Methods/method");
const os = require("os");
const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();
app.use(router)
let password;

const root = path.resolve(__dirname, "..");
const rootFolder = trimStringFromWord(root, "Desktop", "desktop", "Users");
console.log(rootFolder);
let userDir1 = `${rootFolder}/uploads`;
console.log(typeof userDir1);
if (!fs.existsSync(userDir1)) {
  fs.mkdirSync(userDir1);
}

var userDir;
var objStorage = {
  destination: function (re, file, cb) {
    // Dynamic destination based on user's name
    return cb(null, userDir1);
  },
  filename: function (req, file, cb) {

    // return cb(null, `${Date.now()}-${file.originalname}`);
    return cb(null, `${file.originalname}`);
    
  },
};
var storage = multer.diskStorage(objStorage);

// Default upload middleware
var upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.set("view engine", "ejs");



const localIP = getLocalIPAddress();
console.log("Local IP address:", localIP);

app.get("/", login);

app.post("/File", (req, res) => {
  const name = req.body.name;

  userDir = `${rootFolder}/uploads/${name}`;
  // userDir = `./uploads/${name}`;
  // if (!fs.existsSync(userDir)) {
  //   fs.mkdirSync(userDir);
  // }
  // objStorage.destination = function (re, file, cb) {
  //   // Dynamic destination based on user's name
  //   return cb(null, userDir);
  // };

  console.log(name);

  console.log(userDir);

  password = req.body.password;
  if (password === key) {
    res.render("start", { folderName: ` uploads/${req.body.name}` });
  } else {
    res.send("Password not valid");
  }
});

app.post("/upload", upload.array("files"), uploadpg);

// Use the upload middleware to handle file upload

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log(`Server is running on http://${localIP}:${PORT}`);
});


module.exports={password,key}