import React from 'react'
import { TEXT_ERROR } from '../../colors'

// TODO: implement alert style
export default props => {
  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
          color: ${TEXT_ERROR};
          padding: 0.5rem;
          margin-bottom: 1rem;
          border-radius: 2px;
        }
      `}</style>
    </div>
  )
}
