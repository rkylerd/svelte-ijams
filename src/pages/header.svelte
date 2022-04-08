<script>
    import Search from "./Search.svelte";
    import { navigate } from "svelte-routing";

    let searchTerm = "";
    const handleChange = ({ currentTarget: { value = "" } = {} }) => {
        searchTerm = value;
    };

    const search = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchTerm.replace(/\s/g, "+")}`);
    };
</script>

<div>
    <form on:submit={search}>
        <input value={searchTerm} on:change={handleChange} />
        <button type="submit">Go</button>
    </form>
</div>
