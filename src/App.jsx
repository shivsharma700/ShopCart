
import './App.css'

import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import MainRoutes from './routes/MainRoutes'

function App() {

  return (
    <div className='app-wrapper'>
      <Header color="light" light={true} expand="md" container="md"/>
      <MainRoutes/>
      <Footer/>
    </div>
  )
}

export default App
