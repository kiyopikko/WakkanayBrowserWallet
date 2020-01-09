import { useRef } from 'react'
import { initializeClient } from '../store/appStatus'
import { connect } from 'react-redux'

const StartUpModal = props => {
  const privateKeyRef = useRef('')

  return (
    <div className="container">
      <div className="title">Startup Modal</div>
      <div>Type in your private key</div>
      <div>
        <input
          className="address-input"
          placeholder={'0x8fxkho7892dfsh4h2l9bhcn3bb4th3'}
          type="text"
          ref={privateKeyRef}
        ></input>
        <button
          className="create-button"
          onClick={() => {
            props.initializeClient(privateKeyRef.current.value)
          }}
        >
          Create Wallet
        </button>
      </div>
      <style jsx>{`
        .container {
          display: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          background-color: white;
          display: flex;
          flex-direction: column;
          padding: 20px;
        }
        .title {
          font-size: 24px;
          font-wright: 500;
        }
        .address-input {
          width: 300px;
          height: 24px;
          font-size: 14px;
          font-weight: 300;
        }
      `}</style>
    </div>
  )
}

const mapDispatchToProps = {
  initializeClient
}
export default connect(undefined, mapDispatchToProps)(StartUpModal)
