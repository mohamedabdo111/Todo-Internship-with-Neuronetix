import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./Pages/ladingPage/Index";
import LoginForm from "./components/Auth/loginForm";
import RegisterForm from "./components/Auth/registerForm";

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<LandingPage></LandingPage>}></Route>,
      <Route path="/login" element={<LoginForm></LoginForm>}></Route>,
      <Route path="/register" element={<RegisterForm></RegisterForm>}></Route>,
    ])
  );
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
};

export default App;
