import Header from './Header'
import { Outlet } from 'react-router'
function RootLayout() {
  return (
    <div>
      <Header>
        <div className='min-h-screen '></div>
      </Header>
      <Outlet/>
    </div>
  )
}

export default RootLayout
