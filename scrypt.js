// Aguarda o conteúdo da página carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona o formulário e a área de mensagem pelo ID
    const form = document.getElementById('clienteForm');
    const messageDiv = document.getElementById('form-message');

    // ** IMPORTANTE: Cole a URL de teste do seu Webhook do n8n aqui! **
    const webhookUrl = 'https://n8n.alissonjoias.com.br/webhook-test/d96b4746-8cc1-420e-871e-5c127da14d2d';

    // Adiciona um "ouvinte" para o evento de envio (submit) do formulário
    form.addEventListener('submit', (event) => {
        // 1. Previne o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault();

        // Mostra uma mensagem de "enviando..."
        messageDiv.textContent = 'Enviando dados...';
        messageDiv.style.color = '#333';

        // 2. Coleta todos os dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // 3. Envia os dados para o Webhook usando a API Fetch do navegador
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Converte o objeto de dados para o formato JSON
        })
        .then(response => {
            // Verifica se a resposta do n8n foi um sucesso
            if (response.ok) {
                return response.json(); // Processa a resposta JSON do n8n
            }
            // Se não foi um sucesso, lança um erro
            throw new Error('Falha no envio para o webhook.');
        })
        .then(data => {
            // 4. Se tudo deu certo, mostra uma mensagem de sucesso e limpa o formulário
            console.log('Sucesso! Resposta do n8n:', data);
            messageDiv.textContent = 'Cliente cadastrado com sucesso!';
            messageDiv.style.color = 'green';
            form.reset(); // Limpa todos os campos
        })
        .catch(error => {
            // 5. Se algo deu errado, mostra uma mensagem de erro no console e na tela
            console.error('Erro:', error);
            messageDiv.textContent = 'Ocorreu um erro ao cadastrar. Tente novamente.';
            messageDiv.style.color = 'red';
        });
    });
});