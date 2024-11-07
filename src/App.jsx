import React from "react"
import {Routes,Route} from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Chat from "./component/Chat";
const App=()=> {

return ( 
    <>
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/chat" element={<Chat />} />
    
   </Routes>
    </>
  );
}


export default App
