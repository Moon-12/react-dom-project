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
import Projects from "./components/menuItems/Projects/Projects";
import Counter from "./components/menuItems/Projects/Easy/Counter/Counter";
import Resume from "./components/menuItems/Resume/Resume";
import MyResume from "./components/menuItems/Resume/MyResume/MyResume";
import Easy from "./components/menuItems/Projects/Easy/Easy";
import RandomJokes from "./components/menuItems/Projects/Easy/RandomJokes/RandomJokes";

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
                  path: "projects",
                  element: <Projects />,
                  children: [
                    {
                      path: "easy",
                      element: <Easy />,
                      children: [
                        {
                          path: "counter",
                          element: <Counter />,
                        },
                        {
                          path: "random-jokes",
                          element: <RandomJokes />,
                        },
                      ],
                    },
                  ],
                },
                {
                  path: "resume",
                  element: <Resume />,
                  children: [
                    {
                      path: "my-resume",
                      element: <MyResume />,
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
