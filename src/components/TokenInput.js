import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Input from './Base/Input'
import { BACKGROUND, PLACEHOLDER, SUBTEXT, MAIN } from '../colors'
import { FZ_MEDIUM, FW_BOLD, FZ_SMALL } from '../fonts'

const TokenInput = props => {
  const { balance, className, handleAmount, transferredAmount, unit } = props
  const [focused, setFocused] = useState(false)

  return (
    <Fragment>
      <div
        className={`${classnames(className, {
          inputWrap: true,
          focused
        })}`}
      >
        <Input
          full
          value={transferredAmount}
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
            handleAmount(e.target.value)
          }}
        />
        <div className="input__unit">{unit}</div>
        <div className="input__balance">= {balance} USD</div>
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
    </Fragment>
  )
}

const mapStateToProps = ({ transferState }) => ({
  transferredAmount: transferState.transferredAmount
})
export default connect(mapStateToProps)(TokenInput)
