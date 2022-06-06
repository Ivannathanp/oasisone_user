import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./CartPage.css";
import NumberFormat from "react-number-format";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "../../Form/FormLib";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useOutlineSelectStyles } from "../../Select/index";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMinus,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Cartemptyicon from "../../icons/EmptyCart.svg";
import Recommendicon from "../../icons/Recommend.png";
import { SocketContext } from "../../socketContext";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { ThreeDots } from "react-loader-spinner";

function CartPage() {
  const history = useHistory();
  let { tenant_id } = useParams();
  const localUrl = process.env.REACT_APP_ORDERURL;

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
  }, []);

  const menuUrl = process.env.REACT_APP_MENUURL;
  const [menuData, setMenuData] = useState([]);
  const [menuDataRetrieved, setMenuDataRetrieved] = useState(false);
  // Get Menu Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = menuUrl + "/category/" + tenant_id;

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

  const tablelUrl = process.env.REACT_APP_TABLEURL;
  const [tableData, setTableData] = useState([]);
  const [tableRetrieved, setTableRetrieved] = useState(false);

  // Get Table Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = tablelUrl + "/" + tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setTableData([result.data]);
              setTableRetrieved(() => true);
            } else {
              setTableRetrieved(() => false);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [tableRetrieved]);

  useEffect(() => {
    var existingSubtotal = JSON.parse(localStorage.getItem("subtotal"));
    var subtotal = {
      tenant_id: tenant_id,
      order: [],
    };

    if (existingSubtotal == null || existingSubtotal[0] == null) {
      existingSubtotal = [];
      existingSubtotal.push(subtotal);
      localStorage.setItem("subtotal", JSON.stringify(existingSubtotal));
    }

    if (existingSubtotal != null) {
      if (existingSubtotal.length >= 1) {
        const found = existingSubtotal.some(
          (item) => item.tenant_id === tenant_id
        );
        console.log(found);
        if (!found) {
          existingSubtotal.push(subtotal);
          localStorage.setItem("subtotal", JSON.stringify(existingSubtotal));
        }
      }
    }

    var existingOrder = JSON.parse(localStorage.getItem("order"));
    var order = {
      tenant_id: tenant_id,      
      order: [],
    };
    if (existingOrder == null || existingOrder[0] == null) {
      existingOrder = [];
      existingOrder.push(order);
      localStorage.setItem("order", JSON.stringify(existingOrder));
    }

    if (existingOrder != null) {
      if (existingOrder.length >= 1) {
        const found = existingOrder.some(
          (item) => item.tenant_id === tenant_id
        );
        console.log(found);
        if (!found) {
          existingOrder.push(order);
          localStorage.setItem("order", JSON.stringify(existingOrder));
        }
      }
    }


  }, []);

  useEffect(()=>{
    
  })

  // socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on('add order', (data) => console.log(data));
      socket.on("update category", (data) => handleCategoryUpdated(data));
      socket.on('add table', (data)=>handleTableAdded(data));
      socket.on('delete table', (data)=>handleTableAdded(data));
      socket.on('remove table', (data)=>handleTableAdded(data));
      socket.on('duplicate table', (data)=>handleTableAdded(data));
      socket.on('add waiter call', (data) => handleTableAdded(data));
      console.log("I am socket called!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
  });
  function handleTableAdded(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", tableData);

    if (tableRetrieved) {
      console.log("I am table retrieved!!!!!!!!!!!!!", user)
    
      let newData = tableData.splice();
 
      newData.push(user);
      setTableData(newData);
      console.log("NEW DATA IS!!!!!!!!!: ", newData);
      console.log("...user is", tableData)
     
    }
  }
  function handleCategoryUpdated(user) {
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

  const [objects, getObjectsList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [emptyQuantity, setEmptyQuantity] = useState(false);
  const [userid, setuserid] = useState();
  var existingEntry = JSON.parse(localStorage.getItem("entry"));
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

  useEffect(()=>{
    var existingUser = JSON.parse(localStorage.getItem("user"));

    console.log("AAAAAAAAAAAAAAAAAAAAAAA layer1", existingUser)
      if(existingUser == null){
        console.log("layer1")
        setuserid("null");
      } else if (existingUser != null) {
        console.log("layer2")
        if(existingUser[0].user_id != null){
          console.log("item layer 1")
          setuserid(existingUser[0].user_id)
        } else if (!item) {
          console.log("item layer 2")
          setuserid("null");
        }
        
      }
    
   
  })

  // useEffect(() => {
  //   setInterval(() => {
  //     const localStorageValue = JSON.parse(localStorage.getItem("allEntries"));
  //     getObjectsList(localStorageValue);
  //   }, [1000]);
  // }, []);

  useEffect(() => {
    if (menuDataRetrieved) {
      var totalItem = [];
      {
        menuData.map((item) => {
          return item.map((post, index) => {
            return post.category.menu.map((posts, index) => {
              if (posts.quantity != 0) {
                console.log("0000000000000000000000000000000000000000000000");
                var existingEntries = JSON.parse(
                  localStorage.getItem("allEntries")
                );
               
                if (existingEntries != null || existingEntries[0] != null)
                {
                  var item = existingEntries.find(
                    (item) => item.tenant_id === tenant_id
                  );
                  if(item){
                    var items = item.order.find(
                      (items) => items.menu_id == posts.id
                    );
                    if (items != undefined) {
                      console.log(items);
                      totalItem.push(items);
                    }
                    console.log(totalItem);

                    var sum = totalItem.reduce((accumulator, object) => {
                      return accumulator + object.order_quantity;
                    }, 0);
                    setTotalQuantity(sum);
                  }
                }
               

               

                

                var existingSubtotal = JSON.parse(
                  localStorage.getItem("subtotal")
                );

                console.log(existingSubtotal);
                if (existingSubtotal.length > 1) {
                  var totalitem = existingSubtotal.find(
                    (item) => item.tenant_id === tenant_id
                  );
                } else if (existingSubtotal.length == 1) {
                  var totalitem = existingSubtotal[0];
                }
                console.log(item);
                console.log(totalItem);
                console.log(totalitem);
                if (items) {
                  console.log(items);
                  var subtotal = {
                    menu_id: posts.id,
                    order_quantity: items.order_quantity,
                    price: posts.price,
                  };
                  console.log(totalitem.order);
                  if (totalitem.order.length >= 1) {
                    var removeIndex = totalitem.order.findIndex(
                      (items) => items.menu_id === posts.id
                    );
                    console.log(removeIndex);
                    if (removeIndex != -1) {
                      console.log("layer 1 is called");
                      totalitem.order.splice(removeIndex, 1);
                      totalitem.order.push(subtotal);

                      localStorage.setItem(
                        "subtotal",
                        JSON.stringify(existingSubtotal)
                      );
                    } else {
                      console.log("layer 2 is called");
                      totalitem.order.push(subtotal);

                      localStorage.setItem(
                        "subtotal",
                        JSON.stringify(existingSubtotal)
                      );
                    }
                  } else if (totalitem.order.length == 0) {
                    console.log("layer 3 is called");
                    totalitem.order.push(subtotal);

                    localStorage.setItem(
                      "subtotal",
                      JSON.stringify(existingSubtotal)
                    );
                  }
                }
              } else if (posts.quantity == 0) {
                var existingEntries = JSON.parse(
                  localStorage.getItem("allEntries")
                );

                if (existingEntries != null || existingEntries[0] != null){
                  var item = existingEntries.find(
                    (item) => item.tenant_id === tenant_id
                  );

                  if(item){
                    var items = item.order.find(
                      (items) => items.menu_id == posts.id
                    );
    
                    if (items != undefined) {
                      console.log(items);
                  }
                }
               
               

                  var existingSubtotal = JSON.parse(
                    localStorage.getItem("subtotal")
                  );
                  console.log(existingSubtotal);
                  if (existingSubtotal.length > 1) {
                    var totalitem = existingSubtotal.find(
                      (item) => item.tenant_id === tenant_id
                    );
                  } else if (existingSubtotal.length == 1) {
                    var totalitem = existingSubtotal[0];
                  }
                  console.log(
                    "sold out is I AM HGERRRRR!!!!!!!!!!!!!!!!!!!!!",
                    posts
                  );
                  console.log(totalitem);

                  //                   var subtotal = {
                  //                     menu_id: posts.id,
                  //                     order_quantity: items.order_quantity,
                  //                     price: posts.price,
                  //                   };
                  //                   console.log(totalItem)
                  //                   console.log(totalitem.order);
                  if (totalitem.order.length > 1) {
                    console.log("layer 1 is called");
                    var removeEmptyIndex = totalitem.order.findIndex(
                      (items) => items.menu_id === posts.id
                    );
                    console.log(
                      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
                      removeEmptyIndex
                    );
                    console.log("Layer1");
                    if (removeEmptyIndex != -1) {
                      totalitem.order.splice(removeEmptyIndex, 1);
                      console.log(totalitem);
                      existingSubtotal.splice();

                      localStorage.setItem(
                        "subtotal",
                        JSON.stringify(existingSubtotal)
                      );
                    }
                  }
                }
              }
            });
          });
        });
      }
    }
  });

  // Total Price
  useEffect(() => {
    var existingSubtotal = JSON.parse(localStorage.getItem("subtotal"));
    console.log(existingSubtotal);
    if (existingSubtotal.length > 1) {
      var totalitem = existingSubtotal.find(
        (item) => item.tenant_id === tenant_id
      );
    } else if (existingSubtotal.length == 1) {
      var totalitem = existingSubtotal[0];
    }

    console.log(totalitem)
    if (totalitem) {
      
      var sumPrice = totalitem.order.reduce((accumulator, object) => {
        var stin = object.price.replace(/,/g, '')
        console.log(stin)
        return accumulator + object.order_quantity * stin;
      }, 0);
      setTotalPrice(sumPrice);
      console.log(sumPrice);
      if (tenantRetrieved) {
        setTotalTax((tenantData[0].taxCharge / 100) * totalPrice);
        setTotalService((tenantData[0].serviceCharge / 100) * totalPrice);
      }
    }
    setTotalPayment(totalPrice + totalTax + totalService);
  });

  const [itemval, setItemval] = useState();
  const [tablenumber, setTableNumber] = useState();
  const [numberofpeople, setNumberOfPeople] = useState(1);
  const [error, setError] = useState(false);
  const [emptyQuantityNotif, setEmptyQuantityNotif] = useState(false);

  const outlineSelectClasses = useOutlineSelectStyles();
  const menuProps = {
    classes: {
      paper: outlineSelectClasses.paper,
      list: outlineSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  const iconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon
        className={props.className + " " + outlineSelectClasses.icon}
      />
    );
  };

  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  if (existingEntries !== null) {
    var item = existingEntries.find((item) => item.tenant_id === tenant_id);
  }

  async function handleIncrement(i, v, f) {
    console.log("category is:", i);
    console.log("menuID is:", v);
    console.log("increment clicked");

    console.log(item);
    if (item) {
      console.log(item.order.length);
      if (item.order.length >= 1) {
        console.log("layer 1 is called");
        var items = item.order.find((items) => items.menu_id === v);
        console.log(items);
        if (items) {
          console.log("ITMES IS:", items);
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

                console.log(post);
                setItemval({ post });
              });
            });
        }
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

          if (items.order_quantity <= 0) {

            var existingSubtotal = JSON.parse(
              localStorage.getItem("subtotal")
            );

            console.log(existingSubtotal);
            if (existingSubtotal.length > 1) {
              var totalitem = existingSubtotal.find(
                (item) => item.tenant_id === tenant_id
              );
            } else if (existingSubtotal.length == 1) {
              var totalitem = existingSubtotal[0];
            }

            var removeTotalIndex = totalitem.order.findIndex(
              (items) => items.menu_id === v
            );
            console.log(removeTotalIndex);
            if (removeTotalIndex != -1) {
              console.log("layer 1 is called");
              totalitem.order.splice(removeTotalIndex, 1);
   

              localStorage.setItem(
                "subtotal",
                JSON.stringify(existingSubtotal)
              );
            }

            var removeIndex = item.order.findIndex(
              (items) => items.menu_id === v
            );
            console.log(removeIndex);
            console.log(item.order);
            var newItem = item.order.splice(removeIndex, 1);
            console.log(newItem);
            console.log(item.order);

            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
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

                console.log(post);
                setItemval({ post });
              });
            });
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

  function renderHeader() {
    return (
      <div className="cartrenderheader" >
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

  function renderEmptyHeader() {
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

  function handlenotification() {
    if (emptyQuantityNotif) {
      setEmptyQuantityNotif(false);
    } else {
      setEmptyQuantityNotif(true);
      setTimeout(() => {
        setEmptyQuantityNotif(false);
      }, 3000); //wait 5 seconds
    }
  }
console.log(userid)

  async function createOrder(values, setSubmitting) {

    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    var existingSubtotal = JSON.parse(localStorage.getItem("subtotal"));


      const url = localUrl + "/create/" + tenant_id;
console.log("user id", userid)
    const payload = JSON.stringify({
      user_id: userid,
      order_table: tablenumber,
      order_menu: item.order,
      order_item: totalQuantity,
      order_total: totalPrice,
      order_servicecharge: totalService,
      order_taxcharge: totalTax,
      user_name: values.name,
      user_phonenumber: values.phonenumber,
      order_instruction: values.specialinstruction,
      user_guest: numberofpeople,
    });

    console.log("Payload is:", payload);
    if (!emptyQuantityNotif) {
      console.log("I AM OKAY!");
      fetch(url, {
        method: "POST",
        body: payload,
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "SUCCESS") {
            console.log(result.data[0])
            socket.emit("add order", result.data);
            
            var removeOrder = existingEntries.findIndex(
              (item) => item.tenant_id === tenant_id
            );

            existingEntries.splice(removeOrder, 1);
            existingSubtotal.splice(removeOrder, 1);
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
            localStorage.setItem("subtotal", JSON.stringify(existingSubtotal));



            var existingOrder = JSON.parse(
              localStorage.getItem("order")
            );
            var orderItem = existingOrder.find(
              (item) => item.tenant_id === tenant_id
            );
            console.log(result.data);
           console.log(result.data[0].order_id);
           var orderID = {
             order_id : result.data[0].order_id
           }
            orderItem.order.push(orderID);
            
            

                  localStorage.setItem(
                    "order",
                    JSON.stringify(existingOrder)
                  );
               

    var existingUser = JSON.parse(localStorage.getItem("user"));
    var user = {
      user_id: result.data[0].user_id,
  };

   
      existingUser = [];
      existingUser.push(user);
      localStorage.setItem("user", JSON.stringify(existingUser));
   



            history.push({
              pathname: `/${tenant_id}/OrderPlaced`,
              state: result.data[0],
            });
          
          } else {
            console.log(result.data);
          }
          setSubmitting(false);
        });
    } else {
      console.log("I am empty")
    }
  }

  // useEffect(()=>{

  //   if(orderRetrieved){
  //     {orderRetrieved == true &&
  //       orderData.map((item) => {
  //         console.log(item);
  //         return item.map((post, index) => {
  //           console.log(post);

  //           if (existingOrder != null) {
  //             console.log(existingOrder);

  //             if (existingOrder.length > 1) {
  //               var order = existingOrder.find(
  //                 (item) => item.tenant_id === tenant_id
  //               );
  //             } else if (existingOrder.length == 1) {
  //               var order = existingOrder[0];
  //             }

  //             if (order && tenantRetrieved) {
  //               console.log(order);
  //               if (order.order.length >= 1) {
  //                 if (post.order_status < 4) {
  //                   const found = order.order.some(
  //                     (item) => item.order_id === post.order_id
  //                   );
  //                   console.log("found1", found);
  //                   if (!found) {
  //                     return (
  //                       <div className="noneorder">
  //                         <div style={{ width: "374px" }}>
  //                           <div className="ordertitle">
  //                             Current Order
  //                           </div>
  //                         </div>
  //                         <div className="note">
  //                           <div className="ordernone">
  //                             Looks like you don’t have any Current
  //                             Order status
  //                           </div>
  //                         </div>
  //                       </div>
  //                     );
  //                   } else {
  //                     const orderDate = new Date(post.order_time);

  //                     return (
  //                       <div className="currentorderinnercontainer">
  //                         <div
  //                           style={{
  //                             width: "374px",
  //                             marginTop: "3%",
  //                           }}
  //                         >
  //                           <div className="ordertitle">
  //                             Current Order
  //                           </div>
  //                         </div>
  //                         <div className="currentordercontainer">
  //                           <div style={{ padding: "15px" }}>
  //                             <div className="row1">
  //                               {post.order_status == 1 ? (
  //                                 <div className="pending">Pending</div>
  //                               ) : post.order_status == 2 ? (
  //                                 <div className="orderplaced">
  //                                   Order Placed
  //                                 </div>
  //                               ) : post.order_status == 3 ? (
  //                                 <div className="served">Served</div>
  //                               ) : post.order_status == 4 ? (
  //                                 <div className="payment">Payment</div>
  //                               ) : post.order_status == 5 ? (
  //                                 <div className="complete">
  //                                   Complete
  //                                 </div>
  //                               ) : post.order_status == 6 ? (
  //                                 <div className="rejected">
  //                                   Rejected
  //                                 </div>
  //                               ) : null}

  //                               <button
  //                                 className="callwaiter"
  //                                 onClick={() =>
  //                                   history.push({
  //                                     pathname: `/${tenant_id}/Waiter`,
  //                                     state: post,
  //                                   })
  //                                 }
  //                               >
  //                                 Call The Waiter
  //                               </button>
  //                             </div>
  //                             <div className="row2">
  //                               <div className="orderid">
  //                                 {post.order_id}
  //                               </div>
  //                               <div className="ordertext">
  //                                 Store :&nbsp;{tenantData[0].name}
  //                               </div>
  //                               <div className="ordertext">
  //                                 Time :&nbsp;{" "}
  //                                 {/* {orderDate.toLocaleTimeString("en-US")} */}
  //                                 {moment(post.order_time).format("MMMM Do YYYY, h:mm:ss a")}
                              
  //                               </div>
  //                             </div>
  //                             {post.order_menu.map((posts, index) => {
  //                               console.log(posts);

  //                               return (
  //                                 <div className="row3">
  //                                   <div style={{ display: "flex" }}>
  //                                     <div className="text1">
  //                                       {posts.orderQty}
  //                                     </div>
  //                                     <div className="text2">
  //                                       {posts.name}
  //                                     </div>
  //                                   </div>
  //                                   <div className="menurighttext">
  //                                     <div className="text3">
  //                                       <NumberFormat
  //                                         value={posts.price}
  //                                         prefix="Rp. "
  //                                         decimalSeparator="."
  //                                         thousandSeparator=","
  //                                         displayType="text"
  //                                       />
  //                                     </div>
  //                                   </div>
  //                                 </div>
  //                               );
  //                             })}

  //                             <div className="row4">
  //                               <div className="innerrow">
  //                                 <div className="text1">
  //                                   Subtotal :
  //                                 </div>
  //                                 <div className="text3">
  //                                   <NumberFormat
  //                                     value={post.order_total}
  //                                     prefix="Rp. "
  //                                     decimalSeparator="."
  //                                     thousandSeparator=","
  //                                     displayType="text"
  //                                   />
  //                                 </div>
  //                               </div>

  //                               <div className="innerrow">
  //                                 <div className="text1">
  //                                   Tax {tenantData[0].taxCharge}%:
  //                                 </div>
  //                                 <div className="text3">
  //                                   <NumberFormat
  //                                     value={post.order_taxcharge}
  //                                     prefix="Rp. "
  //                                     decimalSeparator="."
  //                                     thousandSeparator=","
  //                                     displayType="text"
  //                                   />
  //                                 </div>
  //                               </div>

  //                               <div className="innerrow">
  //                                 <div className="text1">
  //                                   Service{" "}
  //                                   {tenantData[0].serviceCharge}%:
  //                                 </div>
  //                                 <div className="text3">
  //                                   <NumberFormat
  //                                     value={post.order_servicecharge}
  //                                     prefix="Rp. "
  //                                     decimalSeparator="."
  //                                     thousandSeparator=","
  //                                     displayType="text"
  //                                   />
  //                                 </div>
  //                               </div>
  //                             </div>
  //                             <div className="row5">
  //                               <div className="text1">
  //                                 Bill Amount :
  //                               </div>

  //                               <div className="text3">
  //                                 <NumberFormat
  //                                   value={
  //                                     post.order_total +
  //                                     post.order_taxcharge +
  //                                     post.order_servicecharge
  //                                   }
  //                                   prefix="Rp. "
  //                                   decimalSeparator="."
  //                                   thousandSeparator=","
  //                                   displayType="text"
  //                                 />
  //                               </div>
  //                             </div>
  //                             <div className="paybuttoncontainer">
  //                               <button
  //                                 className={
  //                                   post.order_status == 1 ||
  //                                   post.order_status == 2
  //                                     ? "paymentbutton"
  //                                     : "paymentbuttonactive"
  //                                 }
  //                                 onClick={() =>
  //                                   history.push({
  //                                     pathname: `/${tenant_id}/Payment`,
  //                                     state: post,
  //                                   })
  //                                 }
  //                                 disabled={
  //                                   post.order_status == 1 ||
  //                                   post.order_status == 2
  //                                     ? true
  //                                     : false
  //                                 }
  //                               >
  //                                 Payment
  //                               </button>
  //                             </div>
  //                           </div>
  //                         </div>{" "}
  //                       </div>
  //                     );
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         });
  //       })}
  //   }
  // })

  function renderButton() {
    return (
      <div className="orderbutton">
        <button
          className="additemcartbutton"
          type="submit"
          // disabled={true}
          onClick={() => {
            console.log("pressed", emptyQuantity);
            if (tablenumber == null) {
              setError(true);
            }
            {
              menuDataRetrieved == true &&
                menuData.map((item) => {
                  return item.map((post, index) => {
                    return post.category.menu.map((posts, index) => {
                      var existingEntries = JSON.parse(
                        localStorage.getItem("allEntries")
                      );
                      var item = existingEntries.find(
                        (item) => item.tenant_id === tenant_id
                      );

                      var items = item.order.find(
                        (items) => items.menu_id === posts.id
                      );
                      if (items) {
                        if (posts.quantity == 0) {
                          handlenotification();
                        }
                      }
                    });
                  });
                });
            }
          }}
        >
          <div className="orderbuttontext">
            Total Cost:&nbsp;
            <NumberFormat
              value={totalPayment}
              prefix=" Rp. "
              decimalSeparator="."
              thousandSeparator=","
              displayType="text"
            />
            &nbsp;| Confirm Order&nbsp;
            <div className="orderbuttontexticon">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </button>
      </div>
    );
  }

  function handleDeleteMenu(v) {
    console.log(v);
    var removeIndex = item.order.findIndex((items) => items.menu_id === v);
    console.log(removeIndex);
    console.log(item.order);
    var newItem = item.order.splice(removeIndex, 1);
    console.log(newItem);
    console.log(item.order);

    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  }

  console.log(emptyQuantity);

  return (
    <>
      {menuDataRetrieved && item?  item.order.length > 0 ? (
        <div className="outercontainer">
          <div className="cartinnercontainer">
            {renderHeader()}
            <div className={emptyQuantityNotif ? "cartnotification" : "hidden"}>
              <div className="notificationtextcontainer">
                <div className="cartnotificationtext">
                  Please remove empty items
                </div>
              </div>

              <div className="notificationclose">
                <button
                  className="cartnotifclosebutton"
                  onClick={handlenotification}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>

            <div className="backgroundcontainer">
              <div className="column">
                <div className="headingr">Items :</div>
                <div className="headingl">{totalQuantity}</div>
              </div>
              <div className="line"></div>
              <div className="column">
                <div className="headingr">Subtotal :</div>
                <div className="headingl">
                  <NumberFormat
                    value={totalPrice}
                    prefix="Rp. "
                    decimalSeparator="."
                    thousandSeparator=","
                    displayType="text"
                  />
                </div>
              </div>
              <div className="line"></div>
              <div className="column">
                <div className="headingr">Service Charge :</div>
                <div className="headingl">
                  <NumberFormat
                    value={totalService}
                    prefix="Rp. "
                    decimalSeparator="."
                    thousandSeparator=","
                    displayType="text"
                  />
                </div>
              </div>
              <div className="line"></div>

              <div className="column">
                <div className="headingr">Tax(%) : </div>
                <div className="headingl">
                  <NumberFormat
                    value={totalTax}
                    prefix="Rp. "
                    decimalSeparator="."
                    thousandSeparator=","
                    displayType="text"
                  />
                </div>
              </div>
            </div>

            <div className="cartbackgroundoverlay"></div>

            <div className="cartrestaurantcontainer">
              <div style={{ height: "100%" }}>
                <div className="cartmenucontainer">
                  {menuData.map((item) => {
                    return item.map((post, index) => {
                      return post.category.menu.map((posts, index) => {
                        var existingEntries = JSON.parse(
                          localStorage.getItem("allEntries")
                        );

                        if (existingEntries != null || existingEntries[0] != null)
                        {
                          var item = existingEntries.find(
                            (item) => item.tenant_id === tenant_id
                          );
  if(item){
    var items = item.order.find(
      (items) => items.menu_id === posts.id
    );
    console.log("items", item.order);
  }
                          
                        }
                       

                        if (items) {
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

                                  <div className="soldoutmenutext">
                                    Sold Out
                                  </div>
                                </div>

                                <div className="cartcontainer">
                                  <button
                                    className="deletemenubutton"
                                    onClick={() => handleDeleteMenu(posts.id)}
                                  >
                                    <DeleteOutlineOutlinedIcon className="deleteicon" />
                                  </button>
                                </div>
                              </div>
                            );
                          } else {
                            console.log(posts);

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
                                  <div className="quantitydesc">
                                    {posts.quantity <= items.order_quantity
                                      ? "Max qty: " + posts.quantity
                                      : null}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }
                      });
                    });
                  })}
                </div>

                <div className="form">
                  <Formik
                    initialValues={{
                      name: "",
                      phonenumber: "",
                      specialinstruction: "",
                      tablenumber: "",
                      numberofpeople: "1",
                    }}
                    validationSchema={Yup.object().shape({
                      name: Yup.string().required("Required"),
                      phonenumber: Yup.string()
                        .required("Required")
                        .matches(
                          /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
                          "Phone number is not valid."
                        ),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(values);
                      console.log(tablenumber);
                      console.log(numberofpeople);
                      createOrder(values, setSubmitting);
                    }}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <div className="formcontainer">
                          <div className="forminputs">
                            <div className="formlabel">
                              Name<div className="span">*</div>
                            </div>
                            <TextField
                              name="name"
                              type="text"
                              placeholder="Enter Your Name"
                            />
                          </div>
                          <div className="forminputs">
                            <div className="formlabel">
                              Phone Number<div className="span">*</div>
                            </div>
                            <TextField
                              name="phonenumber"
                              type="text"
                              placeholder="Enter Your Phone Number"
                            />
                          </div>
                          <div className="forminputs">
                            <div className="formlabel">
                              Special Instructions (optional)
                            </div>
                            <TextField
                              name="specialinstruction"
                              type="text"
                              placeholder="E.g No onions, please"
                            />
                          </div>
                          <div className="forminputs">
                            <div className="formlabel">
                              Select Your Table<div className="span">*</div>
                            </div>
                            <FormControl error={error}>
                              <Select
                                defaultValue=""
                                disableUnderline
                                classes={{ root: outlineSelectClasses.select }}
                                MenuProps={menuProps}
                                IconComponent={iconComponent}
                                value={tablenumber}
                                onChange={(e) => {
                                  setTableNumber(e.target.value);
                                  setError(false);
                                }}
                                displayEmpty
                                renderValue={(value) =>
                                  value.length === 0 ? (
                                    <div className="placeholder">
                                      Select Your Table
                                    </div>
                                  ) : (
                                    value
                                  )
                                }
                              >
                                {tableData.map((post) => {
                                  return post.map((posts, index) => {
                                    console.log(posts);
                                    if (posts.table.status == "EMPTY") {
                                      return (
                                        <MenuItem value={posts.table.index}>
                                          Table {posts.table.index}
                                        </MenuItem>
                                      );
                                    }
                                  });
                                })}
                              </Select>
                              {error && (
                                <FormHelperText className="selecterror">
                                  Select a value
                                </FormHelperText>
                              )}
                            </FormControl>
                          </div>
                          <div className="forminputs">
                            <div className="formlabel">Number of People</div>
                            <div className="numberofpeople">
                              <button
                                type="button"
                                className={
                                  numberofpeople == 1
                                    ? "sbuttonL"
                                    : "sbuttonactiveL"
                                }
                                onClick={() => {
                                  setNumberOfPeople(numberofpeople - 1);
                                }}
                                disabled={numberofpeople == 1 ? true : false}
                              >
                                <FontAwesomeIcon
                                  className="sbuttontext"
                                  icon={faMinus}
                                />
                              </button>

                              <div className="snumberpeople">
                                {numberofpeople}&nbsp;Guest
                              </div>

                              <button
                                type="button"
                                className={
                                  numberofpeople < 1
                                    ? "sbuttonR"
                                    : "sbuttonactiveR"
                                }
                                onClick={() => {
                                  setNumberOfPeople(numberofpeople + 1);
                                }}
                              >
                                <FontAwesomeIcon
                                  className="sbuttontext"
                                  icon={faPlus}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        {isSubmitting? ( <div className="orderbutton"><div className="loading"><ThreeDots color="#f10c0c" height={80} width={80} /></div></div>) 
: (renderButton())
                        }
                 
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="outercontainer">
          <div className="cartinnercontainer">
            {renderEmptyHeader()}
            <div className="waiterbackgroundcontainer">
              <div className="backgroundoverlay"></div>
            </div>

            <div className="emptycartcontainer">
              <div className="centered">
                <img src={Cartemptyicon} className="cartemptyicon" />

                <div className="emptycart">Your Cart is Empty.</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="outercontainer">
          <div className="cartinnercontainer">
            {renderEmptyHeader()}
            <div className="waiterbackgroundcontainer">
              <div className="backgroundoverlay"></div>
            </div>

            <div className="emptycartcontainer">
              <div className="centered">
                <img src={Cartemptyicon} className="cartemptyicon" />

                <div className="emptycart">Your Cart is Empty.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartPage;
