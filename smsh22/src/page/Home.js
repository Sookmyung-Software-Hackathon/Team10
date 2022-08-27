
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ImLocation2 } from "react-icons/im";
import { dbService } from "../fbase";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const [numM,setNumM]=useState();
  const [numL,setNumL]=useState();
  const [location,setLocation]=useState();
  const [list,setList]=useState([]);
  useEffect(()=>{
    dbService.collection('left').where("l",'!=',null)
    .onSnapshot((snapshot) => {
      const listArray = snapshot.docs.map((doc) => ([
        doc.id,
        doc.data.m+doc.data.l>0,
      ]));
      setList(listArray);
    })
    console.log(list);
},[]);
  const nav=useHistory();
  const onBtnClick=(e)=>{
    dbService.doc(`left/${e}`).get()
    .then((doc) => {
      setNumM(doc.data().m);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    dbService.doc(`left/${e}`).get()
    .then((doc) => {
      setNumL(doc.data().l);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    if (e==='soon'){
      setLocation('B1층 카페 건너편 기둥 옆');
    }
    else if (e==='myung'){
      setLocation('2층 정순옥 라운지 내');
    }
    else if (e==='prime'){
      setLocation('2층(로비) 엘리베이터 옆');
    }
    else if (e==='jin'){
      setLocation('1층 법학도서관 무인반납함 옆');
    }
    else if (e==='sae'){
      setLocation('1층 엘리베이터 앞 협탁');
    }
    else if (e==='student'){
      setLocation('3층 301호 앞 (계단 옆)');
    }
    else if (e==='flaza'){
      setLocation('B1층 엘리베이터 옆');
    }
    else if (e==='science'){
      setLocation('1층 atm기 앞 계단 부근');
    }
    else if (e==='library'){
      setLocation('6층 열람실 화장실 앞');
    }
    else if (e==='art'){
      setLocation('1층 미니 휴게실 사물함 위');
    }
    else if (e==='music'){
      setLocation('1층 자판기 옆');
    }
    else if (e==='medi'){
      setLocation('1층 엘리베이터 좌측 녹색 사물함 옆');
    }

      // nav.push('/detail');
  }
  return (
    <>
      <button onClick={(e)=>onBtnClick(e)}>상세페이지로</button>
      <Container>
        <Box>
          <Map>
            <MapImg src="/image/naver_map.png" alt="사진 출처: NAVER"></MapImg>
            <Soon onClick={()=>onBtnClick('soon')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Soon>
            <Myung onClick={()=>onBtnClick('myung')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Myung>
            <Jin onClick={()=>onBtnClick('jin')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Jin>
            <Sae onClick={()=>onBtnClick('sae')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Sae>
            <Student onClick={()=>onBtnClick('student')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Student>
            <Prime onClick={()=>onBtnClick('prime')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Prime>
            <Flaza onClick={()=>onBtnClick('flaza')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Flaza>
            <Science onClick={()=>onBtnClick('science')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Science>
            <Library onClick={()=>onBtnClick('library')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Library>
            <Art onClick={()=>onBtnClick('art')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Art>
            <Music onClick={()=>onBtnClick('music')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Music>
            <Medi onClick={()=>onBtnClick('medi')}>
              <ImLocation2 style={{fontSize:'4rem',focusable:true}} focusable={true}></ImLocation2>
            </Medi>
          </Map>
          <Board>
            <Title>위치: {location} / 중형: {numM}개 / 대형: {numL} 개 </Title>
          </Board>
          <Board>
            <List>
              {/* {list==null?(
                <> */}
                  <div>순헌관 </div>
                  <div>명신관 </div>
                  <div>진리관 </div>
                  <div>새힘관 </div>
                  <div>학생회관 </div>
                  <div>프라임관 </div>
                  <div>르네상스플라자 </div>
                  <div>과학관 </div>
                  <div>중앙도서관 </div>
                  <div>미술대학 </div>
                  <div>음악대학 </div>
                  <div>약학대학 </div>
                {/* </>
              ):(
                <>initializing..</>
              )} */}
            </List>
          </Board>
        </Box>
      </Container>
    </>
  );
};

const List=styled.div`
  width: 80rem;
  display: grid;
  grid-template-columns: repeat(2,40rem);
  /* background-color: white; */
`;
const Container = styled.div`
  background-color: #aedafc;
  width: 95rem;
  margin:auto;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Map = styled.div`
  position: relative;
`;
const MapImg = styled.img`
  width: 80rem;
  border-radius: 10px;
  border: 2px solid;
  margin: 3rem 5rem;
`;

const Myung = styled.div`
  position: absolute;
  left: 30em;
  top: 19em;
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
const Soon = styled(Myung)`
  left: 40em;
  top: 11em;
`;

const Jin = styled(Myung)`
  left: 33em;
  top: 12em;
  
`;
const Sae = styled(Myung)`
  left: 31em;
  top: 24em;
  opacity: 0.5;
`;
const Student = styled(Myung)`
  left: 43.5em;
  top: 23em;
  opacity: 0.5;
`;
const Prime = styled(Myung)`
  left: 42.5em;
  top: 32em;
  opacity: 0.5;
`;
const Flaza = styled(Myung)`
  left: 34em;
  top: 31em;
  opacity: 0.5;
`;
const Science = styled(Myung)`
  left: 56em;
  top: 33em;
  opacity: 0.5;
`;
const Library = styled(Myung)`
  left: 53em;
  top: 39em;
  opacity: 0.5;
`;
const Art = styled(Myung)`
  left: 42em;
  top: 34em;
  opacity: 0.5;
`;
const Music = styled(Myung)`
  left: 34.5em;
  top: 36.5em;
  opacity: 0.5;
`;
const Medi = styled(Myung)`
  left: 39em;
  top: 42em;
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


export default Home;
