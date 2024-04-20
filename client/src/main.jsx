import React from 'react'
import {ChakraProvider} from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ChatProvider from './components/Context/ChatProvider.jsx'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
  <ChakraProvider>
    <ChatProvider>
    <App />
    </ChatProvider>
  </ChakraProvider>
  </BrowserRouter>
  </React.StrictMode>,
)
