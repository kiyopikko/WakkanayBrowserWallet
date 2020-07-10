import React from 'react'

export default props => {
  return (
    <p>
      {props.children}
      <style jsx>{`
        p {
          margin: 1rem;
          color: ${props.color};
        }
      `}</style>
    </p>
  )
}
