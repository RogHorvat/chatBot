// Obtém os elementos do chatbot
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotBody = document.getElementById('chatbot-body');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Define o número de mensagens necessário para ativar a barra de rolagem
let numeroMensagensAtivarRolagem = 10;

// Variável para controlar se a barra de rolagem está ativada
let barraRolagemAtivada = false;

// Função para ajustar a altura do chatbot e ativar a barra de rolagem
function ajustarAlturaChatbot() {
  const alturaCorpo = chatbotBody.scrollHeight;
  const alturaContainer = chatbotContainer.offsetHeight;
  
  if (alturaCorpo > alturaContainer) {
    chatbotContainer.style.overflowY = 'scroll';
    if (!barraRolagemAtivada) {
      chatbotContainer.scrollTop = chatbotContainer.scrollHeight;
      barraRolagemAtivada = true;
    }
  } else {
    chatbotContainer.style.overflowY = 'hidden';
    barraRolagemAtivada = false;
  }
}

// Função para enviar a mensagem
function enviarMensagem() {
  const mensagem = userInput.value;
  if (mensagem.trim() !== '') {
    adicionarMensagem(mensagem, 'outgoing');
    userInput.value = '';
    ajustarAlturaChatbot();
    // Coloque aqui a lógica adicional para processar a mensagem enviada
  }
}

// Função para adicionar uma mensagem ao chatbot
function adicionarMensagem(mensagem, tipo) {
  const mensagemElement = document.createElement('div');
  mensagemElement.classList.add('message', tipo);
  mensagemElement.innerHTML = `<p>${mensagem}</p>`;
  chatbotBody.appendChild(mensagemElement);
  if (chatbotBody.children.length > numeroMensagensAtivarRolagem) {
    ajustarAlturaChatbot();
  }
}

// Evento de input do usuário
userInput.addEventListener('input', ajustarAlturaChatbot);

// Evento de clique no botão "Enviar"
sendButton.addEventListener('click', enviarMensagem);

// Evento de teclado no campo de entrada de texto
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Impede o comportamento padrão do Enter
      enviarMensagem();
    }
  });

// Função para atualizar o número de mensagens necessário para ativar a barra de rolagem
function atualizarNumeroMensagens(valor) {
  numeroMensagensAtivarRolagem = 10;
  ajustarAlturaChatbot();
}

// Ajusta a altura inicialmente
ajustarAlturaChatbot();
