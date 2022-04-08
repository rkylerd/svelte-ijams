<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import type AppRoute from "../utils/types/route";
    import Album from "./album.svelte";
    import Search from "./search.svelte";
    import Header from "../components/header.svelte";
    import Artist from "./Artist.svelte";

    export let url = "";
    const routes: AppRoute[] = [
        { path: "/search", Component: Search },
        { path: "/artist/:artistId", Component: Artist },
        { path: "/album/:collectionId", Component: Album },
        { path: "*", Component: Search },
    ];
</script>

<Router {url}>
    <div id="container">
        <Header />
        {#each routes as { path, Component } (path)}
            <Route {path} let:params>
                <Component {...params} />
            </Route>
        {/each}
    </div>
</Router>

<style>
    #container {
        padding: 8px;
    }
</style>
