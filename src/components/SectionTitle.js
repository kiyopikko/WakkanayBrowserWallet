import { BOLD, LARGE } from '../fonts'

export const SectionTitle = props => {
  return (
    <div className="section-title">
      {props.children}
      <style jsx>{`
        font-weight: ${BOLD};
        font-size: ${LARGE};
      `}</style>
    </div>
  )
}
