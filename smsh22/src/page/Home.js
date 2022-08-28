
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../fbase";
import Each from "../components/Each";
import Search from "../components/Search";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const [numM,setNumM]=useState();
  const [numL,setNumL]=useState();
  const [location,setLocation]=useState();
  const [list,setList]=useState([]);
  useEffect(()=>{
    dbService.collection('left').where("l",'!=',null)
    .onSnapshot((snapshot) => {
      const listArray = snapshot.docs.map((doc) => ({
        id:doc.id,
        name:doc.data().name,
        leftm:doc.data().m,
        leftl:doc.data().l,
        left:parseInt(doc.data().m,10)+parseInt(doc.data().l,10)>0,
    }));
      setList(listArray);
    })
},[]);
  const onBtnClick=(e)=>{
    console.log(e);
    dbService.doc(`left/${e}`).get()
    .then((doc) => {
      // console.log(doc.data());
      setNumM(doc.data().m);
      setNumL(doc.data().l);
      setLocation(doc.data().location);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }
  return (
    <>
      <Container>
        <Box>
          <Map>
            <MapImg src="/image/naver_map.png" alt="사진 출처: NAVER"></MapImg>
            {pinlist.map((each)=>(
              <div 
                onClick={()=>onBtnClick(each.id)}
                key={each.id}  
              >
                <Search 
                  key={each.id}
                  name={each.name}
                  left={each.left}
                  top={each.top}
                />
              </div>
              
            ))}
            <Board>
                <Title>위치: {location} / 중형: {numM}개 / 대형: {numL} 개 </Title>
            </Board>
          </Map>
          <Board>
            <List>
              {/* <div> */}
                {list.map((each)=>(
                  <Each 
                    key={each.id}
                    list={each} 
                  />
              ))}
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


const pinlist=[
  {id:'soon',left: 40, top:11},
  {id:'myung',left: 30, top:19},
  {id:'jin',left: 33, top:12},
  {id:'sae',left: 31, top:24},
  {id:'student',left: 43.5, top:23},
  {id:'prime',left: 42.5, top:32},
  {id:'flaza',left: 34, top:31},
  {id:'science',left: 56, top:33},
  {id:'library',left: 53, top:39},
  {id:'art',left: 42, top:34},
  {id:'music',left: 34.5, top:36.5},
  {id:'medi',left: 39, top:42},

];

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
