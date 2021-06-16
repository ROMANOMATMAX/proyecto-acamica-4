import ClienteAxios from './axios'

const tokenAuth = token => {
    if(token){
        ClienteAxios.defaults.headers.common['x-access-token'] =  token;
    }else{
        delete ClienteAxios.defaults.headers.common['x-access-token'];
    }
}

export default tokenAuth;