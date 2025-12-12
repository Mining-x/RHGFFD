async function auth() {
    const k = document.getElementById('licenseKeyInput').value.trim().toUpperCase();
    if(k.length !== 20) { window.open(_TG_URL); return; }
    
    const r = await fetch(_K_URL);
    const t = await r.text();
    const v = t.split('\n').map(x => x.trim().toUpperCase()).filter(x => x.length === 20);

    if(v.includes(k)) {
        localStorage.setItem('cur_k', k);
        const exp = new Date();
        exp.setDate(exp.getDate() + 365); // Default 1 year
        localStorage.setItem('exp_'+k, exp.getTime());
        location.reload();
    } else {
        window.open(_TG_URL);
    }
}

function checkAccess() {
    const k = localStorage.getItem('cur_k');
    if(k) {
        const exp = localStorage.getItem('exp_'+k);
        if(new Date().getTime() > parseInt(exp)) {
            localStorage.removeItem('cur_k');
            location.reload();
            return;
        }
        document.getElementById('lockScreen').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        const s = JSON.parse(localStorage.getItem('st_'+k));
        if(s) _BAL = s.b;
        document.getElementById('exp_display').innerText = new Date(parseInt(exp)).toLocaleDateString();
    }
}
window.addEventListener('load', checkAccess);
document.getElementById('enterKeyBtn').addEventListener('click', auth);
