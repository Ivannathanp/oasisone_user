import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./HomePage.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Recommendicon from "../../icons/Recommend.png";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faXmark,
  faMagnifyingGlass,
  faMinus,
  faPlus,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./searchbar/Searchbar";
import { SocketContext } from "../../socketContext";
import { ThreeDots } from "react-loader-spinner";
import Categories from "./Categories/Categories";
import "./Categories/Categories.css";
import "./Menu/Menu.css";
import "./Recommend/Recommend.css";

function HomePage() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const localUrl = process.env.REACT_APP_TENANTURL;
  const imageUrl = process.env.REACT_APP_IMAGEURL;
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  const [itemval, setItemval] = useState();
  const menuUrl = process.env.REACT_APP_MENUURL;
  const [menuData, setMenuData] = useState([]);
  const [menuDataRetrieved, setMenuDataRetrieved] = useState(false);
  const [recommendData, setRecommendData] = useState([]);
  const [recommendRetrieved, setRecommendRetrieved] = useState(false);
  const promoUrl = process.env.REACT_APP_PROMOURL;
  const [promoData, setPromoData] = useState([]);
  const [promoRetrieved, setPromoRetrieved] = useState(false);

  let { tenant_id } = useParams();

  // Get Tenant Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = localUrl + "/user/" + tenant_id;
        fetch(url, {
          method: "GET",
          mode: "cors",
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

  // Get Menu Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = menuUrl + "/category/" + tenant_id;

        fetch(url, {
          method: "GET",
          mode: "cors",
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
  }, [searchPhrase, menuDataRetrieved]);

  // Get Recommend Menu Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = menuUrl + "/all/" + tenant_id;

        fetch(url, {
          method: "GET",
          mode:"cors",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setRecommendData([result.data]);
              setRecommendRetrieved(() => true);
            } else {
              setRecommendRetrieved(() => false);
            }
          });
      }
    }
    return () => {
      mounted = false;
    };
  }, [setRecommendRetrieved]);

  // Get Promo Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = promoUrl + "/retrieve/" + tenant_id;

        fetch(url, {
          method: "GET",
          mode:"cors",
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

  useEffect(() => {
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    var entry = {
      tenant_id: tenant_id,
      order: [],
    };
    localStorage.setItem("entry", JSON.stringify(entry));

    if (existingEntries == null || existingEntries[0] == null) {
      existingEntries = [];
      existingEntries.push(entry);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    }

    if (existingEntries != null) {
      if (existingEntries.length >= 1) {
        const found = existingEntries.some(
          (item) => item.tenant_id === tenant_id
        );

        if (!found) {
          existingEntries.push(entry);
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        }
      }
    }
  });

  // socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("add category", (data) => handleCategoryAdded(data));
      socket.on("update category", (data) => handleCategoryAdded(data));
      socket.on("delete category", (data) => handleCategoryAdded(data));
      socket.on("update user", (data) => handleUserUpdated(data));
      socket.on("add promo", (data) => handleAddPromo(data));
      socket.on("update promo", (data) => handleAddPromo(data));
      socket.on("delete promo", (data) => handleAddPromo(data));
    }
  });

  function handleUserUpdated(user) {
    if (tenantRetrieved) {
      let newData = tenantData.splice();

      newData.push(user);
      setTenantData(newData);
    }
  }

  function handleCategoryAdded(user) {
    if (menuDataRetrieved) {
      let newData = menuData.splice();

      newData.push(user);
      setMenuData(newData);
    }
    if (recommendRetrieved) {
      let newData2 = recommendData.splice();

      newData2.push(user);
      setRecommendData(newData2);
    }
  }

  function handleAddPromo(user) {
    if (promoRetrieved) {
      let newData = promoData.splice();

      newData.push(user);
      setPromoData(newData);
    }
  }

  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    if (tenantRetrieved === true) {
      setRestaurants(tenantData[0].openingDays);
    }
  });

  //navigate
  const history = useHistory();
  function redirectcallwaiter() {
    history.push(`/${tenant_id}/Waiter`);
  }

  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

  if (existingEntries > 1) {
    var item = existingEntries.find((item) => item.tenant_id === tenant_id);
  } else if (existingEntries != null) {
    var item = existingEntries[0];
  } else {
    var item = existingEntries;
  }

  function handlepassdata(data) {
    history.push({
      pathname: `/${tenant_id}/MenuDetail`,
      state: data,
    });
  }

  async function handleIncrement(i, v, f) {
    if (item) {
      var menu = {
        menu_id: v,
        order_quantity: 1,
      };

      if (item.order != undefined) {
        if (item.order.length >= 1) {
          var items = item.order.find((items) => items.menu_id === v);

          if (items) {
            var newQuantity = parseInt(items.order_quantity) + 1;
            items.order_quantity = newQuantity;
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));

            setItemval(parseInt(items.order_quantity));
            menuDataRetrieved == true &&
              menuData.map((item) => {
                return item.map((post, index) => {
                  if (post.category.id === i) {
                    post.category.menu.map((posts, index) => {
                      if (posts.id === v) {
                        posts.orderQuantity = items.order_quantity.toString();
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
          var newQuantity = parseInt(items.order_quantity) - 1;
          items.order_quantity = newQuantity.toString();
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));

          if (parseInt(items.order_quantity) <= 0) {
            var removeIndex = item.order.findIndex(
              (items) => items.menu_id === v
            );

            var newItem = item.order.splice(removeIndex, 1);

            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
          }
          setItemval(parseInt(items.order_quantity));
          menuDataRetrieved == true &&
            menuData.map((item) => {
              return item.map((post, index) => {
                if (post.category.id === i) {
                  post.category.menu.map((posts, index) => {
                    if (posts.id === v) {
                      posts.orderQuantity = items.order_quantity.toString();
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

  function rendermenu() {
    return (
      <>
        {menuDataRetrieved == true &&
          menuData.map((item) => {
            return item.map((post, index) => {
              return (
                <div className="rendermenucontainer">
                  <div className="rendercategorymenu" id={post.category.name}>
                    {post.category.index == 0
                      ? null
                      : post.category.menu.length == 0
                      ? null
                      : post.category.name}
                  </div>

                  {post.category.menu.map((posts, index) => {
                    if (posts.quantity == 0) {
                      return (
                        <div className="soldoutmenuitem" key={posts.id}>
                          <img
                            src={posts.menuImage}
                            className="menuitemPhoto"
                          />

                          <div>
                            <div className="menutext">{posts.name}</div>
                            {posts.isRecommended == true ? (
                              <div className="menutext">
                                <img src={Recommendicon} />
                              </div>
                            ) : (
                              <div></div>
                            )}

                            <div className="soldoutmenutext">Sold Out</div>
                          </div>

                          <div className="cartcontainer">
                            <div
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
                                disabled={true}
                              >
                                <FontAwesomeIcon
                                  className={
                                    posts.orderQuantity > 0
                                      ? "cartbuttontext"
                                      : "disabledcartbuttontext"
                                  }
                                  icon={faMinus}
                                />
                              </button>
                              <input
                                type="text"
                                value="0"
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
                                disabled={true}
                              >
                                <FontAwesomeIcon
                                  className={
                                    posts.orderQuantity > 0
                                      ? "cartbuttontext"
                                      : "disabledcartbuttontext"
                                  }
                                  icon={faPlus}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      var existingEntries = JSON.parse(
                        localStorage.getItem("allEntries")
                      );

                      if (
                        existingEntries != null ||
                        existingEntries[0] != null
                      ) {
                        var item = existingEntries.find(
                          (item) => item.tenant_id === tenant_id
                        );

                        var items = item.order.find(
                          (items) => items.menu_id === posts.id
                        );
                      }

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
                                    ? items.order_quantity <= 0
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
                                    ? items.order_quantity >= posts.quantity
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
                                        ? items.order_quantity >= posts.quantity
                                          ? "disabledcartbuttontext"
                                          : "cartbuttontext"
                                        : "disabledcartbuttontext"
                                      : "disabledcartbuttontext"
                                  }
                                  icon={faPlus}
                                />
                              </button>
                            </div>
                            <div className="quantitydesc">
                              {items
                                ? posts.quantity <= items.order_quantity
                                  ? "Max qty: " + posts.quantity
                                  : null
                                : null}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            });
          })}
      </>
    );
  }

  const [color, setColor] = useState();
  const [profileName, setProfileName] = useState();
  const [taxchargeedit, setTaxChargeEdit] = useState(false);
  const [servicechargeedit, setServiceChargeEdit] = useState(false);
  const [AddressTextEdit, setAddressTextEdit] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [taxChargeValue, setTaxChargeValue] = useState();
  const [serviceChargeValue, setServiceChargeValue] = useState();
  const [textAddress, setTextAddress] = useState();
  const [textLocation, setTextLocation] = useState();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenantRetrieved === true) {
        setProfileName(tenantData[0].name);
        setColor(tenantData[0].profileColor);
        setTextAddress(tenantData[0].address);
        setTextLocation(tenantData[0].location);
        setTaxChargeValue(tenantData[0].taxCharge);
        setServiceChargeValue(tenantData[0].serviceCharge);
        setProfileImage(tenantData[0].profileImage);
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenantRetrieved, tenantData]);

  if (menuData[0] == 0){
    console.log(menuData)
  }

  return (
    <>
      {
        menuData[0] != 0 && recommendData[0] !=0 && promoData[0] != 0?
      
      tenantRetrieved &&
      menuDataRetrieved &&
      recommendRetrieved &&
      promoRetrieved ? (
        <div className="homepageinnercontainer">
          <div className="homepageuppercontainer" style={{ background: color }}>
            <div className="homepagerow">
              <div className="logocolumn">
                <img src={profileImage} className="logoimage" />
                {/* <img src={profileImage + "?time" + new Date()} className="logoimage" /> */}
              </div>

              <div className="headercolumn">
                <div className="homepagetitle">{profileName}</div>

                <div className="body">
                  <span>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="locationicon"
                    />{" "}
                    &nbsp;{textLocation}
                    <br />
                    {textAddress}
                  </span>
                </div>

                <div className="homepagerow">
                  <div className="headerbuttoncontainer">
                    <button
                      className="homepageheaderbutton"
                      onClick={() => setOpen(true)}
                    >
                      <div className="homepageheaderbuttontext">Info</div>
                    </button>

                    <Modal open={open}>
                      <Box className="openingtimemodal">
                        <div style={{ position: "relative" }}>
                          <div className="modaltitle">Opening Hours</div>

                          {tenantRetrieved == true &&
                            restaurants.map((post, index) => {
                              var numberdayweek = [7, 1, 2, 3, 4, 5, 6];
                              const today = new Date();

                              return (
                                <div className="modalinnercontainer">
                                  <div className="modalrow">
                                    <div
                                      className={
                                        numberdayweek[today.getDay()] ===
                                        index + 1
                                          ? "righttextactive"
                                          : "righttext"
                                      }
                                    >
                                      {post.day}
                                    </div>
                                    <div
                                      className={
                                        numberdayweek[today.getDay()] ===
                                        index + 1
                                          ? "lefttextactive"
                                          : "lefttext"
                                      }
                                    >
                                      {post.is24Hours ? (
                                        "open 24 hours"
                                      ) : post.isClosed ? (
                                        "closed"
                                      ) : (
                                        <div>
                                          {post.OpenHour}:{post.OpenMins}&nbsp;
                                          {post.OpenTF} - {post.CloseHour}:
                                          {post.CloseMins}&nbsp;{post.CloseTF}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {index != 6 ? (
                                    <div className="modalline" />
                                  ) : null}
                                </div>
                              );
                            })}
                        </div>

                        <button
                          className="modalbutton"
                          type="button"
                          onClick={() => setOpen(false)}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </Box>
                    </Modal>

                    <button
                      className="homepageheaderbutton"
                      onClick={redirectcallwaiter}
                    >
                      <div className="homepageheaderbuttontext">
                        Call the Waiter
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="homepageoverlay"></div>

          <div className="outermaincontainer">
            <div className="scrollcontainer" id="containerElement">
              <div className="maincontainer">
                <div className="searchbar">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="feather"
                  />

                  <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={(e) => setSearchPhrase(e.target.value)}
                    onFocus={() => setClicked(true)}
                  />
                  {searchPhrase != "" && (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="cross"
                      onClick={() => {
                        setSearchPhrase("");
                        setClicked(false);
                      }}
                    />
                  )}
                </div>
                <div className="container2">
                  <>
                    <div className={searchPhrase !== "" ? "hidden" : "show"}>
                      <div className="homepageheading">Promos For You</div>
                      <div className="promocontainer" id="home">
                        {promoRetrieved == true &&
                          promoData[0].map((post) => (
                            <div className="promoitem">
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
                          ))}
                      </div>
                      <div className="homepageheading">Recommended For You</div>
                      <div className="recommendcontainer">
                        {recommendRetrieved == true &&
                          recommendData[0].map((item) => {
                            return item.menu.map((post, index) => {
                              if (post.isRecommended == true) {
                                return (
                                  <>
                                    <div className="recommenditem">
                                      <button
                                        onClick={() => handlepassdata(post)}
                                        className="recommenditembutton"
                                      >
                                        <img
                                          src={post.menuImage}
                                          className="recommenditemPhoto"
                                        />
                                      </button>

                                      <div className="recommenditemText">
                                        {post.name}

                                        <div className="recommenditemText">
                                          <NumberFormat
                                            value={post.price}
                                            prefix="Rp. "
                                            decimalSeparator="."
                                            thousandSeparator=","
                                            displayType="text"
                                          />
                                        </div>
                                      </div>

                                      <button
                                        style={{ background: color }}
                                        className="recommendmenubutton"
                                        onClick={() => handlepassdata(post)}
                                      >
                                        <FontAwesomeIcon
                                          icon={faAngleRight}
                                          className="recommendicon"
                                        />
                                      </button>
                                    </div>
                                  </>
                                );
                              }
                            });
                          })}
                      </div>
                      <div className="homepageheading">Menu</div>
                      <Categories />

                      {rendermenu()}
                    </div>

                    {searchPhrase !== "" && (
                      <div className="searchResults">
                        {menuDataRetrieved === true &&
                          menuData.map((item) => {
                            return item.map((post) => {
                              return post.category.menu
                                .filter((posts) => {
                                  if (
                                    posts.name
                                      .toLowerCase()
                                      .includes(searchPhrase.toLowerCase())
                                  ) {
                                    return posts;
                                  }
                                })
                                .map((posts, index) => {
                                  if (posts.quantity == 0) {
                                    return (
                                      <div className="rendermenucontainer">
                                        <div
                                          className="soldoutmenuitem"
                                          key={posts.id}
                                        >
                                          <img
                                            src={posts.menuImage}
                                            className="menuitemPhoto"
                                          />

                                          <div>
                                            <div className="menutext">
                                              {posts.name}
                                            </div>
                                            {posts.isRecommended == true ? (
                                              <div className="menutext">
                                                <img src={Recommendicon} />
                                              </div>
                                            ) : (
                                              <div></div>
                                            )}

                                            <div className="soldoutmenutext">
                                              Sold Out
                                            </div>
                                          </div>

                                          <div className="cartcontainer">
                                            <div
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
                                                disabled={true}
                                              >
                                                <FontAwesomeIcon
                                                  className={
                                                    posts.orderQuantity > 0
                                                      ? "cartbuttontext"
                                                      : "disabledcartbuttontext"
                                                  }
                                                  icon={faMinus}
                                                />
                                              </button>
                                              <input
                                                type="text"
                                                value="0"
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
                                                disabled={true}
                                              >
                                                <FontAwesomeIcon
                                                  className={
                                                    posts.orderQuantity > 0
                                                      ? "cartbuttontext"
                                                      : "disabledcartbuttontext"
                                                  }
                                                  icon={faPlus}
                                                />
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  } else {
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
                                      <div className="homerendermenucontainer">
                                        <div
                                          className="menuitem"
                                          key={posts.id}
                                        >
                                          <button
                                            className="menuscreenbutton"
                                            onClick={() =>
                                              handlepassdata(posts)
                                            }
                                          >
                                            <img
                                              src={posts.menuImage}
                                              className="menuitemPhoto"
                                            />
                                          </button>

                                          <div>
                                            <div className="menutext">
                                              {posts.name}
                                            </div>
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
                                                    ? items.order_quantity <= 0
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
                                                value={
                                                  items
                                                    ? items.order_quantity
                                                    : 0
                                                }
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
                                                  posts.id,
                                                  posts.price
                                                )}
                                                disabled={
                                                  items
                                                    ? items.order_quantity >=
                                                      posts.quantity
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
                                                        ? items.order_quantity >=
                                                          posts.quantity
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
                                      </div>
                                    );
                                  }
                                });
                            });
                          })}
                      </div>
                    )}
                  </>
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
      ) : ( <div className="homepageinnercontainer">
      <div className="homepageuppercontainer" style={{ background: color }}>
        <div className="homepagerow">
          <div className="logocolumn">
            <img src={profileImage} className="logoimage" />
            {/* <img src={profileImage + "?time" + new Date()} className="logoimage" /> */}
          </div>

          <div className="headercolumn">
            <div className="homepagetitle">{profileName}</div>

            <div className="body">
              <span>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="locationicon"
                />{" "}
                &nbsp;{textLocation}
                <br />
                {textAddress}
              </span>
            </div>

            <div className="homepagerow">
              <div className="headerbuttoncontainer">
                <button
                  className="homepageheaderbutton"
                  onClick={() => setOpen(true)}
                >
                  <div className="homepageheaderbuttontext">Info</div>
                </button>

                <Modal open={open}>
                  <Box className="openingtimemodal">
                    <div style={{ position: "relative" }}>
                      <div className="modaltitle">Opening Hours</div>

                      {tenantRetrieved == true &&
                        restaurants.map((post, index) => {
                          var numberdayweek = [7, 1, 2, 3, 4, 5, 6];
                          const today = new Date();

                          return (
                            <div className="modalinnercontainer">
                              <div className="modalrow">
                                <div
                                  className={
                                    numberdayweek[today.getDay()] ===
                                    index + 1
                                      ? "righttextactive"
                                      : "righttext"
                                  }
                                >
                                  {post.day}
                                </div>
                                <div
                                  className={
                                    numberdayweek[today.getDay()] ===
                                    index + 1
                                      ? "lefttextactive"
                                      : "lefttext"
                                  }
                                >
                                  {post.is24Hours ? (
                                    "open 24 hours"
                                  ) : post.isClosed ? (
                                    "closed"
                                  ) : (
                                    <div>
                                      {post.OpenHour}:{post.OpenMins}&nbsp;
                                      {post.OpenTF} - {post.CloseHour}:
                                      {post.CloseMins}&nbsp;{post.CloseTF}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {index != 6 ? (
                                <div className="modalline" />
                              ) : null}
                            </div>
                          );
                        })}
                    </div>

                    <button
                      className="modalbutton"
                      type="button"
                      onClick={() => setOpen(false)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </Box>
                </Modal>

                <button
                  className="homepageheaderbutton"
                  onClick={redirectcallwaiter}
                >
                  <div className="homepageheaderbuttontext">
                    Call the Waiter
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="homepageoverlay"></div>

      <div className="outermaincontainer">
        <div className="scrollcontainer" id="containerElement">
          <div className="maincontainer">
           
            <div className="emptycontainer2" style={{color:color}}>
         
                Coming Soon!

           
           
            </div>
          </div>
        </div>
      </div>
    </div>)}
    </>
  );
}

export default HomePage;
