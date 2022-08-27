import axios from "axios";
import React, { useEffect } from "react";

function GetImage() {
    useEffect(()=>{
        axios.get(
          `http://localhost:3000/content/`,
        )
        .then((response) => {
          console.log(response.data);
        }).catch(function (error) {
          console.log(error);
        });
      },[]);
        return(
            <>
                <h1>getimage</h1>
            </>
        );
  
}

export default GetImage;
