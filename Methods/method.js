const multer = require("multer");
const os = require("os");
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

const login=(req, resp) => {
    resp.render("login");
  }

const uploadpg=(req, res) => {
    console.log("done")
    res.send(`done`);
  }

  const selectFile=(req, res) => {
    password = req.body.password;
    if (password === key) {
      res.render("index", { title: "File" });
    } else {
      res.send("Password not valid");
    }
  }
  module.exports={ selectFile,login,uploadpg ,getLocalIPAddress}