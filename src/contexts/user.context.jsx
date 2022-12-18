// import { createContext, useState, useEffect, useReducer } from 'react';

// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from '../utils/firebase/firebase.utils';

// import { createAction } from '../utils/reducer/reducer.utils';

// export const UserContext = createContext({
//   setCurrentUser: () => null,
//   currentUser: null,
// });

// export const USER_ACTION_TYPES = {
//   SET_CURRENT_USER : 'SET_CURRENT_USER'
// }

// const userReducer =(state, action)=>{
//   const {type, payload} = action;

//   switch(type){
//     case USER_ACTION_TYPES.SET_CURRENT_USER: 
//     return{
//       ...state,
//       currentUser:  payload
//     }
//      default :
//       throw new Error(`Unhandled type ${type} in userReducer`); 
    
//   }

// }

// // we can use both useReducer and useState but useState is more preferable if we only have one or 2 variables to set, and if we have multiple then we should use useReducer as it will be more helpful and the code will be more optimised


// const INITIAL_STATE = {
//   currentUser : null
// }

// export const UserProvider = ({ children }) => {
//   // const [currentUser, setCurrentUser] = useState(null);


//   const [ state , dispatch] = useReducer(userReducer, INITIAL_STATE);
//   const {currentUser} = state;

//   const setCurrentUser =(user)=>{
//     dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
//   }

//   const value = { currentUser, setCurrentUser };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChangedListener((user) => {
//       if (user) {
//         createUserDocumentFromAuth(user);
//       }
//       setCurrentUser(user);
//     });

//     return unsubscribe;
//   }, []);

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };