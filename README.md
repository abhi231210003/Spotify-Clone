# Spotify-Web Player: Music for Everyone 🎶

This project is a web-based Spotify-like music player that allows users to browse albums, select songs, and control playback. The player features album artwork, song information, playback controls, and volume management. The design is responsive, ensuring a smooth user experience across different devices.

## Features

- **Album Browsing**: Displays a collection of albums with album covers.
- **Song Playback**: Users can play, pause, skip, and navigate through songs in selected albums.
- **Playlist Navigation**: Users can view and navigate a playlist of songs for a selected album.
- **Volume Control**: Adjustable volume slider and mute button.
- **Seekbar**: Users can skip to different points in a song.
- **Responsive Design**: Works well across desktop and mobile devices.
- **Styled UI**: Custom styling using CSS and responsiveness through media queries.

## Technologies Used

- **HTML/CSS**: For the basic structure and styling of the app.
  - `style.css`: Main styling for layout, color, and fonts. It imports the 'Roboto' font from Google Fonts and applies various styles to the elements (like buttons, cards, and the playbar).
  - `utility.css`: Includes utility classes for flexbox, centering, and other basic layout properties.
  - `responsive.css`: Handles the responsive layout for different screen sizes, ensuring a smooth user experience on smaller devices by adjusting the positioning of elements.
  
- **JavaScript**: Used to handle dynamic functionalities like fetching songs, controlling playback, updating the UI (time, seekbar), and handling user interactions.
  - Includes functions for displaying songs, controlling playback, and managing volume and track time updates.

## Folder Structure

- **HTML/CSS Files**
  - `index.html`: The main HTML structure of the music player.
  - `style.css`: The main stylesheet that controls the layout and design.
  - `utility.css`: Utility styles used across the project.
  - `responsive.css`: Contains media queries to ensure the application is responsive.

- **JavaScript**
  - `script.js`: The main JavaScript file that handles song playback, album navigation, and UI interactions.

- **Images & Icons**
  - A folder containing icons like play, pause, volume, and album cover images.

- **Songs**
  - A folder that contains the MP3 files used in the player. Each album folder has an `info.json` file for album metadata and cover images.

## How to Run

1. Clone the repository:
    ```bash
   git clone https://github.com/your-username/spotify-web-player.git
2. Open the index.html file in your browser.
3. Browse through albums, click on a song to play, and use the controls for a smooth music experience.

  
