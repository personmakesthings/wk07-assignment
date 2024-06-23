// IMPORT STYLESHEETS
import "./App.css"


// IMPORT MODULES
import { Routes, Route, Link } from "react-router-dom"


// IMPORT PAGES
import Home from "./pages/Home.jsx"
import Submit from "./pages/Submit.jsx"
import Posts from "./pages/Posts.jsx"


// IMPORT COMPONENTS
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"


// APP
export default function App() {
  return (
    <>
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/submit" element={<Submit/>} />
      </Routes>
      </main>
      <Footer />
    </>
  )
}