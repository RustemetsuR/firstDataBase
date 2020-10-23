const fs = require("fs");
const { nanoid } = require("nanoid");

const fileName = "./dbJSONs/itemsDB.json";
const categoryFileName = "./dbJSONs/categoriesDB.json";
const placesFileName = "./dbJSONs/placesDB.json"
let data = [];

module.exports = {
    init() {
        try {
            data = JSON.parse(fs.readFileSync(fileName));
        } catch (e) {
            data = [];
        }
    },
    getItems() {
        const dataCopy = [];
        data.map(d => {
            dataCopy.push({
                id: d.id,
                name: d.name,
                category_id: d.category_id,
                place_id: d.place_id,
            });
        });
        return dataCopy;
    },
    getItem(id) {
        return data.find(elem => elem.id === id);
    },
    save() {
        fs.writeFileSync(fileName, JSON.stringify(data));
    },
    addItem(item) {
        item.id = nanoid();
        const categoryData = JSON.parse(fs.readFileSync(categoryFileName));
        const placesData = JSON.parse(fs.readFileSync(placesFileName))
        if (item.description === '') {
            item.description = 'No Description';
        };
        if (item.category_id !== '' && item.place_id !== '' && item.name !== '') {
            if (categoryData.find(elem => elem.id === item.category_id) && placesData.find(elem => elem.id === item.place_id)) {
                data.push(item);
                this.save();
                return item;
            } else {
                return {
                    error: "Invalid Category's ID or Place's ID",
                };
            }
        } else {
            return {
                error: "It seems that Category's ID, Place's ID or Item's Name is Empty",
            };
        };
    },
    deleteItem(id) {
        const index = data.findIndex(d => d.id === id);
        if(index !== -1){
            data.splice(index,1);
            this.save();
            return 'Successfully Deleted!';
        }else{
            return 'Something Went Wrong...';
        };
    }
};