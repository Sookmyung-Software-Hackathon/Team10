import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { deleteUser } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
        // var email = user.email;
        // var emailIndex = email.indexOf("@") + 1;
        // var emailform = email.substring(emailIndex);
        // if (emailform !== "sookmyung.ac.kr") {
        //   alert("숙명 구글메일로만 로그인 가능합니다.");
        //   deleteUser(user);
        //   setUserObj(null);
        //   setIsLoggedIn(false);
        //   authService.signOut().then(()=>{
        //     console.log('로그아웃');
        //   });
        // }
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Team10</footer>
    </>
  );
}
export default App;
