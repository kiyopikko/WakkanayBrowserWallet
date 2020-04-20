import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { PAYMENT } from '../routes'

export default () => {
  const router = useRouter()
  router.replace(PAYMENT)
  return <Fragment />
}
