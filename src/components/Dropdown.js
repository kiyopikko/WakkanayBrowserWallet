const Dropdown = ({ buttonName, items, onSelected }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-button">{buttonName}</div>
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
            {item.name}
          </div>
        ))}
      </div>
      <style jsx>{`
        .dropdown:hover .dropdown-content {
          display: block;
        }
      `}</style>
    </div>
  )
}

export default Dropdown
