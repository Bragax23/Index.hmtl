// Lista de palavras separadas por tema
const palavras = {
    'informatica': ['mouse', 'teclado', 'monitor', 'software', 'backup'],
    'redes': ['roteador', 'switch', 'firewall', 'ip', 'gateway'],
    'hardware': ['processador', 'memoria', 'placa-mae', 'ssd', 'hdmi']
};

let palavraSelecionada = '';
let letrasCorretas = [];
let erros = 0;
let pontos = 0;
let tempo = 0;
let timer;

// Seleciona o tema e inicia o jogo
function selecionarTema(tema) {
    const lista = palavras[tema];
    palavraSelecionada = lista[Math.floor(Math.random() * lista.length)].toUpperCase();
    letrasCorretas = [];
    erros = 0;
    pontos = 0;
    tempo = 0;
    document.getElementById('tema').style.display = 'none';
    document.getElementById('jogo').style.display = 'block';
    document.getElementById('forca-desenho').innerText = 'Erros: 0';
    document.getElementById('pontuacao').innerText = 'Pontos: 0';
    iniciarContador();
    mostrarPalavra();
    mostrarLetras();
}

// Inicia o cronômetro
function iniciarContador() {
    clearInterval(timer);
    timer = setInterval(() => {
        tempo++;
        document.getElementById('contador').innerText = `Tempo: ${tempo}s`;
    }, 1000);
}

// Mostra palavra com underscores e acertos
function mostrarPalavra() {
    let display = palavraSelecionada.split('').map(l => letrasCorretas.includes(l) ? l : '_').join(' ');
    document.getElementById('palavra').innerText = display;
    if (!display.includes('_')) {
        clearInterval(timer);
        alert(`Parabéns! Você ganhou! Pontuação final: ${pontos + Math.max(0, 30 - tempo)}`);
    }
}

// Cria botões de letras A-Z
function mostrarLetras() {
    const letrasDiv = document.getElementById('letras');
    letrasDiv.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i);
        const btn = document.createElement('button');
        btn.innerText = letra;
        btn.onclick = () => verificarLetra(letra, btn);
        letrasDiv.appendChild(btn);
    }
}

// Verifica se letra está correta
function verificarLetra(letra, btn) {
    btn.disabled = true;
    if (palavraSelecionada.includes(letra)) {
        letrasCorretas.push(letra);
        pontos += 10;
    } else {
        erros++;
        document.getElementById('imagemForca').src = `forca${erros}.png`;
        pontos = Math.max(0, pontos - 5);
        document.getElementById('forca-desenho').innerText = `Erros: ${erros}`;
        if (erros >= 6) {
            clearInterval(timer);
            alert(`Fim de jogo! A palavra era ${palavraSelecionada}`);
        }
    }
    document.getElementById('pontuacao').innerText = `Pontos: ${pontos}`;
    mostrarPalavra();
}

// Reinicia o jogo
function reiniciarJogo() {
    document.getElementById('tema').style.display = 'block';
    document.getElementById('jogo').style.display = 'none';
    clearInterval(timer);
}
