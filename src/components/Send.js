import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignOutAlt)

//redux
import {
  setTransferredToken,
  setTransferredAmount,
  setRecepientAddress
} from '../store/transfer'

//internal import
import { roundBalance } from '../utils'
import { SectionTitle } from '../components/SectionTitle'
import { TokenSelector } from './TokenSelector'
import { SECTION_BACKGROUND } from '../colors'
import { TOKEN_LIST } from '../tokens'
import TokenInput from './TokenInput'
import AddressInput from './AddressInput'
import Button from './Base/Button'

const Send = props => {
  const recepientAddressRef = useRef('')
  const [tokenAmount, setTokenAmount] = useState(0)

  const transferredTokenObj = TOKEN_LIST.find(
    ({ depositContractAddress }) =>
      depositContractAddress.toLowerCase() ===
      props.transferredToken.toLowerCase()
  )

  const tokensWithCurrentAmount = TOKEN_LIST.map(token => ({
    ...token,
    amount: 123.45
  }))

  return (
    <div className="send-section" id="send">
      <SectionTitle>Send Token</SectionTitle>
      <TokenSelector
        items={tokensWithCurrentAmount}
        onSelected={selectedTokenContractAddress =>
          props.setTransferredToken(selectedTokenContractAddress)
        }
        selectedToken={transferredTokenObj}
      />

      <TokenInput
        className="mts mbs"
        unit={transferredTokenObj.unit}
        balance={roundBalance(props.ETHtoUSD, tokenAmount)}
        onChange={e => {
          setTokenAmount(e.target.value)
        }}
      />
      <AddressInput className="mbs" type="text" onChange={() => {}} />
      <Button
        full
        onClick={e => {
          props.setTransferredAmount(tokenAmount)
          props.setRecepientAddress(recepientAddressRef.current.value)
          // const href = `${router.route}?transfer`
          // router.push(href, href, { shallow: true })
        }}
        disabled
      >
        Send
      </Button>

      <style jsx>{`
        .send-section {
          display: flex;
          flex-direction: column;
          margin: 20px 0px;
          background-color: ${SECTION_BACKGROUND};
          position: relative;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  address: state.address,
  tokenBalanceList: state.tokenBalance.tokenBalance,
  ETHtoUSD: state.tokenBalance.ETHtoUSD,
  transferredToken: state.transferState.transferredToken,
  transferredAmount: state.transferState.transferredAmount,
  recepientAddress: state.transferState.recepientAddress
})

const mapDispatchToProps = {
  setTransferredToken,
  setTransferredAmount,
  setRecepientAddress
}
export default connect(mapStateToProps, mapDispatchToProps)(Send)
