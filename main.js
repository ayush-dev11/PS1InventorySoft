const electron = require("electron");
const url = require("url");
const path = require("path");
const mongoose = require('mongoose');
const { stringify } = require("querystring");

const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;
let itemWindow1;
let itemWindow2;
let itemWindow3;
const URI = "mongodb://127.0.0.1:27017/inventory"
mongoose.connect(URI);
mongoose.connection.on('connected', () => {
    console.log('connected successfully');
})

const itemSchema = new mongoose.Schema({
    item: String,
    parameter1: String,
    parameter2: String

})

const Item = mongoose.model('Item', itemSchema);

function createItemWindow1(){
    itemWindow1 = new BrowserWindow({
        width: 500,
        height: 300,
        title: "Item1",
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true,
        }


    })

    itemWindow1.loadFile('item1.html')

}

function createItemWindow2(){
    itemWindow2 = new BrowserWindow({
        width: 500,
        height: 300,
        title: "Item2",
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true,
        }


    })

    itemWindow2.loadFile('item2.html')

}
function createItemWindow3(){
    itemWindow3 = new BrowserWindow({
        width: 500,
        height: 300,
        title: "Item3",
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true,
        }


    })

    itemWindow3.loadFile('item3.html')

}


//Listen to the app if it is ready

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    // building the menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.loadFile('./index.html');
    

})

// Catching 'item:add' from item1 page
ipcMain.on('item:add', function(e,item){
    console.log(item);
    const [item1,parameter1,parameter2] = item;
    const inventoryObject = new Item({
        item: item1,
        parameter1: parameter1,
        parameter2: parameter2

    })

    inventoryObject.save();
})

// Creating Menu Templates
const mainMenuTemplate = [
    {
        label: 'file',
        submenu: [
            {
                label: 'Add item1',
                click(){
                    createItemWindow1()
                    
                }
            },
            {
                label: 'Add item2',
                click(){
                    createItemWindow2()
                    
                }
            },
            {
                label: 'Add item3',
                click(){
                    createItemWindow3()
                    
                }
            }
        ]
    }
]






