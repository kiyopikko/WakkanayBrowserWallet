import React from 'react'
import { MAIN } from '../../constants/colors'

export default ({ children, color }) => {
  return (
    <p>
      {children}
      <style jsx>{`
        p {
          margin: 1rem;
          color: ${color || MAIN};
        }
      `}</style>
    </p>
  )
}
