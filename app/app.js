const router = require("express").Router();
const categoriesDB = require("../dbFiles/categoriesFileDB");
const placesDB = require("../dbFiles/placesFileDB");
const itemDB = require('../dbFiles/itemsFileDB');
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const config = require("../config");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const error = {
    error: 'Error',
};

router.get("/:resources", (req, res) => {
    let data;
    switch (req.params.resources) {
        case 'categories':
            data = categoriesDB.getItems();
            break;
        case 'places':
            data = placesDB.getItems();
            break;
        case 'items':
            data = itemDB.getItems();
            break;
        default:
            data = error;
    };
    res.send(data);
});

router.get("/:resources/:id", (req, res) => {
    let data;
    switch (req.params.resources) {
        case 'categories':
            data = categoriesDB.getItem(req.params.id);
            break;
        case 'places':
            data = placesDB.getItem(req.params.id);
            break;
        case 'items':
            data = itemDB.getItem(req.params.id);
            break;
        default:
            data = error;
    };
    res.send(data);
});

router.post("/:resources/",upload.single("image"), (req, res) => {
    let data;
    if (req.body.name !== '') {
        switch (req.params.resources) {
            case 'categories':
                data = categoriesDB.addItem(req.body);
                break;
            case 'places':
                data = placesDB.addItem(req.body);
                break;
            case 'items':
                const items = req.body;
                if(req.file){
                    items.image = req.file.filename;
                };
                data = itemDB.addItem(items);
                break;
            default:
                data = error;
        };
    } else {
        data = error;
    };
    res.send(data);
});

router.delete("/:resources/:id", (req, res) => {
    let data;
    switch (req.params.resources) {
        case 'categories':
            data = categoriesDB.deleteItem(req.params.id);
            break;
        case 'places':
           data = placesDB.deleteItem(req.params.id);
           break;
        case 'items':
            data = itemDB.deleteItem(req.params.id);
            break;
        default:
            data = error;
    };
    res.send(data)
});

module.exports = router;