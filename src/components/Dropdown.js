const Dropdown = ({ buttonName, items, onSelected }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-button">{buttonName} ▽</div>
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
            <a>{item.name}</a>
          </div>
        ))}
      </div>
      <style jsx>{`
        .dropdown {
          position: relative;
          width: 150px;
          height: 100%;
        }

        .dropdown-button {
          font-size: 15px;
          font-weight: 680;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
          color: #693997;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }
        .dropdown:hover .dropdown-button {
          background-color: #b1c6f7;
        }

        .dropdown-content {
          display: none;
          positin: absolute;
          width: inherit;
          background-color: #c0d3ff;
          opacity: 90%;
          border: solid 2px lightgray;
        }
        .dropdown-item:hover {
          background-color: #b1c6f7;
          color: #007bff;
        }

        .dropdown-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
          color: #693997;
        }

        .dropdown-item a {
          padding: 12px;
          font-size: 15px;
          font-weight: 680;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

export default Dropdown
