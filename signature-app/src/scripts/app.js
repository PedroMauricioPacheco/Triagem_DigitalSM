// Este arquivo contém a lógica principal JavaScript para a aplicação de assinatura.
// Ele inicializa a aplicação, manipula eventos e gerencia a funcionalidade geral.

document.addEventListener('DOMContentLoaded', function() {
    const botaoAssinatura = document.getElementById('botaoAssinatura');
    const modal = document.getElementById('modalAssinatura');
    const botaoFecharModal = document.getElementById('fecharModal');
    const botaoConfirmar = document.getElementById('confirmarAssinatura');
    const canvasAssinatura = document.getElementById('canvasAssinatura');
    const ctx = canvasAssinatura.getContext('2d');

    // Função para abrir o modal de assinatura
    botaoAssinatura.addEventListener('click', function() {
        modal.style.display = 'block';
        redimensionarCanvas();
    });

    // Função para fechar o modal de assinatura
    botaoFecharModal.addEventListener('click', function() {
        modal.style.display = 'none';
        limparCanvas();
    });

    // Função para confirmar a assinatura e fechar o modal
    botaoConfirmar.addEventListener('click', function() {
        modal.style.display = 'none';
        // Aqui você pode adicionar lógica para salvar os dados da assinatura
        // Por exemplo, converter o canvas para uma imagem e armazená-la
    });

    // Função para redimensionar o canvas para captura de assinatura
    function redimensionarCanvas() {
        canvasAssinatura.width = window.innerWidth;
        canvasAssinatura.height = window.innerHeight * 0.5; // Ajustar altura conforme necessário
        ctx.clearRect(0, 0, canvasAssinatura.width, canvasAssinatura.height);
    }

    // Função para limpar o canvas
    function limparCanvas() {
        ctx.clearRect(0, 0, canvasAssinatura.width, canvasAssinatura.height);
    }

    // Adicionar ouvintes de eventos adicionais para desenho de assinatura aqui
});