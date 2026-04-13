function Navbar(){
    return (
        <div className="bg-purple-300 flex justify-around p-2 text-xl font-semibold">
            <h1>L o G o</h1>
            <ul className="flex gap-4 ">
                <li>
                    <a href="">Home</a>
                </li>
                <li>
                    <a href="">Signup</a>
                </li>
                <li>
                    <a href="">Login</a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;