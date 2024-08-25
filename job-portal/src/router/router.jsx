import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import About from "../pages/about";
import Postjob from "../pages/Postjob";
import Myjobs from "../pages/Myjobs" ;
import Login from "../comps/Login";
import JobDetails from "../pages/JobDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post-job",
        element: <Postjob/>
      },
      {
        path: "/my-job",
        element: <Myjobs/>
      },
      {
        path: "/job/:id",
        element: <JobDetails/>
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

export default router;
