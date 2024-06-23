// IMPORT SERVER DOMAIN
import serverDomain from "../utils/serverDomain"

// IMPORT CSS
import "./Story.css"

// COMPONENT - STORY
export function Story({story}) {

    // DELETE POST FUNCTION
    function deletePost() {
        let deleteClicked = confirm("Are you sure you want to delete this post?")
        if (deleteClicked === true){
            fetch(`${serverDomain}/posts/${story.id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            })
            location.reload()
        }
    }

    return (
        <section className="story-section">
            <div className="story-text">
                <p><i>The Story Of...</i></p>
                <h3>{story.hamster_name}, the {story.species} Hamster</h3>
                <p><b>Submitted by:</b> {story.username}, from {story.location}.</p>
                <p>{story.hamster_story}</p>
                <p>(Admin Actions: <button onClick={deletePost}>Delete Post</button>)</p>
            </div>
            <img className="hamster-img" src={story.img_url} />
        </section>
    )
}