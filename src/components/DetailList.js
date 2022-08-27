import React, { useState } from "react"
import styled from "styled-components"

const DetailDiv = styled.div`
  div {
    margin-bottom: 2rem;
    width: 320px;
  }
`

const DetailList = (props) => {

    const [header, setHeader] = useState("");
    
    return (
        <DetailDiv>
        {props.countList && props.countList.map((item, i) => (
            <div key={i}>
                <label>내용</label>
                <div>
                <textarea cols="70" rows="10"/>
                </div>
            </div>
        ))}
        </DetailDiv>
    )
}

export default DetailList