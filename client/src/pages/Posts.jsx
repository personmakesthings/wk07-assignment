// IMPORT HOOKS
import { useState, useEffect } from "react"

// IMPORT COMPONENTS
import { Story } from "/src/components/Story.jsx"

// PAGE - POSTS
export default function Posts() {
    const [stories, setStories] = useState([])

    useEffect(() => {
        async function fetchStories() {
            const result = await fetch("http://localhost:8080/posts")
            const stories = await result.json()
            setStories(stories)
            }
        fetchStories()
    }, [stories]) // Put state variable in the dependency array and the posts will update in real time, including when modifying the Supabase database directly

    return (
    <>
        <h2 className="title">Stories</h2>
        {stories.map((story) => {
        return (
            <Story key={story.name} story={story} />
        )
        })}
    </>
    )
}