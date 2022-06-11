import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./TransactionPage.css";
import cashier from "../../icons/OfflinePayment.svg";
import cashieractive from "../../icons/OfflinePaymentActive.svg";
import online from "../../icons/OnlinePayment.svg";
import onlineactive from "../../icons/OnlinePaymentActive.svg";
import { TextField } from "./paymentform/FormLib";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronUp,
  faMobileScreen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Paymenticon from "../../icons/OrderPlaced.png";
import Ovo from "../../icons/Ovo.png";
import Dana from "../../icons/Dana.png";
import Shopee from "../../icons/Shopee.png";
import { SocketContext } from "../../socketContext";
import { ThreeDots } from "react-loader-spinner";

function TransactionPage() {
  const history = useHistory();
  const location = useLocation();
  let { tenant_id } = useParams();
  const myparam = location.state || {};
  const localUrl = process.env.REACT_APP_ORDERURL;
  const tenantUrl = process.env.REACT_APP_TENANTURL;
  const [orderData, setOrderData] = useState([]);
  const [orderRetrieved, setOrderRetrieved] = useState(false);
  const [color, setColor] = useState();
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);

  // Get Order Data
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
              setOrderData([result.data]);
              setOrderRetrieved(() => true);
            } else {
              setOrderRetrieved(() => false);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [orderRetrieved]);

  // Get Tenant Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = tenantUrl + "/user/" + tenant_id;
        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setTenantData([result.data]);
              setTenantRetrieved(() => true);
            } else {
              setTenantRetrieved(() => false);
            }
          });
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenantRetrieved]);

  // socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("add order", (data) => handleOrderAdded(data));
      socket.on("update order", (data) => handleOrderUpdated(data));
    }
    if (tenantData[0] != undefined) {
      setColor(tenantData[0].profileColor);
    }
  });

  function handleOrderAdded(user) {
    if (orderRetrieved) {
      let newData = orderData.splice();

      newData.push(user);
      setOrderData(newData);
    }
  }

  function handleOrderUpdated(user) {
    if (orderRetrieved) {
      let newData = orderData.splice();

      newData.push(user);
      setOrderData(newData);
    }
  }

  const [paymentmethod, setPaymentMethod] = useState(true);
  function handlepaymentmethod() {
    if (paymentmethod) {
      setPaymentMethod(false);
    } else {
      setPaymentMethod(true);
    }
  }

  const [ovodropdown, setovoDropDown] = useState(false);
  const [ovonumber, setovoNumber] = useState();
  function handleovodropdown() {
    if (ovodropdown) {
      setovoDropDown(false);
    } else {
      setovoDropDown(true);
      setdanaDropDown(false);
      setshopeeDropDown(false);
    }
  }

  const [danadropdown, setdanaDropDown] = useState(false);
  const [dananumber, setdananumber] = useState();
  function handledanadropdown() {
    if (danadropdown) {
      setdanaDropDown(false);
    } else {
      setdanaDropDown(true);
      setovoDropDown(false);
      setshopeeDropDown(false);
    }
  }

  const [shopeedropdown, setshopeeDropDown] = useState(false);
  const [shopeenumber, setshopeenumber] = useState();
  function handleshopeedropdown() {
    if (shopeedropdown) {
      setshopeeDropDown(false);
    } else {
      setshopeeDropDown(true);
      setdanaDropDown(false);
      setovoDropDown(false);
    }
  }

  const [billnotif, setBillNotif] = useState(false);
  function handlenotification() {
    if (billnotif) {
      setBillNotif(false);
    } else {
      setBillNotif(true);
      setTimeout(() => {
        setBillNotif(false);
      }, 5000); //wait 5 seconds
    }
  }

  const [acceptance, setAcceptance] = useState([]);
  const [callforbill, setCallForBill] = useState(false);

  async function handlecallforbill(i, v, j) {
    setCallForBill(true);
    handlenotification();

    orderRetrieved == true &&
      orderData.map((item) => {
        return item.map((post, index) => {
          if (post.order_id == i) {
            post.order_status = v + 1;

            const url = localUrl + "/edit/" + tenant_id + "/" + i;
            fetch(url, {
              method: "POST",
              body: JSON.stringify({
                order_status: post.order_status,
                order_table: j,
              }),
              headers: { "content-type": "application/JSON" },
            })
              .then((response) => response.json())
              .then((result) => {
                if (result.status === "SUCCESS") {
                  socket.emit("update order", result.data);
                }
              });
          }
          setAcceptance(post);
        });
      });
  }

  const [paymentsuccess, setPaymentSuccess] = useState(false);

  function renderHeader() {
    return (
      <div className="cartheader" style={{ background: color }}>
        <button className="backbutton" onClick={() => history.goBack()}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#fff", marginTop: "-2%", marginRight: "15%" }}
          />
          <div className="heading">Payment</div>
        </button>
      </div>
    );
  }

  return (
    <div className="outercontainer">
      {tenantRetrieved ? (
        <div className="innercontainer">
          {renderHeader()}
          <div className="waiterbackgroundcontainer">
            <div className="backgroundoverlay"></div>
          </div>

          {orderRetrieved == true &&
            orderData.map((item) => {
              return item.map((post, index) => {
                if (post.order_id === myparam.order_id) {
                  if (post.order_status > 4) {
                    return (
                      <div className="emptycontainer">
                        <div className="centered">
                          <CheckCircleOutlineIcon className="checkedicon" />

                          <div className="paymentlabel">
                            Payment Successfully.
                          </div>

                          <button
                          style={{background:color}}
                            className="homepagebutton"
                            onClick={() => history.push(`/${tenant_id}`)}
                          >
                            <div className="homepagebuttontext">
                              Back to Homepage
                            </div>
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="restaurantcontainer">
                        <div className="paymentinnercontainer">
                          <div style={{ width: "374px", marginTop: "3%" }}>
                            <div className="ordertitle">Payment Method</div>
                          </div>

                          <div
                          style={{background:color}}
                            className={
                              billnotif ? "billnotification" : "hidden"
                            }
                          >
                            <div className="notificationtextcontainer">
                              <div className="notificationtext">
                                Generating Bill...
                              </div>
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

                          <div style={{ width: "374px" }}>
                            <div className="paymentbuttoncontainer">
                              <div
                                style={
                                  paymentmethod ? { borderColor: color } : null
                                }
                                className={
                                  paymentmethod ? "cashieractive" : "cashier"
                                }
                              >
                                <button
                                  className="cashierbutton"
                                  onClick={() => handlepaymentmethod()}
                                  // disabled={

                                  //      post.order_status > 3
                                  //       ? true
                                  //       : false

                                  // }
                                >
                                  <img
                                    src={
                                      paymentmethod ? cashieractive : cashier
                                    }
                                    style={{ flex: 1, width: 41, height: 43 }}
                                  />
                                  <div
                                    className={
                                      paymentmethod ? "active" : "deactive"
                                    }
                                  >
                                    Pay at Cashier
                                  </div>
                                </button>
                              </div>

                              <div
                                style={
                                  paymentmethod ? null : { borderColor: color }
                                }
                                className={
                                  paymentmethod ? "online" : "onlineactive"
                                }
                              >
                                <button
                                  className="onlinebutton"
                                  onClick={() => handlepaymentmethod()}
                                  // disabled={
                                  //   post.order_status > 3
                                  //       ? true
                                  //       : false

                                  // }
                                >
                                  <img
                                    src={paymentmethod ? online : onlineactive}
                                    style={{ flex: 1, width: 41, height: 49 }}
                                  />
                                  <div
                                    className={
                                      paymentmethod ? "deactive" : "active"
                                    }
                                  >
                                    Online Payment
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="completepaymentmethod">
                          <div style={{ width: "374px", marginTop: "3%" }}>
                            <div className="ordertitle">
                              Complete the Payment
                            </div>
                          </div>

                          {paymentmethod ? (
                            <div>
                              <div className="textfullbox">
                                <div className="textinnerbox">
                                  <div>
                                    Payment at cashier we accept payments via{" "}
                                    <span style={{ fontWeight: 700 }}>
                                      {" "}
                                      cash
                                    </span>{" "}
                                    or by{" "}
                                    <span style={{ fontWeight: 700 }}>
                                      {" "}
                                      card
                                    </span>{" "}
                                    ( Debit or Credit card ).
                                  </div>
                                  <div className="cashiertext">
                                    To make a payment, press the button below to
                                    ask our staff for a bill, after this you
                                    will only be able to make payments at the
                                    cashier
                                  </div>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "5%",
                                  }}
                                >
                                  <button
                                    style={
                                      post.order_status > 3
                                        ? { borderColor: color }
                                        : { background: color }
                                    }
                                    className={
                                      post.order_status > 3
                                        ? "cashierpaymentbuttonactive"
                                        : "cashierpaymentbutton"
                                    }
                                    onClick={() =>
                                      handlecallforbill(
                                        myparam.order_id,
                                        myparam.order_status,
                                        myparam.order_table
                                      )
                                    }
                                    disabled={
                                      post.order_status > 3 ? true : false
                                    }
                                  >
                                    <div
                                      style={
                                        post.order_status > 3
                                          ? { color: color }
                                          : { background: color }
                                      }
                                      className={
                                        post.order_status > 3
                                          ? "billsbuttontextactive"
                                          : "billsbuttontext"
                                      }
                                    >
                                      {post.order_status > 3
                                        ? "Waiting for Bills"
                                        : "Call for Bill"}
                                      {post.order_status == 4 ? (
                                        <ThreeDots
                                          color={color}
                                          height={20}
                                          width={35}
                                        />
                                      ) : null}
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Formik
                                initialValues={{
                                  ovophonenumber: "",
                                  danaphonenumber: "",
                                  shopeephonenumber: "",
                                }}
                                validationSchema={Yup.object().shape({
                                  ovophonenumber: Yup.string()
                                    .required("Required")
                                    .matches(
                                      /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
                                      "Please enter a valid number."
                                    ),
                                  danaphonenumber: Yup.string()
                                    .required("Required")
                                    .matches(
                                      /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
                                      "Please enter a valid number."
                                    ),
                                  shopeephonenumber: Yup.string()
                                    .required("Required")
                                    .matches(
                                      /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
                                      "Please enter a valid number."
                                    ),
                                })}
                                onSubmit={(
                                  values,
                                  { setSubmitting, setFieldError }
                                ) => {}}
                              >
                                {({ errors, touched, isSubmitting }) => (
                                  <Form>
                                    <div
                                      style={
                                        ovodropdown
                                          ? { borderColor: color }
                                          : null
                                      }
                                      className={
                                        ovodropdown ? "fullbox" : "minibox"
                                      }
                                    >
                                      <div className="innerbox">
                                        <div className="boxrow">
                                          <button
                                            className="downiconcontainer"
                                            onClick={() => handleovodropdown()}
                                          >
                                            <div style={{ width: "60px" }}>
                                              <img
                                                src={Ovo}
                                                style={{
                                                  width: "44px",
                                                  height: "20px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            </div>
                                            <div className="paymenttext">
                                              Ovo
                                            </div>

                                            <FontAwesomeIcon
                                              style={{ color: color }}
                                              icon={
                                                ovodropdown
                                                  ? faChevronUp
                                                  : faChevronDown
                                              }
                                              className="downicon"
                                            />
                                          </button>
                                        </div>

                                        {ovodropdown ? (
                                          <>
                                            <div className="boxparagraphcontainer">
                                              <div className="boxparagraph">
                                                Please enter the phone number
                                                registered in Ovo. Billing will
                                                be sent to the phone number you
                                                entered.
                                              </div>
                                            </div>

                                            <div className="boxrow2">
                                              <FontAwesomeIcon
                                                icon={faMobileScreen}
                                                className="phoneicon"
                                              />

                                              <TextField
                                                name="ovophonenumber"
                                                type="text"
                                                value={ovonumber}
                                                // onChange={(e) =>
                                                //   setovoNumber(e.target.value)
                                                // }
                                                placeholder="Phone Number"
                                              />
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "100%",
                                                padding: "0px 20px 0px 15px",
                                                boxSizing: "border-box",
                                              }}
                                            >
                                              <button
                                                style={{ background: color }}
                                                className="paybutton"
                                                onClick={() =>
                                                  setPaymentSuccess(true)
                                                }
                                              >
                                                <div className="buttonpaytext">
                                                  Pay&nbsp;{" "}
                                                  <NumberFormat
                                                    value={
                                                      myparam.order_total +
                                                      myparam.order_taxcharge +
                                                      myparam.order_servicecharge
                                                    }
                                                    prefix="Rp. "
                                                    decimalSeparator="."
                                                    thousandSeparator=","
                                                    displayType="text"
                                                  />
                                                </div>
                                              </button>
                                            </div>
                                          </>
                                        ) : null}
                                      </div>
                                    </div>

                                    <div
                                      style={
                                        danadropdown
                                          ? { borderColor: color }
                                          : null
                                      }
                                      className={
                                        danadropdown ? "fullbox" : "minibox"
                                      }
                                    >
                                      <div className="innerbox">
                                        <div className="boxrow">
                                          <button
                                            className="downiconcontainer"
                                            onClick={() => handledanadropdown()}
                                          >
                                            <div style={{ width: "60px" }}>
                                              <img
                                                src={Dana}
                                                style={{
                                                  width: "49px",
                                                  height: "20px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            </div>
                                            <div className="paymenttext">
                                              Dana
                                            </div>

                                            <FontAwesomeIcon
                                              style={{ color: color }}
                                              icon={
                                                danadropdown
                                                  ? faChevronUp
                                                  : faChevronDown
                                              }
                                              className="downicon"
                                            />
                                          </button>
                                        </div>

                                        {danadropdown ? (
                                          <>
                                            <div className="boxparagraphcontainer">
                                              <div className="boxparagraph">
                                                Please enter the phone number
                                                registered in Dana. Billing will
                                                be sent to the phone number you
                                                entered.
                                              </div>
                                            </div>

                                            <div className="boxrow2">
                                              <FontAwesomeIcon
                                                icon={faMobileScreen}
                                                className="phoneicon"
                                              />

                                              <TextField
                                                name="danaphonenumber"
                                                type="text"
                                                value={dananumber}
                                                // onChange={(e) =>
                                                //   setdananumber(e.target.value)
                                                // }
                                                placeholder="Phone Number"
                                              />
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "100%",
                                                padding: "0px 20px 0px 15px",
                                                boxSizing: "border-box",
                                              }}
                                            >
                                              <button
                                                style={{ background: color }}
                                                className="paybutton"
                                                onClick={() =>
                                                  setPaymentSuccess(true)
                                                }
                                              >
                                                <div className="buttonpaytext">
                                                  Pay&nbsp;{" "}
                                                  <NumberFormat
                                                    value={
                                                      myparam.order_total +
                                                      myparam.order_taxcharge +
                                                      myparam.order_servicecharge
                                                    }
                                                    prefix="Rp. "
                                                    decimalSeparator="."
                                                    thousandSeparator=","
                                                    displayType="text"
                                                  />
                                                </div>
                                              </button>
                                            </div>
                                          </>
                                        ) : null}
                                      </div>
                                    </div>

                                    <div
                                      style={
                                        shopeedropdown
                                          ? { borderColor: color }
                                          : null
                                      }
                                      className={
                                        shopeedropdown ? "fullbox" : "minibox"
                                      }
                                    >
                                      <div className="innerbox">
                                        <div className="boxrow">
                                          <button
                                            className="downiconcontainer"
                                            onClick={() =>
                                              handleshopeedropdown()
                                            }
                                          >
                                            <div style={{ width: "60px" }}>
                                              <img
                                                src={Shopee}
                                                style={{
                                                  width: "55px",
                                                  height: "20px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            </div>

                                            <div className="paymenttext">
                                              Shopee
                                            </div>

                                            <FontAwesomeIcon
                                              style={{ color: color }}
                                              icon={
                                                shopeedropdown
                                                  ? faChevronUp
                                                  : faChevronDown
                                              }
                                              className="downicon"
                                            />
                                          </button>
                                        </div>

                                        {shopeedropdown ? (
                                          <>
                                            <div className="boxparagraphcontainer">
                                              <div className="boxparagraph">
                                                Please enter the phone number
                                                registered in Shopee. Billing
                                                will be sent to the phone number
                                                you entered.
                                              </div>
                                            </div>

                                            <div className="boxrow2">
                                              <FontAwesomeIcon
                                                icon={faMobileScreen}
                                                className="phoneicon"
                                              />

                                              <TextField
                                                name="shopeephonenumber"
                                                type="text"
                                                value={shopeenumber}
                                                // onChange={(e) =>
                                                //   setshopeenumber(e.target.value)
                                                // }
                                                placeholder="Phone Number"
                                              />
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "100%",
                                                padding: "0px 20px 0px 15px",
                                                boxSizing: "border-box",
                                              }}
                                            >
                                              <button
                                                style={{ background: color }}
                                                className="paybutton"
                                                onClick={() =>
                                                  setPaymentSuccess(true)
                                                }
                                              >
                                                <div className="buttonpaytext">
                                                  Pay&nbsp;{" "}
                                                  <NumberFormat
                                                    value={
                                                      myparam.order_total +
                                                      myparam.order_taxcharge +
                                                      myparam.order_servicecharge
                                                    }
                                                    prefix="Rp. "
                                                    decimalSeparator="."
                                                    thousandSeparator=","
                                                    displayType="text"
                                                  />
                                                </div>
                                              </button>
                                            </div>
                                          </>
                                        ) : null}
                                      </div>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                }
              });
            })}
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
  );
}

export default TransactionPage;
