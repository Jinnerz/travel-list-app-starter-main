import { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({handleAddItems}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const date = new Date();
  const timeNow = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  // Can do this because the state also in this component
  // Will be taken from the updated states
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: timeNow,
      description: description,
      quantity: quantity,
      packed: false
    };
    handleAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleQuantity(e) {
    setQuantity(Number(e.target.value));
  }
  
  

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select value={quantity} onChange={handleQuantity}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <input value={description} onChange={handleDescription} type="text" placeholder="Item..."/>
      <button>Add</button>
    </form>
  );
}

function PackingList(props) {
  return (
    <div className="list">
      <ul>
        {props.filteredItems.map((item) => (
          <Item key={item.id} item={item} handlePacked={props.handlePacked} handleDelete={props.handleDelete} />
        ))}
      </ul>
    </div>
  );
}

// The "props" is 1 of the entire { }, e.g. the array of the id, description, quantity, packed
// textDecoration: None can help do nothing if it still hasnt been packed
// textDecoration: line-through will appear if its already packed
function Item(props) {
  return(
    <div>
      <li style={{ textDecoration: props.item.packed ? 'line-through' : 'none'}}>
        <input type="checkbox" checked={props.item.checked} onChange={() => props.handlePacked(props.item.description)}/>
        {props.item.description} ({props.item.quantity})
        {/* Conditional to only render the delete button if its packed (true) true=dont show*/}
        {!props.item.packed && <input style={{backgroundColor:'red'}} type="button" value="Delete" onClick={() => props.handleDelete(props.item.description)}/> }
      </li>
    </div>
  )
}

function Stats(props) {
  return (
    <footer className="stats">
      <em>You have {props.length} items in the list. You already packed {props.handleStats()} ({Math.round(props.handleStats() / props.length * 100)}%).</em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )


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
      <Form handleAddItems={handleAddItems}/>

      <div className="searchBox">
        {searchTerm && (
          <h4 className="tagline">Search results for "{searchTerm}"</h4>
        )}

        <input 
          type="text"
          placeholder="Search for item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-bar"
        />

        {/* Show a message if no pizzas match */}
        {filteredItems.length === 0 && searchTerm && (
            <p>No items found with that name.</p>
        )}
      </div>
      
      <PackingList filteredItems={filteredItems} handlePacked={handlePacked} handleDelete={handleDelete} />
      <Stats length={items.length} handleStats={handleStats}/>
    </div>
  );
}

export default App;
