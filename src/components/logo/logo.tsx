import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="">
                <img src={logo} alt="" className="w-full h-full object-cover"/>
            </div>
            <span>SportWix</span>
        </div>
    )
}

export default Logo;