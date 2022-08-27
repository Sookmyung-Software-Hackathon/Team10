import React from "react";
import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Home=()=>{
    const nav=useHistory();
    const onBtnClick=()=>{
        nav.push('/detail');
    }

    return (   
        <>
            메인화면
            <button onClick={onBtnClick}>상세페이지로</button>
        </>
    )
}

export default Home;