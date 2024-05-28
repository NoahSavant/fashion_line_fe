import { Login, SignUp, VerifyAccount } from '@pages/authentication'
import { About, Home, Contact } from '@/pages/guest'
import { Navigate } from 'react-router-dom';

const PublicRoutes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/verify-account",
        element: <VerifyAccount />,
    },
    {
        path: '/About',
        element: <About/>
    },
    {
        path: '/Contact',
        element: <Contact />
    }
]

export default PublicRoutes
