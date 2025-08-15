// Este arquivo contém a lógica para manipular a funcionalidade de captura de assinatura.
// Inclui funções para ampliar a área de assinatura para facilitar a assinatura e redimensioná-la de volta após assinar.

const modalAssinatura = document.getElementById('modalAssinatura');
const canvasAssinatura = document.getElementById('canvasAssinatura');
const ctx = canvasAssinatura.getContext('2d');
let estaDesenhando = false;
let ultimoX = 0;
let ultimoY = 0;

// Função para obter coordenadas do evento (mouse ou touch)
function obterCoordenadas(evento) {
    const rect = canvasAssinatura.getBoundingClientRect();
    const escalaX = canvasAssinatura.width / rect.width;
    const escalaY = canvasAssinatura.height / rect.height;
    
    if (evento.touches) {
        // Evento touch (tablet/mobile)
        return {
            x: (evento.touches[0].clientX - rect.left) * escalaX,
            y: (evento.touches[0].clientY - rect.top) * escalaY
        };
    } else {
        // Evento mouse (desktop)
        return {
            x: (evento.clientX - rect.left) * escalaX,
            y: (evento.clientY - rect.top) * escalaY
        };
    }
}

// Função para iniciar o desenho no canvas
function iniciarDesenho(evento) {
    evento.preventDefault();
    estaDesenhando = true;
    const coords = obterCoordenadas(evento);
    ultimoX = coords.x;
    ultimoY = coords.y;
    
    ctx.beginPath();
    ctx.moveTo(ultimoX, ultimoY);
}

// Função para desenhar no canvas
function desenhar(evento) {
    if (!estaDesenhando) return;
    evento.preventDefault();
    
    const coords = obterCoordenadas(evento);
    
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    
    ultimoX = coords.x;
    ultimoY = coords.y;
}

// Função para parar de desenhar no canvas
function pararDesenho(evento) {
    if (evento) evento.preventDefault();
    estaDesenhando = false;
    ctx.closePath();
}

// Função para abrir o modal de assinatura
function abrirModalAssinatura() {
    modalAssinatura.style.display = 'block';
    
    // Definir tamanho responsivo do canvas
    const largura = Math.min(window.innerWidth * 0.9, 800);
    const altura = Math.min(window.innerHeight * 0.7, 500);
    
    canvasAssinatura.width = largura;
    canvasAssinatura.height = altura;
    canvasAssinatura.style.width = largura + 'px';
    canvasAssinatura.style.height = altura + 'px';
    
    // Configurar estilo do pincel
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.clearRect(0, 0, canvasAssinatura.width, canvasAssinatura.height);
    
    // Configurar eventos de desenho
    configurarEventosDesenho();
}

// Função para configurar eventos de desenho (mouse e touch)
function configurarEventosDesenho() {
    // Remover eventos antigos
    canvasAssinatura.removeEventListener('mousedown', iniciarDesenho);
    canvasAssinatura.removeEventListener('mousemove', desenhar);
    canvasAssinatura.removeEventListener('mouseup', pararDesenho);
    canvasAssinatura.removeEventListener('mouseout', pararDesenho);
    canvasAssinatura.removeEventListener('touchstart', iniciarDesenho);
    canvasAssinatura.removeEventListener('touchmove', desenhar);
    canvasAssinatura.removeEventListener('touchend', pararDesenho);
    canvasAssinatura.removeEventListener('touchcancel', pararDesenho);
    
    // Adicionar eventos de mouse (desktop)
    canvasAssinatura.addEventListener('mousedown', iniciarDesenho);
    canvasAssinatura.addEventListener('mousemove', desenhar);
    canvasAssinatura.addEventListener('mouseup', pararDesenho);
    canvasAssinatura.addEventListener('mouseout', pararDesenho);
    
    // Adicionar eventos de touch (tablet/mobile)
    canvasAssinatura.addEventListener('touchstart', iniciarDesenho, { passive: false });
    canvasAssinatura.addEventListener('touchmove', desenhar, { passive: false });
    canvasAssinatura.addEventListener('touchend', pararDesenho, { passive: false });
    canvasAssinatura.addEventListener('touchcancel', pararDesenho, { passive: false });
}

// Função para fechar o modal de assinatura e redimensionar o canvas
function fecharModalAssinatura() {
    modalAssinatura.style.display = 'none';
    
    // Restaurar tamanho padrão do canvas
    canvasAssinatura.width = 300;
    canvasAssinatura.height = 150;
    canvasAssinatura.style.width = '300px';
    canvasAssinatura.style.height = '150px';
}

// Função para limpar o canvas
function limparCanvas() {
    ctx.clearRect(0, 0, canvasAssinatura.width, canvasAssinatura.height);
}

// Função para salvar a assinatura como imagem
function salvarAssinatura() {
    const urlDados = canvasAssinatura.toDataURL();
    // Aqui você pode manipular a urlDados, ex: enviar para o servidor ou salvar localmente
    console.log('Assinatura salva:', urlDados);
    fecharModalAssinatura();
}

// Configurar eventos iniciais apenas para mouse (antes de abrir o modal)
if (canvasAssinatura) {
    canvasAssinatura.addEventListener('mousedown', iniciarDesenho);
    canvasAssinatura.addEventListener('mousemove', desenhar);
    canvasAssinatura.addEventListener('mouseup', pararDesenho);
    canvasAssinatura.addEventListener('mouseout', pararDesenho);
}

// Exportar funções para uso em outros scripts
export { abrirModalAssinatura, fecharModalAssinatura, salvarAssinatura, limparCanvas };