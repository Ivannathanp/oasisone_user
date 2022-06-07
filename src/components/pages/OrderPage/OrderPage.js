import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import NumberFormat from "react-number-format";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./OrderPage.css";
import { SocketContext } from "../../socketContext";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";

function OrderPage() {
  const history = useHistory();
  const location = useLocation();
  const myparam = location.state || {};
  let { tenant_id } = useParams();

  const localUrl = process.env.REACT_APP_ORDERURL;
  const [orderData, setOrderData] = useState([]);
  const [orderRetrieved, setOrderRetrieved] = useState(false);

  // Get Order Data
  useEffect(() => {
    if (tenant_id != undefined) {
      // setInterval(() => {
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
      // }, [1000]);
    }
  }, [orderRetrieved]);

  const tenantUrl = process.env.REACT_APP_TENANTURL;
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  const [color, setColor] = useState();
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
  }, [setTenantRetrieved]);

  // socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("add order", (data) => handleOrderAdded(data));
      socket.on("update order", (data) => handleOrderAdded(data));
      if (tenantData[0] != undefined) {
        setColor(tenantData[0].profileColor);
      }
    }
  });

  function handleOrderAdded(user) {
    if (orderRetrieved) {
      let newData = orderData.splice();

      newData.push(user);
      setOrderData(newData);
    }
  }

  const [passmodalinfo, setPassModalInfo] = useState([]);
  const [completeordermodal, setCompleteOrderModal] = useState(false);
  const handleopencompleteorder = (item) => {
    setPassModalInfo(item);
    setCompleteOrderModal(true);
  };
  const handleclosecompleteorder = () => setCompleteOrderModal(false);
  const [waiternotif, setWaiterNotif] = useState(false);

  useEffect(() => {
    if (myparam.status === "SUCCESS") {
      setWaiterNotif(true);
      window.history.replaceState(null, "");
      setTimeout(() => {
        setWaiterNotif(false);
      }, 3000);
    }
  }, []);

  function handlenotification() {
    if (waiternotif) {
      setWaiterNotif(false);
    } else {
      setWaiterNotif(true);
      setTimeout(() => {
        setWaiterNotif(false);
      }, 3000);
    }
  }

  function renderHeader() {
    return (
      <div className="cartheader" style={{ background: color }}>
        <button
          className="backbutton"
          onClick={() => history.push(`/${tenant_id}`)}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#fff", marginTop: "-2%", marginRight: "15%" }}
          />
          <div className="heading">My Order</div>
        </button>
      </div>
    );
  }

  var existingCurrentOrder = JSON.parse(localStorage.getItem("currentorder"));
  var existingCompletedOrder = JSON.parse(
    localStorage.getItem("completedorder")
  );

  useEffect(() => {
    var currentorder = {
      tenant_id: tenant_id,
      currentorder: [],
    };
    if (existingCurrentOrder == null || existingCurrentOrder[0] == null || existingCurrentOrder == undefined) {
      existingCurrentOrder = [];
      existingCurrentOrder.push(currentorder);
      localStorage.setItem(
        "currentorder",
        JSON.stringify(existingCurrentOrder)
      );
    }

    if (existingCurrentOrder != null) {
      if (existingCurrentOrder.length >= 1) {
        const foundcurrenttenant = existingCurrentOrder.some(
          (item) => item.tenant_id === tenant_id
        );
        if (!foundcurrenttenant) {
          existingCurrentOrder.push(currentorder);
          localStorage.setItem(
            "currentorder",
            JSON.stringify(existingCurrentOrder)
          );
        }
      }
    }

    var completedorder = {
      tenant_id: tenant_id,
      completedorder: [],
    };

    if (existingCompletedOrder == null || existingCompletedOrder[0] == null || existingCompletedOrder==undefined) {
      existingCompletedOrder = [];
      existingCompletedOrder.push(completedorder);
      localStorage.setItem(
        "completedorder",
        JSON.stringify(existingCompletedOrder)
      );
    }

    if (existingCompletedOrder != null) {
      if (existingCompletedOrder.length >= 1) {
        const foundcompletedtenant = existingCompletedOrder.some(
          (item) => item.tenant_id === tenant_id
        );

        if (!foundcompletedtenant) {
          existingCompletedOrder.push(completedorder);
          localStorage.setItem(
            "completedorder",
            JSON.stringify(existingCompletedOrder)
          );
        }
      }
    }
  });

  const foundcurrenttenant = existingCurrentOrder.some(
    (item) => item.tenant_id === tenant_id
  );
  const foundcompletedtenant = existingCompletedOrder.some(
    (item) => item.tenant_id === tenant_id
  );

  return (
    <div className="outercontainer">
      {orderRetrieved && tenantRetrieved ? (
        <div className="cartinnercontainer">
          {renderHeader()}
          <div className="waiterbackgroundcontainer">
            <div className="backgroundoverlay"></div>
          </div>

          <div className="orderrestaurantcontainer">
            <div className="innerorderrestaurantcontainer">
              <div className="noneorder">
                <div style={{ width: "374px" }}>
                  <div className="ordertitle">Current Order</div>
                </div>
                {orderData.map((item) => {
                  if (foundcurrenttenant) {
                    console.log(existingCurrentOrder.length);
                    if (existingCurrentOrder.length > 1) {
                      var findcurrentorder = existingCurrentOrder.find(
                        (item) => item.tenant_id === tenant_id
                      );
                    } else if (existingCurrentOrder.length == 1) {
                      var findcurrentorder = existingCurrentOrder[0];
                      console.log(findcurrentorder);
                    }

                    if (findcurrentorder.currentorder[0] == undefined) {
                      console.log(findcurrentorder.currentorder[0]);
                    }

                    if (findcurrentorder) {
                      if (findcurrentorder.currentorder[0] != undefined) {
                        return item.map((post, index) => {
                          var findcurrentorderid =
                            findcurrentorder.currentorder.some(
                              (item) => item.order_id === post.order_id
                            );
                          console.log("index is", findcurrentorderid);

                          if (findcurrentorderid) {
                            if (post.order_status < 4) {
                              return (
                                <div className="currentordercontainer">
                                  <div style={{ padding: "15px" }}>
                                    <div className="row1">
                                      {post.order_status == 1 ? (
                                        <div className="pending">Pending</div>
                                      ) : post.order_status == 2 ? (
                                        <div className="orderplaced">
                                          Order Placed
                                        </div>
                                      ) : post.order_status == 3 ? (
                                        <div className="served">Served</div>
                                      ) : post.order_status == 4 ? (
                                        <div className="payment">Payment</div>
                                      ) : post.order_status == 5 ? (
                                        <div className="complete">Complete</div>
                                      ) : post.order_status == 6 ? (
                                        <div className="rejected">Rejected</div>
                                      ) : null}

                                      <button
                                        style={{
                                          borderColor: color,
                                          color: color,
                                        }}
                                        className="callwaiter"
                                        onClick={() =>
                                          history.push({
                                            pathname: `/${tenant_id}/Waiter`,
                                            state: post,
                                          })
                                        }
                                      >
                                        Call The Waiter
                                      </button>
                                    </div>
                                    <div className="row2">
                                      <div className="orderid">
                                        {post.order_id}
                                      </div>
                                      <div className="ordertext">
                                        Store :&nbsp;
                                        {tenantData[0].name}
                                      </div>
                                      <div className="ordertext">
                                        Time :&nbsp;{" "}
                                        {/* {orderDate.toLocaleTimeString("en-US")} */}
                                        {moment(post.order_time).format(
                                          "MMMM Do YYYY, h:mm:ss a"
                                        )}
                                      </div>
                                    </div>
                                    {post.order_menu.map((posts, index) => {
                                      return (
                                        <div className="row3">
                                          <div
                                            style={{
                                              display: "flex",
                                            }}
                                          >
                                            <div className="text1">
                                              {posts.orderQty}
                                            </div>
                                            <div className="text2">
                                              {posts.name}
                                            </div>
                                          </div>
                                          <div className="menurighttext">
                                            <div className="text3">
                                              <NumberFormat
                                                value={posts.price}
                                                prefix="Rp. "
                                                decimalSeparator="."
                                                thousandSeparator=","
                                                displayType="text"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}

                                    <div className="row4">
                                      <div className="innerrow">
                                        <div className="text1">Subtotal :</div>
                                        <div className="text3">
                                          <NumberFormat
                                            value={post.order_total}
                                            prefix="Rp. "
                                            decimalSeparator="."
                                            thousandSeparator=","
                                            displayType="text"
                                          />
                                        </div>
                                      </div>

                                      <div className="innerrow">
                                        <div className="text1">
                                          Tax {tenantData[0].taxCharge}%:
                                        </div>
                                        <div className="text3">
                                          <NumberFormat
                                            value={post.order_taxcharge}
                                            prefix="Rp. "
                                            decimalSeparator="."
                                            thousandSeparator=","
                                            displayType="text"
                                          />
                                        </div>
                                      </div>

                                      <div className="innerrow">
                                        <div className="text1">
                                          Service {tenantData[0].serviceCharge}
                                          %:
                                        </div>
                                        <div className="text3">
                                          <NumberFormat
                                            value={post.order_servicecharge}
                                            prefix="Rp. "
                                            decimalSeparator="."
                                            thousandSeparator=","
                                            displayType="text"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row5">
                                      <div className="text1">Bill Amount :</div>

                                      <div className="text3">
                                        <NumberFormat
                                          value={
                                            post.order_total +
                                            post.order_taxcharge +
                                            post.order_servicecharge
                                          }
                                          prefix="Rp. "
                                          decimalSeparator="."
                                          thousandSeparator=","
                                          displayType="text"
                                        />
                                      </div>
                                    </div>
                                    <div className="paybuttoncontainer">
                                      <button
                                        className={
                                          post.order_status == 1 ||
                                          post.order_status == 2
                                            ? "paymentbutton"
                                            : "paymentbuttonactive"
                                        }
                                        onClick={() =>
                                          history.push({
                                            pathname: `/${tenant_id}/Payment`,
                                            state: post,
                                          })
                                        }
                                        disabled={
                                          post.order_status == 1 ||
                                          post.order_status == 2
                                            ? true
                                            : false
                                        }
                                      >
                                        Payment
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            } else if (post.order_status > 4) {
                              if (existingCurrentOrder.length > 1) {
                                var removecurrentorder =
                                  existingCompletedOrder.findIndex(
                                    (item) => item.tenant_id === tenant_id
                                  );
                              } else {
                                var removecurrentorder = 0;
                              }
                              existingCurrentOrder.splice(
                                removecurrentorder,
                                1
                              );
                              localStorage.setItem(
                                "currentorder",
                                JSON.stringify(existingCurrentOrder)
                              );

                              var findcompletedorder =
                                existingCompletedOrder.find(
                                  (item) => item.tenant_id === tenant_id
                                );

                              var orderID = {
                                order_id: post.order_id,
                              };

                              findcompletedorder.completedorder.push(orderID);

                              localStorage.setItem(
                                "completedorder",
                                JSON.stringify(existingCompletedOrder)
                              );
                            }
                          } else if (!findcurrentorderid) {
                            if (index === 0) {
                              return (
                                <div className="note">
                                  <div className="ordernone">
                                    Looks like you don’t have any Current Order
                                    status
                                  </div>
                                </div>
                              );
                            }
                          }
                        });
                      } else if (
                        findcurrentorder.currentorder[0] == undefined
                      ) {
                        return (
                          <div className="note">
                            <div className="ordernone">
                              Looks like you don’t have any Current Order status
                            </div>
                          </div>
                        );
                      }
                    }
                  }
                })}
              </div>

              <div className="noneorder">
                <div style={{ width: "374px" }}>
                  <div className="ordertitle">Completed Order</div>
                </div>
                {orderData.map((item) => {
                  if (foundcompletedtenant) {
                    if (existingCompletedOrder.length > 1) {
                      var findcompletedorder = existingCompletedOrder.find(
                        (item) => item.tenant_id === tenant_id
                      );
                    } else if (existingCompletedOrder.length == 1) {
                      var findcompletedorder = existingCompletedOrder[0];
                    }

                    if (findcompletedorder) {
                      if (findcompletedorder.completedorder[0] != undefined) {
                        return item.map((post, index) => {
                          var findcompletedorderid =
                            findcompletedorder.completedorder.some(
                              (item) => item.order_id === post.order_id
                            );

                          if (findcompletedorderid) {
                            if (post.order_status > 4) {
                              return (
                                <div className="completedordercontainer">
                                  <div style={{ padding: "15px" }}>
                                    <div className="crow1">
                                      <div className="cleft">
                                        <div className="corderid">
                                          {post.order_id}
                                        </div>
                                        <div className="ordertext">
                                          Store :&nbsp;
                                          {tenantData[0].name}
                                        </div>
                                        <div className="ordertext">
                                          Time :&nbsp;
                                          {moment(post.order_time).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                          )}
                                        </div>
                                      </div>
                                      <div className="cright">
                                        <button
                                          className="viewdetail"
                                          onClick={() =>
                                            handleopencompleteorder(post)
                                          }
                                        >
                                          View Details
                                        </button>
                                      </div>

                                      <Modal open={completeordermodal}>
                                        <Box className="modal">
                                          <div
                                            style={{
                                              position: "relative",
                                              padding: "15px",
                                            }}
                                          >
                                            <div className="closemodalbuttoncontainer">
                                              <button
                                                className="closemodalbutton"
                                                onClick={() =>
                                                  handleclosecompleteorder()
                                                }
                                              >
                                                {" "}
                                                <FontAwesomeIcon
                                                  icon={faXmark}
                                                  className="closeicon"
                                                />
                                              </button>
                                            </div>

                                            <div className="row2">
                                              <div className="orderid">
                                                {post.order_id}
                                              </div>
                                              <div className="ordertext">
                                                Store :&nbsp;
                                                {tenantData[0].name}
                                              </div>
                                              <div className="ordertext">
                                                Time :&nbsp;
                                                {moment(post.order_time).format(
                                                  "MMMM Do YYYY, h:mm:ss a"
                                                )}
                                              </div>
                                            </div>
                                            {post.order_menu.map(
                                              (posts, index) => (
                                                <div className="row3">
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                    }}
                                                  >
                                                    <div className="text1">
                                                      {post.order_item}
                                                    </div>
                                                    <div className="text2">
                                                      {posts.name}
                                                    </div>
                                                  </div>
                                                  <div className="menurighttext">
                                                    <div className="text3">
                                                      <NumberFormat
                                                        value={posts.price}
                                                        prefix="Rp. "
                                                        decimalSeparator="."
                                                        thousandSeparator=","
                                                        displayType="text"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              )
                                            )}

                                            <div className="row4">
                                              <div className="innerrow">
                                                <div className="text1">
                                                  Subtotal :
                                                </div>
                                                <div className="text3">
                                                  <NumberFormat
                                                    value={post.order_total}
                                                    prefix="Rp. "
                                                    decimalSeparator="."
                                                    thousandSeparator=","
                                                    displayType="text"
                                                  />
                                                </div>
                                              </div>

                                              <div className="innerrow">
                                                <div className="text1">
                                                  Tax {tenantData[0].taxCharge}
                                                  %:
                                                </div>
                                                <div className="text3">
                                                  <NumberFormat
                                                    value={post.order_taxcharge}
                                                    prefix="Rp. "
                                                    decimalSeparator="."
                                                    thousandSeparator=","
                                                    displayType="text"
                                                  />
                                                </div>
                                              </div>

                                              <div className="innerrow">
                                                <div className="text1">
                                                  Service{" "}
                                                  {tenantData[0].serviceCharge}
                                                  %:
                                                </div>
                                                <div className="text3">
                                                  <NumberFormat
                                                    value={
                                                      post.order_servicecharge
                                                    }
                                                    prefix="Rp. "
                                                    decimalSeparator="."
                                                    thousandSeparator=","
                                                    displayType="text"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row5">
                                                <div className="text1">
                                                  Bill Amount :
                                                </div>

                                                <div className="text3">
                                                  <NumberFormat
                                                    value={
                                                      post.order_total +
                                                      post.order_taxcharge +
                                                      post.order_servicecharge
                                                    }
                                                    prefix="Rp. "
                                                    decimalSeparator="."
                                                    thousandSeparator=","
                                                    displayType="text"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Box>
                                      </Modal>
                                    </div>
                                    <div className="row5">
                                      <div className="text1">Bill Amount :</div>

                                      <div className="text3">
                                        <NumberFormat
                                          value={
                                            post.order_total +
                                            post.order_taxcharge +
                                            post.order_servicecharge
                                          }
                                          prefix="Rp. "
                                          decimalSeparator="."
                                          thousandSeparator=","
                                          displayType="text"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          } else if (!findcompletedorderid) {
                            if (index == 0) {
                              return (
                                <div className="note">
                                  <div className="ordernone">
                                    Looks like you don’t have any Completed
                                    Order status
                                  </div>
                                </div>
                              );
                            }
                          }
                        });
                      } else if (
                        findcompletedorder.completedorder[0] == undefined
                      ) {
                        return (
                          <div className="note">
                            <div className="ordernone">
                              Looks like you don’t have any Completed Order
                              status
                            </div>
                          </div>
                        );
                      }
                    }
                  }
                })}
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
  );
}

export default OrderPage;
