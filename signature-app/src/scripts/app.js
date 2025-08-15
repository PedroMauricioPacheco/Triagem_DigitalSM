// Este arquivo contém a lógica principal JavaScript para a aplicação de assinatura.
// Ele inicializa a aplicação, manipula eventos e gerencia a funcionalidade geral.

document.addEventListener('DOMContentLoaded', function() {
    const botaoAssinatura = document.getElementById('botaoAssinatura');
    const modal = document.getElementById('modalAssinatura');
    const botaoFecharModal = document.getElementById('fecharModal');
    const botaoConfirmar = document.getElementById('confirmarAssinatura');
    const canvasAssinatura = document.getElementById('canvasAssinatura');
    const ctx = canvasAssinatura.getContext('2d');
    
    let estaDesenhando = false;
    let ultimoX = 0;
    let ultimoY = 0;

    // Função para abrir o modal de assinatura
    if (botaoAssinatura) {
        botaoAssinatura.addEventListener('click', function() {
            modal.style.display = 'block';
            redimensionarCanvas();
            configurarDesenho();
        });
    }

    // Função para fechar o modal de assinatura
    if (botaoFecharModal) {
        botaoFecharModal.addEventListener('click', function() {
            modal.style.display = 'none';
            limparCanvas();
        });
    }

    // Função para confirmar a assinatura e fechar o modal
    if (botaoConfirmar) {
        botaoConfirmar.addEventListener('click', function() {
            modal.style.display = 'none';
            // Salvar assinatura como base64
            const dadosAssinatura = canvasAssinatura.toDataURL();
            console.log('Assinatura salva:', dadosAssinatura);
        });
    }

    // Função para redimensionar o canvas para captura de assinatura
    function redimensionarCanvas() {
        const largura = Math.min(window.innerWidth * 0.9, 800);
        const altura = Math.min(window.innerHeight * 0.6, 400);
        
        canvasAssinatura.width = largura;
        canvasAssinatura.height = altura;
        canvasAssinatura.style.width = largura + 'px';
        canvasAssinatura.style.height = altura + 'px';
        
        ctx.clearRect(0, 0, canvasAssinatura.width, canvasAssinatura.height);
        
        // Configurar estilo do pincel
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    // Função para limpar o canvas
    function limparCanvas() {
        ctx.clearRect(0, 0, canvasAssinatura.width, canvasAssinatura.height);
    }

    // Função para configurar eventos de desenho (mouse e touch)
    function configurarDesenho() {
        // Função para obter coordenadas do evento
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

        // Função para iniciar desenho
        function iniciarDesenho(evento) {
            evento.preventDefault();
            estaDesenhando = true;
            const coords = obterCoordenadas(evento);
            ultimoX = coords.x;
            ultimoY = coords.y;
        }

        // Função para desenhar
        function desenhar(evento) {
            if (!estaDesenhando) return;
            evento.preventDefault();
            
            const coords = obterCoordenadas(evento);
            
            ctx.beginPath();
            ctx.moveTo(ultimoX, ultimoY);
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
            
            ultimoX = coords.x;
            ultimoY = coords.y;
        }

        // Função para parar desenho
        function pararDesenho(evento) {
            if (evento) evento.preventDefault();
            estaDesenhando = false;
        }

        // Eventos para mouse (desktop)
        canvasAssinatura.addEventListener('mousedown', iniciarDesenho);
        canvasAssinatura.addEventListener('mousemove', desenhar);
        canvasAssinatura.addEventListener('mouseup', pararDesenho);
        canvasAssinatura.addEventListener('mouseout', pararDesenho);

        // Eventos para touch (tablet/mobile)
        canvasAssinatura.addEventListener('touchstart', iniciarDesenho, { passive: false });
        canvasAssinatura.addEventListener('touchmove', desenhar, { passive: false });
        canvasAssinatura.addEventListener('touchend', pararDesenho, { passive: false });
        canvasAssinatura.addEventListener('touchcancel', pararDesenho, { passive: false });
    }

    // Botão para limpar assinatura (se existir)
    const botaoLimpar = document.getElementById('limparAssinatura');
    if (botaoLimpar) {
        botaoLimpar.addEventListener('click', limparCanvas);
    }
});