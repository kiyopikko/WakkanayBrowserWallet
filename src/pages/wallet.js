import Layout from '../components/Layout'
import { FZ_MEDIUM } from '../fonts'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import Link from 'next/link'

function Wallet({ appRouter }) {
  const router = useRouter()

  const back = () => {
    router.back()
  }

  return (
    <Layout>
      {appRouter.routeHistory.length < 2 ? (
        <Link className="back" href="/payment" passHref>
          <a className="back">← Back</a>
        </Link>
      ) : (
        <a className="back" href="javascript:void(0)" onClick={back}>
          ← Back
        </a>
      )}

      <div>wallet view</div>
      <style jsx>{`
        .back {
          font-size: ${FZ_MEDIUM};
          width: 4rem;
          position: absolute;
          right: 100%;
          top: 1rem;
          text-decoration: none;
        }
        .back:hover {
          text-decoration: underline;
        }
      `}</style>
    </Layout>
  )
}

const mapStateToProps = state => ({
  appRouter: state.appRouter
})
export default connect(mapStateToProps, undefined)(Wallet)
