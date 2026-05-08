import User from './User.jsx'
function UsersList(){
    const users = [
 {
    name: "Nakesh Dev",
    email: "Nakesh.dev@example.com",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
   {
    name: "Nakesh Dev",
    email: "Nakesh.dev@example.com",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
   {
    name: "Nakesh Dev",
    email: "Nakesh.dev@example.com",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
   {
    name: "Nakesh Dev",
    email: "Nakesh.dev@example.com",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
   {
    name: "Nakesh Dev",
    email: "Nakesh.dev@example.com",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
   {
    name: "Nakesh Dev",
    email: "Nakesh.dev@example.com",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
   {
    name: "Nakesh Dev",
    email: "Nakesh.dev@example.com",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
   {
    name: "Nakesh Dev",
    email: "Nakesh.dev@example.com",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },  



 ];

    return(
        <div>
        <h1 className="text-6xl text-center p-5 bg-amber-100">USERS</h1>
        <div className= "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5 bg-red-200">
         {
            users.map((userObj)=>(
                <User userObj={userObj} key={userObj.email} />
            ))
         }
        </div>
        </div>
    )
}

export default UsersList;