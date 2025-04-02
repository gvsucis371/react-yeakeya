// NOTE: Known issues with reloading automatically. Could not get to work consistently in a decent amount of time.

const editDiv = ReactDOM.createRoot(document.getElementById('edit-div'));
const listDiv = ReactDOM.createRoot(document.getElementById('display-buildings'));

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

function EditBuilding(namePassed) {
    const [building, setBuilding] = React.useState(null);

    React.useEffect(() => {
        async function fetchBuilding() {
            const data = await find(namePassed.buildingName);
            setBuilding(data);
        }
        fetchBuilding();
    }, [namePassed.buildingName]);

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

function ListBuildings({refresh}) {
    const [buildings, setBuildings] = React.useState([]);

    React.useEffect(() => {
        async function fetchBuildings() {
            const data = await allBuildings();
            setBuildings(data);
        }
        fetchBuildings();
    }, [refresh]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Building</th>
                        <th>Description</th>
                        <th>Year Built</th>
                        <th>Square Footage</th>
                        <th>Campus</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {buildings.map((building) => (
                        <tr key={building.nameID}>
                            <td>{building.nameID}</td>
                            <td>{building.description}</td>
                            <td>{building.yearBuilt}</td>
                            <td>{building.area}</td>
                            <td>{building.campus}</td>
                            <td><button onClick={() => editDiv.render(<EditBuilding buildingName={building.nameID}/>)}>Edit</button></td>
                            <button onClick={async () => { 
                                    await handleDestroy(building.nameID);
                                }}>Delete</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
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
        create(newBuilding);
    } else {
        let editedBuilding = {
            nameID: document.getElementById("nameIDEdit").value,
            description: document.getElementById("descriptionEdit").value,
            yearBuilt: document.getElementById("yearBuiltEdit").value,
            area: document.getElementById("areaEdit").value,
            campus: document.getElementById("campusEdit").value
        };
        try {
            find(editedBuilding.nameID);
            update(editedBuilding);
        } catch {
            create(editedBuilding);
        }

        editDiv.render(newBuilding());
    }

    event.target.reset();
}

function handleDestroy(nameID) {
    remove(nameID);
}

async function allBuildings() {
    const response = await fetch("http://localhost:5838/buildings/all");
    const data = await response.json();
    return data;
}

async function find(nameID) {
    const response = await fetch("http://localhost:5838/buildings/find/" + nameID);
    return await response.json();
}

async function update(editedBuilding) {
    await fetch("http://localhost:5838/buildings/update/" + editedBuilding.nameID, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedBuilding)
    });
}

async function create(newBuilding) {
    await fetch("http://localhost:5838/buildings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBuilding)
    });
}

async function remove(nameID) {
    await fetch("http://localhost:5838/buildings/remove/" + nameID, {
        method: "POST"
    });
}

editDiv.render(newBuilding());
listDiv.render(<ListBuildings/>);
