import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import { useUser } from "./components/Auth/UserContext";
import RoutingComponent from "./routes/RoutingComponent";

function App() {
  const { user, login } = useUser();

  // useEffect(() => {
  // if (localStorage.getItem('memberEmail') !== null) {
  // const saveUser = {
  //   'memberEmail': localStorage.getItem('memberEmail'),
  //   'memberPwd': localStorage.getItem('memberPwd')
  // };

  //   if (saveUser !== null) {
  //     sendAxiosRequest("/api/member/login", 'POST', formToJSON(saveUser), response => {
  //       //   //   console.log(response.data);
  //       console.log(localStorage.getItem('memberEmail'));
  //       console.log(localStorage.getItem('memberPwd'));
  //       // if (response.data.loginUser !== null) {
  //         login(response.data.loginUser)
  //       // }
  //       // login(saveUser);
  //       //     login(localStorage.getItem('data'));
  //       //     // console.log(user);
  //       //   // }, error => {
  //         //     // console.log(error);
  //       });
  //     }
  //   }
  //   }, []);

  return (
    <Router>
      <div className="App">
        <RecoilRoot>
          <RoutingComponent />
        </RecoilRoot>
      </div>
    </Router>
  );
}

export default App;
