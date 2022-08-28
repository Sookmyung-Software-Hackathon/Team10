import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../fbase";
import { FaHome } from "react-icons/fa";
import Comment from "../components/Comment";
import WriteComment from "../components/WriteComment";
import { useLocation, useParams, useHistory } from "react-router-dom";

const Detail = ({ userObj }) => {
  const nav = useHistory();
  const [large, setLarge] = useState("");
  const [medium, setMedium] = useState("");
  const [comments, setComments] = useState([]);
  const [theDate, setTheDate] = useState("");
  const { id } = useParams();
  const [ridae, setRidae] = useState([]);
  const [editing, setEditing] = useState(false);
  const location = useLocation();

  const toggleEditing = () => setEditing((prev) => !prev);
  useEffect(() => {
    dbService
      .collection("left")
      .doc(id)
      .onSnapshot((doc) => {
        const ridaeArray = {
          l: doc.data().l,
          m: doc.data().m,
          location: doc.data().location,
          name: doc.data().name,
          stringDate: getFormatDate(doc.data().stringDate.toDate()),
        };
        setRidae(ridaeArray);
      });
    dbService
      .collection(id)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        //새로운 snapshhot받을때 배열(commentArray)을 만듦
        const commentArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentArray);
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
    if (medium==='' || large===''){
        alert('갯수를 정확히 입력해주세요');
    }
    else{
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
    }
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
      <Img src="./image/logo.png"
        onClick={() => {
          nav.push("/");
        }}
      />
        {/* <FaHome /> */}
      {/* </Home> */}
      <Where>{ridae.name}</Where>
      {editing ? (
        <form id='update'>
        <Box>
          <Row>
            <Sub>대형</Sub>
            <Content
              type="number"
              placeholder="대형 생리대 개수"
              value={large}
              required
              onChange={largeChange}
            />
          </Row>
          <Row>
            <Sub>중형</Sub>
            <Content
              type="number"
              required
              placeholder="중형 생리대 개수"
              value={medium}
              onChange={mediumChange}
            />
          </Row>
          <Btn type='submit' form='update' onClick={editClick}>저장</Btn>
        </Box>
        </form>
      ) : (
        <LeftDiv>
          <Left>
            대형 : {ridae.l}개 / 업데이트 날짜 : {ridae.stringDate}
            <br />
            <br />
            중형 : {ridae.m}개 / 업데이트 날짜 : {ridae.stringDate}
          </Left>
          <Btn onClick={toggleEditing}>업데이트</Btn>
        </LeftDiv>
      )}
      <WriteComment userObj={userObj} name={id} getDate={getDate} />
      <CommentCon>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Div>
              <Comment commentObj={comment} />
            </Div>
            <Hr />
          </div>
        ))}
      </CommentCon>
    </Container>
  );
};

const Where = styled.div`
  font-size: 10rem;
  text-align: center;
  font-weight: 700;
  margin-top: 10rem;
`;
const Img=styled.img`
  width:20rem;
  position: absolute;
  top: 5rem;
  left: 5rem;
  cursor: pointer;
`;
const LeftDiv = styled.div`
  position: relative;
`;
const Left = styled.div`
  text-align: center;
  background-color: whitesmoke;
  padding: 5rem 0;
  font-size: 5rem;
  font-weight: 400;
  border-radius: 10px;
  margin: 12rem auto 0 auto;
`;

const Btn = styled.button`
  position: absolute;
  right: 2rem;
  top: -14rem;
  float: right;
  border: 1px solid;
  border-radius: 10px;
  cursor: pointer;
  background-color: #aedafc;
  padding: 2rem;
  font-weight: 400;
  font-size: 4rem;

`;
const CommentCon = styled.div`
  width: 80%;
  margin: 10rem auto;
  padding: 1rem 8rem;
  background-color: rgba(0, 0, 0, 0.05);
`;

const Container = styled.div`
  margin: 1.5rem auto;
`;

const Div = styled.div`
  margin: 2rem 5rem;
  font-size: 4rem;
`;

const Hr = styled.hr`
  border: 1px solid rgba(68, 68, 68, 0.2);
  width: 100%;
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
  font-size: 4rem;
`;
const Content = styled.input`
  border: none;
  outline-style: none;
  background-color: whitesmoke;
  width: fit-content;
  font-size: 4rem;
`;

export default Detail;
