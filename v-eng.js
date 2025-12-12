let _BAL = 0.00000001;
let _PRC = 0.00;
let _M_INT = null;

async function syncPrice() {
    try {
        const r = await fetch(_P_URL);
        const d = await r.json();
        _PRC = parseFloat(d.price);
        document.getElementById('btc_price').innerText = _PRC.toFixed(2);
        document.getElementById('usd_value').innerText = (_BAL * _PRC).toFixed(2);
        
        const minBTC = (_MIN_USD / _PRC).toFixed(8);
        document.getElementById('minInfo').innerText = `Min: $${_MIN_USD.toFixed(2)} (${minBTC} BTC)`;
    } catch(e){}
}

function startMiningLoop() {
    let amt = (Math.random() * 0.00000009 + 0.00000001);
    _BAL += amt;
    document.getElementById('balance').innerText = _BAL.toFixed(8);
    const c = document.getElementById('console');
    c.innerHTML += `<div class="text-blue-400 font-bold">> Mined Block: +${amt.toFixed(8)} BTC</div>`;
    c.scrollTop = c.scrollHeight;
    saveSt();
    _M_INT = setTimeout(startMiningLoop, Math.random() * 1000 + 500);
}

function saveSt() {
    const k = localStorage.getItem('cur_k');
    if(k) localStorage.setItem('st_'+k, JSON.stringify({b: _BAL}));
}

setInterval(syncPrice, 300); // 300ms live update as per original
