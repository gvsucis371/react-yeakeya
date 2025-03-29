const editDiv = ReactDOM.createRoot(document.getElementById('edit-div'));
const listDiv = ReactDOM.createRoot(document.getElementById('display-buildings'));

let buildings = [
    {
        nameID: "Kirkhof",
        description: "The main events building on Allendale campus.",
        yearBuilt: 1974,
        area: 72000,
        campus: "Allendale"
    }
];

function newBuilding() {
    return <form onSubmit={handleSubmit} id="newForm">
    <label htmlFor="nameID">Name</label>
    <input type="text" name="nameID" id="nameID" defaultValue=""/>
    <p></p>
    <label htmlFor="description">Description</label>
    <textarea name="description" id="description" defaultValue=""/>
    <p></p>
    <label htmlFor="yearBuilt">Year Built</label>
    <input type="number" name="yearBuilt" id="yearBuilt" min="1960" max="2050" defaultValue=""/>
    <p></p>
    <label htmlFor="area">Square Footage</label>
    <input type="number" name="area" id="area" min="0" max="100000" defaultValue=""/>
    <p></p>
    <label htmlFor="campus">Campus</label>
    <input type="text" name="campus" id="campus" defaultValue=""/>
    <p></p>
    <button type="submit">Submit New Building</button>
</form>;
}

function editBuilding(buildingName) {
    const building = buildings.find(building => building.nameID === buildingName);
    if (building != null) {
        return <form onSubmit={handleSubmit} id="editForm">
        <label htmlFor="nameIDEdit">Name</label>
        <input type="text" name="nameIDEdit" id="nameIDEdit" defaultValue={building.nameID}/>
        <p></p>
        <label htmlFor="descriptionEdit">Description</label>
        <textarea name="descriptionEdit" id="descriptionEdit" defaultValue={building.description}/>
        <p></p>
        <label htmlFor="yearBuiltEdit">Year Built</label>
        <input type="number" name="yearBuiltEdit" id="yearBuiltEdit" min="1960" max="2050" defaultValue={building.yearBuilt}/>
        <p></p>
        <label htmlFor="areaEdit">Square Footage</label>
        <input type="number" name="areaEdit" id="areaEdit" min="0" max="100000" defaultValue={building.area}/>
        <p></p>
        <label htmlFor="campusEdit">Campus</label>
        <input type="text" name="campusEdit" id="campusEdit" defaultValue={building.campus}/>
        <p></p>
        <button type="submit">Submit Edits</button>
        </form>;
    } else {
        return <div></div>;
    }
}

function listBuildings() {
    return <div>
    <table>
        <tr>
            <th>Building</th>
            <th>Description</th>
            <th>Year Built</th>
            <th>Square Footage</th>
            <th>Campus</th>
            <th></th>
            <th></th>
        </tr>
      
        {buildings.map((building) => (
            <tr>
                <th>{building.nameID}</th>
                <th>{building.description}</th>
                <th>{building.yearBuilt}</th>
                <th>{building.area}</th>
                <th>{building.campus}</th>
                <th><button onClick={() => editDiv.render(editBuilding(building.nameID))}>Edit</button></th>
                <th><button onClick={() => handleDestroy(building.nameID)}>Destroy</button></th>
            </tr>
        ))}
    </table>
</div>
}

function handleSubmit(event) {
    event.preventDefault();

    if (event.target.id == "newForm") {
        let newBuilding = {
            nameID: document.getElementById("nameID").value,
            description: document.getElementById("description").value,
            yearBuilt: document.getElementById("yearBuilt").value,
            area: document.getElementById("area").value,
            campus: document.getElementById("campus").value
        };
    
        buildings.push(newBuilding);
    } else {
        let editedBuilding = {
            nameID: document.getElementById("nameIDEdit").value,
            description: document.getElementById("descriptionEdit").value,
            yearBuilt: document.getElementById("yearBuiltEdit").value,
            area: document.getElementById("areaEdit").value,
            campus: document.getElementById("campusEdit").value
        };
    
        const buildingIndex = buildings.findIndex(building => building.nameID === editedBuilding.nameID);
        if (buildingIndex != -1) {
            buildings[buildingIndex] = editedBuilding;
        } else {
            buildings.push(editedBuilding);
        }

        editDiv.render(newBuilding());
    }

    event.target.reset();
    listDiv.render(listBuildings());
}

function handleDestroy(nameID) {
    buildings = buildings.filter((building) => building.nameID !== nameID);
    listDiv.render(listBuildings());
}

editDiv.render(newBuilding());
listDiv.render(listBuildings());
