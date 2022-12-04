import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({allowedRoles}) => {
    const {userLoggedIn, role} = useSelector((state) => state.user)
    const location = useLocation()
    console.log(allowedRoles)

    return(
        (userLoggedIn && role && allowedRoles.includes(role)) 
            ? <Outlet />
            : userLoggedIn? 
                <Navigate to='/unauthorized' state={{from: location}} replace />
                :<Navigate to='/' state={{from: location}} replace />
    )
}

export default RequireAuth

