import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import SideBar from "./components/Navbar/SideBar";
import HomePage from "./components/pages/HomePage/HomePage";
import CartPage from "./components/pages/CartPage/CartPage";
import TransactionPage from "./components/pages/TransactionPage/TransactionPage";
import MenuDetailPage from "./components/pages/MenuDetailPage/MenuDetailPage";
import CallWaiterPage from "./components/pages/CallWaiterPage/CallWaiterPage";
import OrderPage from "./components/pages/OrderPage/OrderPage";
import OrderPlacedPage from "./components/pages/OrderPlacedPage/OrderPlacedPage";
import PromoDetailPage from "./components/pages/PromoPage/PromoPage";
import { io } from "socket.io-client";
import { SocketContext } from "./components/socketContext";
import "./App.css";

function App() {
  const [tenantID, setTenantID] = useState();
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  var existingEntry = JSON.parse(localStorage.getItem("entry"));
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

  // Socket
  const [socket, setSocket] = useState("");
  const [socketRetrieved, setSocketRetrieved] = useState(false);
  const [online, setOnline] = useState(0);

  let peopleOnline = online - 1;
  let onlineText = "";

  if (peopleOnline < 1) {
    onlineText = "No one else is online";
  } else {
    onlineText =
      peopleOnline > 1
        ? `${online - 1} people are online`
        : `${online - 1} person is online`;
  }

  console.log(onlineText);

  

  useEffect(() => {
    if (existingEntries != null) {
      if (existingEntries.length > 1) {
        existingEntries.map((item) => {
          if (item.tenant_id === existingEntry.tenant_id) {
            setTenantID(item.tenant_id);
            setTenantRetrieved(() => true);
            console.log("111111111111111111111111111111111");
            return item.tenant_id;
          }
        });
      } else if (existingEntries.length <= 1) {
        setTenantRetrieved(() => true);
        console.log("22222222222222222222222222222222");
        setTenantID(existingEntry.tenant_id);
        return existingEntry.tenant_id;
      }
    }
  });

  useEffect(() => {
   
     
    
    if(tenantID != undefined){
      console.log("I am called", tenantID);

      const newSocket = io("ws://oasis-one.com:5000", {
        query: {
          tenant_id: tenantID,
        },
      });
      setSocket(newSocket);
      setSocketRetrieved(true);
      return () => newSocket.close();
    }

 
},[tenantRetrieved]);

  useEffect(() => {
    console.log("tennnattttt:", tenantID);

    if (socket && tenantID != undefined) {
      socket.on("visitor enters", (data) => setOnline(data));
      socket.on("visitor exits", (data) => setOnline(data));
      socket.on("roomUsers", ({ room, users }) => {
        outputRoomName(room);
        // outputUsers(users);
      });
      socket.emit("joinRoom", tenantID);
      // console.log("I am app socket", socket.emit("joinRoom", getTenantID()));
    }
  });

  if (socketRetrieved) {
    console.log("app socket is: ", socket);
  }

  function outputRoomName(room) {
    console.log("Room is :", room);
  }

  

  return (
    //basename="/oasisone_tenant"
    <Router>
     
        <div className="app">
        <SocketContext.Provider value={socket}>
          <Switch>
            <Route
              path="/:tenant_id/MenuDetail"
              exact
              component={MenuDetailPage}
            />

            <Route path="/:tenant_id/Waiter" exact component={CallWaiterPage} />
            <Route path="/:tenant_id/Cart" exact component={CartPage} />
            <Route
              path="/:tenant_id/OrderPlaced"
              exact
              component={OrderPlacedPage}
            />

            <div>
              <SideBar />

              <Route path="/:tenant_id" exact component={HomePage} />
              <Route
                path="/:tenant_id/PromoDetail"
                exact
                component={PromoDetailPage}
              />
              <Route path="/:tenant_id/Order" exact component={OrderPage} />
              <Route
                path="/:tenant_id/Payment"
                exact
                component={TransactionPage}
              />
            </div>
          </Switch>
          </SocketContext.Provider>
        </div>
    
    </Router>
  );
}

export default App;
