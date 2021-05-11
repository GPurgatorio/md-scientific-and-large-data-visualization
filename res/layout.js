function openDemo() {
    // There must be a way to test this both locally and when hosted on github buuuut I'm lazy
    if(window.location.href.startsWith("https://"))
        window.location.href = window.location.href + "sldv.html";
    else
        window.location.href = "sldv.html";
}

function openInfos() {
    document.getElementById('modal-overlay').classList.add('shown');
    document.getElementById('infos').classList.add('shown');
    document.getElementById('tutorial').classList.add('active');
}

function closeInfos() {
    document.getElementById('modal-overlay').classList.remove('shown');
    document.getElementById('infos').classList.remove('shown');
    document.getElementById('tutorial').classList.remove('active');
}