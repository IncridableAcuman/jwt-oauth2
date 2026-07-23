import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import VerifyOtp from "./pages/VerifyOtp"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/verify-otp" element={<VerifyOtp/>} />
    </Routes>
    </>
  )
}

export default App