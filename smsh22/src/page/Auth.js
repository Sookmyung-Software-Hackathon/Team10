import React from "react";
import { authService, dbService, firebaseInstance } from "../fbase";
import styled from "styled-components";

const Container = styled.div`
  background-color: #aedafc;
  width: 95rem;
  margin:auto;
`;
const Box = styled.div`
  margin: auto;
  margin-top: 20vh;
  margin-bottom: 3vh;
  width: 80rem;
  /* display: flex; */
  /* flex-direction: column; */
  padding: 1rem;
  font-size: 5rem;
`;
const Btn=styled.div`
  margin-top: 50rem;
  margin: auto;
  background-color: white;
  width: 50rem;
  text-align: center;
  font-weight: 700;
  font-size: 7rem;
  border: none;
  border-radius: 20px;
`;
const B=styled.span`
  font-weight: 700;
`;

const Auth = ({userObj}) => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };
  return (
    <Container>
      <Box>
        로그인은 숙명 구글메일을 통해서 가능합니다.
        원활한 로그인을 위해 <B>인터넷 앱</B>을 이용해주시기 바랍니다.
      </Box>
      <Btn onClick={onSocialClick}>로그인하기</Btn>
    </Container>
  );
};
export default Auth;
