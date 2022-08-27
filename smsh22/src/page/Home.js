
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ImLocation2 } from "react-icons/im";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav=useHistory();
    const onBtnClick=()=>{
        nav.push('/detail');
    }
  return (
    <>
      <button onClick={onBtnClick}>상세페이지로</button>
      <Container>
        <Box>
          <Map>
            <MapImg src="/image/naver_map.png" alt="사진 출처: NAVER"></MapImg>
            <Soon>
              <ImLocation2 />
            </Soon>
            <Myung>
              <ImLocation2 />
            </Myung>
            <Jin>
              <ImLocation2 />
            </Jin>
            <Sae>
              <ImLocation2 />
            </Sae>
            <Student>
              <ImLocation2 />
            </Student>
            <Prime>
              <ImLocation2 />
            </Prime>
            <Flaza>
              <ImLocation2 />
            </Flaza>
            <Science>
              <ImLocation2 />
            </Science>
            <Library>
              <ImLocation2 />
            </Library>
            <Art>
              <ImLocation2 />
            </Art>
            <Music>
              <ImLocation2 />
            </Music>
            <Medi>
              <ImLocation2 />
            </Medi>
          </Map>
          <Pin></Pin>
          <Board>
            <Title>위치</Title>
            <SoonB></SoonB>
            <MyungB></MyungB>
            <JinB></JinB>
            <SaeB></SaeB>
            <StudentB></StudentB>
            <PrimeB></PrimeB>
            <FlazaB></FlazaB>
            <ScienceB></ScienceB>
            <LibraryB></LibraryB>
            <ArtB></ArtB>
            <MusicB></MusicB>
            <MediB></MediB>
          </Board>
        </Box>
      </Container>
    </>
  );
};

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
  width: 90rem;
  border-radius: 10px;
  border: 2px solid;
  margin: 3rem 5rem;
`;
const Pin = styled.div`
  background-color: white;
  width: 5rem;
  height: 5rem;
  border-radius: 10px;
  z-index: 1500;
`;
const Soon = styled.div`
  position: absolute;
  left: 8.8rem;
  top: 2.2rem;
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
const Myung = styled.div`
  position: absolute;
  left: 6.2rem;
  top: 4.2rem;
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
const Jin = styled.div`
  position: absolute;
  left: 7rem;
  top: 2.3rem;
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
const Sae = styled.div`
  position: absolute;
  left: 6.6rem;
  top: 5.3rem;
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
const Student = styled.div`
  position: absolute;
  left: 9.7rem;
  top: 5.1rem;
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
const Prime = styled.div`
  position: absolute;
  left: 9.4rem;
  top: 7.3rem;
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
const Flaza = styled.div`
  position: absolute;
  left: 7.3rem;
  top: 7.5rem;
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
const Science = styled.div`
  position: absolute;
  left: 13rem;
  top: 7.8rem;
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
const Library = styled.div`
  position: absolute;
  left: 12rem;
  top: 9.2rem;
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
const Art = styled.div`
  position: absolute;
  left: 9.1rem;
  top: 8rem;
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
const Music = styled.div`
  position: absolute;
  left: 7.3rem;
  top: 8.7rem;
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
const Medi = styled.div`
  position: absolute;
  left: 8.5rem;
  top: 10rem;
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
  display: block;
`;
const Title = styled.div``;
const SoonB = styled.div``;
const MyungB = styled.div``;
const JinB = styled.div``;
const SaeB = styled.div``;
const StudentB = styled.div``;
const PrimeB = styled.div``;
const FlazaB = styled.div``;
const ScienceB = styled.div``;
const LibraryB = styled.div``;
const ArtB = styled.div``;
const MusicB = styled.div``;
const MediB = styled.div``;

export default Home;
