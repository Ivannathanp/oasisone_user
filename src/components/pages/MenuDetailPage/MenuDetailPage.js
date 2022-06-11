import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
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
import "./MenuDetailPage.css";
import { SocketContext } from "../../socketContext";
import { ThreeDots } from "react-loader-spinner";

function MenuDetailPage() {
  const history = useHistory();
  const location = useLocation();

  const myparam = location.state || {};
  let { tenant_id } = useParams();
  const localUrl = process.env.REACT_APP_MENUURL;
  const [menuData, setMenuData] = useState([]);
  const [menuDataRetrieved, setMenuDataRetrieved] = useState(false);
  const tenantUrl = process.env.REACT_APP_TENANTURL;
  const [color, setColor] = useState();
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);

  // Get Menu Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = localUrl + "/category/" + tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setMenuData([result.data]);
              setMenuDataRetrieved(() => true);
            } else {
              setMenuDataRetrieved(() => false);
            }
          });
      }
    }
    return () => {
      mounted = false;
    };
  }, [menuDataRetrieved]);

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
      socket.on("add category", (data) => handleCategoryAdded(data));
      socket.on("update category", (data) => handleCategoryAdded(data));
      socket.on("delete category", (data) => handleCategoryAdded(data));
    }
    if (tenantData[0] != undefined) {
      setColor(tenantData[0].profileColor);
    }
  });

  function handleCategoryAdded(user) {

    if (menuDataRetrieved) {

      let newData = menuData.splice();

      newData.push(user);
      setMenuData(newData);
    }
  }

  const [objects, getObjectsList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  var existingEntry = JSON.parse(localStorage.getItem("entry"));
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

  // useEffect(() => {
  //   setInterval(() => {
  //     const localStorageValue = JSON.parse(localStorage.getItem("allEntries"));
  //     getObjectsList(localStorageValue);
  //   }, [10000]);
  // }, []);

  useEffect(() => {
    if (menuDataRetrieved) {
      var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
      var item = existingEntries.find((item) => item.tenant_id === tenant_id);

      var sum = item.order.reduce((accumulator, object) => {
        return accumulator + object.order_quantity;
      }, 0);
      setTotalQuantity(sum);
    }
  });


  const [itemval, setItemval] = useState();
  const [addItemNotif, setAddItemNotif] = useState(false);
  const [quantityItemNotif, setQuantityItemNotif] = useState(false);
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  if (existingEntries !== null) {
    var item = existingEntries.find((item) => item.tenant_id === tenant_id);
  }

  function renderMenu() {
    async function handleIncrement(i, v, f) {

      if (item) {
        var menu = {
          menu_id: v,
          order_quantity: 1,
        };
        if (item.order.length >= 1) {
          var items = item.order.find((items) => items.menu_id === v);
          if (items) {
            var newQuantity = items.order_quantity + 1;
            items.order_quantity = newQuantity;
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));

            setItemval(items.order_quantity);
            menuDataRetrieved == true &&
              menuData.map((item) => {
                return item.map((post, index) => {
                  if (post.category.id === i) {
                    post.category.menu.map((posts, index) => {
                      if (posts.id === v) {
                        posts.orderQuantity = items.order_quantity;
                        return post;
                      } else {
                        return post;
                      }
                    });
                  }

                  setItemval({ post });
                });
              });
          } else {
            item.order.push(menu);
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));

            menuDataRetrieved == true &&
              menuData.map((item) => {
                return item.map((post, index) => {
                  if (post.category.id === i) {
                    post.category.menu.map((posts, index) => {
                      if (posts.id === v) {
                        posts.orderQuantity = post.orderQuantity + 1;
                        return post;
                      } else {
                        return post;
                      }
                    });
                  }

                  setItemval({ post });
                });
              });
          }
        } else {
          item.order.push(menu);
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));

          menuDataRetrieved == true &&
            menuData.map((item) => {
              return item.map((post, index) => {
                if (post.category.id === i) {
                  post.category.menu.map((posts, index) => {
                    if (posts.id === v) {
                      posts.orderQuantity = post.orderQuantity + 1;
                      return post;
                    } else {
                      return post;
                    }
                  });
                }

                setItemval({ post });
              });
            });
        }
      }
    }

    async function handleDecrement(i, v) {

      if (item) {
        if (item.order.length >= 1) {
          var items = item.order.find((items) => items.menu_id === v);
          if (items) {
            var newQuantity = items.order_quantity - 1;
            items.order_quantity = newQuantity;
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));

            if (items.order_quantity <= 0) {
              var removeIndex = item.order.findIndex(
                (items) => items.menu_id === v
              );
              var newItem = item.order.splice(removeIndex, 1);

              localStorage.setItem(
                "allEntries",
                JSON.stringify(existingEntries)
              );
            }
            setItemval(items.order_quantity);
            menuDataRetrieved == true &&
              menuData.map((item) => {
                return item.map((post, index) => {
                  if (post.category.id === i) {
                    post.category.menu.map((posts, index) => {
                      if (posts.id === v) {
                        posts.orderQuantity = items.order_quantity;
                        return post;
                      } else {
                        return post;
                      }
                    });
                  }

                  setItemval({ post });
                });
              });
          }
        }
      }
    }

    function handlepassdata(data) {
      history.push({
        pathname: `/${tenant_id}/MenuDetail`,
        state: data,
      });
    }

    return (
      <div className={{ alignItems: "center" }}>
        {menuDataRetrieved == true &&
          menuData.map((item) => {
            return item.map((post) => {
              return post.category.menu.map((posts, index) => {
                var existingEntries = JSON.parse(
                  localStorage.getItem("allEntries")
                );
                if (existingEntries !== null) {
                  var item = existingEntries.find(
                    (item) => item.tenant_id === tenant_id
                  );
                  if (item) {
                    var noItems = item.order.find(
                      (items) => items.menu_id === posts.id
                    );
                    // if (!noItems) {
                    if (posts.id != myparam.id && posts.quantity > 5) {
                      var existingEntries = JSON.parse(
                        localStorage.getItem("allEntries")
                      );
                      var item = existingEntries.find(
                        (item) => item.tenant_id === tenant_id
                      );

                      var items = item.order.find(
                        (items) => items.menu_id === posts.id
                      );

                      return (
                        <div className="menuitem" key={posts.id}>
                          <button
                            className="menuscreenbutton"
                            onClick={() => handlepassdata(posts)}
                          >
                            <img
                              src={posts.menuImage}
                              className="menuitemPhoto"
                            />
                          </button>

                          <div>
                            <div className="menutext">{posts.name}</div>
                            {posts.isRecommended == true ? (
                              <div className="menutext">
                                <img src={Recommendicon} />
                              </div>
                            ) : (
                              <div></div>
                            )}

                            <div className="menutext">
                              <NumberFormat
                                value={posts.price}
                                prefix="Rp. "
                                decimalSeparator="."
                                thousandSeparator=","
                                displayType="text"
                              />
                            </div>
                          </div>

                          <div className="cartcontainer">
                            <div
                              style={
                                items
                                  ? items.order_quantity > 0
                                    ? { background: color }
                                    : null
                                  : null
                              }
                              className={
                                items
                                  ? items.order_quantity > 0
                                    ? "cartactive"
                                    : "cart"
                                  : "cart"
                              }
                            >
                              <button
                                className={
                                  items
                                    ? items.order_quantity > 0
                                      ? "cartbutton"
                                      : "cartbuttonactive"
                                    : "cartbuttonactive"
                                }
                                onClick={handleDecrement.bind(
                                  this,
                                  post.category.id,
                                  posts.id
                                )}
                                disabled={
                                  items
                                    ? items.order_quantity == 0
                                      ? true
                                      : false
                                    : false
                                }
                              >
                                <FontAwesomeIcon
                                  style={
                                    items
                                      ? items.order_quantity > 0
                                        ? { color: color }
                                        : null
                                      : null
                                  }
                                  className={
                                    items
                                      ? items.order_quantity > 0
                                        ? "cartbuttontext"
                                        : "disabledcartbuttontext"
                                      : "disabledcartbuttontext"
                                  }
                                  icon={faMinus}
                                />
                              </button>

                              <input
                                defaultValue={0}
                                type="text"
                                value={items ? items.order_quantity : 0}
                                className="carttext"
                              />
                              <button
                                className={
                                  items
                                    ? items.order_quantity > 0
                                      ? "cartbutton"
                                      : "cartbuttonactive"
                                    : "cartbuttonactive"
                                }
                                onClick={handleIncrement.bind(
                                  this,
                                  post.category.id,
                                  posts.id
                                )}
                                disabled={
                                  items
                                    ? items.order_quantity == posts.quantity
                                      ? true
                                      : false
                                    : false
                                }
                              >
                                <FontAwesomeIcon
                                  style={
                                    items
                                      ? items.order_quantity > 0
                                        ? { color: color }
                                        : null
                                      : null
                                  }
                                  className={
                                    items
                                      ? items.order_quantity > 0
                                        ? items.order_quantity == posts.quantity
                                          ? "disabledcartbuttontext"
                                          : "cartbuttontext"
                                        : "disabledcartbuttontext"
                                      : "disabledcartbuttontext"
                                  }
                                  icon={faPlus}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    } else return null;
                    // }
                  }
                }
              });
            });
          })}
      </div>
    );
  }

  function renderHeader() {
    return (
      <div className="header" style={{ background: color }}>
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

  async function addItem(i) {
    // Notification
    setAddItemNotif(true);
    setTimeout(() => {
      setAddItemNotif(false);
    }, 3000);


    if (item) {
      var menu = {
        menu_id: i,
        quantity: 1,
      };
      if (item.order.length >= 1) {
        var items = item.order.find((items) => items.menu_id === i);
        if (items) {
          var newQuantity = items.order_quantity + 1;
          items.order_quantity = newQuantity;
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        } else {
          item.order.push(menu);
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        }
      } else {
        item.order.push(menu);
        localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      }
    }
  }

  function handlenotification() {
    if (addItemNotif || quantityItemNotif) {
      setAddItemNotif(false);
      setQuantityItemNotif(false);
    } 
  }

  function renderButton() {
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    var item = existingEntries.find((item) => item.tenant_id === tenant_id);

    var items = item.order.find((items) => items.menu_id === myparam.id);

    return (
      <>
        {menuDataRetrieved == true &&
          menuData.map((item) => {
            return item.map((post, index) => {
              return post.category.menu.map((posts, index) => {
                if (posts.id === myparam.id) {
                  return (
                    <button
                      style={{ background: color }}
                      //className={items? items.order_quantity == myparam.quantity? "disabledbuttoncontainer" : "buttoncontainer" : "buttoncontainer"}
                      className="buttoncontainer"
                      onClick={
                        items
                          ? items.order_quantity >= myparam.quantity || myparam.quantity == 0
                            ? ()=>{
                                setQuantityItemNotif(true);
                                  setTimeout(() => {
                                    setQuantityItemNotif(false);
                                  }, 3000);
                              }
                            : () => addItem(myparam.id)
                          : null
                      }
                    >
                      <div className="badgeContainer">
                        <img src={Carticon} className="cartbuttonicon" />
                        <div className="badgeNumber" style={{ color: color }}>
                          {menuDataRetrieved ? totalQuantity : 0}
                        </div>
                      </div>

                      <div className="tambahkanbuttontext">
                        Tambahkan | &nbsp;
                        <div className="tambahkanbuttontext">
                          <NumberFormat
                            value={posts.price}
                            prefix="Rp. "
                            decimalSeparator="."
                            thousandSeparator=","
                            displayType="text"
                          />
                        </div>
                      </div>
                    </button>
                  );
                }
              });
            });
          })}
      </>
    );
  }

  return (
    <>
      {tenantRetrieved ? (
        <div className="outercontainer">
          <div className="innercontainer">
            {renderHeader()}
            <div className="menudetailbackgroundcontainer">
              <div className="menudetailbackground">
                <img src={myparam.menuImage} className="menudetailitemPhoto" />

                <div
                  style={{ background: color }}
                  className={
                    addItemNotif
                      ? "notification"
                      : quantityItemNotif
                      ? "notification"
                      : "hidden"
                  }
                >
                  <div className="notificationtextcontainer">
                    <div className="notificationtext">
                      {quantityItemNotif
                        ? "Sorry, Menu is empty"
                        : "Item Added to Cart"}
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
              </div>

              <div className="menubackgroundoverlay"></div>
            </div>

            <div className="menudetailcontainer">
              <div className="uppercontainer">
                {menuDataRetrieved == true &&
                  menuData.map((item) => {
                    return item.map((post, index) => {
                      return post.category.menu.map((posts, index) => {
                        if (posts.id === myparam.id) {
                          return (
                            <>
                              <div className="title">{posts.name}</div>
                              <div className="price">
                                <div className="heading3">
                                  Rp :&nbsp;
                                  <div className="heading2">
                                    <NumberFormat
                                      value={posts.price}
                                      prefix="Rp "
                                      decimalSeparator="."
                                      thousandSeparator=","
                                      displayType="text"
                                    />
                                  </div>
                                </div>

                                <div>
                                  {posts.recommended ? (
                                    <img
                                      src={Recommendicon}
                                      className="recommenPhoto"
                                      resizeMode="contain"
                                    />
                                  ) : null}
                                </div>
                              </div>

                              <div className="menudetailincontext">
                                {" "}
                                <FontAwesomeIcon icon={faClock} />
                                &nbsp;Cooking Time
                              </div>

                              <div className="heading3">
                                {posts.duration} Minutes
                              </div>

                              <div className="menudetailincontext">
                                <FontAwesomeIcon icon={faNewspaper} />{" "}
                                &nbsp;Product Details
                              </div>

                              <div className="heading3">
                                {posts.description}
                              </div>
                            </>
                          );
                        }
                      });
                    });
                  })}
              </div>

              <div className="lowercontainer">
                <div className="heading2">Maybe you like this too!</div>
                <div>&nbsp;</div>
                {renderMenu()}
              </div>
            </div>
          </div>
          {renderButton()}
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
    </>
  );
}

export default MenuDetailPage;
