const containerAdicionar = document.querySelector('.adicionar');
const inputAdicionar = document.querySelector('input');
const btnAdicionar = document.querySelector('button');
const containerTarefas = document.querySelector('.tarefas');
const templateTarefa = document.querySelector('template');

function salvarTarefas(){
    const nodeListTarefas = containerTarefas.querySelectorAll(':scope > .tarefa span');
    const arrayTarefas = Array.from(nodeListTarefas).map((el) => el.textContent);
    const stringTarefas = JSON.stringify(arrayTarefas);
    localStorage.setItem('tarefas', stringTarefas);
};

function carregarTarefas(){
    const stringTarefas = localStorage.getItem('tarefas');
    const arrayTarefas = JSON.parse(stringTarefas) || [];
    arrayTarefas.forEach(elTxt => criarTarefa(elTxt));
};

function criarTarefa(texto) {
    if (texto.trim() === '') return;
    const tarefa = templateTarefa.content.cloneNode(true);
    const spanTitle = tarefa.querySelector('span');
    const btnExcluir = tarefa.querySelector('button');
    spanTitle.textContent = texto;
    btnExcluir.onclick = () => {btnExcluir.closest('.tarefa').remove()
        salvarTarefas();
    };
    containerTarefas.appendChild(tarefa);
    salvarTarefas();
};

btnAdicionar.onclick = function () {
    const texto = inputAdicionar.value.trim();;
    criarTarefa(texto);
    inputAdicionar.value = '';
};

inputAdicionar.addEventListener('keypress', (evt) => {
    if (evt.key !== 'Enter') return;
    btnAdicionar.click();
});

carregarTarefas();