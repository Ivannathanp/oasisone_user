<div className="outercontainer">
{orderRetrieved && tenantRetrieved ? (
  <div className="innercontainer" style={{ background: color }}>
    {renderHeader()}
    <div className="waiterbackgroundcontainer">
      <div className="backgroundoverlay"></div>
    </div>

    <div className="placedemptycontainer">
      <div className="noneorder">
        <div style={{ width: "374px" }}>
          <div className="ordertitle">Current Order</div>
        </div>
        <div className="note">
          <div className="ordernone">
            Looks like you don’t have any Current Order status
          </div>
        </div>
      </div>
      <div className="noneorder">
        <div style={{ width: "374px" }}>
          <div className="ordertitle">Completed Order</div>
        </div>

        <div className="note">
          <div className="ordernone">
            Looks like you don’t have any Completed Order status
          </div>
        </div>
      </div>
    </div>
  </div>
) : (
  <div
    style={{
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    }}
  >
    {" "}
    <ThreeDots color={color} height={80} width={80} />
  </div>
)}
</div>