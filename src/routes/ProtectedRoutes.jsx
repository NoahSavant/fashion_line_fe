import { MProduct, Dashboard, MSingleProduct, MTag } from '@/pages/managements'

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
    },
    {
        path: "resource/tag",
        element: <MTag />,
    }
]

export default ProtectedRoutes
