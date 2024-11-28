import { useState } from "react";
import Logo from './Logo';
import Form from './Form';
import PackingList from "./PackingList";
// import Item from "./Item";
import Stats from './Stats';

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  //Sorting and Searching, array.sort((a, b) => {}); a and b are two elements being compared in an array
  // < 0 ,a comes before b
  // > 0,a comes after b
  // 0, no change in order 
  // sortOption are taken from the useState, which is then set by a dropdown option for the user to click and set different values to the useState
  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortOption === 'name') {
      //This returns -1/0/1 depending on the localeCompare
      return a.description.localeCompare(b.description);
    } else if (sortOption === 'quantity') {
      return a.quantity - b.quantity;
    } else if (sortOption === 'packed') {
      return a.packed === b.packed ? 0 : a.packed ? 1 : -1;
    } else {
      return 0;
    }
  });

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  // Handlepacked loops through the list of items, updates the list based on conditions
  // It checks if the description of the current item matches the description that was passed in
  // If found it will toggle the false/true of packed
  // The list is updated based on whether the checkbox is ticked/unticked, due to changing it to false/true
  function handlePacked(items) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.description === items ? {...item, packed: !item.packed} : item
        )
      )
  }

  // HandleDelete expects a description to be passed in when it is called
  // It will update the items useState by filtering out items that match the description that was passed in
  // a new array will be formed, excluding socks since socks !== socks returns false
  function handleDelete(description) {
    setItems((prevItems) =>
      prevItems.filter((item) => item.description !== description)
    )
  }

  function handleStats() {
    let numberPacked = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].packed === true) {
        numberPacked = numberPacked + 1;
      }
    };
    return (numberPacked);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} setItems={setItems} setSearchTerm={setSearchTerm}/>
      <PackingList setSearchTerm={setSearchTerm} searchTerm={searchTerm} filteredItems={filteredItems} handlePacked={handlePacked} handleDelete={handleDelete} handleSort={handleSort} sortOption={sortOption} />
      <Stats length={items.length} handleStats={handleStats}/>
    </div>
  );
}

export default App;
