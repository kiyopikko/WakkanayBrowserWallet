import { White } from '../../constants/colors'

export default ({ children }) => {
  return (
    <div className="box">
      {children}
      <style jsx>{`
        .box {
          position: relative;
          padding: 1.75rem;
          background: ${White()};
          box-shadow: 0px 2px 54px rgba(123, 116, 168, 0.1);
          border-radius: 1.875rem;
        }
        .box + .box {
          margin-top: 1.25rem;
        }
      `}</style>
    </div>
  )
}
