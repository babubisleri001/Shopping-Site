import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Chatbot from './components/Chatbot/Chatbot'
import logo from './assets/rookus-logo.png';
import Auth from "./components/Auth/Auth";

const Layout = () => {
    const navItems = ['Home', 'Team', 'Contact', 'Features', 'Gallery', 'Login'];
    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            minHeight:"100vh"
        }}>
            <Header logoSRC={logo} navItems={navItems} />
            <main style={{
                flex: "1",
                alignItems:"center",
                overflowX:"hidden"}}>                
                <Outlet />
            </main>
            <Footer />
            <Chatbot/>
        </div>
    )
}

export default Layout;

 
