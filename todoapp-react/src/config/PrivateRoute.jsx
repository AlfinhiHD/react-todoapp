import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    let isLoggin

    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);

    user?.token ? isLoggin = true : isLoggin = false;

    if (!isLoggin) {
        return <Navigate to={'/'} replace />
    } else {
        return (
            <>
                <Outlet />
            </>
        )
    }
}

export default PrivateRoute