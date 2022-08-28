import React, { useState } from "react";
import { ImLocation2 } from "react-icons/im";
import styled from "styled-components";
import { dbService } from "../fbase";

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
const Board = styled.div`
  /* display: block; */
  width: 80rem;
  background-color: white;
  margin: auto;
  margin-bottom: 3rem;
  border-radius: 10px;
  padding: 2rem 4rem;
`;
const Title = styled.div``;
const Search=({name,left,top})=>{
    return (
        <>        
        <EachPin left={left} top={top}>
            <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
        </EachPin>
        {/* {toggle &&
            <Board>
                <Title>위치: {name} / 중형: {numM}개 / 대형: {numL} 개 </Title>
            </Board>
        } */}
        </>

    )
}

export default Search;