export const shortenAddress = address => {
  if (!address) return ''
  const former = address.slice(0, 6)
  const latter = address.slice(address.length - 4, address.length)
  return `${former}...${latter}`
}

export const roundBalance = (rate, tokenAmount) => {
  return Math.round(rate * tokenAmount * 100) / 100
}
