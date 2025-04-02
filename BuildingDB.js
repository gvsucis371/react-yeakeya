var sqlite3 = require("sqlite3").verbose()
const Building = require("./Building")

class BuildingDB {
    static initialize() {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS Buildings (nameID TEXT PRIMARY KEY, description TEXT NOT NULL, yearBuilt INTEGER NOT NULL, area INTEGER NOT NULL, campus TEXT NOT NULL);")
            //this.db.run("INSERT INTO Buildings (name, description, yearBuilt, area, campus) VALUES ('Example Building', 'This is an example building.', '1960', '1000', 'Allendale');")
        })
    }

    static allBuildings() {
        return new Promise((resolve, _reject) => {
            this.db.all("SELECT * FROM Buildings", (err, response) => {
                if(err){return _reject(err);}
                resolve(response.map((item) => new Building(item)))
            })
        })
    }

    static find(nameID) {
        return new Promise((resolve, _reject) => {
            this.db.all("SELECT * FROM Buildings WHERE (nameID == \"" + nameID + "\")", (err, rows) => {
                if(err){return _reject(err);}
                resolve(new Building(rows[0]))
            })
        })
    }

    static create(attributes) {
        let newBuilding = new Building(attributes)
        if (newBuilding.isValid()) {
            return new Promise((resolve, _reject) => {
                this.db.all("INSERT INTO Buildings (nameID, description, yearBuilt, area, campus) VALUES ('" + newBuilding.nameID + "', '" + newBuilding.description + "', '" + newBuilding.yearBuilt + "', '" + newBuilding.area + "', '" + newBuilding.campus + "')", (err, newBuilding) => {
                    if(err){return _reject(err);}
                    resolve(newBuilding)
                })
            })
        } else {
            return newBuilding
        }
    }

    static update(attributes) {
        let updatedBuilding = new Building(attributes)
        if (updatedBuilding.isValid()) {
            return new Promise((resolve, _reject) => {
                this.db.all("UPDATE Buildings SET description='" + updatedBuilding.description + "', yearBuilt='" + updatedBuilding.yearBuilt + "', area='" + updatedBuilding.area + "', campus='" + updatedBuilding.campus + "' where nameID='" + updatedBuilding.nameID + "'", (err, updatedBuilding) => {
                    if(err){return _reject(err);}
                    resolve(updatedBuilding)
                })
            })
        } else {
            console.log("Update failed")
            return updatedBuilding
        }
    }

    static remove(targetBuilding) {
        return new Promise((resolve, _reject) => {
            this.db.all("DELETE FROM Buildings WHERE nameID='" + targetBuilding + "'", (err, targetBuilding) => {
                if(err){return _reject(err);}
                resolve(targetBuilding)
            })
        })
    }
}

BuildingDB.db = new sqlite3.Database("Buildings.sqlite")
module.exports = BuildingDB