import React from 'react'
import { useRouter } from 'next/router'
import ClickOutside from 'react-click-outside'
import { MODAL_BACKGROUND, MODAL_MAIN_BACKGROUND } from '../../colors'

/**
 * General Modal Component for Browser Plasma Wallet
 */
export const BaseModal = props => {
  const router = useRouter()
  return (
    <div className="modal-bg">
      <ClickOutside
        className="modal-main"
        onClickOutside={e => {
          const href = `${router.route}`
          router.push(href)
          if (props.onClickOutside) props.onClickOutside(e)
        }}
      >
        <div className="contents">{props.children}</div>
      </ClickOutside>
      <style jsx>{`
        .modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: ${MODAL_BACKGROUND};
          display: flex;
          justify-content: center;
        }
        .modal-bg > :global(.modal-main) {
          position: fixed;
          top: calc(20% + 10px);
          width: 50%;
          min-width: 520px;
          height: calc(50% - 20px);
          background: ${MODAL_MAIN_BACKGROUND};
          opacity: 1;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: scroll;
        }
        .contents {
          padding: 0px 32px 16px 32px;
        }
      `}</style>
    </div>
  )
}
