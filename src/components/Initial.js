import { connect } from 'react-redux'
import { checkClientInitialized } from '../store/appStatus'
import React, { useEffect } from 'react'
import StartupModal from './StartupModal'

const Initial = props => {
  useEffect(() => {
    props.checkClientInitialized()
  }, [])

  if (props.appStatus.status === 'unloaded') {
    return <StartupModal />
  } else if (props.appStatus.status === 'loaded') {
    return props.children
  } else if (props.appStatus.status === 'error') {
    return <p>{props.appStatus.error.message}</p>
  } else {
    return <p>loading...</p>
  }
}

const mapStateToProps = state => ({
  appStatus: state.appStatus
})

const mapDispatchToProps = {
  checkClientInitialized
}

export default connect(mapStateToProps, mapDispatchToProps)(Initial)
