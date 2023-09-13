import Navbar from '../layout/Navbar';
import {publicRequest} from "../request-methods.js";

export const AdminPanel = () => {

    const handleClick = () => {
        publicRequest.get("/users/me").then((response) => console.log(response))
    }

    return(
        <div>
            <Navbar/>
            <h1>Dashboard</h1>
            <button onClick={ handleClick }>Click me</button>
        </div>
    )
}