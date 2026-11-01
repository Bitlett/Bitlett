const pillDiscord = document.querySelector('.pill--discord');
const clipboardIcon = pillDiscord.querySelector('.pill__action-icon');
let resetTimer;

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // fallback for insecure contexts (e.g. file://) or older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
    }
}

pillDiscord.addEventListener('click', async () => {
    const ok = await copyText(pillDiscord.dataset.copy);

    clipboardIcon.src = ok ? "assets/icons/clipboard2-check.svg" : "assets/icons/clipboard2-x.svg";

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
        clipboardIcon.src = "assets/icons/clipboard2.svg";
    }, 1500);
});
