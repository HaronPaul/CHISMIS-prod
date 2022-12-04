import axios from '../api/axios'
import {resetState} from '../redux/userSlice'
import {useDispatch} from 'react-redux'

const useLogout = () => {
    const dispatch = useDispatch()

    const logout = async () => {
        dispatch(resetState())
        try {
            const response = await axios.get('/logout', {
                withCredentials: true
            })
        } catch(err) {
            console.error(err)
        }
    }

    return logout
}

export default useLogout
