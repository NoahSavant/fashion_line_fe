import { 
    MProduct, 
    Dashboard, 
    MSingleProduct, 
    MTag, 
    MCategory, 
    MDiscount, 
    MCollection, 
    MCollectionAttach, 
    MBlog,
    MSingleBlog,
    MStaff,
    MCustomer,
    MSingleUser,
    MProfile, 
    MOrder
} from '@/pages/managements'

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
    },
    {
        path: "collection",
        element: <MCollection />,
    },
    {
        path: "collection-attach",
        element: <MCollectionAttach />,
    },
    {
        path: "blog",
        element: <MBlog />,
    },
    {
        path: "single-blog",
        element: <MSingleBlog />,
    },
    {
        path: "user/staff",
        element: <MStaff />,
    },
    {
        path: "user/customer",
        element: <MCustomer />,
    },
    {
        path: "single-user",
        element: <MSingleUser />,
    },
    {
        path: "profile",
        element: <MProfile />,
    },
    {
        path: "order",
        element: <MOrder />,
    }
]

export default ProtectedRoutes
