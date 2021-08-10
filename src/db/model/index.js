const fs = require("fs");
const path = require("path");

module.exports = class Model {

    constructor(data = {}) {
        this._dataValues = { ...data };
    }

    static modelName;

    static get filePath() {
        return path.join(path.dirname(__dirname), "../db/data", `${this.modelName}.json`);
    }

    static saveAutoIncrementToFile(autoIncrement) {
        return new Promise((resolve, reject) => {
            this.getAll().then((parsedData) => {
                fs.writeFile(this.filePath, JSON.stringify({ ...parsedData, auto_increment: autoIncrement }), (err) => {
                    if (err) reject(err);

                    resolve(autoIncrement);
                });
            })
        })
    }

    static saveDataToFile(data) {
        return new Promise((resolve, reject) => {
            this.getAll().then((parsedData) => {
                fs.writeFile(this.filePath, JSON.stringify({ ...parsedData, data }), (err) => {
                    if (err) reject(err);

                    resolve(data);
                });
            })
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) reject(err);

                const parsedData = JSON.parse(data);

                resolve(parsedData);
            });
        })
    }

    static geAutoIncrement() {
        return this.getAll().then(parsedData => parsedData.auto_increment);
    }

    static findAll() {
        return this.getAll().then(parsedData => parsedData.data.map((item) => ({...item, id: Number(item.id)})));
    }

    static find(filters) { }

    static findById(id) {
        return new Promise((resolve, reject) => {
            this.findAll().then((data) => {
                const item = data.find(item => item.id == id)

                if (item) return new this({ ...item, id });

                return item
            })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        })
    }

    static updateById(id, values) {
        return new Promise((resolve, reject) => {
            this.findAll().then((data) => {
                const itemIndex = data.findIndex(item => item.id == id)

                if (itemIndex == -1) return null

                const item = data[itemIndex];

                const newDataArray = [...data];

                const newItem = { ...item, ...values, id: Number(id) };

                newDataArray[itemIndex] = newItem;

                return this.saveDataToFile(newDataArray).then(() => resolve(newItem)).catch((err) => reject(err));
            }).catch((err) => reject(err));
        })
    }

    save() {
        return new Promise((resolve) => {
            this.constructor.findAll().then((data) => {
                return this.constructor.geAutoIncrement().then((autoIncrement) => {
                    const autoIncrementId = autoIncrement + 1;

                    data = [...data, { ...this._dataValues, id: autoIncrementId }];

                    return this.constructor.saveAutoIncrementToFile(autoIncrementId)
                        .then(() => {
                            return this.constructor.saveDataToFile(data).then(() => {
                                this._dataValues.id = autoIncrementId;
                            })
                        })
                })
            }).then((data) => resolve(data)).catch((err) => reject(err));
        })
    }

    delete() {
        return new Promise((resolve) => {
            this.constructor.findAll().then((data) => {
                data = data.filter((item) => item.id != this._dataValues.id);

                return this.constructor.saveDataToFile(data).then(() => resolve())
            }).catch((err) => reject(err));
        })
    }

    toJson() {
        return {...this._dataValues, id: Number(this._dataValues.id)}
    }
}