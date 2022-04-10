## Svelte, iJams Edition

This project was created using the Svelte JS framework, which is said to be faster and leaner than React. I do enjoy Svelte, but I prefer the React development experience more. 

Inside the `/server` directory is a Node server built using the Express framework. It's purpose is to get around CORS errors when using the iTunes api as well to serve the built, static version of the Svelte app, which is especially useful when users refresh the page when at a URL besides `/`. Without the node server, users would see a 404 screen after refreshing the app.

## Notes for grading

Notice that 95% of the site's functionality can also be performed by using your keyboard!

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

You can run the newly built app with `npm run start`.
