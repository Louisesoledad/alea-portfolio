import logo from "../assets/logo.png"
import "./LoadingScreen.css"

function LoadingScreen({ isLeaving }) {
  return (
    <div
      className={`loading-screen${isLeaving ? " loading-screen--leaving" : ""}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loading-screen__gradient" aria-hidden="true" />
      <div className="loading-screen__scatter" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="loading-screen__shade" aria-hidden="true" />

      <div className="loading-screen__logo" aria-hidden="true">
        <img className="loading-screen__logo-base" src={logo} alt="" />
        <img className="loading-screen__logo-fill" src={logo} alt="" />
      </div>
    </div>
  )
}

export default LoadingScreen
