import React, { useState } from "react";
import { ImLocation2 } from "react-icons/im";
import styled from "styled-components";

const EachPin = styled.div`
  position: absolute;
  left: ${props=>`${props.left}em`};
  top: ${props=>`${props.top}em`};
  opacity: 0.5;
  & svg {
    cursor: pointer;
  }
  :focus svg {
    color: #e795c4;
    opacity: 1;
  }

  :hover svg {
    color: #e795c4;
    opacity: 1;
  }
`;
const Search=({left,top})=>{
    const [isClicked,setIsClicked]=useState(false);
    const onPinClick=()=>{
        setIsClicked((prev)=>!prev);
        console.log(isClicked);
    }
    return (
        <EachPin left={left} top={top} onFocus={onPinClick}>
            {isClicked?(
                <ImLocation2 style={{fontSize:'4rem',color:'#e795c4'}} focusable={true}></ImLocation2>
            ):(
                <ImLocation2 style={{fontSize:'4rem'}} focusable={true}></ImLocation2>
            )}
        </EachPin>
    )
}

export default Search;