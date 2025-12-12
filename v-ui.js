// Navigation
document.getElementById('buyNowBtn').addEventListener('click', () => {
    document.getElementById('lockScreen').classList.add('hidden');
    document.getElementById('paymentPage').classList.remove('hidden');
});
document.getElementById('referralLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('lockScreen').classList.add('hidden');
    document.getElementById('referralPage').classList.remove('hidden');
});
document.getElementById('backFromPayment').addEventListener('click', () => location.reload());
document.getElementById('backFromRef').addEventListener('click', () => location.reload());

// Payment Logic
const pDiv = document.getElementById('packageContainer');
_PKGS.forEach(pkg => {
    pDiv.innerHTML += `<button class="flex-1 bg-gray-700 p-2 rounded text-[10px] font-bold border border-gray-600 hover:border-[#26a69a]" onclick="selectP('${pkg.p}')">${pkg.n}<br>$${pkg.p}</button>`;
});
window.selectP = (p) => { document.getElementById('currentPriceDisplay').innerText = `$${p}.00`; };
document.getElementById('walletDisplay').value = _W_ADDR;
document.getElementById('copyAddressBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(_W_ADDR);
    alert("Copied!");
});

// Mining Controls
document.getElementById('startMiningBtn').addEventListener('click', () => {
    startMiningLoop();
    document.getElementById('startMiningBtn').disabled = true;
    document.getElementById('startMiningBtn').classList.add('opacity-50');
    document.getElementById('stopMiningBtn').disabled = false;
    document.getElementById('stopMiningBtn').classList.remove('opacity-50');
});
document.getElementById('stopMiningBtn').addEventListener('click', () => {
    clearTimeout(_M_INT);
    document.getElementById('startMiningBtn').disabled = false;
    document.getElementById('startMiningBtn').classList.remove('opacity-50');
    document.getElementById('stopMiningBtn').disabled = true;
    document.getElementById('stopMiningBtn').classList.add('opacity-50');
});

// Withdrawal Logic
document.getElementById('withdrawBtn').addEventListener('click', () => {
    document.getElementById('withdrawalForm').classList.toggle('hidden');
});
document.getElementById('submitW').addEventListener('click', () => {
    const v = _BAL * _PRC;
    if(v < _MIN_W) {
        document.getElementById('modalTitle').innerText = "ERROR";
        document.getElementById('modalMsg').innerText = `Insufficient balance. Min withdrawal is $${_MIN_USD}.`;
        document.getElementById('modalOverlay').classList.remove('hidden');
    } else {
        alert("Withdrawal submitted!");
        _BAL = 0.00000001; saveSt(); location.reload();
    }
});
document.getElementById('modalClose').addEventListener('click', () => document.getElementById('modalOverlay').classList.add('hidden'));
