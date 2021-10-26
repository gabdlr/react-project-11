import clienteAxios from "./axios";

const tokenAuth = token => {
    if(token){
        //Esto si no te lo dicen, 🤷‍♂️
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete clienteAxios.defaults.common['x-auth-token'];
    }
}

export default tokenAuth;