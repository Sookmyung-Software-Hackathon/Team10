import React from "react";
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
    return (
        <EachPin left={left} top={top}>
            <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
        </EachPin>
    )
}

export default Search;