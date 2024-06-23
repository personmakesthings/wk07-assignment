// IMPORT SERVER DOMAIN
import serverDomain from "../utils/serverDomain"

// IMPORT STYLESHEETS
import "./Posts.css"

// IMPORT HOOKS
import { useState, useEffect } from "react"

// IMPORT COMPONENTS
import { Story } from "/src/components/Story.jsx"

// PAGE - POSTS
export default function Posts() {

    const [stories, setStories] = useState([])
    const [storyId, setStoryId] = useState("") // SET STORY CATEGORY (by default shows all)

    // FETCH STORIES
    useEffect(() => {
        async function fetchStories() {
            const result = await fetch(`${serverDomain}/posts/${storyId}`)
            const stories = await result.json()
            setStories(stories)
            }
        fetchStories()
    }, [storyId])

    return (
    <>
        <h2 className="title">Stories</h2>
        <p id="sort">Select Stories by Species:</p>
        <div id="category-box">
            <button onClick={()=>{setStoryId("")}}>Show All Stories</button>
            <button onClick={()=>{setStoryId(1)}}>Syrian</button>
            <button onClick={()=>{setStoryId(2)}}>Hybrid Dwarf</button>
            <button onClick={()=>{setStoryId(3)}}>Roborovski Dwarf</button>
            <button onClick={()=>{setStoryId(4)}}>Chinese</button>
            <button onClick={()=>{setStoryId(5)}}>European</button>
        </div>
        {stories.map((story) => {
        return (
            <Story key={story.name} story={story}/>
        )
        })}        
    </>
    )
}