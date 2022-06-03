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

function OrderPage() {
  const history = useHistory();
  const location = useLocation();

  const myparam = location.state || {};
  console.log("myparam is", myparam);
  let { tenant_id } = useParams();

  const localUrl = process.env.REACT_APP_ORDERURL;
  const [orderData, setOrderData] = useState([]);
  const [orderRetrieved, setOrderRetrieved] = useState(false);
  const [status, setStatus] = useState(false);
  const [statusRetrieved, setStatusRetrieved] = useState(false);
  // Get Order Data
  useEffect(() => {
    let mounted = true;
    console.log("called");

    if (mounted) {
      if (tenant_id != undefined) {
        const url = localUrl + "/retrieve/" + tenant_id;
        console.log(url);

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              // console.log(result)
              setOrderData([result.data]);
              setOrderRetrieved(() => true);
            } else {
              // console.log(result);
              setOrderRetrieved(() => false);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [orderRetrieved]);

  const tenantUrl = process.env.REACT_APP_TENANTURL;
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  // Get Tenant Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      console.log("mounted");
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
      socket.on("update order", (data) => handleOrderUpdated(data));
    }
  });

  function handleOrderAdded(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", orderData);

    if (orderRetrieved) {
      console.log("I am order retrieved!!!!!!!!!!!!!", user);

      let newData = orderData.splice();

      newData.push(user);
      setOrderData(newData);
      console.log("NEW DATA IS!!!!!!!!!: ", newData);
      console.log("...user is", orderData);
    }
  }

  function handleOrderUpdated(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", orderData);

    if (orderRetrieved) {
      console.log("I am order retrieved!!!!!!!!!!!!!", user);

      let newData = orderData.splice();

      newData.push(user);
      setOrderData(newData);
      console.log("NEW DATA IS!!!!!!!!!: ", newData);
      console.log("...user is", orderData);
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
    console.log(myparam.status);
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
      <div className="cartheader">
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

  var existingOrder = JSON.parse(localStorage.getItem("order"));
  var existingStatus = JSON.parse(localStorage.getItem("status"));

  useEffect(() => {
    if (existingStatus != null) {
      console.log(existingStatus);

      if (existingStatus.length > 1) {
        var status = existingStatus.find(
          (item) => item.tenant_id === tenant_id
        );
      } else if (existingStatus.length == 1) {
        var status = existingStatus[0];
      }

      if (status) {
        setStatus(true);
        setStatusRetrieved(true);
      }
    }
  }, [statusRetrieved]);

  if (statusRetrieved) {
    console.log("STATUS IS:", status);
  }

  if (existingOrder == null) {
    // no order
    return (
      <div className="outercontainer">
        <div className="innercontainer">
          {renderHeader()}
          <div className="waiterbackgroundcontainer">
            <div className="backgroundoverlay"></div>
          </div>

          <div className="emptycontainer">
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
      </div>
    );
  } else {
    return (
      <div className="outercontainer">
        <div className="cartinnercontainer">
          {renderHeader()}
          <div className="waiterbackgroundcontainer">
            <div className="backgroundoverlay"></div>
          </div>

          <div className="orderrestaurantcontainer">
            <div style={{ height: "100%" }}>
              {orderRetrieved == true &&
                orderData.map((item) => {
                  console.log(item);
                  return item.map((post, index) => {
                    console.log(post);

                    if (existingOrder != null) {
                      console.log(existingOrder);

                      if (existingOrder.length > 1) {
                        var order = existingOrder.find(
                          (item) => item.tenant_id === tenant_id
                        );
                      } else if (existingOrder.length == 1) {
                        var order = existingOrder[0];
                      }

                      if (order && tenantRetrieved) {
                        console.log(order);
                        if (order.order.length >= 1) {
                          if (post.order_status < 4) {
                            const found = order.order.some(
                              (item) => item.order_id === post.order_id
                            );
                            console.log("found1", found);
                            if (!found) {
                              return (
                                <div className="noneorder">
                                  <div style={{ width: "374px" }}>
                                    <div className="ordertitle">
                                      Current Order
                                    </div>
                                  </div>
                                  <div className="note">
                                    <div className="ordernone">
                                      Looks like you don’t have any Current
                                      Order status
                                    </div>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="currentorderinnercontainer">
                                  <div
                                    style={{
                                      width: "374px",
                                      marginTop: "3%",
                                    }}
                                  >
                                    <div className="ordertitle">
                                      Current Order
                                    </div>
                                  </div>
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
                                          <div className="complete">
                                            Complete
                                          </div>
                                        ) : post.order_status == 6 ? (
                                          <div className="rejected">
                                            Rejected
                                          </div>
                                        ) : null}

                                        <button
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
                                          Store :&nbsp;{tenantData[0].name}
                                        </div>
                                        <div className="ordertext">
                                          Time :&nbsp;{" "}
                                          {moment(post.order_time).fromNow()}
                                        </div>
                                      </div>
                                      {post.order_menu.map((posts, index) => {
                                        console.log(posts);

                                        return (
                                          <div className="row3">
                                            <div style={{ display: "flex" }}>
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
                                            Service{" "}
                                            {tenantData[0].serviceCharge}%:
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
                                  </div>{" "}
                                </div>
                              );
                            }
                          }
                        }
                      }
                    }
                  });
                })}
              <div className="noneorder">
                <div style={{ width: "374px" }}>
                  <div className="ordertitle">Completed Order</div>
                </div>
                {orderRetrieved == true &&
                  orderData.map((item) => {
                    console.log(item);
                    return item.map((post, index) => {
                      console.log(post);

                      if (existingOrder != null) {
                        console.log(existingOrder);

                        if (existingOrder.length > 1) {
                          var order = existingOrder.find(
                            (item) => item.tenant_id === tenant_id
                          );
                        } else if (existingOrder.length == 1) {
                          var order = existingOrder[0];
                        }

                        if (order && tenantRetrieved) {
                          console.log(order);
                          if (order.order.length >= 1) {
                            const foundItem = order.order.find(
                              (item) => item.order_id === post.order_id
                            );

                            if (foundItem) {
                              console.log(post.order_id)
                              const found = order.order.some(
                                (item) => item.order_id === post.order_id
                              );
                              console.log("found1", found);
                             if (found) {
                                var existingStatus = JSON.parse(
                                  localStorage.getItem("status")
                                );
                                console.log("I am splice4")
                                if (existingStatus != null) {
                                  console.log("I am splice3")
                                  if (
                                    existingStatus.length >= 1 &&
                                    existingStatus[0] != null
                                  ) {
                                    const foundTenant =
                                      existingStatus.findIndex(
                                        (item) => item.tenant_id === tenant_id
                                      );
                                      console.log("I am splice2")
                                   
                                   
                                      existingStatus.splice(foundTenant, 1);
                                      localStorage.setItem(
                                        "status",
                                        JSON.stringify(existingStatus)
                                      );
                                    
                                  }
                                }

                                if (post.order_status > 4) {
                                  console.log("I am splice1")
                                  return (
                                    <div className="completedordercontainer">
                                      <div style={{ padding: "15px" }}>
                                        <div className="crow1">
                                          <div className="cleft">
                                            <div className="corderid">
                                              {post.order_id}
                                            </div>
                                            <div className="ordertext">
                                              Store :&nbsp;{tenantData[0].name}
                                            </div>
                                            <div className="ordertext">
                                              Time :&nbsp;
                                              {moment(
                                                post.order_time
                                              ).fromNow()}
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
                                                    {moment(
                                                      post.order_time
                                                    ).fromNow()}
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
                                                      Tax{" "}
                                                      {tenantData[0].taxCharge}
                                                      %:
                                                    </div>
                                                    <div className="text3">
                                                      <NumberFormat
                                                        value={
                                                          post.order_taxcharge
                                                        }
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
                                                      {
                                                        tenantData[0]
                                                          .serviceCharge
                                                      }
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
                                  );
                                }
                              }
                            }

                            else if (!foundItem){
                              
                                console.log("I am found");
                                var existingStatus = JSON.parse(
                                  localStorage.getItem("status")
                                );
                                var status = {
                                  tenant_id: tenant_id,
                                  found: 1,
                                };
                                if (
                                  existingStatus == null ||
                                  existingStatus[0] == null
                                ) {
                                  existingStatus = [];
                                  existingStatus.push(status);
                                  localStorage.setItem(
                                    "status",
                                    JSON.stringify(existingStatus)
                                  );
                                }

                                if (existingStatus != null) {
                                  if (existingStatus.length >= 1) {
                                    const foundTenant = existingStatus.some(
                                      (item) => item.tenant_id === tenant_id
                                    );

                                    if (!foundTenant) {
                                      existingStatus.push(status);
                                      localStorage.setItem(
                                        "status",
                                        JSON.stringify(existingStatus)
                                      );
                                    }
                                  }
                                }
                              
                            }
                          }
                        }
                      }
                    });
                  })}

                {status ? (
                  <div className="note">
                    <div className="ordernone">
                      Looks like you don’t have any Completed Order status
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderPage;
