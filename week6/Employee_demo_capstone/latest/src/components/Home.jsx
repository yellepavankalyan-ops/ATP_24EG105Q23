import {useContext} from 'react'
import { counterContextObj} from '../context/ContextProvider'
import {userCouterStore} from '../store/CouterStore'

function Home() {
  const {newCounter,increaseCounter,decreaseCounter}=userCouterStore();

  const { counter,changeCounter} = useContext(counterContextObj);
  return (
    <div className='text-center'>
      <h1 className='font-bond text-5xl mb-4'>Lorem, ipsum.</h1>
      <p className='text-2xl mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum suscipit adipisci dignissimos, similique voluptas rerum! Praesentium porro unde provident sed qui itaque possimus illum tempora quod similique nihil, inventore error?</p>
    </div>
  )
}

export default Home
