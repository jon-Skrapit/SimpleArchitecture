import apisauce from 'apisauce'
import NetworkConfig from '../Config/NetworkConfig'
const createAPIClient = (baseURL = NetworkConfig.baseAPIDomain) => {

    const api = apisauce.create({
        baseURL,
        headers: {
        'Cache-Control': 'no-cache',
        'Content-Type':'application/json',
        },
        timeout: 30000
    })
    const login = (username,password) =>{
        return api.post('/users/login',{username,password})
    }
    const register = (username,password) =>{
        return api.post('/users/register',{username,password})
    }
    const update = (token,data)=>{
        return api.post('/datas/update',{token,data})
    }
    const allData = (token)=> {
        return api.post('datas/allData',{token})
    }
    return {
        login,
        register,
        update,
        allData
    }
}
const api = createAPIClient()
export default api