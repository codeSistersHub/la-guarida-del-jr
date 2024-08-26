import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import CreateMessagePage from "./pages/CreateMessagePage";
import RegisterPage from "./pages/RegisterPage";
import JobPage from "./pages/JobPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LearningPage from "./pages/LearningPage";
import MessagesPage from "./pages/MessagesPage";

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/messages" element={<MessagesPage/>}></Route>
      <Route path="/post" element={<CreateMessagePage/>}></Route>
      <Route path="/chat" element={<ChatPage/>}></Route>
      <Route path="/job" element={<JobPage/>}></Route>
      <Route path="/learning" element={<LearningPage/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
