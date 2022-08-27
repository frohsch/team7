import axios from "axios";
import React from "react";


function GetImage() {
    axios.get("http://localhost:3000/#/content", )
      .then(function (response) {
           // response  
      }).catch(function (error) {
          // 오류발생시 실행
      }).then(function() {
          // 항상 실행
      });
  
}

export default GetImage;
