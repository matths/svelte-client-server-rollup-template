<script>
	export let x;
	export let y;
	export let c;
	export let i;
</script>

<style>
	div {
		position: absolute;
		width: 30px;
		height: 30px;
		border: 1px solid #333;
		box-sizing: border-box;
	}
</style>

<div on:click id="field{i}" style="left: {x*30}px; top: {y*30}px; background: {c?'gray':'white'};"></div>