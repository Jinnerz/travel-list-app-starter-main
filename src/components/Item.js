// The "props" is 1 of the entire { }, e.g. the array of the id, description, quantity, packed
// textDecoration: None can help do nothing if it still hasnt been packed
// textDecoration: line-through will appear if its already packed
export default function Item(props) {
    return(
      <div style={{flexDirection:'row'}}>
        <li style={{ textDecoration: props.item.packed ? 'line-through' : 'none'}}>
          <input type="checkbox" checked={props.item.checked} onChange={() => props.handlePacked(props.item.description)}/>
          {props.item.description} ({props.item.quantity})
          {/* Conditional to only render the delete button if its packed (true) true=dont show*/}
          {!props.item.packed &&  <button value="Delete" onClick={() => props.handleDelete(props.item.description)}>❌</button>}
        </li>
        
      </div>
    )
  }