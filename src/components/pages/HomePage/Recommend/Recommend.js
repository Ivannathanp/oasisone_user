import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Recommend.css";
import { useParams } from "react-router-dom";

function Recommend() {
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

  function handlepassdata(data){
    history.push({
      pathname: `/${tenant_id}/MenuDetail`,
      state: data
    })
  }

  return (
    <div className="recommendcontainer">
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
    </div>
  );
}

export default Recommend;
