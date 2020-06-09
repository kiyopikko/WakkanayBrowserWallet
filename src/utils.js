export const shortenAddress = address => {
  if (!address) return ''
  const former = address.slice(0, 6)
  const latter = address.slice(address.length - 4, address.length)
  return `${former}...${latter}`
}

/**
 * round off the number
 * e.g. the second place after the decimal point: base = 100
 */
export const roundBalance = (value, base = 100) => {
  return Math.round(value * base) / base
}
