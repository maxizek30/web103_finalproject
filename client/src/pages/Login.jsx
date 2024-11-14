import {Link} from "react-router-dom";
const Login = (props) => {

    const AUTH_URL = `${props.api_url}/auth/github`

    return (
        <div className='Login'>
            <h1 style={{marginLeft: "40px"}}>Login Below!</h1>
            <center>
                <a href={AUTH_URL}>
                    <button className="headerBtn"> 🔒 Login via Github </button>
                </a>
            </center>
        </div>
    )
}

export default Login