function User(props){
    const { userObj }= props;
    //state
    //return 
    return(
        <div className="shadow-2xl p-5 text-center rounded-3xl bg-white">
        <img className="m-auto rounded-2xl" src={userObj.image} alt="image" />
        <h2 className="text-2xl font-bold">{userObj.name}</h2>
        <p className="font-bold">{userObj.email}</p>
        </div>
    )
}

export default User;