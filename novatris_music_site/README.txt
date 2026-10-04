NOVATRIS MUSIC WEBSITE
=======================

WHAT THIS IS
------------
A simple static website for sharing your music. It has:
- A space/ambient visual design
- Album artwork
- Play/pause controls
- Previous/next track controls
- Progress bar
- Individual MP3 download buttons
- Mobile-friendly layout
- A usage/credit message

HOW TO ADD YOUR MUSIC
---------------------
1. Put your MP3 files inside the "music" folder.
2. Put your album artwork at:
   artwork/cover.jpg

3. Open music.js in a text editor.

4. Change the album information if you want.

5. Add each track to TRACKS. For example:

const TRACKS = [
  { title: "mosslight", file: "music/mosslight.mp3", duration: "3:21" },
  { title: "starlit", file: "music/starlit.mp3", duration: "4:02" },
  { title: "far away", file: "music/far-away.mp3", duration: "2:57" },
];

The duration is optional.

HOW TO TEST IT
--------------
You can double-click index.html to see the site, but some browsers restrict
audio files when opened directly from your computer.

For the most reliable local test, use a simple local web server.

HOW TO PUT IT ONLINE FOR FREE
-----------------------------
A static host such as GitHub Pages works well.

Create a GitHub repository, upload:
- index.html
- style.css
- script.js
- music.js
- the music folder
- the artwork folder

Then enable GitHub Pages for the repository.

Your site will get a public address similar to:
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/

IMPORTANT
---------
If your MP3 files are large, GitHub may not be a good place to store them.
For a small collection of normal-length songs, it can be fine, but check the
current storage/bandwidth limits before uploading a large album.

The download buttons link directly to the MP3 files. There is no server,
database, login, or backend required.
