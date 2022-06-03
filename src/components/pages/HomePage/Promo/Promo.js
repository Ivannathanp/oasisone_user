import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Promo.css";
import { useParams } from "react-router-dom";

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
            console.log(result)
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
