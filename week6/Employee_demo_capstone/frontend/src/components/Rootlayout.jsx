import Header from './Header'
import {Outlet} from 'react-router'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
function RootLayout() {
  return (
    <div>
      <Header />
      <div className='min-h-screen mx-20 p-20 bg-gray-100'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout