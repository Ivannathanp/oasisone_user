import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import Home from "../icons/Menu1.png";
import Cart from "../icons/Menu2.png";
import Order from "../icons/Menu3.png";
import Badge from "@mui/material/Badge";

function SideBar() {
  const history = useHistory();
  const [isActive1, setisActive1] = useState(false);
  const [isActive2, setisActive2] = useState(false);
  const [isActive3, setisActive3] = useState(false);
  const [tenantID, setTenantID] = useState();
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [tenantData, setTenantData] = useState([]);
  const [objects, getObjectsList] = useState([]);
  const localUrl = process.env.REACT_APP_TENANTURL;
  var existingEntry = JSON.parse(localStorage.getItem("entry"));
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  const [color, setColor] = useState();
;

  useEffect(() => {
    setInterval(() => {
      const localStorageValue = JSON.parse(localStorage.getItem("allEntries"));
      getObjectsList(localStorageValue);
    }, [1000]);
  }, []);

  useEffect(() => {
    if (existingEntries !== null) {
      if (existingEntries.length > 1) {
        existingEntries.map((item) => {
          if (item.tenant_id === existingEntry.tenant_id) {
            setTenantID(item.tenant_id);
            setTenantRetrieved(() => true);
          }
        });
      } else if (existingEntries.length === 1) {
        setTenantID(existingEntry.tenant_id);
        setTenantRetrieved(() => true);
      }

      const localUrl = process.env.REACT_APP_TENANTURL;
      if (tenantID != undefined) {
        const url = localUrl + "/user/" + tenantID;
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
  });

  useEffect(() => {
    if (tenantRetrieved) {
      var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

      if (existingEntries != null || existingEntries[0] != null) {
        var item = existingEntries.find((item) => item.tenant_id === tenantID);
        if (item) {
          var sum = item.order.reduce((accumulator, object) => {
            return accumulator + object.order_quantity;
          }, 0);
          setTotalQuantity(sum);
        }
      }
      if (tenantData[0] != undefined) {
        setColor(tenantData[0].profileColor);
      }
    }
  });

  return (
    existingEntries != null && (
      <div className="outersidebarcontainer">
        <nav className="sidebar">
          <ul className="side-menu">
            <li className="side-item">
              <NavLink
                exact
                to={`/${existingEntry.tenant_id}`}
                style={isActive1 ? { background: color } : null}
                className={isActive1 ? "is-active" : "side-links"}
                isActive={(match, location) => {
                  if (!match) {
                    setisActive1(false);
                  }
                  if (
                    location.pathname === `/${existingEntry.tenant_id}` ||
                    location.pathname ===
                      `/${existingEntry.tenant_id}/PromoDetail`
                  ) {
                    setisActive1(true);
                  }
                  return false;
                }}
              >
                <img src={Home} className={isActive1 ? "icons" : "icons2"} />
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to={`/${existingEntry.tenant_id}/Cart`}
                style={isActive2 ? { background: color } : null}
                className={isActive2 ? "is-active" : "side-links"}
                isActive={(match, location) => {
                  if (!match) {
                    setisActive2(false);
                  }
                  if (
                    location.pathname === `/${existingEntry.tenant_id}/Cart`
                  ) {
                    setisActive2(true);
                  }
                  return false;
                }}
              >
                <Badge
                      sx={{
                        "& .MuiBadge-badge": {
                          color: "#fff",
                          backgroundColor: color
                        }
                      }}
                  badgeContent={tenantRetrieved ? totalQuantity : 0}

                >
                  <img src={Cart} className={isActive2 ? "icons" : "icons2"} />
                </Badge>
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to={`/${existingEntry.tenant_id}/Order`}
                className={isActive3 ? "is-active" : "side-links"}
                style={isActive3 ? { background: color } : null}
                isActive={(match, location) => {
                  if (!match) {
                    setisActive3(false);
                  }
                  if (
                    location.pathname === `/${existingEntry.tenant_id}/Order` ||
                    location.pathname === `/${existingEntry.tenant_id}/Payment`
                  ) {
                    setisActive3(true);
                  }
                  return false;
                }}
              >
                <img src={Order} className={isActive3 ? "icons" : "icons2"} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    )
  );
}

export default SideBar;
