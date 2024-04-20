import { Heading } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginUser from "./components/Auth/LoginUser";
import LoginPub from "./components/Auth/LoginPub"
import RegisterUser from "./components/Auth/RegisterUser";
import RegisterPublisher from "./components/Auth/RegisterPublisher";
import Home from "./components/Home/Home";
import Past from "./components/Home/Past";
import Live from "./components/Home/Live";
import Participate from "./components/Participate/Participate";
import Chatpage from "./components/Chat/Chatpage";

function App() {

  return (

    <Routes>
      <Route path="/loginuser" element={<LoginUser/>}/>
      <Route path="/loginpub" element={<LoginPub/>}/>
      <Route path="/users/signup" element={<RegisterUser/>}/>
      <Route path="/publisher/signup" element={<RegisterPublisher/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/past" element={<Past/>}/>
      <Route path="/live" element={<Live/>}/>
      <Route path="/participate" element={<Participate/>}/>
      <Route path="/chat" element={<Chatpage/>}/>

    </Routes>
  )
}

export default App
