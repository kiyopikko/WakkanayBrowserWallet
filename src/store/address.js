export const setAddress = address => ({
  type: 'SET_ADDRESS',
  payload: {
    address: address
  }
})

export function addressReducer(
  state = '0x0000000000000000000000000000000000000000',
  action
) {
  switch (action.type) {
    case 'SET_ADDRESS':
      return { address: action.payload.address }
    default:
      return state
  }
}
