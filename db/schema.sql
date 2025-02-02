DROP DATABASE IF EXISTS songs_dev;
CREATE DATABASE songs_dev;
\c songs_dev

CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    album TEXT NOT NULL,
    released TEXT 
);

CREATE TABLE ablums (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    released TEXT
);


-- playlist one to many songs table 
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL
);

-- added artists and playlists id to songs table
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN,
    artists_id INTEGER REFERENCES artists (id) ON DELETE CASCADE,
    albums_id INTEGER REFERENCES albums (id) ON DELETE CASCADE,
    playlists_id INTEGER REFERENCES playlists (id) ON DELETE CASCADE

);


-- will figure out how to use these later
    
    
-- will figure out how to do all album and artist table when i get the time.