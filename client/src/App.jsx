import {BrowserRouter,Routes,Route} from "react-router-dom"
import GitPage from "./components/VersionControl/GitPage"
import Commits from "./components/VersionControl/Commits"
import PrevHack from "./components/Publisher/PrevHack"
import CurrHack from "./components/Publisher/CurrHack"
import CreateHackathon from "./components/Publisher/CreateHackathon"
import Leaderboard from "./components/Leaderboard/Leaderboard"


function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/gitpage" element={<GitPage/>}/>
      <Route path="/commits" element={<Commits/>}/>
      <Route path="/publisher/prevhackathons" element={<PrevHack/>}/>
      <Route path="/publisher/currhackathons" element={<CurrHack/>}/>
      <Route path="/publisher/createhackathon" element={<CreateHackathon/>}/>
      <Route path="/leaderboard" element={<Leaderboard/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
