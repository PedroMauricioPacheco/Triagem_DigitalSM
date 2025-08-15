window.addEventListener("DOMContentLoaded", iniciarEventos);

function iniciarEventos() {
    document.body.style.zoom = "80%";

    preencherDataAtual();

    const canvas = document.getElementById('canvasMama');
    
    if (canvas) {
        // Clique (desktop)
        canvas.addEventListener('click', function(e) {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (canvas.height / rect.height);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Toque (tablet/celular)
        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
            const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    // Inicializar canvas de assinaturas para TCLEs
    inicializarCanvasAssinaturas();
}

function preencherDataAtual() {
    const inputData = document.getElementById('dataTriagem');
    if (inputData) {
        const hoje = new Date();
        const yyyy = hoje.getFullYear();
        const mm = String(hoje.getMonth() + 1).padStart(2, '0');
        const dd = String(hoje.getDate()).padStart(2, '0');
        inputData.value = `${yyyy}-${mm}-${dd}`;
    }
    
    // Adicionar preenchimento de data e hora atual
    preencherDataHoraAtual();
}

function preencherDataHoraAtual() {
    const inputDataHora = document.getElementById('dataHoraTriagem');
    if (inputDataHora) {
        const agora = new Date();
        const yyyy = agora.getFullYear();
        const mm = String(agora.getMonth() + 1).padStart(2, '0');
        const dd = String(agora.getDate()).padStart(2, '0');
        const hh = String(agora.getHours()).padStart(2, '0');
        const min = String(agora.getMinutes()).padStart(2, '0');
        inputDataHora.value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    }
}

function radiosPreenchidosDoFormAtual() {
    // Procura o form mais próximo do botão que chamou gerarPDF
    let form = document.activeElement && document.activeElement.form;
    if (!form) form = document.querySelector('form');
    if (!form) return true; // Se não achar form, não bloqueia

    const requiredRadios = form.querySelectorAll('input[type="radio"][required]');
    if (requiredRadios.length === 0) return true;
    const names = Array.from(requiredRadios).map(r => r.name);
    const uniqueNames = [...new Set(names)];
    for (const name of uniqueNames) {
        const group = form.querySelectorAll(`input[type="radio"][name="${name}"][required]`);
        if (![...group].some(r => r.checked)) {
            return false;
        }
    }
    return true;
}

function camposObrigatoriosPreenchidos() {
    const nome = document.getElementById('nomePaciente');
    const idade = document.getElementById('idadePaciente');
    if (!nome || !idade) return true; // Se não existir, não bloqueia
    if (!nome.value.trim() || !idade.value.trim()) {
        return false;
    }
    return true;
}

function mostrarAlertaGeracao(mensagem) {
    const alerta = document.getElementById('AlertaGeracao');
    if (alerta) {
        alerta.textContent = mensagem;
        alerta.style.color = 'red';
        alerta.style.display = 'block';
        alerta.style.marginBottom = '10px';
        // Some o alerta após 5 segundos
        setTimeout(() => {
            alerta.textContent = '';
            alerta.style.display = 'none';
        }, 5000);
    }
}

function limparAlertaGeracao() {
    const alerta = document.getElementById('AlertaGeracao');
    if (alerta) {
        alerta.textContent = '';
        alerta.style.display = 'none';
    }
}

function gerarPDF(event) {
    if (event) event.preventDefault();

    limparAlertaGeracao();

    if (!radiosPreenchidosDoFormAtual()) {
        mostrarAlertaGeracao("Por favor, preencha todas as perguntas obrigatórias antes de gerar o PDF.");
        return;
    }

    if (!camposObrigatoriosPreenchidos()) {
        mostrarAlertaGeracao("Por favor, preencha o nome do paciente e a idade antes de gerar o PDF.");
        return;
    }

    // Abre a janela de impressão
    window.print();

    setTimeout(() => {
        location.reload();
    }, 500); 
    window.scrollTo(0, 0);
}

function limparMarcacoesMama() {
    const canvas = document.getElementById('canvasMama');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// ==================== FUNÇÕES PARA CANVAS DE ASSINATURAS (TCLEs) ====================

function inicializarCanvasAssinaturas() {
    const canvasIds = ['canvasPaciente', 'canvasResponsavel', 'canvasMedico', 'canvasTestemunha1', 'canvasTestemunha2'];
    
    canvasIds.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
            setupCanvasDrawing(canvas);
        }
    });
}

function setupCanvasDrawing(canvas) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Configurar estilo da linha
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Função para obter coordenadas do evento
    function getEventPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        if (e.touches) {
            // Touch event
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        } else {
            // Mouse event
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        }
    }

    function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        const pos = getEventPos(e);
        lastX = pos.x;
        lastY = pos.y;
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const pos = getEventPos(e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        lastX = pos.x;
        lastY = pos.y;
    }

    function stopDrawing(e) {
        if (e) e.preventDefault();
        isDrawing = false;
    }

    // Eventos para mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Eventos para touch (tablet/mobile)
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing, { passive: false });
    canvas.addEventListener('touchcancel', stopDrawing, { passive: false });

    // Prevenir scroll no canvas
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
}

function limparCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}


