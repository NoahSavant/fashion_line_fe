import { Login, SignUp, VerifyAccount } from '@pages/authentication'
import { About, Home, Contact, Shop, Blog, ProductDetail, BlogDetail, Cart, OrderStatus, AdminCommentResponses } from '@/pages/guest'
import { NotFound } from "@/pages/errors";

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
        path: '/about',
        element: <About/>
    },
    {
        path: '/contact',
        element: <Contact />
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
    }
]

export default PublicRoutes
