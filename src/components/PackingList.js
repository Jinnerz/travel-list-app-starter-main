import Item from './Item';

export default function PackingList(props) {
    return (
      <div className="list">
        <div className='filteringOptions'>
            <input 
                type="text"
                placeholder="Search for item..."
                value={props.searchTerm}
                onChange={(e) => props.setSearchTerm(e.target.value)} 
                className="search-bar"
            />

            <select value={props.sortortOption} onChange={props.handleSort}>
                <option value="name">name</option>
                <option value="quantity">quantity</option>
                <option value="packed">packed</option>
            </select>
        </div>

        {/* Show a message if no pizzas match */}
        {props.filteredItems.length === 0 && props.searchTerm && (
            <p>No items found with that name.</p>
        )}

        <ul>
          {props.filteredItems.map((item) => (
            <Item key={item.id} item={item} handlePacked={props.handlePacked} handleDelete={props.handleDelete} />
          ))}
        </ul>
  
      </div>
    );
  };

