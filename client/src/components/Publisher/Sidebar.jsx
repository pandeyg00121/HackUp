import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiLogoutBoxFill} from 'react-icons/ri'
import { Link, useLocation} from 'react-router-dom'

const Sidebar = () => {
    const location=useLocation();
  return (
    <VStack spacing={"8"} p={"16"} boxShadow={'-1px 0 10px rgba(255,0,0,0.5)'}>
      <LinkButton Icon={RiAddCircleFill} text={"Current Hackathons"} url="currhackathons" active={location.pathname==="/publisher/currhackathons"}/>
      <LinkButton Icon={RiAddCircleFill} text={"Previous Hackathons"} url="prevhackathons" active={location.pathname==="/publisher/prevhackathons"}/>
      <LinkButton Icon={RiEyeFill} text={"Create A Hackathon"} url="createhackathon" active={location.pathname==="/publisher/createhackathon"}/>
      </VStack>
  )
}

export default Sidebar;

function LinkButton({url,Icon,text,active}){
    return (
        <Link to={`/publisher/${url}`}>
        <Button fontSize={"larger"} variant={"ghost"} colorScheme={active?'red':'white'}>
           <Icon style={{margin:'4px'}}/> 
           {text}
        </Button>
      </Link>
    )
}

