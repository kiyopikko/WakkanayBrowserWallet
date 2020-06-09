import { useState } from 'react'
import { initializeClient, initializeMetamaskWallet } from '../store/appStatus'
import { connect } from 'react-redux'
import { FZ_MEDIUM } from '../constants/fonts'
import Input from './Base/Input'
import Button from './Base/Button'
import { BORDER, White, PLACEHOLDER } from '../constants/colors'

const StartUpModal = props => {
  const [privateKey, setPrivateKey] = useState('')

  const updatePrivateKey = e => {
    setPrivateKey(e.target.value.trim())
  }

  return (
    <div className="container">
      <img src="/logo-gray.svg" width="82" />
      <p className="sub mtm mbs">
        Create L2 wallet from your mainchain wallet to start gazelle!
      </p>
      <div>
        <Input
          className="mbs"
          full
          placeholder={'0x8fxkho7892dfsh4h2l9bhcn3bb4th3'}
          type="text"
          onChange={updatePrivateKey}
        />
        <Button full onClick={() => props.initializeClient(privateKey)}>
          Create Wallet
        </Button>
        {/* <div className="spacer">
          <div className="spacer__txt">or</div>
        </div>
        <Button full onClick={() => props.initializeMetamaskWallet()}>
          Create Wallet with MetaMask
        </Button> */}
      </div>
      <style jsx>{`
        .container {
          text-align: center;
          font-size: ${FZ_MEDIUM};
        }
        .private-key-input {
          width: 100%;
        }
        .spacer {
          border-top: 1px solid ${BORDER};
          width: 5rem;
          margin: 1.125rem auto 0;
        }
        .spacer__txt {
          color: ${PLACEHOLDER};
          width: 3rem;
          display: block;
          background: ${White()};
          position: relative;
          top: -0.625rem;
          left: 1rem;
        }
      `}</style>
    </div>
  )
}

const mapDispatchToProps = {
  initializeClient,
  initializeMetamaskWallet
}
export default connect(undefined, mapDispatchToProps)(StartUpModal)
