<script>
    import DiGithubBadge from "svelte-icons/di/DiGithubBadge.svelte";
    const currentYear = new Date().getFullYear();
</script>

<footer>
    <div class="footer-content">
        <div class="logos">iJams {currentYear}, the Svelte edition.</div>
        <a href="https://github.com/rkylerd/svelte-ijams" target="_blank"
            ><DiGithubBadge /></a
        >
    </div>
    <hr />
</footer>

<style>
    footer {
        margin-top: 10px;
        height: 120px;
        background-color: #292b2c;
        color: #f7f7f7;
        padding: 10px;
        font-size: 12px;
    }

    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
    a {
        width: 40px;
        color: inherit;
    }
</style>
