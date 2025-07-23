import "./App.css";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import JwtDecoder from "./components/Home/Projects/Medium/JwtDecoder/JwtDecoder";
import EmulatorLogin from "./components/EmulatorLogin/EmulatorLogin";
import ReactTips from "./components/Home/ReactTips/ReactTips";
import FlashCardGame from "./components/Home/ReactInterviewQuestions/FlashCardGame/FlashCardGame";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import SecureComp from "./components/SecureComp/SecureComp";
import ThousandCheckboxes from "./components/Home/Projects/Medium/ThousandCheckboxes/ThousandCheckboxes";
import Medium from "./components/Home/Projects/Medium/Medium";
import ReactInterviewQuestions from "./components/Home/ReactInterviewQuestions/ReactInterviewQuestions";
import Welcome from "./components/LandingPage/Welcome/Welcome";
import ContactDetails from "./components/Home/ContactDetails/ContactDetails";
import ProjectDetails from "./components/LandingPage/PortfolioTabs/Project/ProjectCard/ProjectDetails/ProjectDetails";

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
              path: "s",
              element: <SecureComp />,
              children: [
                {
                  path: "",
                  element: <Welcome />,
                },
              ],
            },
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
                  ],
                },
                {
                  path: "medium",
                  element: <Medium />,
                  children: [
                    {
                      path: "jwt-decoder",
                      element: <JwtDecoder />,
                    },
                    {
                      path: "thousand-checkboxes",
                      element: <ThousandCheckboxes />,
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
              element: <ReactInterviewQuestions />,
              children: [
                {
                  path: "flash-card-game",
                  element: <FlashCardGame />,
                },
              ],
            },
            {
              path: "about-me",
              element: <ContactDetails />,
            },
            {
              path: "project-details/:projectId",
              element: <ProjectDetails />,
            },
          ],
        },
        { path: "/", element: <LandingPage /> },
        {
          path: "/emulator-login",
          element: <EmulatorLogin />,
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
