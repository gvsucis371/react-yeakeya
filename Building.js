class Building {
    constructor(attributes) {
        this.nameID = attributes.nameID
        this.description = attributes.description
        this.yearBuilt = attributes.yearBuilt
        this.area = attributes.area
        this.campus = attributes.campus
        this.errors = []
    }

    isValid() {
        this.errors = []
        if (!this.nameID) {
            this.errors.push("The building must have a name.")
        }
        if (!this.description) {
            this.errors.push("The building must have a description.")
        }
        if (!this.yearBuilt || this.yearBuilt < 1960) { // TODO also check if after current year
            this.errors.push("The year built must be after 1960.")
        }
        if (!this.area || this.area <= 0) {
            this.errors.push("The square footage must be over 0 sq ft.")
        }
        if (!this.campus || (this.campus != "Allendale" && this.campus != "Pew" && this.campus != "Health")) {
            this.errors.push("The campus must be Allendale, Pew, or Health campus.")
        }
        return this.errors.length <= 0
    }
}

module.exports = Building;
