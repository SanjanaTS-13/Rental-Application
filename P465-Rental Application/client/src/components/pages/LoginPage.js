import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import BackgroundImage from '../../assets/images/cars1.jpg'

export default function SignInPage() {
//    function handleresponse(response){
//     console.log("Jwt token:"+ response.credential);
//    }
//     useEffect(()=>{
//         google.accounts.id.initialize({
//             client_id:"76608576244-fvukg2oaeuqjmmqrdfhm0oqkn8cqljmd.apps.googleusercontent.com",
//             callback: handleresponse
//         })
//     },[])
    return (
        <div className="text-center login-page">
            <header style={ HeaderStyle }>
            <h2 className='heading1'>Sign in to us</h2>
                <form action="/home">
                    <p>
                        <label>Username or email address</label><br/>
                        <input type="text" name="first_name" required />
                    </p>
                    <p>
                        <label>Password</label>
                        <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                        <br/>
                        <input type="password" name="password" required />
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Login</button>
                    </p>
                </form>
                <footer>
                    <h4>First time? <Link className="link1" to="/register">Create an account</Link>.</h4>
                    {/* <a className="link1" href="http://localhost:8080/auth/google">Login with Google</a> */}
                    <h5><Link className="link1" to="/">Back to Homepage</Link>.</h5>
                </footer>
            </header>
        </div>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
