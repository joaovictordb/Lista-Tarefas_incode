let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');
let idContador = 0;
// const qtdIdsDisponiveis = Number.MAX_VALUE;



inputNovaTarefa.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa)
    }

});

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

btnAddTarefa.addEventListener('click', (e) => {

    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),
    }
    adicionarTarefa(tarefa)
});

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');
    let idNumerico = parseInt(idTarefa);

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById('' + idTarefa + '');

    if (tarefaAtual) {
        let li = criarTagLI(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }
});

function gerarId() {
    
    idContador++;
    return idContador;
}

function adicionarTarefa(tarefa) {
    if (tarefa.nome.trim() === "") {
        alert("O NOME DA TAREFA NÃO PODE ESTAR VAZIO.");
        return;
    }
    
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = ''
}

function criarTagLI(tarefa) {

    let li = document.createElement('li');
    li.id = tarefa.id;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('onclick', 'marcarConcluida(' + tarefa.id + ')')

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil" style="color: #9E9E9E;"></i>';
    btnEditar.setAttribute('onclick', 'editar(' + tarefa.id + ')');


    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash" style="color: red;"></i>';
    btnExcluir.setAttribute('onclick', 'excluir(' + tarefa.id + ')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(checkbox)
    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(idTarefa) {
    let li = document.getElementById('' + idTarefa + '');
    if (li) {
        let spanTarefa = li.querySelector('.textoTarefa');
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = spanTarefa.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }

}

function excluir(idTarefa) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if (confirmacao) {
        let li = document.getElementById('' + idTarefa + '');
        if (li) {
            listaTarefas.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }
}

function marcarConcluida(idTarefa) {
    let li = document.getElementById('' + idTarefa + '');

    if (li) {
        let spanTarefa = li.querySelector('.textoTarefa');

        if (spanTarefa) {
            spanTarefa.classList.toggle('concluida')
        }
    }

}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}


///

