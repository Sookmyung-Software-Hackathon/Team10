import React from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

const Div=styled.div`
    font-size: 4rem;
`;
const Each=({list})=>{
    const nav=useHistory();
    const onDetailClick=()=>{
        nav.push({
            pathname: `/detail/${list.id}`,
            state:{
                leftm:list.leftm,
                leftl:list.leftl,
                name:list.name,
                id:list.id,
            }
        })
    }
    return(
        <Div onClick={onDetailClick}>
            {list.name} {list.left?"⭕":"❌"}
        </Div>
    )
}
export default Each;