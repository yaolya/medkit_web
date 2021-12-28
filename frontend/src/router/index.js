import UsersList from "../pages/UsersList";
import Medicaments from "../pages/Medicaments";
import Error from "../pages/Error";
import Categories from "../pages/Categories";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import CategoryPage from "../pages/CategoryPage";
import MedicamentPage from "../pages/MedicamentPage";

export const privateRoutes = [
    {path: '/userslist', element: UsersList, exact: true},
    {path: '/medicaments', element: Medicaments, exact: true},
    {path: '/error', element: Error, exact: true},
    {path: '/categories', element: Categories, exact: true},
    {path: '/categories/:id', element: CategoryPage, exact: true},
    {path: '/categories/:id/:id', element: MedicamentPage, exact: true},
    {path: '/medicaments/:id', element: MedicamentPage, exact: true},
    {path: '/profile', element: Profile, exact: true}
]

export const publicRoutes = [
    {path: '/login', element: Login, exact: true}
]