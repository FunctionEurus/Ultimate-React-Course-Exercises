export default function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your parking list.</em>
      </p>
    );
  }

  const numItems = items.reduce((acc, cur) => acc + cur.quantity, 0);
  const packedItem = items.reduce(
    (acc, cur) => (cur.packed ? acc + cur.quantity : acc),
    0
  );
  const percentage = Math.round((packedItem / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go!"
          : `You have ${numItems} items on your list, and you already packed${" "}
          ${packedItem} (${percentage}
          %)`}
      </em>
    </footer>
  );
}
