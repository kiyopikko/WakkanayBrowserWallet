import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Input from './Base/Input'
import DropdownContent from './DropdownContent'
import { SelectItem } from './SelectItem'
import { BACKGROUND, MAIN } from '../constants/colors'
import { shortenAddress } from '../utils'

const AddressInput = props => {
  const { className, handleAddress, img, recepientAddress } = props
  const [focused, setFocused] = useState(false)
  const dummyItems = [
    {
      img: 'https://ca.slack-edge.com/T9AFDRDSL-UEBGF5FRV-d960cb3bb255-512',
      address: '0x81D5F852994b4235904F9AfA038f0647Ad269215',
      name: 'yuriko.eth'
    },
    {
      img: 'https://ca.slack-edge.com/T9AFDRDSL-UFLHZNZ0T-a1da6360c745-512',
      address: '0x532G3sd3234b4235904F9AfA038f0647Ad269215',
      name: 'takamichi.eth'
    },
    {
      img: 'https://ca.slack-edge.com/T9AFDRDSL-UAS5UUQJJ-95a9026f8190-512',
      address: '0x124G3sd3234b4235904F9AfA038f0647Ad269215',
      name: 'syuhei.eth'
    }
  ]

  const filteredItems = dummyItems.filter(item => {
    const regexp = new RegExp(`^${recepientAddress}`)
    return item.address.match(regexp) && item.address !== recepientAddress
  })

  const matchedAddress = dummyItems.filter(
    item => item.address === recepientAddress
  )[0]
  const currentImg = matchedAddress ? matchedAddress.img : '/icon-user.svg'

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
          value={recepientAddress}
          placeholder="0x0000000000000000000000000000000000000000"
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => {
            setTimeout(() => {
              setFocused(false)
            }, 200)
          }}
          onChange={e => {
            handleAddress(e.target.value)
          }}
        />
        <img src={currentImg} width={32} className="input__img" />
        {/* {focused && !!filteredItems.length && (
          <DropdownContent
            items={filteredItems}
            renderItem={item => (
              <SelectItem
                img={item.img}
                name={shortenAddress(item.address)}
                supplement={item.name}
                padding="0.5rem 0.5rem"
              />
            )}
            onSelect={item => {
              setValue(item.address)
            }}
          />
        )} */}
      </div>
      <style jsx>{`
        .inputWrap {
          position: relative;
          background: ${BACKGROUND};
          border-radius: 1.875rem;
          padding-left: 1.75rem;
          border 1px solid ${focused ? MAIN : 'transparent'}
        }
        .input__img {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          border-radius: 50%;
        }
      `}</style>
    </Fragment>
  )
}

const mapStateToProps = ({ transferState }) => ({
  recepientAddress: transferState.recepientAddress
})
export default connect(mapStateToProps)(AddressInput)
