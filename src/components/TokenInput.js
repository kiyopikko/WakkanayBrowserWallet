import classnames from 'classnames'
import { BACKGROUND, PLACEHOLDER, SUBTEXT, MAIN } from '../colors'
import { FZ_MEDIUM, FW_BOLD, FZ_SMALL } from '../fonts'
import { useState } from 'react'
import Input from './Base/Input'

export default props => {
  const { className } = props
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')

  return (
    <React.Fragment>
      <div
        className={`${classnames(className, {
          inputWrap: true,
          focused
        })}`}
      >
        <Input
          full
          value={value}
          className="fzh"
          placeholder="0.0"
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => {
            setFocused(false)
          }}
          onChange={e => {
            if (!e.target.value.match(/^[e0-9.+]+$/) && e.target.value) {
              return
            }
            setValue(e.target.value)
          }}
        />
        <div className="input__unit">{props.unit}</div>
        <div className="input__balance">= {props.balance} USD</div>
      </div>
      <style jsx>{`
        .inputWrap {
          position: relative;
          background: ${BACKGROUND};
          border-radius: 1.25rem;
          padding: 0.125rem 0 1.875rem;
          border 1px solid ${focused ? MAIN : 'transparent'}
        }
        .input__unit {
          position: absolute;
          right: 1.5rem;
          top: 1.25rem;
          color: ${PLACEHOLDER};
          font-size: ${FZ_MEDIUM};
          font-weight: ${FW_BOLD};
        }
        .input__balance {
          color: ${SUBTEXT};
          font-size: ${FZ_SMALL};
          position: absolute;
          right: 1.5rem;
          bottom: 0.875rem;
        }
      `}</style>
    </React.Fragment>
  )
}
