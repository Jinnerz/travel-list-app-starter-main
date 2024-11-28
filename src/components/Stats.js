export default function Stats(props) {
    return (
      <footer className="stats">
        <em>{ props.handleStats() / props.length !== 1 ? `You have ${props.length} items in the list. You already packed ${props.handleStats()} (${ props.length > 0 ? Math.round(props.handleStats() / props.length * 100) : 0}%).` : 'You got everything!'}</em>
      </footer>
    );
};