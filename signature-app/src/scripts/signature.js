// Este arquivo contém a lógica para manipular a funcionalidade de captura de assinatura.
// Inclui funções para ampliar a área de assinatura para facilitar a assinatura e redimensioná-la de volta após assinar.

const modalAssinatura = document.getElementById('modalAssinatura');
const canvasAssinatura = document.getElementById('canvasAssinatura');
const ctx = canvasAssinatura.getContext('2d');
let estaDesenhando = false;

// Função para iniciar o desenho no canvas
function iniciarDesenho(evento) {
    estaDesenhando = true;
    ctx.beginPath();
    ctx.moveTo(evento.offsetX, evento.offsetY);
}

// Função para desenhar no canvas
function desenhar(evento) {
    if (!estaDesenhando) return;
    ctx.lineTo(evento.offsetX, evento.offsetY);
    ctx.stroke();
}

// Função para parar de desenhar no canvas
function pararDesenho() {
    estaDesenhando = false;
    ctx.closePath();
}

// Função para abrir o modal de assinatura
function abrirModalAssinatura() {
    modalAssinatura.style.display = 'block';
    canvasAssinatura.width = window.innerWidth; // Define largura do canvas para tela cheia
    canvasAssinatura.height = window.innerHeight; // Define altura do canvas para tela cheia
    ctx.clearRect(0, 0, canvasAssinatura.width, canvasAssinatura.height); // Limpa desenhos anteriores
}

// Função para fechar o modal de assinatura e redimensionar o canvas
function fecharModalAssinatura() {
    modalAssinatura.style.display = 'none';
    canvasAssinatura.width = 300; // Restaura largura do canvas
    canvasAssinatura.height = 150; // Restaura altura do canvas
}

// Função para salvar a assinatura como imagem
function salvarAssinatura() {
    const urlDados = canvasAssinatura.toDataURL();
    // Aqui você pode manipular a urlDados, ex: enviar para o servidor ou salvar localmente
    console.log(urlDados);
    fecharModalAssinatura();
}

// Listeners de eventos para o canvas
canvasAssinatura.addEventListener('mousedown', iniciarDesenho);
canvasAssinatura.addEventListener('mousemove', desenhar);
canvasAssinatura.addEventListener('mouseup', pararDesenho);
canvasAssinatura.addEventListener('mouseout', pararDesenho);

// Exportar funções para uso em outros scripts
export { abrirModalAssinatura, fecharModalAssinatura, salvarAssinatura };