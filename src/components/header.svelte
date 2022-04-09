<script>
    import { useNavigate } from "svelte-navigator";
    import { Jumper } from "svelte-loading-spinners";
    import Svelte from "./Logos/Svelte.svelte";
    import DiComposer from "svelte-icons/di/DiComposer.svelte";

    let searchTerm = "";
    const handleChange = ({ currentTarget: { value = "" } = {} }) => {
        searchTerm = value;
    };

    const navigate = useNavigate();

    const search = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchTerm.replace(/\s/g, "+")}`);
    };
</script>

<div class="header">
    <div class="logos">
        <Svelte />
        <DiComposer />
        <span>iJams</span>
    </div>
    <div class="search-container">
        <form on:submit={search}>
            <input value={searchTerm} on:change={handleChange} />
            <button type="submit">Go</button>
        </form>
    </div>
</div>

<style>
    .header {
        display: grid;
        grid-template-columns: 130px 1fr;
        border-bottom: solid beige 2px;
        height: 50px;
    }
    .header > .logos {
        display: flex;
        align-items: center;
        margin: 0 5px;
    }
    .header > .logos > span {
        font-weight: 700;
        font-size: 22px;
    }
    .search-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    form {
        display: inline-flex;
    }
</style>
