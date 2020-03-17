export const TokenSelectButton = props => {
  return props.item ? (
    <div className="item-name-inner">
      <div className="token-img-bg">
        <img
          className="token-img"
          src={props.item.imgSrc}
          alt="token logo"
        ></img>
      </div>
      <div className="token-name">{props.item.unit}</div>
      <style jsx>{`
        .item-name-inner {
          width: 100%;
          padding: ${props.padding};
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .token-img-bg {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 4px;
        }
        .token-img {
          height: 22px;
        }
        .token-name {
          margin-left: 8px;
        }
      `}</style>
    </div>
  ) : null
}
