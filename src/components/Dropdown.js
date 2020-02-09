const Dropdown = ({ buttonName, items, onSelected, renderItem }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-button">
        <div className="button-name">{buttonName}</div>
      </div>
      <div className="dropdown-content">
        {items.map(item => (
          <div
            key={item.name}
            className="dropdown-item"
            onClick={e => {
              e.preventDefault()
              onSelected(item.value)
            }}
          >
            {renderItem ? renderItem(item) : item.name}
          </div>
        ))}
      </div>
      <style jsx>{`
        .dropdown:hover .dropdown-content {
          display: block;
        }
        .dropdown-button {
          background-image: url('/chevron-down.svg');
          background-repeat: no-repeat;
          background-position: calc(100% - 0.7rem) 50%;
        }
      `}</style>
    </div>
  )
}

export default Dropdown
