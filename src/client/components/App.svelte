<script>
	import Field from './Field.svelte';
	
	const size = 9;
	const numbersTillSize = Array.from(Array(size).keys());
	const flatten = arrays => [].concat.apply([], arrays);

	let initFields = flatten(numbersTillSize.map(x => numbersTillSize.map(y => ({x, y, c:1}))));
	let save = "000110100001001010010001001100100101101000101101001001100100010010100100001011000";
	$: saveAsArray = save.split('').map(l => l=="1"?1:0);

	$: fields = initFields.map((field, i) => {
		field.i = i;
		field.c = saveAsArray[i];
		return field;
	});

	const toggleField = _i => {
		save = saveAsArray.map((l, i) => i==_i?l==1?0:1:l).join('');
	};

</script>

<style>
	textarea {
		margin: 10px 0;
		font-size: 1.2em;
		font-family: monospace;
		resize: none;
	}

	div {
		position: relative;
		height: 270px;
		width: 270px;
	}
</style>

<div>
	{#each fields as field}
		<Field {...field} on:click={e => toggleField(field.i)}></Field>
	{/each}
</div>

<textarea cols={size-1} rows={size} bind:value={save}></textarea>
