import React from "react";
import { useHistory } from 'react-router-dom';

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
        <div onClick={onDetailClick}>
            {list.name} {list.left?"⭕":"❌"}
        </div>
    )
}
export default Each;