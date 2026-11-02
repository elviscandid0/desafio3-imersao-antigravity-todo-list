/**
 * ============================================================================
 * MINHA LISTA DE TAREFAS - JAVASCRIPT
 * ============================================================================
 * Este arquivo contém toda a lógica da nossa aplicação:
 * 1. Capturar elementos do HTML (DOM)
 * 2. Armazenar a lista de tarefas (Array de objetos)
 * 3. Salvar e carregar dados no navegador (LocalStorage)
 * 4. Funções para Adicionar, Concluir e Remover tarefas
 * 5. Escutadores de Eventos (Cliques, Teclas)
 */

/* ============================================================================
   1. SELEÇÃO DE ELEMENTOS DA PÁGINA (DOM)
   Usamos document.getElementById para ligar as tags do HTML às variáveis do JS.
   ============================================================================ */
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");

/* ============================================================================
   2. ESTADO DA APLICAÇÃO (DADOS)
   Carrega as tarefas salvas anteriormente no LocalStorage ou inicia uma lista vazia.
   Cada tarefa será um objeto: { id: número, text: "nome da tarefa", completed: booleano }
   ============================================================================ */
let tasks = carregarTarefasDoArmazenamento();

/* Executa a renderização inicial ao carregar a página */
renderizarTarefas();

/* ============================================================================
   3. FUNÇÕES PRINCIPAIS
   ============================================================================ */

/**
 * Adiciona uma nova tarefa à lista
 */
function adicionarTarefa() {
  // Pega o texto digitado e remove espaços vazios no início e no final (.trim())
  const texto = taskInput.value.trim();

  // Se o campo estiver vazio, não faz nada e dá foco no campo
  if (texto === "") {
    taskInput.focus();
    return;
  }

  // Cria um novo objeto para a tarefa
  const novaTarefa = {
    id: Date.now() + Math.floor(Math.random() * 1000), // Gera um ID único para a tarefa
    text: texto,
    completed: false
  };

  // Adiciona a nova tarefa ao nosso array de tarefas
  tasks.push(novaTarefa);

  // Salva a lista atualizada no LocalStorage do navegador
  salvarTarefasNoArmazenamento();

  // Atualiza a tela com a nova tarefa
  renderizarTarefas();

  // Limpa o campo de texto e mantém o foco nele para facilitar a próxima digitação
  taskInput.value = "";
  taskInput.focus();
}

/**
 * Alterna o status da tarefa entre concluída e pendente
 * @param {number} id - O identificador único da tarefa
 */
function alternarConclusao(id) {
  // Encontra a tarefa correspondente pelo id e inverte seu status de "completed"
  tasks = tasks.map((tarefa) => {
    if (tarefa.id === id) {
      return { ...tarefa, completed: !tarefa.completed };
    }
    return tarefa;
  });

  // Salva as alterações e atualiza a interface
  salvarTarefasNoArmazenamento();
  renderizarTarefas();
}

/**
 * Remove uma tarefa da lista
 * @param {number} id - O identificador único da tarefa
 */
function removerTarefa(id) {
  // Filtra as tarefas, mantendo apenas aquelas cujo id for diferente do que queremos remover
  tasks = tasks.filter((tarefa) => tarefa.id !== id);

  // Salva a nova lista e redesenha a tela
  salvarTarefasNoArmazenamento();
  renderizarTarefas();
}

/**
 * Renderiza (desenha) todas as tarefas na tela
 */
function renderizarTarefas() {
  // Limpa a lista atual na interface para não duplicar itens
  taskList.innerHTML = "";

  // Se a lista estiver vazia, exibe a mensagem de lista vazia
  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  // Percorre cada tarefa do array e cria os elementos HTML correspondentes
  tasks.forEach((tarefa) => {
    // 1. Cria o item da lista (<li>)
    const li = document.createElement("li");
    li.className = `task-item ${tarefa.completed ? "completed" : ""}`;

    // 2. Cria o container do conteúdo (checkbox + texto)
    const contentDiv = document.createElement("div");
    contentDiv.className = "task-content";

    // 3. Cria a caixinha de marcar (checkbox)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = tarefa.completed;
    checkbox.addEventListener("change", () => alternarConclusao(tarefa.id));

    // 4. Cria o texto da tarefa (<span>)
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = tarefa.text;

    // Permite clicar no texto também para marcar como concluída
    span.addEventListener("click", () => alternarConclusao(tarefa.id));

    // Junta o checkbox e o texto dentro da div de conteúdo
    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(span);

    // 4.1. Se a tarefa estiver concluída, adiciona uma etiqueta visual ("badge")
    if (tarefa.completed) {
      const badge = document.createElement("span");
      badge.className = "status-badge";
      badge.textContent = "Concluída";
      contentDiv.appendChild(badge);
    }

    // 5. Cria o botão de excluir
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&times;"; // Símbolo '×' de multiplicação (usado como X)
    deleteBtn.title = "Excluir tarefa";
    deleteBtn.addEventListener("click", () => removerTarefa(tarefa.id));

    // 6. Junta o conteúdo e o botão de excluir dentro do <li>
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    // 7. Adiciona o <li> na nossa lista principal (<ul>)
    taskList.appendChild(li);
  });

  // Atualiza os contadores de resumo
  atualizarEstatisticas();
}

/**
 * Atualiza o número de tarefas totais e concluídas
 */
function atualizarEstatisticas() {
  const total = tasks.length;
  const concluidas = tasks.filter((t) => t.completed).length;

  taskCount.textContent = `${total} ${total === 1 ? "tarefa" : "tarefas"}`;
  completedCount.textContent = `${concluidas} concluída${concluidas === 1 ? "" : "s"}`;
}

/* ============================================================================
   4. PERSISTÊNCIA NO LOCALSTORAGE
   Permite que as tarefas continuem salvas mesmo se a página for fechada/recarregada.
   ============================================================================ */

/**
 * Salva a lista de tarefas no LocalStorage do navegador em formato JSON
 */
function salvarTarefasNoArmazenamento() {
  localStorage.setItem("minhas_tarefas", JSON.stringify(tasks));
}

/**
 * Carrega a lista de tarefas salva no LocalStorage (se existir)
 * @returns {Array} Array de tarefas salvas ou array vazio
 */
function carregarTarefasDoArmazenamento() {
  const dados = localStorage.getItem("minhas_tarefas");
  if (dados) {
    try {
      return JSON.parse(dados);
    } catch (e) {
      console.error("Erro ao ler tarefas salvas:", e);
      return [];
    }
  }
  return [];
}

/* ============================================================================
   5. ESCUTADORES DE EVENTOS (LISTENERS)
   Monitoram ações do usuário (clique no botão ou pressionar 'Enter').
   ============================================================================ */

// Ao clicar no botão "Adicionar"
addBtn.addEventListener("click", adicionarTarefa);

// Ao pressionar a tecla "Enter" dentro do campo de texto
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});
