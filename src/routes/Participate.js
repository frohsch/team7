import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticipateBoard from './Board/ParticipateBoard';

const Participate = ({userObj}) => {
    let navigate = useNavigate();

    const onClick = () => {
        console.log("onClick")
        navigate(`/togetherform`, {
            replace: false,
            state: { userObj: userObj },
        });
    };

    return (
        <div className='container'>
            {userObj!==null && <div style={{
                            margin: "50px 85vw 50px 85vw",
                            padding: "12px",
                            textalign: "center",
                            fontsize: "14px",
                            width: "90px",
                            height: "40px",
                            color: "#707070",
                            backgroundColor: "#CCE8FF",
                            borderRadius: "20px",
                            cursor: "pointer"
                        }}
            >
            <span
                    onClick={onClick}
                        style={{
                        margin: "5px",
                        width: "90px",
                        height: "40px"
                    }}>UPLOAD</span>
            </div>}
            <ParticipateBoard />
        </div>
    );
};
  
export default Participate;