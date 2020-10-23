const fs = require("fs");
const { nanoid } = require("nanoid");

const fileName = "./dbJSONs/placesDB.json";
const itemFileName = "./dbJSONs/itemsDB.json";
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
        if (item.description === '') {
            item.description = 'No Description';
        };
        data.push(item);
        this.save();
        return item;
    },
    deleteItem(id){
        const itemData = JSON.parse(fs.readFileSync(itemFileName));
        const index = itemData.findIndex(itemData => itemData.place_id === id);
        if(index !== -1){
            return 'Deleting The Place Is Impossible';
        }else{
            const alternateIndex = data.findIndex(d => d.id === id);
            data.splice(alternateIndex,1);
            this.save();
            return 'The Place was Successfully Deleted!';
        };
    }
};