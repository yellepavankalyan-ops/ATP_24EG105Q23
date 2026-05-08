import { createBrowserRouter,RouterProvider} from 'react-router';
import Rootlayout from "./components/Rootlayout"
import Home from './components/Home'
import CreateEmp from './components/CreateEmp';
import ListofEmps from './components/ListofEmps';
import Employee from './components/Employee';
import EditEmp from './components/EditEmp';
function App() {
  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<Rootlayout />,
      children:[
        {
        path:"",
        element:<Home />
        },
        {
        path:"create-emp",
        element:<CreateEmp />
        },
        {
        path:"list",
        element:<ListofEmps/>,
        },
        {
        path:"employee",
        element:<Employee/>
        },
        {
          path:"editemp",
          element:<EditEmp/>
        }
      ]
    },
  ])

  return (
    <RouterProvider router={routerObj} />
  )
}

export default App
