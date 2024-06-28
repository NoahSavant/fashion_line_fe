import { MProduct, Dashboard, MSingleProduct, MTag, MCategory, MDiscount } from '@/pages/managements'

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
    },
    {
        path: "resource/category",
        element: <MCategory />,
    },
    {
        path: "resource/discount",
        element: <MDiscount />,
    }
]

export default ProtectedRoutes
