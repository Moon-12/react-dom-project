import "./App.css";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RootComp from "./components/RootComp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./components/routes/PrivateRoutes";
import StudyMaterials from "./components/menuItems/StudyMaterials/StudyMaterials";
import Academics from "./components/menuItems/Academics/Academics";
import DegreePrograms from "./components/menuItems/Academics/DegreePrograms/DegreePrograms";
import UnderGradProgram from "./components/menuItems/Academics/DegreePrograms/UnderGradProgram/UnderGradProgram";
import Catalog from "./components/menuItems/StudyMaterials/Catalog/Catalog";
import Calendar from "./components/menuItems/StudyMaterials/Catalog/Calendar/Calendar";
import Courses from "./components/menuItems/StudyMaterials/Catalog/Courses/Courses";
import GraduatePrograms from "./components/menuItems/Academics/GraduatePrograms/GraduatePrograms";
import MIS from "./components/menuItems/Academics/GraduatePrograms/MIS/MIS";
import CS from "./components/menuItems/Academics/GraduatePrograms/CS/CS";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootComp />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "landing-page",
              element: <User />,
              children: [
                {
                  path: "academics",
                  element: <Academics />,
                  children: [
                    {
                      path: "degrees-and-programs",
                      element: <DegreePrograms />,
                      children: [
                        {
                          path: "undergraduate-programs",
                          element: <UnderGradProgram />,
                        },
                        {
                          path: "graduate-programs",
                          element: <GraduatePrograms />,
                          children: [
                            {
                              path: "mis",
                              element: <MIS />,
                            },
                            {
                              path: "cs",
                              element: <CS />,
                            },
                          ],
                        },
                      ],
                    },
                    { path: "study-materials", element: <StudyMaterials /> },
                  ],
                },
                {
                  path: "study-materials",
                  element: <StudyMaterials />,
                  children: [
                    {
                      path: "catalog",
                      element: <Catalog />,
                      children: [
                        {
                          path: "calendar",
                          element: <Calendar />,
                        },
                        {
                          path: "courses",
                          element: <Courses />,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { path: "/", element: <Home /> },
        { path: "/sign-up", element: <SignUpPage /> },
        { path: "/login", element: <LoginPage /> },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      {" "}
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
