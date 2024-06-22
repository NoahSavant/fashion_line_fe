import { MProduct, Dashboard, MSingleProduct } from '@/pages/managements'

const ProtectedRoutes = [
    {
        path: "",
        element: <Dashboard />,
    },
    {
        path: "product",
        element: <MProduct />,
    },
    {
        path: "single-product",
        element: <MSingleProduct />,
    }
]

export default ProtectedRoutes
