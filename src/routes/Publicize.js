import React from 'react';
import AdBoard from './Board/AdBoard';

const Publicize = () => {
    return (
        <div className='container'>
            <div style={{
                            margin: "50px 85vw 50px 85vw",
                            padding: "12px",
                            textalign: "center",
                            fontsize: "14px",
                            width: "90px",
                            height: "40px",
                            color: "#707070",
                            backgroundColor: "#CCE8FF",
                            borderRadius: "20px"
                        }}
            ><span style={{
                margin: "5px",
                width: "90px",
                height: "40px"
            }}>UPLOAD</span></div>
            <AdBoard />
        </div>
    );
};
  
export default Publicize;