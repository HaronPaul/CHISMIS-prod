import {useSelector} from 'react-redux'

const ProtectedComponent = ({children, allowedRoles}) => {
    const {role} = useSelector((state) => state.user)
    if(allowedRoles.includes(role)) {
        return <>{children}</>
    } else {
        return <></>
    }
}

export default ProtectedComponent