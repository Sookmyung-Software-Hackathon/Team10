import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { dbService } from "../fbase";
import Comment from "../components/Comment";
import WriteComment from "../components/WriteComment";
import { useLocation } from "react-router-dom";
const Where=styled.div`
    font-size: 3rem;
`;
const Left = styled.div`
    font-size: 1rem; 
`;
const CommentCon=styled.div`
    width: 80%;
    text-align: center;
`;
const Container=styled.div`
    margin: 1.5rem 0.5rem;
`;
const Detail=({userObj})=>{
    const location=useLocation();
    console.log(location.state);
    const [comments,setComments]=useState([]);
    const [numM,setNumM]=useState([]);
    const [numL,setNumL]=useState([]);
    useEffect(()=>{
        dbService.collection('prime').where("num",'!=',null).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                if(doc.id=='leftL'){
                    setNumL(doc.data());
                }
                else if (doc.id=='leftM'){
                    setNumM(doc.data());
                }
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        dbService.collection('prime')
        .orderBy("createdAt","desc")
        // .where("text",'!=',null)
        .onSnapshot((snapshot)=>{
            //새로운 snapshhot받을때 배열(commentArray)을 만듦
            const commentArray=snapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data(),
            }));
            setComments(commentArray); 
            //console.log(commentArray);
        })
    },[]);
    return(
        <Container>
            <Where>위치 어딘지</Where>
            <Left>대형 : {numL.num}개 / 업데이트 날짜 : {numL.update}</Left>
            <Left>중형 : {numM.num}개 / 업데이트 날짜 : {numM.update}</Left>
            <WriteComment userObj={userObj}/>
            <CommentCon>
                {comments.map((comment)=>(
                    <Comment 
                        // key={}
                        commentObj={comment}
                    />
                ))}
            </CommentCon>
        </Container>
    )
}

export default Detail;