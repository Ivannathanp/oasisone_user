import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

const getItems = () =>
  Array()
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

    const SECTIONS = [
      {
        title: "Menu",
        data: [
          {
            key: "1",
            text: "Gurame",
          },
          {
            key: "2",
            text: "Kerapu",
          },
          {
            key: "3",
            text: "Udang",
          },
          {
            key: "4",
            text: "Cumi",
          },
          {
            key: "5",
            text: "Sayur",
          },
          {
            key: "6",
            text: "Minum",
          },
        ],
      },
    ];

function App() {
  const [items, setItems] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);

  const handleClick = (id) => () => setSelected(id);

  return (
        <ScrollMenu
    
        >
          {items.map(({ id }) => (
            <Card
              itemId={id}
              title={id}
              key={id}
              onClick={handleClick(id)}
              selected={id == selected}
            />)
          )}

        </ScrollMenu>
  );
}

function Card({
  onClick,
  selected,
  title,
  itemId
}) {
  const visibility = React.useContext(VisibilityContext)

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: "160px",
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
        <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          height: "200px",
        }}
      />
    </div>
  );
}

export default App;