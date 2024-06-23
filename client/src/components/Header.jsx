// IMPORT STYLESHEETS
import "./Header.css"

// IMPORT MODULES
import { Link } from "react-router-dom"

// COMPONENT - HEADER
export function Header() {
    return (
        <header>
            <h1 className="title">Hamster Stories</h1>
            <nav>
                <ul>
                    <li><Link to="/">Homepage</Link></li>
                    <li><Link to="/posts">View Latest Stories</Link></li>
                    <li><Link to="/submit">Submit</Link></li>
                </ul>
            </nav>
        </header>
    )
}