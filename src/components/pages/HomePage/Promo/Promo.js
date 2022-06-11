import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Promo.css";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../../socketContext";

function Promo() {
  const history = useHistory();
  const localUrl = process.env.REACT_APP_PROMOURL;
  const [ promoData, setPromoData ] = useState([]);
  const [ promoRetrieved, setPromoRetrieved ] = useState(false);
  let { tenant_id } = useParams();

  // Get Promo Data
  useEffect( () => {
    let mounted = true;

    if ( mounted ) {
      if ( tenant_id != undefined ) {
        const url = localUrl + '/retrieve/' + tenant_id;

        fetch( url, {
          method: 'GET',
          headers: { "content-type": "application/JSON" },
        })
        .then((response) => response.json())
        .then((result) => {
          if ( result.status === 'SUCCESS' ) {
            setPromoData([result.data]); 
            setPromoRetrieved(() => true);
          } else { 
            setPromoRetrieved(() => false); 
          }
        })
      }
    }

    return () => { mounted = false }
  }, [promoRetrieved])

   // socket connection
   const socket = useContext(SocketContext);
  
   useEffect(() => {
    if (socket) {
      socket.on('add promo', (data) => handleAddPromo(data));
      socket.on('update promo', (data) => handleAddPromo(data));
      socket.on('delete promo', (data) => handleAddPromo(data));
    }
  });

  function handleAddPromo(user) {

    if (promoRetrieved) {
    
      let newData = promoData.splice();
 
      newData.push(user);
      setPromoData(newData);
     
    }
  }
  
  function handlepassdata(data){
    history.push({
      pathname: `/${tenant_id}/PromoDetail`,
      state: data
    })
  }

  return (
    <div className="promocontainer" id="home">
      {promoRetrieved == true && promoData[0].map((post) => (
        <div className="promoitem">
          <button onClick={()=>handlepassdata(post)} 
          className="promobutton">
            <img src={post.promoImage} className="promoitemPhoto" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Promo;
