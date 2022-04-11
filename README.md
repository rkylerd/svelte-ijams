## iJams with Svelte

This project was created using the Svelte JS framework, which is said to be faster and leaner than React. I do enjoy Svelte, but I prefer the React development experience more. There are lots of great Svelte REPLs made by the maintainers, but not much support beyond that. So it's up to you, NOT StackOverflow to find and solve your own bugs, primarily. My IDE also really struggled when attempting to validate Svelte code, etc...

Inside the `/server` directory, you will find a Node server built using the Express framework. It's purpose is to circumvent CORS errors when calling the iTunes api as well as to serve the built, static Svelte app. Without the node server, users would see a 404 screen after refreshing the page when at a URL other than `/`, [like this page](https://svelte-ijams.herokuapp.com/artist/461503), for example.

## Notes for grading

- Notice that 95% of the site's functionality can also be performed by using your keyboard!
- This project uses a Svelte router, Svelte context, and Svelte stores.
- Make sure to extend the audio player by  clicking on the caret icon in the top, right portion of your screen. The audio player shows the currently playing track and provides controls for restarting, pausing, playing, and skipping songs.
- On the search results screen you can play and add songs to the "up next" queue. You will also use the artist name and song name links to go to the corresponding artist or album pages.
- On the artist page, you can click on any album to view the songs contained. You can also click the play icon in the bottom, left corner of the album artwork container to play all the songs sequentially.
- Finally, on the album page, you can simply play songs.

## Run the project locally

Install the dependencies...

```bash
cd svelte-ijams
npm install
cd server
npm install
```

...then start the project in development mode:

```bash
npm run dev
```

Navigate to [localhost:3001](http://localhost:3001). You should see your app running. 

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. You will also find the built app at [localhost:3001](http://localhost:3001).
