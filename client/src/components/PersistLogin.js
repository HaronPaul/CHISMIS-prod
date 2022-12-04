import {Outlet} from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const {token} = useSelector((state) => state.user)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
                if(pathname === '/')
                    navigate('/home', {replace: true})
            } catch(err) {
                console.error(err)
            } finally{
                setIsLoading(false)
            }
        }

        !token? verifyRefreshToken():setIsLoading(false)

    }, [])

    useEffect(() => {
    }, [isLoading])

    return(
        <>
            {isLoading
                ? <p> Loading ...</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin