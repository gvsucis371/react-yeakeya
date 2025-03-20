let buildings = ['Kirkhof', 'Padnos', 'Mackinac', 'Manitou', 'Niemeyer', 'Kindschi'];
    
const moreBuildings = <div>
  <p>Here are some more buildings:</p>
  <ul>
    {buildings.map((building) => <li>{building}</li>)}
  </ul>
</div>;
    
const root = ReactDOM.createRoot(document.getElementById('react-list'));
root.render(moreBuildings);
    