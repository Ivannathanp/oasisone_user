import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faXmark,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faNewspaper } from "@fortawesome/free-regular-svg-icons";
import NumberFormat from "react-number-format";
import Carticon from "../../icons/Cart.svg";
import Recommendicon from "../../icons/Recommend.png";
import "./PromoPage.css";
import { useParams } from "react-router-dom";

function PromoPage() {
  let { tenant_id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const myparam = location.state || {};
  const localUrl = process.env.REACT_APP_PROMOURL;
  const [promoData, setPromoData] = useState([]);
  const [promoRetrieved, setPromoRetrieved] = useState(false);
  // Get Promo Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = localUrl + "/retrieve/" + tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setPromoData([result.data]);
              setPromoRetrieved(() => true);
            } else {
              setPromoRetrieved(() => false);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [promoRetrieved]);

  function handlepassdata(data) {
    history.push({
      pathname: `/${tenant_id}/PromoDetail`,
      state: data,
    });
  }

  function renderHeader() {
    return (
      <div className="header">
        <button className="backbutton" onClick={() => history.push(`/${tenant_id}`)}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#fff", marginTop: "-2%", marginRight: "15%" }}
          />
          <div className="heading">Back</div>
        </button>
      </div>
    );
  }

  const [additemnotif, setAddItemNotif] = useState(false);
  function handlenotification() {
    if (additemnotif) {
      setAddItemNotif(false);
    } else {
      setAddItemNotif(true);
      setTimeout(() => {
        setAddItemNotif(false);
      }, 5000); //wait 5 seconds
    }
  }

  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  const startTime = new Date(myparam.startingPeriod);
  const endTime = new Date(myparam.endingPeriod);
  return (
    <div className="outercontainer">
      <div className="waiterinnercontainer">
        {renderHeader()}
        <div className="promodetailbackgroundcontainer">
          <div className="promodetailbackground">
            <img src={myparam.promoImage} className="promodetailitemPhoto" />

            <div className={additemnotif ? "notification" : "hidden"}>
              <div className="notificationtextcontainer">
                <div className="notificationtext">Item Added to Cart</div>
              </div>

              <div className="notificationclose">
                <button
                  className="notifclosebutton"
                  onClick={handlenotification}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
          </div>

          <div className="promobackgroundoverlay"></div>
        </div>

        <div className="promodetailcontainer">
          <div className="uppercontainer">
            <div className="title">{myparam.name}</div>

            <div className="promodetailincontext">Promo Period</div>

            <div style={{ display: "flex", marginLeft: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="time">Start</div>
                <div className="timedetail">{ startTime.toLocaleDateString("en-ID", dateOptions)}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  marginLeft: "50px",
                  alignItems: "center",
                }}
              >
                <div className="time">End</div>
                <div className="timedetail">{endTime.toLocaleDateString("en-ID", dateOptions)}</div>
              </div>
            </div>

            <div className="promodetailincontext">Promo Detail</div>

            <div className="heading3" style={{marginTop: '2%'}}>{myparam.details}</div>
          </div>

          <div className="lowercontainer">
            {promoRetrieved == true &&
              promoData[0].map((post, index) => {
                if(post.id != myparam.id){
                  return(
<>
                    <div className="heading2">Other Promo</div>
                    <div>&nbsp;</div>

                    <div className="promocontainer">
                      <div className="promoitemdetail">
                        <button
                          onClick={() => handlepassdata(post)}
                          className="promobutton"
                        >
                          <img
                            src={post.promoImage}
                            className="promoitemPhoto"
                          />
                        </button>
                      </div>
                    </div>
                  </>
                  )
                }
              
             
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoPage;
