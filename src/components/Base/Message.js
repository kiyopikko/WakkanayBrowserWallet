import React from 'react'
import { MAIN } from '../../constants/colors'

const Message = ({ children, color }) => {
  return (
    <p>
      {children}
      <style jsx>{`
        p {
          margin: 1rem;
          color: ${color};
        }
      `}</style>
    </p>
  )
}
Message.defaultProps = {
  color: MAIN
}

export default Message
