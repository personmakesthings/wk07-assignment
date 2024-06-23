// IMPORT MODULES
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())


// LISTEN ON PORT
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server listening and running on ${PORT}.`)
})


// CONNECT TO DATABASE
const db = new pg.Pool({
    connectionString: process.env.DB_CONNECTION
})


// TEST ROUTE
app.get("/", (req, res) => {
    res.json({message: "Test message"})
})


// POSTS ROUTE
// GET REQUEST
app.get("/posts", async (req, res) => {
    const result = await db.query(`
        SELECT
        wk07_submissions.*,
        ARRAY_AGG(wk07_species.species) AS species
        FROM wk07_submissions 
        LEFT JOIN
        wk07_submissions_species ON wk07_submissions.id = wk07_submissions_species.submission_id 
        LEFT JOIN
        wk07_species ON wk07_species.id = wk07_submissions_species.species_id
        GROUP BY
        wk07_submissions.id
        ORDER BY
        wk07_submissions.id DESC
    `)
    res.json(result.rows)
})


// POST REQUEST
app.post("/posts", async (req, res) => {
    const {submission_date, username, location, hamster_name, hamster_story, img_url, species} = req.body
    const result = await db.query(`INSERT INTO wk07_submissions (submission_date, username, location, hamster_name, hamster_story, img_url, species) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [submission_date, username, location, hamster_name, hamster_story, img_url, species])
    res.json({recordInserted: result})
    console.log("POST SENT:", req.body)
})


// DELETE REQUEST
// Specifically for deleting a singular post determined by its id
app.delete("/posts/:id", async (req, res) => {
    const storyId = req.params.id
    const result = await db.query(`DELETE FROM wk07_submissions WHERE id = $1`, [storyId])
    console.log(`${result.command} request sent and done on post with id ${storyId}.`)
})