import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Menu.css";

import Recommendicon from "../../../icons/Recommend.png";
import Categories from "../Categories/Categories";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../../socketContext";

import "../Categories/Categories.css";

function Menu() {
  const history = useHistory();

  let { tenant_id } = useParams();
  const localUrl = process.env.REACT_APP_MENUURL;
  const [menuData, setMenuData] = useState([]);
  const [menuDataRetrieved, setMenuDataRetrieved] = useState(false);

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

  // socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("add category", (data) => handleCategoryAdded(data));
      socket.on("update category", (data) => handleCategoryAdded(data));
      socket.on("delete category", (data) => handleCategoryAdded(data));
    }
  });

  function handleCategoryAdded(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", menuData);

    if (menuDataRetrieved) {
      console.log("I am table retrieved!!!!!!!!!!!!!", user);

      let newData = menuData.splice();

      newData.push(user);
      setMenuData(newData);
      console.log("NEW DATA IS!!!!!!!!!: ", newData);
      console.log("...user is", menuData);
    }
  }


  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  if (existingEntries > 1){
    var item = existingEntries.find((item) => item.tenant_id === tenant_id);
  } else if (existingEntries != null) {
    var item = existingEntries[0]
  } else {
    var item = existingEntries
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

      console.log(item.order)
      if(item.order != undefined){
        if (item.order.length >= 1) {
          console.log("layer 1 is called");
          var items = item.order.find((items) => items.menu_id === v);
          console.log(items)
          if (items) {
            console.log("ITMES IS:", items);
            var newQuantity = items.order_quantity + 1;
            items.order_quantity = newQuantity;
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
         
            setItemval(items.order_quantity)
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

    console.log(item);
    if (item) {


      if (item.order.length >= 1) {
        console.log("layer 1 is called");
        var items = item.order.find((items) => items.menu_id === v);
        if (items) {
          console.log("ITMES IS:", item.order);
          var newQuantity = items.order_quantity - 1;
          items.order_quantity = newQuantity;
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));

          if( items.order_quantity <= 0){
        
            var removeIndex = item.order.findIndex((items) => items.menu_id === v);
            console.log(removeIndex)
            console.log(item.order)
            var newItem = item.order.splice(removeIndex,1);
            console.log(newItem)
            console.log( item.order)
  
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));

          }
          setItemval(items.order_quantity)
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
    
              console.log(post);
              setItemval({ post });
            });
          })
        }
      } 

     

      }
  
    
    
  }

  function handlepassdata(data) {
    console.log(data);
    history.push({
      pathname: `/${tenant_id}/MenuDetail`,
      state: data,
    });
  }
  const [itemval, setItemval] = useState();

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
                      );
                    } else {  
                    
                      var existingEntries = JSON.parse(
                        localStorage.getItem("allEntries")
                      );

                      if(existingEntries !=null || existingEntries[0] != null){
                        var item = existingEntries.find(
                          (item) => item.tenant_id === tenant_id
                        );
  
                        var items = item.order.find(
                          (items) => items.menu_id === posts.id
                        );
                        console.log("items", item.order);
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
                            <div className="quantitydesc">
                                    {items? posts.quantity <= items.order_quantity
                                      ? "Max qty: " + posts.quantity
                                      : null : null}
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

  return (
    <div>
      <Categories />

      {rendermenu()}
    </div>
  );
}

export default Menu;
