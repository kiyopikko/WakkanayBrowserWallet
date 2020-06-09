import { SMALL, MEDIUM } from '../constants/fonts'
import { TokenSelectButton } from './TokenSelectButton'
import { TOKEN_LIST } from '../constants/tokens'
import Dropdown from './Dropdown'

/**
 * Token selector form item
 * @param {*} props
 */
export const TokenSelector = props => {
  return (
    <div>
      <div className="token-select-box-wrapper">
        <Dropdown
          onselect={selectedTokenContractAddress => {
            props.onSelected(selectedTokenContractAddress)
          }}
          width="100%"
          topButtonName={item => (
            <TokenSelectButton item={item} padding="0.5rem 0.5rem" />
          )}
          items={props.items || TOKEN_LIST}
          renderItem={item => (
            <TokenSelectButton item={item} padding="0.5rem 0.5rem" />
          )}
          selectedItem={props.selectedToken}
        />
      </div>

      <style jsx>{`
        .token-select-box-wrapper {
          ${props.width ? `width: ${props.width}px;` : ''}
        }
        .token-select-box-wrapper :global(.dropdown-button) {
          font-size: ${SMALL};
          font-weight: 400;
        }
        .token-select-box-wrapper :global(.dropdown-caret) {
          font-size: ${MEDIUM};
        }
      `}</style>
    </div>
  )
}
