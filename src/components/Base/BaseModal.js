import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import ClickOutside from 'react-click-outside'
import { SectionTitle } from '../SectionTitle'
import { MODAL_BACKGROUND, MODAL_MAIN_BACKGROUND, TEXT } from '../../colors'

/**
 * General Modal Component for Browser Plasma Wallet
 */
export class BaseModal extends React.Component {
  static propTypes = {
    /**
     * The title of modal
     */
    title: PropTypes.string,
    /**
     * called when modal closed
     */
    onClose: PropTypes.func,
    /**
     * React element for modal content
     */
    render: PropTypes.func
  }
  static defaultProps = {
    title: 'Default Title',
    onClose: () => {},
    render: () => <div />
  }

  close() {
    const { onClose } = this.props
    Router.push(Router.route)
    if (onClose) onClose()
  }

  render() {
    const props = this.props
    return (
      <div className="modal-bg">
        <ClickOutside
          className="modal-main"
          onClickOutside={e => {
            this.close()
          }}
        >
          <div className="contents">
            <div className="modal-wrapper">
              <div className="modal-page-title">
                <SectionTitle>{props.title}</SectionTitle>
              </div>
              <div className="modal-body">{props.render(this)}</div>
            </div>
          </div>
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
          .modal-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .modal-page-title {
            color: ${TEXT};
            margin: 60px 40px 0px 40px;
            margin-right: 40px;
          }
          .modal-body {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
        `}</style>
      </div>
    )
  }
}
