import { createBrowserRouter } from "react-router-dom";

import Dashboard from "@/pages";

import Home from "pages/Home";
import DashboardPage from "pages/Dashboard";
import AchievementsPage from "pages/Achievements";
import CoursesPage from "pages/Courses";
import ChallengePage from "pages/Challenge";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "",
                element: <DashboardPage />
            },
            {
                path: "courses",
                element: <CoursesPage />
            },
            {
                path: "challenge",
                element: <ChallengePage />
            },
            {
                path: "achievements",
                element: <AchievementsPage />
            }
        ]
    },
    {
        path: "auth",
        children: [
            {
                path: "signin",
                element: <SignIn />
            },
            {
                path: "signup",
                element: <SignUp />
            }
        ]
    }
]);

export default router;