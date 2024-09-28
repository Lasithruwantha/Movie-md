const venom = require('venom-bot');
const axios = require('axios');

// Create the WhatsApp client
venom
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

// Function to start the bot
function start(client) {
  // Listen for incoming messages
  client.onMessage(async (message) => {
    if (message.body.startsWith('!movie')) { // Check if the message starts with '!movie'
      const movieName = message.body.split(' ')[1]; // Extract the movie name
      const response = await getMovieInfo(movieName); // Fetch movie info
      client.sendText(message.from, response); // Send the response back to the user
    }
  });
}

// Function to fetch movie information from OMDb API
async function getMovieInfo(movieName) {
  try {
    const apiKey = 'YOUR_OMDB_API_KEY*'; // Replace with your OMDb API Key
    const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;
    const { data } = await axios.get(url); // Send GET request to OMDb API

    if (data.Response === 'True') { // Check if the movie was found
      return `${data.Title} (${data.Year}) - ${data.Plot}`; // Format the response
    } else {
      return 'Movie not found!'; // Movie not found
    }
  } catch (error) {
    return 'Error fetching movie data!'; // Handle errors
  }
}