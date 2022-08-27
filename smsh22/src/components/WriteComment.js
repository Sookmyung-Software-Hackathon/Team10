import React, { useState } from "react";
import { dbService} from "../fbase";
import {v4 as uuidv4} from "uuid";

const WriteComment=({userObj})=>{
    const [comment,setComment]=useState("");
    const onSubmit= async(event)=>{
        if (comment===""){
            return;
        }
        event.preventDefault();
        const commentObj={
                text: comment, //comment은 state인 comment의 value임
                createdAt: Date.now(),
                creatorId:userObj.uid,
        };
        await dbService.collection("prime").doc(`${commentObj.createdAt}`).set(commentObj);
        
        setComment(""); //빈 문자열로 돌아가게끔
    };
    const onChange=(event)=>{
        const{target:{value}}=event;
        setComment(value);
    };
    return(
        <form onSubmit={onSubmit}>
            <div>
                <input 
                    className="factoryInput__input"
                    value={comment} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="댓글을 작성해주세요." 
                    maxLength={120} 
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
                </div>
            </form>
    )
}

export default WriteComment;