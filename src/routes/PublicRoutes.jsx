import { Login, SignUp, VerifyAccount, Logout } from '@pages/authentication'
import { About, Home, Policies, Shop, Blog, ProductDetail, BlogDetail, Cart, OrderStatus, AdminCommentResponses, Profile, SizeMap, OrderDetail } from '@/pages/guest'
import { NotFound } from "@/pages/errors";

const PublicRoutes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/logout",
        element: <Logout />,
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
        path: '/about',
        element: <About/>
    },
    {
        path: '/Policies',
        element: <Policies />
    },
    {
        path: '/shop',
        element: <Shop />
    },
    {
        path: '/blog',
        element: <Blog />
    },
    {
        path: '/blog-detail',
        element: <BlogDetail />
    },
    {
        path: '/product-detail',
        element: <ProductDetail />
    },
    {
        path: '/not-found',
        element: <NotFound />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/order-status',
        element: <OrderStatus />
    },
    {
        path: '/admin-comment-responses',
        element: <AdminCommentResponses />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/size-map',
        element: <SizeMap />
    },
    {
        path: '/order-detail',
        element: <OrderDetail />
    }
]

export default PublicRoutes
