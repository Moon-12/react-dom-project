import "./App.css";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./components/User/User";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./components/routes/PrivateRoutes";
import Projects from "./components/Home/Projects/Projects";
import Counter from "./components/Home/Projects/Easy/Counter/Counter";
import Resume from "./components/Home/Resume/Resume";
import MyResume from "./components/Home/Resume/MyResume/MyResume";
import Easy from "./components/Home/Projects/Easy/Easy";
import RandomJokes from "./components/Home/Projects/Easy/RandomJokes/RandomJokes";
import MorseTranslator from "./components/Home/Projects/Easy/MorseTranslator/MorseTranslator";
import JwtDecoder from "./components/Home/Projects/Easy/JwtDecoder/JwtDecoder";
import EmulatorLogin from "./components/EmulatorLogin/EmulatorLogin";
import ReactTips from "./components/Home/ReactTips/ReactTips";
import ContactDetails from "./components/Home/ContactDetails/ContactDetails";
import FlashCardGame from "./components/Home/FlashCardGame/FlashCardGame";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
                  path: "mini-dom-projects",
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
                        {
                          path: "morse-translator",
                          element: <MorseTranslator />,
                        },
                        {
                          path: "jwt-decoder",
                          element: <JwtDecoder />,
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
                {
                  path: "react-tips",
                  element: <ReactTips />,
                },
                {
                  path: "react-interview-questions",
                  children: [
                    {
                      path: "flash-card-game",
                      element: <FlashCardGame />,
                    },
                  ],
                },
                {
                  path: "about-me",
                  children: [
                    {
                      path: "contact-details",
                      element: <ContactDetails />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { path: "/", element: <LandingPage /> },
        {
          path: "/login",
          element:
            process.env.NODE_ENV === "development" ? (
              <EmulatorLogin />
            ) : (
              <LoginPage />
            ),
        },
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
