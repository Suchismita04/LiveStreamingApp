import './App.css'
import { UserProvider } from './context/UserContext.jsx'
import { SoketProvider } from './context/SocketContext.jsx'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn.jsx'
import Nav from './components/Nav.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import DashBoard from './pages/DashBoard.jsx'
import VerifyOTP from './components/VerifyOTP.jsx'



function NavLayout() {
  return (
    <>
      <Nav />
      <Outlet />  {/* This Outlet is where nested routes (like SignUp) will be rendered */}
    </>
  );
}



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <SoketProvider>
          <UserProvider>
            <NavLayout />
          </UserProvider>
        </SoketProvider>,
      children: [
        {
          path: "/",
          element: <SignUp />
        },
        {
          path: "/login",
          element: <LogIn />,
        },
        {
          path: "/dashBoard",
          element: <DashBoard />
        },
        {
          path: "/OtpVerify",
          element: <VerifyOTP />
        },
        {
          path: '/forgetPassword'
        }

      ],
    },
  ]);
  return (

    <>

      <RouterProvider router={router} />

    </>
  )
}



export default App
