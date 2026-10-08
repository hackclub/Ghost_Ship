<script>
	let dialog;

	const open = () => dialog.showModal();
	const close = () => dialog.close();
</script>

<span><b>Finish 1 bonus:</b> <button type="button" class="link" onclick={open}>this sticker sheet</button></span>
<button type="button" class="thumb" onclick={open} aria-label="View the sticker sheet">
	<img src="/media/stickersheet-web.jpg" alt="" loading="lazy" />
</button>

<dialog bind:this={dialog} onclick={(e) => e.target === dialog && close()}>
	<button type="button" class="close" onclick={close} aria-label="Close"><i class="ph-bold ph-x"></i></button>
	<img src="/media/stickersheet-web.jpg" alt="The Ghost Ship sticker sheet: jack-o-lanterns, candy, an eyeball, a BOO! sign, the ghost, a scared witch, and a Hack Club candy bar" />
</dialog>

<style>
	b {
		color: var(--parchment);
	}
	.link {
		padding: 0;
		border: none;
		background: none;
		font: inherit;
		color: var(--pumpkin);
		text-decoration: underline;
		cursor: pointer;
	}
	.thumb {
		flex: none;
		margin-left: auto;
		padding: 0;
		border: none;
		background: none;
		cursor: zoom-in;
		line-height: 0;
	}
	.thumb img {
		width: 96px;
		height: auto;
		border-radius: 6px;
	}
	.thumb:hover img {
		outline: 2px solid var(--pumpkin);
	}
	dialog {
		position: relative;
		width: min(92vw, 900px);
		padding: 0;
		border: 1px solid var(--panel-line);
		border-radius: 12px;
		background: #000;
	}
	dialog::backdrop {
		background: rgba(10, 6, 16, 0.8);
	}
	dialog img {
		display: block;
		width: 100%;
		height: auto;
	}
	.close {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
		border: none;
		border-radius: 50%;
		background: rgba(20, 16, 28, 0.85);
		color: var(--parchment);
		font-size: 18px;
		cursor: pointer;
	}
	.close:hover {
		color: var(--pumpkin);
	}
</style>
