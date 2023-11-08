/** @format */

const { app, BrowserWindow } = require("electron");

const url = require("url");
const path = require("path");

function createMainWindow() {
	const mainWindow = new BrowserWindow({
		title: "Card Deck",
		width: 1920,
		height: 1080,
	});

	const startUrl = url.format({
		pathname: path.join(__dirname, "index.html"),
		protocol: "file",
	});

	mainWindow.loadURL(startUrl);
	console.log(startUrl);
}

app.whenReady()
	.then(createMainWindow)
	.catch((error) => {
		console.log(error);
	});
