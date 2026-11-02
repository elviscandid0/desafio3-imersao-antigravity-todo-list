# 📋 Minha Lista de Tarefas (To-Do List)

Bem-vindo ao seu projeto de lista de tarefas! Este projeto foi desenvolvido com tecnologias web fundamentais (**HTML5**, **CSS3** e **JavaScript puro/Vanilla**), sem a necessidade de instalar frameworks ou programas adicionais.

---

## 🚀 Como Executar o Projeto

1. Abra a pasta do projeto: `c:\Users\Everton Alves\Desktop\LISTA DE TAREFAS`.
2. Dê um **duplo clique no arquivo `index.html`** (ou clique com o botão direito e escolha seu navegador favorito: Google Chrome, Microsoft Edge, Firefox, etc.).
3. Pronto! A aplicação abrirá no seu navegador imediatamente.

---

## 🧱 Entendendo os Componentes do Projeto

O desenvolvimento de interfaces web baseia-se em 3 pilares principais:

### 1. `index.html` (O Esqueleto / Estrutura)
- Define quais elementos existem na página:
  - O título e cabeçalho (`<header>`, `<h1>`, `<p>`).
  - O campo de digitação (`<input>`) e o botão (`<button>`).
  - A lista não-ordenada (`<ul>`) onde cada item de tarefa (`<li>`) será colocado.
  - O contador de tarefas e a mensagem de lista vazia.

### 2. `style.css` (A Roupa / Estilo Visual)
- Cuida de todas as cores, alinhamentos, fontes e animações:
  - Centraliza o cartão na tela com `display: flex`.
  - Dá bordas arredondadas (`border-radius`) e sombras suaves (`box-shadow`).
  - Estiliza os botões e efeitos ao passar o mouse (`:hover`).
  - **Diferenciação visual evidente entre pendentes e concluídas**:
    - **Pendentes**: borda lateral azul destacada (`border-left: 5px solid #3b82f6`) e fundo branco.
    - **Concluídas**: borda lateral verde (`border-left: 5px solid #10b981`), fundo suavemente esverdeado (`#f0fdf4`), texto tachado (`line-through`) e etiqueta visual verde `CONCLUÍDA`.

### 3. `script.js` (O Cérebro / Lógica e Interatividade)
- Dá vida à aplicação respondendo às ações do usuário:
  - **Captura de elementos (DOM):** localiza os botões e caixas de texto criados no HTML.
  - **Adicionar tarefa:** cria um novo objeto `{ id, text, completed }` e insere na lista.
  - **Concluir tarefa:** inverte o status de `completed` quando você clica na caixinha ou no texto.
  - **Inserção condicional de elementos:** gera a etiqueta `<span class="status-badge">Concluída</span>` apenas para as tarefas finalizadas.
  - **Remover tarefa:** exclui o item do array usando o método `.filter()`.
  - **LocalStorage:** salva os dados no armazenamento interno do seu navegador para que nada se perca ao fechar ou recarregar a página.

---

## 💡 Ideias para você praticar e aprender mais

Quando você se sentir confortável com o código atual, tente fazer estas pequenas melhorias:

1. **Alterar as cores:** Abra `style.css` e mude as cores principais (por exemplo, trocar `#3b82f6` por verde, roxo ou sua cor favorita).
2. **Botão de limpar tudo:** Adicione um botão "Limpar todas as tarefas" que esvazia a lista de uma vez.
3. **Filtros de visualização:** Crie botões para filtrar e exibir "Todas", "Pendentes" ou "Concluídas".
