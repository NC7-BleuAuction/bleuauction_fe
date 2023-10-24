import { createContext, useContext, useState } from "react";
import { getAccessToken } from "../utility/common";
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // 로그인 로직을 구현
    setUser(userData);
  };

  const logout = () => {
    // 로그아웃 로직을 구현
    setUser(null);
  };


  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}


// const Context = createContext({
//     loggedUser: {
//         username: '',
//         email: '',
//         first_name: '',
//     },
//     loggedIn: false,
//     setLoggedUser: () => {},
//     setLoggedIn: () => {}
// });

// export default Context;

// const ContextProvider = ({children}) => {

//   const setLoggedUser = (data) => {
//       setState(prevState => (
//           {
//               ...prevState,
//               loggedUser: data
//           }
//       ))
//   }

//   const setLoggedIn = () => {
//       setState(prevState => (
//           {
//               ...prevState, 
//               loggedIn: !prevState.loggedIn
//           }
//       ))
//   }

//   const initialState = {
//       loggedUser: {},
//       loggedIn: false,
//       setLoggedUser,
//       setLoggedIn
//   }

//   const [state, setState] = useState(initialState);

//   return (
//       <Context.Provider value={state}>
//           {children}
//       </Context.Provider>
//   )
// }