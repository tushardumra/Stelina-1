import { Outlet } from "react-router-dom"
import { Footer } from "./footer"
import { Header } from "./header"
import { MainPage } from "./main"

export const PublicLayout = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      
      <Footer/>
    </>
  )
}

