import NavBar from '../../Components/Website/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function WebSite() {
  return (
    <>
    <NavBar />
    <Outlet />
    </>
  )
}
