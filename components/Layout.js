const Layout = (props) => {
  return (
    <div>
      {props.children}
      <style>{`
      *,
      *:after,
      *:before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }
      body {
        box-sizing: border-box;
        font-family: 'Avenir Next';
      }
      `}</style>
    </div>
  )
}

export default Layout;