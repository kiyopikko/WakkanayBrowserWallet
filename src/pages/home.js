import Layout from '../components/Layout'
export default function Home() {
  return (
    <Layout>
      <div className="display-box">
        <p>this is a function display box</p>
      </div>

      <style jsx>{`
        .display-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 558px;
          height: 300px;
          border: solid 2px lightgray;
          margin: 20px;
        }
        .transaction-history {
          margin: 20px;
        }

        .transaction-hisotry-title {
          font-size: 24px;
          font-weight: 700;
        }
        .transaction-date {
          margin-top: 8px;
        }

        .transaction {
          list-style-type: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .amount,
        .time {
          margin-right: 8px;
        }
        .amount-unit {
          margin-right: 40px;
        }
        .ampm {
          margin-right: 16px;
        }
        .caret-down {
          font-size: 16px;
        }
      `}</style>
    </Layout>
  )
}
