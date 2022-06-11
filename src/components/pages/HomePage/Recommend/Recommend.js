import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Recommend.css";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../../socketContext";
import { ThreeDots } from "react-loader-spinner";

function Recommend() {
  const history = useHistory();
  let { tenant_id } = useParams();
  const localUrl = process.env.REACT_APP_MENUURL;
  const tenantUrl = process.env.REACT_APP_TENANTURL
  const [menuData, setMenuData] = useState([]);
  const [menuDataRetrieved, setMenuDataRetrieved] = useState(false);
  const [color, setColor] = useState();
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);

// Get Menu Data
useEffect(() => {
  let mounted = true;

  if (mounted) {
    if (tenant_id != undefined) {
      const url = localUrl + "/all/" + tenant_id;

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

  function handlepassdata(data){
    history.push({
      pathname: `/${tenant_id}/MenuDetail`,
      state: data
    })
  }

  return (
<>
{menuDataRetrieved? ( <div className="recommendcontainer">
      {menuDataRetrieved == true && menuData[0].map((item) => {

        return item.menu.map((post,index)=>{
          if(post.isRecommended == true){
            return (
              <>
                <div className="recommenditem">
                  <button onClick={()=>handlepassdata(post)} className="recommenditembutton">
                    <img src={post.menuImage} className="recommenditemPhoto" />
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
                    style={{background: color}}
                    className="recommendmenubutton"
                    onClick={()=>handlepassdata(post)}
                  >
                    <FontAwesomeIcon
                     
                      icon={faAngleRight}
                      className="recommendicon"
                    />
                  </button>
                </div>
              </>
            )
          }
         
        })
        
       
      })}
    </div>):(<div
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
        </div>)}
</>
   
  );
}

export default Recommend;
