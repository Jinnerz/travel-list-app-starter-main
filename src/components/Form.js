import React, { useState } from "react";

export default function Form({handleAddItems, setItems, setSearchTerm}) {
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
        <div className="form-container">
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
            <button style={{backgroundColor:'red'}} className="clearItemsButton" onClick={() => {setItems([]); setSearchTerm('');}}>CLEAR ALL ITEMS</button>
        </div>
    );
  };