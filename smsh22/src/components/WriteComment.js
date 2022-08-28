import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const WriteComment = ({ userObj, getDate }) => {
  const [comment, setComment] = useState("");
  const [large, setLarge] = useState("");
  const [medium, setMedium] = useState("");
  const [write, setWrite] = useState(false);
  const [thedate, setThedate] = useState("");

  const onWrite = () => {
    setWrite(true);
  };

  useEffect(() => {
    dbService
      .doc("left/prime")
      .get()
      .then((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        var a = doc.data().stringDate.toDate();
        setThedate(getFormatDate(a));
        console.log(thedate);
        getDate(thedate);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    return year + "/" + month + "/" + day;
  }

  const onSubmit = async (event) => {
    if (comment === "") {
      return;
    }
    event.preventDefault();
    const leftObj = {
      m: medium,
      l: large,
      date: Date.now(),
      stringDate: new Date(),
    };
    await dbService.collection("left").doc("prime").update(leftObj);

    const commentObj = {
      text: comment, //comment은 state인 comment의 value임
      createdAt: Date.now(),
      creatorId: userObj.uid,
    };
    await dbService
      .collection("prime")
      .doc(`${commentObj.createdAt}`)
      .set(commentObj);

    setComment(""); //빈 문자열로 돌아가게끔
    setLarge("");
    setMedium("");
    setWrite(false);
  };

  const commentChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  const largeChange = (event) => {
    const {
      target: { value },
    } = event;
    setLarge(value);
  };

  const mediumChange = (event) => {
    const {
      target: { value },
    } = event;
    setMedium(value);
  };

  return (
    <>
      {write ? (
        <form onSubmit={onSubmit}>
          <Box>
            <Row>
              <Sub>대형</Sub>
              <Content
                type="text"
                placeholder="대형 생리대 개수"
                value={large}
                onChange={largeChange}
              />
            </Row>
            <Row>
              <Sub>중형</Sub>
              <Content
                type="text"
                placeholder="중형 생리대 개수"
                value={medium}
                onChange={mediumChange}
              />
            </Row>
            <Row>
              <Sub>댓글</Sub>
              <ContentRepl
                value={comment}
                onChange={commentChange}
                type="text"
                placeholder="댓글을 작성해주세요."
                maxLength={120}
                rows="2"
                cols="26"
              />
            </Row>
            <Btn type="submit" value="&rarr;" />
          </Box>
        </form>
      ) : (
        <Repl onClick={onWrite}>댓글 작성하기</Repl>
      )}
    </>
  );
};

const Box = styled.div`
  position: relative;
  background-color: whitesmoke;
  margin: 10rem 1rem;
  border-radius: 10px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;
`;
const Sub = styled.div`
  background-color: whitesmoke;
  margin: 1rem;
`;
const Content = styled.input`
  border: none;
  outline-style: none;
  background-color: whitesmoke;
  width: fit-content;
`;

const Btn = styled.input`
  position: absolute;
  right: 2rem;
  top: 2rem;
  float: right;
  border: 1px solid;
  cursor: pointer;
  background-color: #aedafc;
`;

const ContentRepl = styled.textarea`
  border: none;
  outline-style: none;
  background-color: whitesmoke;
  height: auto;
  resize: none;
  overflow: visible;
`;

const Repl = styled.div`
  background-color: whitesmoke;
  padding: 3rem;
  margin: 10rem auto;
  border-radius: 10px;
  text-align: center;
`;

export default WriteComment;
