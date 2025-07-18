// utils/createStallFolders.js
const fs = require("fs");
const path = require("path");

function createStallFolderTree(mobileNumber) {
  const basePath = path.join(__dirname, "../meseroe/stall");
  const userFolder = path.join(basePath, mobileNumber);

  const subFolders = ["menu", "order", "adCart", "profile"];

  // Check and create main user folder
  if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder, { recursive: true });
    console.log("✅ Created user folder:", userFolder);
  }

  // Create subfolders
  subFolders.forEach((folder) => {
    const subFolderPath = path.join(userFolder, folder);
    if (!fs.existsSync(subFolderPath)) {
      fs.mkdirSync(subFolderPath);
      console.log("📁 Created:", subFolderPath);
    }
  });
}

module.exports = { createStallFolderTree };
