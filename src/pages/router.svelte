<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import type AppRoute from "../utils/types/route";
    import Album from "./album.svelte";
    import Search from "./search.svelte";
    import Header from "../components/header.svelte";
    import Artist from "./artist.svelte";
    import Footer from "../components/Footer.svelte";

    export let url = "";
    const routes: AppRoute[] = [
        { path: "search", Component: Search },
        { path: "artist/:artistId", Component: Artist },
        { path: "album/:collectionId", Component: Album },
        { path: "*", Component: Search },
    ];
</script>

<Router {url}>
    <Header />
    <div id="container">
        {#each routes as { path, Component } (path)}
            <Route {path} let:params>
                <Component {...params} />
            </Route>
        {/each}
    </div>
    <Footer />
</Router>

<style>
    #container {
        padding: 8px;
        min-height: 70vh;
        background-color: #f7f7f7;
    }
</style>
