import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import NumberFormat from "react-number-format";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Homeicon from "../../icons/Menu1.png";
import Orderplacedicon from "../../icons/OrderPlaced.png";
import "./OrderPlacedPage.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function OrderPlacedPage() {
  const history = useHistory();
  const location = useLocation();
  let { tenant_id } = useParams();
  const myparam = location.state || {};
  console.log(myparam);

  function renderHeader() {
    return (
      <div className="cartheader" >
        <button
          className="backbutton"
          onClick={() => history.push(`/${tenant_id}`)}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#fff", marginTop: "-2%", marginRight: "15%" }}
          />
          <div className="heading">Back</div>
        </button>
      </div>
    );
  }

  function renderButton() {
    return (
      <div className="orderstatuscontainer">
        <div
          className="orderstatusbutton"
          onClick={()=>history.push(`/${tenant_id}/Order`)}
        >
          <img
            src={Homeicon}
            style={{
              width: 27,
              height: 19,
              fontSize: 24,
              marginTop: "-1%",
              marginRight: "2%",
              color: "#fff",
            }}
          />
          <div className="orderbuttontext">Check Order Status</div>
        </div>
      </div>
    );
  }

  return (
    <div className="outercontainer">
      <div className="cartinnercontainer">
        {renderHeader()}
        <div className="waiterbackgroundcontainer">
          <div className="backgroundoverlay"></div>
        </div>

        <div className="emptycartcontainer">
          <div className="centered">
          <CheckCircleOutlineIcon className="checkedicon" />

            <div className="orderlabel">Order Placed Successfully.</div>
            <div className="center">
              <div className="orderlabel">Your Order No is:</div>
              <div className="ordernumber">{myparam.order_id}</div>
            </div>
          </div>
          {renderButton()}
        </div>
      </div>
    </div>
  );
}

export default OrderPlacedPage;
