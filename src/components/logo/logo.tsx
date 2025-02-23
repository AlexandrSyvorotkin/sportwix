import logo from "../../assets/logo.svg"

const Logo = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="">
                <img src={logo} alt="" className="w-full h-full object-cover"/>
            </div>
            <span>SportWix</span>
        </div>
    )
}

export default Logo;