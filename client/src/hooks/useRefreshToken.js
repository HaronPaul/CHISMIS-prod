import axios from '../api/axios'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../redux/userSlice'

const useRefreshToken = () => {
    const dispatch = useDispatch()
    const {token} = useSelector((state) => state.user)

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
        console.log('Response from refresh route: ')
        console.log(response)
        dispatch(setUser(
            {
                accessToken: response.data.accessToken, 
                role: response.data.role,
                username: response.data.username,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                id: response.data.id
            }
            )
        )
        return response.data.accessToken
    }
    
    return refresh
}

export default useRefreshToken