// Lightweight CSS 3D illustration for browsers without WebGL.
export default function WorkshopFallback() {
  return (
    <div
      className="css-workshop"
      role="img"
      aria-label="Isometric digital workshop: a screen with an orange connected core and floating interface panels"
    >
      <div className="css-machine">
        <div className="css-monitor">
          <div className="css-screen">
            <div className="css-core">
              <i />
              <i />
              <i />
            </div>
            <span>AP / SYSTEM ONLINE</span>
          </div>
          <div className="css-bezel">ANURAG PATIAL — DIGITAL WORKSHOP</div>
        </div>
        <div className="css-base">
          <div className="css-keyboard" />
          <div className="css-trackpad" />
        </div>
        <div className="css-panel panel-one">
          <b>01 / INTERFACE</b>
          <i />
          <i />
          <i />
        </div>
        <div className="css-panel panel-two">
          <b>02 / CONNECT</b>
          <div>
            <span />—<span />—<span />
          </div>
          <small>WEBSITE → WORKFLOW</small>
        </div>
      </div>
      <span className="fallback-label">CSS 3D / COMPATIBILITY VIEW</span>
    </div>
  );
}
