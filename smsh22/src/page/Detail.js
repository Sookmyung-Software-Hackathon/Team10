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
  const [editedLarge, setEditedLarge] = useState("");
  const [medium, setMedium] = useState("");
  const [editedMedium, setEditedMedium] = useState("");
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
    setEditedLarge(value);
  };

  const mediumChange = (event) => {
    const {
      target: { value },
    } = event;
    setMedium(value);
    setEditedMedium(value);
  };

  const editClick = async (event) => {
    event.preventDefault();
    // setTheDate(getFormatDate(theDate.toDate()));
    var an= window.confirm("수량을 업데이트 하시겠습니까?");
    if (an){
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
    }else{

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
      <Img src="./image/logo2.png"
        onClick={() => {
          nav.push("/");
        }}
      />
        {/* <FaHome /> */}
      {/* </Home> */}
      <Where onClick={()=>window.location.reload()}>{ridae.name}</Where>
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
            대형 : {ridae.l}개 / 중형 : {ridae.m}개
            <br/>
            <br/>
            업데이트 날짜 : {ridae.stringDate}
          </Left>
          <Btn onClick={toggleEditing}>업데이트</Btn>
        </LeftDiv>
      )}
      <CommentCon>
        {/* <Thumbs>
          👍
        </Thumbs>        
        <Thumbs>
          👎
        </Thumbs> */}
        <WriteComment 
          // userObj={userObj} 
          name={id} 
          getDate={getDate} />
        {comments.length>0?(
          comments.map((comment) => (
            <div 
            // key={comment.id}
            >
                <Hr/>
                <Comment commentObj={comment} />
            </div>
          ))
        ):(
          <Div>
              아직 댓글이 없습니다.
          </Div>
        )}
      </CommentCon>
    </Container>
  );
};

const Where = styled.div`
  font-size: 10rem;
  text-align: center;
  font-weight: 700;
  margin-top: 11rem;
`;
const Img=styled.img`
  width:22rem;
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
  margin: 16rem auto 0 auto;
`;

const Btn = styled.button`
  position: absolute;
  right: 2rem;
  top: -14rem;
  float: right;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  background-color: #aedafc;
  padding: 2rem;
  font-weight: 400;
  font-size: 4rem;
  color:#fff;

`;
const CommentCon = styled.div`
  width: 100%;
  margin:auto;
  
  padding: 0 0 2rem ;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.05);
`;
const Thumbs=styled.div`
  
`;

const Container = styled.div`
  margin: 1.5rem auto;
`;

const Div = styled.div`
  margin: 2rem 4rem 1rem;
  padding: 1rem 2rem;
  font-size: 3rem;
  color: gray;
`;

const Hr = styled.div`
  margin: 0 auto;
  border-bottom: 1px solid rgba(68, 68, 68, 0.2);
  width: 90%;
`;

const Box = styled.div`
  position: relative;
  background-color: whitesmoke;
  margin: 16rem 1rem 9rem 1rem;
  border-radius: 10px;
  padding: 3rem 0;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;
`;
const Sub = styled.div`
  background-color: whitesmoke;
  margin: 1rem;
  font-size: 5rem;
  width: 13%;
`;
const Content = styled.input`
  border: none;
  outline-style: none;
  background-color: whitesmoke;
  width: 50%;
  font-size: 5rem;
`;

export default Detail;
