// IMPORT STYLESHEETS
import "./Home.css"

// IMPORT HOOKS
import { useState, useEffect } from "react"

// IMPORT MODULES
import { Link } from "react-router-dom"

// PAGE - HOME
export default function Home() {
    
    // FETCH POSTS
    const [stories, setStories] = useState([])
    useEffect(() => {
        async function fetchStories() {
            const result = await fetch("http://localhost:8080/posts")
            const stories = await result.json()
            const slice = stories.slice(0, 5) // Only the latest 5 entries
            setStories(slice)
            }
        fetchStories()
    }, [stories])

    // JSX
    return (
        <>
            {/* INTRODUCTORY TEXT */}
            <div className="homepage-intro">
                <img className="side-img" src="/images/hamster-photo.png" />
            <div>
            <h2 className="title">Welcome to Hamster Stories!</h2>
            <p>
            Welcome to Hamster Stories, the online community for hamster enthusiasts! Here, you can share the many tales of your furry companions with the rest of the world! Whether your hamster is a little daredevil, a cuddly furball, or a mischievous pouchster, we invite you to post your stories and connect with fellow hamster lovers from around the world.
            </p>
            <p>
            Join us in celebrating the joy and charm of these adorable companions. Let your hamster stories inspire laughs and bring entertainment to others.
            </p>
            <p>
            Discover a world of whiskers, wheels, and whimsy, all here at Hamster Stories!</p>
            </div>
            </div>

            {/* LATEST STORIES BOX */}
            <h2 className="title">Latest Stories</h2>
            <div className="latest-box">
                {stories.map((story) => {
                    return (<Link to="/posts" key={story.id}><img className="latest-img" height="100" src={story.img_url} /></Link>)
                })}
            </div>
        </>
    )
}