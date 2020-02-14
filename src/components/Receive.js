import { connect } from 'react-redux'
import { SUBTEXT, BACKGROUND, SECTION_BACKGROUND } from '../colors'
import { SectionTitle } from '../components/SectionTitle'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignInAlt)

import QRCode from 'qrcode.react'

const Receive = props => {
  return (
    <div className="receive-section" id="receive">
      <SectionTitle>Receive Token</SectionTitle>
      <div className="address-box-wrapper">
        <div className="address-title">Your Wakkanay Wallet Address</div>
        <div className="address-box">
          <div className="address">{props.address}</div>
        </div>
      </div>
      <div className="qr-code-box">
        <QRCode
          className="qr-code"
          value={props.address}
          alt="Your QR Code"
          size={120}
          includeMargin={true}
        />
      </div>
      <style jsx>{`
        .receive-section {
          width: calc(100% - 40px);
          height: 160px;
          display: flex;
          flex-direction: column;
          padding: 20px;
          margin: 20px 0px;
          background-color: ${SECTION_BACKGROUND};
          position: relative;
        }
        .address-box-wrapper {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .address-title {
          font-size: 16px;
          font-weight: 800;
          color: ${SUBTEXT};
        }
        .address-box {
          margin-top: 12px;
          height: 32px;
          width: 522px;
          background-color: ${BACKGROUND};
          font-size: 14px;
          font-weight: 800;
          color: ${SUBTEXT};
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 12px;
        }
        .qr-code-box {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  address: state.address
})

export default connect(mapStateToProps, undefined)(Receive)
