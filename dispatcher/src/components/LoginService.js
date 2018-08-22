import axios from 'axios';
let config = require('../config');

class LoginService{

    sendData(data) {
        axios.post(config.backendURL + '/logins/add/post',{
            email:data.email,
            password:data.password,
        })
            .then(res => this.setState({logins: res.data}))
            .catch(err => console.log(err))
    }
}

export default LoginService;