<script>
  import { icons } from "../../store/icons";
  export let name = "";
  export let style = { width: "100%", height: "100%" };

  $: styles = Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
</script>

<div style={styles}>
  <svelte:component this={$icons[name]} />
</div>
