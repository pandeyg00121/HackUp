
import {BrowserRouter,Routes,Route} from "react-router-dom"
import GitPage from "./components/VersionControl/GitPage"
import Commits from "./components/VersionControl/Commits"
import PrevHack from "./components/Publisher/PrevHack"
import CurrHack from "./components/Publisher/CurrHack"
import CreateHackathon from "./components/Publisher/CreateHackathon"

import LoginUser from "./components/Auth/LoginUser";
import LoginPub from "./components/Auth/LoginPub"
import RegisterUser from "./components/Auth/RegisterUser";
import RegisterPublisher from "./components/Auth/RegisterPublisher";
import Home from "./components/Home/Home";
import Past from "./components/Home/Past";
import Live from "./components/Home/Live";
import Participate from "./components/Participate/Participate";
import Chatpage from "./components/Chat/Chatpage";
import Pubhome from "./components/Home/Pubhome"
import Publive from "./components/Home/Publive"
import Pubpast from "./components/Home/Pubpast"
import Leaderboard from "./components/Home/Leaderboard"

function App() {

  return (
    <Routes>
      <Route path="/gitpage" element={<GitPage/>}/>
      <Route path="/commits" element={<Commits/>}/>
      <Route path="/publisher/prevhackathons" element={<PrevHack/>}/>
      <Route path="/publisher/currhackathons" element={<CurrHack/>}/>
      <Route path="/publisher/createhackathon" element={<CreateHackathon/>}/>
      <Route path="/leaderboard" element={<Leaderboard/>}/>
      <Route path="/participate" element={<Participate/>}/>
      {/* //<Route path="/deploy" element={<DeploymentPage/>}/> */}

      
      <Route path="/users/signup" element={<RegisterUser/>}/>
      <Route path="/publisher/signup" element={<RegisterPublisher/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/live" element={<Live/>}/>
      <Route path="/participate/:id" element={<Participate/>}/>
      <Route path="/loginuser" element={<LoginUser/>}/>
      <Route path="/loginpub" element={<LoginPub/>}/>

      <Route path="/past" element={<Past/>}/>
      <Route path="/chat" element={<Chatpage/>}/>
      <Route path="/pubhome" element={<Pubhome/>}/>
      <Route path="/publive" element={<Publive/>}/>
      <Route path="/pubpast" element={<Pubpast/>}/>


    </Routes>

  )
}

export default App
