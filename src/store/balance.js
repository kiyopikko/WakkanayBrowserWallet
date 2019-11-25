export const setBalance = balance => ({
  type: 'SET_BALANCE',
  payload: balance
})

// Reducer

export function balanceReducer(
  state = [
    {
      tokenAddress: '0x0000000000000000000000000000000000000000',
      tokenName: 'eth',
      amount: 1.2
    },
    {
      tokenAddress: '0x0000000000000000000000000000000000000001',
      tokenName: 'dai',
      amount: 204
    }
  ],
  action
) {
  switch (action.type) {
    case 'SET_BALANCE':
      return action.payload
    default:
      return state
  }
}
