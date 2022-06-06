import React, { useState, useEffect,useContext } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./searchbar/Searchbar";
import Promo from "./Promo/Promo";
import Recommended from "./Recommend/Recommend";
import Menu from "./Menu/Menu";
import { SocketContext } from "../../socketContext";

function HomePage() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const localUrl = process.env.REACT_APP_TENANTURL;
  const imageUrl = process.env.REACT_APP_IMAGEURL;
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  const [itemval, setItemval] = useState();
  const MenuUrl = process.env.REACT_APP_MENUURL;
  const [menuData, setMenuData] = useState([]);
  const [menuDataRetrieved, setMenuDataRetrieved] = useState(false);

  let { tenant_id } = useParams();

  // Get Tenant Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      console.log("mounted");
      if (tenant_id != undefined) {
        const url = localUrl + "/user/" + tenant_id;
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
  }, []);
console.log("tenantRetrieved",tenantRetrieved)
  
// Get Menu Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = MenuUrl + "/category/" + tenant_id;

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
  }, [searchPhrase, menuDataRetrieved]);

  useEffect(() => {
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    var entry = {
      tenant_id: tenant_id,
      order: [],
    };
    localStorage.setItem("entry", JSON.stringify(entry));

    console.log(existingEntries)
    if (existingEntries == null || existingEntries[0] == null) {
      existingEntries = [];
      existingEntries.push(entry);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      console.log("I ammmm called")
    }

    if (existingEntries != null) {
      if (existingEntries.length >= 1) {
        const found = existingEntries.some(
          (item) => item.tenant_id === tenant_id
        );
        console.log(found);
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
      socket.on('update user', (data) => handleUserUpdated(data));
  console.log("I am socket called!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
  });

  function handleUserUpdated(user) {
    console.log("update SOCKET IS CALLED!!!!!!!!!")
    if (tenantRetrieved) {
      let newData = tenantData.splice();

     
      newData.push(user);
      setTenantData(newData);
      console.log("new data is", newData)
    }
    console.log("tenant new data is", tenantData)
  }
  console.log("search is:", searchPhrase);



  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    if (tenantRetrieved === true) {
      setRestaurants(tenantData[0].openingDays);

      console.log("Tenant Data is defined");
    }
  });
  console.log(restaurants);

  //navigate
  const history = useHistory();
  function redirectcallwaiter() {
    history.push(`/${tenant_id}/Waiter`);
  }


  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

    if (existingEntries > 1){
      var item = existingEntries.find((item) => item.tenant_id === tenant_id);
    } else if (existingEntries != null) {
      var item = existingEntries[0]
    } else {
      var item = existingEntries
    }

  function handlepassdata(data) {
    console.log(data);
    history.push({
      pathname: `/${tenant_id}/MenuDetail`,
      state: data,
    });
  }

  async function handleIncrement(i, v, f) {
    console.log("category is:", i);
    console.log("menuID is:", v);
    console.log("increment clicked");

    console.log(item);
    if (item) {
      var menu = {
        menu_id: v,
        order_quantity: 1,

      };

      if(item.order != undefined){
        if (item.order.length >= 1) {
          console.log("layer 1 is called");
          var items = item.order.find((items) => items.menu_id === v);
          console.log(items)
          if (items) {
            console.log("ITMES IS:", items);
            var newQuantity = parseInt(items.order_quantity) + 1;
            items.order_quantity = newQuantity;
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
         
            setItemval(parseInt(items.order_quantity))
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
      
                console.log(post);
                setItemval({ post });
              });
            })
          }
        else {
          console.log("layer 2 is called");
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
  
            console.log(post);
            setItemval({ post });
          });
        })
  
        }
      } else {
        console.log(item)
    
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
  
          console.log(post);
          setItemval({ post });
        });
      })
      }
      

    } else {
      console.log(item)

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

        console.log(post);
        setItemval({ post });
      });
    })
    }


    }
    
  }


  async function handleDecrement(i, v) {
    console.log("category is:", i);
    console.log("menuID is:", v);
    console.log("decrement clicked");

    if (item) {
      
      if (item.order.length >= 1) {
        console.log("layer 1 is called");
        var items = item.order.find((items) => items.menu_id === v);
        if (items) {
          console.log("ITMES IS:", item.order);
          var newQuantity = parseInt(items.order_quantity) - 1;
          items.order_quantity = newQuantity.toString();
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));

          if (parseInt(items.order_quantity) <= 0) {
            var removeIndex = item.order.findIndex(
              (items) => items.menu_id === v
            );
            console.log(removeIndex);
            console.log(item.order);
            var newItem = item.order.splice(removeIndex, 1);
            console.log(newItem);
            console.log(item.order);

            localStorage.setItem(
              "allEntries",
              JSON.stringify(existingEntries)
            );
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

                console.log(post);
                setItemval({ post });
              });
            });
        }
      } 
    }
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

  return (

      <div className="homepageinnercontainer">
        <div className="homepageuppercontainer">
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
                  /> &nbsp;{textLocation}<br />
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
              <FontAwesomeIcon icon={faMagnifyingGlass} className="feather" />

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
                  <Promo />
                  <div className="homepageheading">Recommended For You</div>
                  <Recommended />
                  <div className="homepageheading">Menu</div>
                  <Menu />
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
                                console.log("I am filtered posts: ", posts);

                                return posts;
                              }
                            })
                            .map((posts, index) => {
                              console.log(posts);
                              if (posts.quantity == 0) {
                                return (
                                  <div className="rendermenucontainer">
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
                                items? items.order_quantity > 0 ? "cartactive" : "cart" : "cart"
                              }
                            >
                              <button
                                className={
                                             items? items.order_quantity > 0 ? "cartbutton"
                                    : "cartbuttonactive" : "cartbuttonactive"
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
                                             items? items.order_quantity > 0 ? "cartbutton"
                                    : "cartbuttonactive" : "cartbuttonactive"
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
                                console.log("items", item.order);

                                
                                return (
                                  <div className="homerendermenucontainer">
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
                              className={
                                items? items.order_quantity > 0 ? "cartactive" : "cart" : "cart"
                              }
                            >
                              <button
                                className={
                                  items? items.order_quantity>0 ? "cartbutton"
                                    : "cartbuttonactive" : "cartbuttonactive"
                                }
                                onClick={handleDecrement.bind(
                                  this,
                                  post.category.id,
                                  posts.id
                                )}
                                disabled={
                                  items? items.order_quantity <= 0 ? true : false : false
                                }
                              >
                                <FontAwesomeIcon
                                  className={
                                    items? items.order_quantity>0 ? "cartbuttontext"
                                      : "disabledcartbuttontext": "disabledcartbuttontext"
                                  }
                                  icon={faMinus}
                                />
                              </button>
                  
                              <input
                                defaultValue={0}
                                type="text"
                                value={items? items.order_quantity : 0}
                                className="carttext"
                              />
                              <button
                                className={
                                  items? items.order_quantity>0 ? "cartbutton"
                                    : "cartbuttonactive":"cartbuttonactive"
                                }
                                onClick={
                      
                                                                     
                                    handleIncrement.bind(
                                    this,
                                    post.category.id,
                                    posts.id,
                                    posts.price
                                  )
                             
                                }
                                disabled={
                                  items? items.order_quantity >= posts.quantity
                                    ? true
                                    : false : false
                                }
                              >
                                <FontAwesomeIcon
                                  className={
                                    items? items.order_quantity>0? items.order_quantity >= posts.quantity? "disabledcartbuttontext"
                                      : "cartbuttontext" : "disabledcartbuttontext" : "disabledcartbuttontext" 
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
  );
}

export default HomePage;
