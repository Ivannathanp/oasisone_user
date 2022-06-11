import React, { useState, useEffect, useContext } from "react";
import "./Categories.css";
import { Link } from "react-scroll";
import Menuicon from "../../../icons/Menu.svg";
import { useParams } from "react-router-dom";
import $ from "jquery";
import { SocketContext } from "../../../socketContext";

function Categories() {
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
              setMenuData(() => result.data);
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

  var selector = ".categorylist li";
  var selector1 = ".categorylist1 li";

  $(selector1).on("click", function () {
    $(selector1).removeClass("active1");
    $(selector).removeClass("actived");
    $(this).removeClass("active1");
  });

  $(selector).on("click", function () {
    $(selector1).addClass("active1");
    $(selector).removeClass("actived");
    $(this).addClass("actived");
  });

  return (
    <div className="rendercategorycontainers">
      <nav>
        <ul className="categorylist1">
          <li className="categoryitem1">
            <Link
              containerId="containerElement"
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              duration={500}
            >
              <img src={Menuicon} className="menuicons" />
            </Link>
          </li>
        </ul>
      </nav>
      {menuDataRetrieved == true &&
        menuData.map((post) => {
          if (post.category.menu.length != 0) {
            return (
              <nav>
                <ul className="categorylist">
                  <li className="categoryitem">
                    <Link
                      containerId="containerElement"
                      activeClass="actived"
                      to={post.category.name}
                      spy={true}
                      smooth={true}
                      duration={500}
                    >
                      {" "}
                      {post.category.name}
                    </Link>
                  </li>
                </ul>
              </nav>
            );
          }
        })}
    </div>
  );
}

export default Categories;
