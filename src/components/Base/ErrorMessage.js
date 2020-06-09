import React from 'react'
import { TEXT_ERROR } from '../../constants/colors'

export default props => {
  return (
    <p>
      {props.children}
      <style jsx>{`
        p {
          margin: 1rem;
          color: ${TEXT_ERROR};
        }
      `}</style>
    </p>
  )
}
