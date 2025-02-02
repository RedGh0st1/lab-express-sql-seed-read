const express = require("express")
const songs = express.Router({ mergeParams: true })
const {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updatedSong,
} = require("../queries/songs")
const {
  checkSongName,
  checkArtist,
  checkBoolean,
  validateURL,
  checkAlbum,
} = require("../validations/checkSongs")

// Index
// importing array of songs from database
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs()
  if (allSongs[0]) {
    res.status(200).json(allSongs)
  } else res.status(500).json({ error: "server error" })
})

// SHOW
songs.get("/:id", async (req, res) => {
  const { id } = req.params
  const song = await getSong(id)
  !song.message
    ? res.status(200).json(song)
    : res.status(400).json({ error: "not found" })
})

//CREATE
songs.post(
  "/",
  checkSongName,
  checkArtist,
  checkBoolean,
  validateURL,
  checkAlbum,
  async (req, res) => {
    try {
      const newSong = await createSong(req.body)
      res.json(songs)
    } catch (error) {
      res.status(404).json({ error: "server error" })
    }
  }
)

// DELETE route
songs.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deletedSong = await deleteSong(id)
    res.status(200).res.json({ error: "Sorry song Not Found" })
  } catch (error) {}
})

// UPDATE route
songs.put(
  "/:id",
  checkBoolean,
  checkArtist,
  checkSongName,
  validateURL,
  checkAlbum,
  async (req, res) => {
    try {
      const { id } = req.params
      const updateSongs = await updatedSong(id, req.body)
      res.status(200).json(updateSongs)
    } catch (error) {
      res.status(500).json({ error: "There is error" })
    }
  }
)
module.exports = songs
