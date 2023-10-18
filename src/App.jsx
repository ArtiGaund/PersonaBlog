import { Header, Footer } from './components/index'
import { Outlet } from 'react-router-dom'
  import bg from '../src/images/bg1.jpg'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import  authService  from '../src/backendAppwrite/auth'
import { login, logout } from '../src/store/authSlice'


function App() {
  //we need loading state, when we fetch data from application so it will take some time for the network request 
  // so we need to ask something from database or network, its good to create loading state, we can do conditional rendering
  const [ loading, setLoading ] = useState(true)
  // we need dispatch to bring curUser, bz we need to change state
  const dispatch = useDispatch()
  // when this application will be loaded, then use useEffect and ask this service whether we are login or not
  useEffect(() => {
    //ask the service, who is are curUser, whole time out state will remain updated whether you will get current
    // user or user state will show you are logout
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])
  const styles = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    backgroundPostion: 'relative',
    height: '100vh',
    overflow: 'auto',
  }

  return (
    <>
      <div className='flex flex-col content-between min-h-screen w-screen' style={styles}>
        <div className='w-full block'>
          <Header/>
            <main className='flex-grow min-h-[75vh] overflow-auto p-4'>
              <Outlet />
            </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
