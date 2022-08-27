import React from "react";
import { authService, dbService, firebaseInstance } from "../fbase";

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
    <>
        로그인은 숙명 구글메일을 통해서 가능합니다.<br/>
        원활한 로그인을 위해 <b>인터넷 앱</b>을 이용해주시기 바랍니다.
        <button onClick={onSocialClick}>로그인하기</button>
    </>
  );
};
export default Auth;
