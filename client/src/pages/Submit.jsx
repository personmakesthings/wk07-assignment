// IMPORT STYLESHEETS
import "./Submit.css"

// IMPORT HOOKS
import { useState } from "react"

// PAGE - SUBMIT
export default function Submit() {

    // FORM DATA
    const [form, setFormData] = useState({
        submission_date: "",
        username: "",
        location: "",
        hamster_name: "",
        hamster_story: "",
        img_url: "",
        species: 1,
        likes: 0,
    })


    // FUNCTION TO CHANGE FORM DATA AS USER TYPES
    function formInput(event) {
        setFormData({
            ...form,
            [event.target.name] : event.target.value
        })
    }
    console.log(form) // Check input as user types


    // FUNCTION TO POST FORM TO DATABASE
    function submitForm(event) {
        event.preventDefault() // Prevents page from refreshing

        // POST TO DATABASE
        fetch("http://localhost:8080/posts", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {"Content-Type": "application/json"}
        })

        alert("Story submitted!") // Confirmation dialogue for user
        event.target.reset() // Resets the form
    }


    // JSX
    return (
        <>
            <h2 className="title">Submit Your Story</h2>
            <form id="submission" onSubmit={submitForm}>
                <div>
                    <h4>About You</h4>
                    <input placeholder="Your Name" onChange={formInput} name="username" maxLength="25" required />
                    <input placeholder="Your Location" onChange={formInput} name="location" maxLength="25" required />
                    <br /> <br />
                    <h4>About Your Hamster</h4>
                    <input placeholder="Hamster's Name" onChange={formInput} name="hamster_name" maxLength="25" required />
                    <input placeholder="Hamster Image URL" onChange={formInput} name="img_url" maxLength="500" required />
                    <br /> <br />
                    <h4>Hamster's Species</h4>
                    <select name="species" onChange={formInput} required>
                        <option value="1">Syrian</option>
                        <option value="2">Hybrid Dwarf</option>
                        <option value="3">Roborovski Dwarf</option>
                        <option value="4">Chinese</option>
                        <option value="5">European</option>
                    </select>
                </div>
                <div>
                    <h4>Your Hamster Story</h4>
                    <textarea id="text-area" placeholder="Your Story" onChange={formInput} name="hamster_story" maxLength="500"  required />
                    <br /> <br />
                    <button type="submit">Submit Your Story</button>
                </div>
            </form>
            <p id="required"><i>All Fields Are Required</i></p>
        </>
    )
}