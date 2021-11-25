import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Meet from "./pages/meet";

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/meet" element={<Meet/>} />
      </Routes>
    </BrowserRouter>
  )
}