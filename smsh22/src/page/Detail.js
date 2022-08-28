import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../fbase";
import Comment from "../components/Comment";
import WriteComment from "../components/WriteComment";
import { useLocation, useParams } from "react-router-dom";
const Detail = ({ userObj }) => {
  const [large, setLarge] = useState("");
  const [medium, setMedium] = useState("");
  const [comments, setComments] = useState([]);
  const [theDate, setTheDate] = useState("");
  const {id}=useParams();
  console.log(id);
  const [num, setNum] = useState([]);

  const [editing, setEditing] = useState(false);
  const location = useLocation();

  const toggleEditing = () => setEditing((prev) => !prev);
  useEffect(() => {
    console.log(location.state);
    dbService
      .doc(`left/${id}`)
      .get()
      .then((doc) => {
        var a = doc.data().stringDate.toDate();
        setTheDate(getFormatDate(a));
        setNum(doc.data());
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    dbService
      .collection(id)
      .orderBy("createdAt", "desc")
      // .where("text",'!=',null)
      .onSnapshot((snapshot) => {
        //새로운 snapshhot받을때 배열(commentArray)을 만듦
        const commentArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentArray);
        console.log(commentArray);
      });
  }, []);

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

  const editClick = async (event) => {
    // setTheDate(getFormatDate(theDate.toDate()));
    event.preventDefault();
    const leftObj = {
      m: medium,
      l: large,
      date: Date.now(),
      stringDate: new Date(),
    };

    await dbService.collection("left").doc(id).update(leftObj);

    setLarge("");
    setMedium("");
    toggleEditing();
    // setTheDate(getFormatDate(num.stringDate.toDate()));
  };

  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    return year + "/" + month + "/" + day;
  }

  const getDate = (d) => {
    setTheDate(d);
  };

  return (
    <Container>
      <Where>{num.name}</Where>
      {editing ? (
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
          <Btn onClick={editClick}>저장</Btn>
        </Box>
      ) : (
        <LeftDiv>
          <Left>
            대형 : {num.l}개 / 업데이트 날짜 : {theDate}
            <br />
            <br />
            중형 : {num.m}개 / 업데이트 날짜 : {theDate}
          </Left>
          <Btn onClick={toggleEditing}>업데이트</Btn>
        </LeftDiv>
      )}
      <WriteComment userObj={userObj} name={id} getDate={getDate} />
      <CommentCon>
        {comments.map((comment) => (
          <>
            <Div>
              <Comment
                // key={}
                commentObj={comment}
              />
            </Div>
            <Hr />
          </>
        ))}
      </CommentCon>
    </Container>
  );
};

const Where = styled.div`
  font-size: 3rem;
`;

const LeftDiv = styled.div`
  position: relative;
`;
const Left = styled.div`
  background-color: whitesmoke;
  padding: 2rem;
  font-size: 1rem;
  border-radius: 10px;
  margin: 10rem auto 0 auto;
`;

const Btn = styled.button`
  position: absolute;
  right: 2rem;
  top: 2rem;
  float: right;
  border: 1px solid;
  cursor: pointer;
  background-color: #aedafc;
  padding: 2rem;
`;
const CommentCon = styled.div`
  width: 80%;
  margin: 10rem auto;
  padding: 1rem 5rem;
  background-color: rgba(68, 68, 68, 0.1);
`;

const Container = styled.div`
  margin: 1.5rem auto;
`;

const Div = styled.div`
  margin-left: 5rem;
`;

const Hr = styled.hr`
  border: 1px solid rgba(68, 68, 68, 0.2);
`;

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

export default Detail;
