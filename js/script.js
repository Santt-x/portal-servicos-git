const formulario = document.querySelector("#formContato");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoServico = document.querySelector("#servico");
const mensagem = document.querySelector("#mensagemForm");
const btnConsultar = document.querySelector("#btnConsultar");
const resultado = document.querySelector("#resultado");
const campoFavorito = document.querySelector("#servicoFavorito");
const botaoFavorito = document.querySelector("#btnSalvarFavorito");
const mensagemFavorito = document.querySelector("#favoritoSalvo");

// Uma lista de dados alimenta o catálogo, a consulta e o favorito.
const servicos = [
    {
        id: "formatacao", nome: "Formatação de computadores",
        descricao: "Formatação e instalação do sistema operacional.", categoria: "software"
    },
    {
        id: "manutencao", nome: "Manutenção de computadores",
        descricao: "Diagnóstico e manutenção de computadores e notebooks com problemas.", categoria: "hardware"
    },
    {
        id: "programas", nome: "Instalação de programas",
        descricao: "Instalação e configuração de programas para o usuário.", categoria: "software"
    },
    {
        id: "limpeza", nome: "Limpeza preventiva",
        descricao: "Limpeza interna dos componentes para melhorar a ventilação do computador.", categoria: "hardware"
    },
    {
        id: "suporte", nome: "Suporte ao usuário",
        descricao: "Orientação para utilizar programas e resolver dúvidas de informática.", categoria: "atendimento"
    }
];

const listaServicos = document.querySelector("#listaServicos");
const filtroCategoria = document.querySelector("#filtroCategoria");
const mensagemFiltro = document.querySelector("#mensagemFiltro");

function renderizarServicos(lista) {
    if (!listaServicos) return;
    // Limpa a lista para não duplicar os cards a cada troca de categoria.
    listaServicos.innerHTML = "";
    if (lista.length === 0) {
        listaServicos.textContent = "Nenhum serviço foi encontrado nesta categoria.";
        return;
    }

    lista.forEach((servico) => {
        const card = document.createElement("article");
        card.classList.add("card-servico");
        const titulo = document.createElement("h3");
        titulo.textContent = servico.nome;
        const descricao = document.createElement("p");
        descricao.textContent = servico.descricao;
        const link = document.createElement("a");
        link.href = "contato.html";
        link.textContent = "Solicitar serviço";
        link.setAttribute("aria-label", `Solicitar serviço: ${servico.nome}`);
        card.append(titulo, descricao, link);
        listaServicos.appendChild(card);
    });
}

if (listaServicos && filtroCategoria && mensagemFiltro) {
    renderizarServicos(servicos);
    mensagemFiltro.textContent = "Mostrando todos os serviços.";
    filtroCategoria.addEventListener("change", () => {
        const categoriaEscolhida = filtroCategoria.value;
        if (categoriaEscolhida === "todos") {
            renderizarServicos(servicos);
            mensagemFiltro.textContent = "Mostrando todos os serviços.";
        } else {
            const servicosFiltrados = servicos.filter((servico) => {
                return servico.categoria === categoriaEscolhida;
            });
            renderizarServicos(servicosFiltrados);
            mensagemFiltro.textContent = `${servicosFiltrados.length} serviço(s) encontrado(s).`;
        }
    });
}

// As opções usam os mesmos objetos dos cards para manter os serviços consistentes.
[campoServico, campoFavorito].forEach((campo) => {
    if (!campo) return;
    campo.innerHTML = "";
    const orientacao = document.createElement("option");
    orientacao.value = "";
    orientacao.textContent = "Selecione";
    campo.appendChild(orientacao);
    servicos.forEach((servico) => {
        const opcao = document.createElement("option");
        opcao.value = servico.id;
        opcao.textContent = servico.nome;
        campo.appendChild(opcao);
    });
});

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.className = erro ? "mensagem-erro" : "mensagem-sucesso";
}

if (formulario) {
    // Mantém required e type=email e orienta também pelo DOM.
    formulario.addEventListener("invalid", () => {
        mostrarMensagem("Preencha os campos obrigatórios e informe um e-mail válido.", true);
    }, true);

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const nome = campoNome.value.trim();
        const email = campoEmail.value.trim();
        const servico = campoServico.value.trim();
        const campoMensagem = document.querySelector("#mensagem");
        const textoMensagem = campoMensagem.value.trim();
        if (nome === "" || email === "" || servico === "" || textoMensagem === "") {
            mostrarMensagem("Preencha os campos obrigatórios antes de continuar.", true);
            if (!nome) campoNome.focus();
            else if (!email) campoEmail.focus();
            else if (!servico) campoServico.focus();
            else campoMensagem.focus();
            return;
        }
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }
        mostrarMensagem(`Obrigado, ${nome}! Sua solicitação foi registrada nesta demonstração local.`);
    });
}

if (btnConsultar) {
    btnConsultar.addEventListener("click", () => {
        const selecionado = servicos.find((item) => item.id === campoServico.value);
        if (selecionado) {
            resultado.textContent = `Serviço selecionado: ${selecionado.nome}. ${selecionado.descricao}`;
        } else {
            resultado.textContent = "Selecione um serviço para consultar.";
        }
    });
}

if (botaoFavorito && campoFavorito && mensagemFavorito) {
    botaoFavorito.addEventListener("click", () => {
        const servico = campoFavorito.value;
        const selecionado = servicos.find((item) => item.id === servico);
        if (!selecionado) {
            mensagemFavorito.textContent = "Escolha um serviço primeiro.";
            return;
        }
        try {
            localStorage.setItem("servicoFavorito", servico);
            mensagemFavorito.textContent = `Favorito salvo: ${selecionado.nome}`;
        } catch {
            mensagemFavorito.textContent = "Não foi possível salvar a preferência. Verifique se o navegador permite armazenamento local.";
        }
    });

    try {
        const favoritoSalvo = localStorage.getItem("servicoFavorito");
        const selecionado = servicos.find((item) => item.id === favoritoSalvo);
        if (selecionado) {
            campoFavorito.value = favoritoSalvo;
            mensagemFavorito.textContent = `Seu serviço favorito é: ${selecionado.nome}`;
        }
    } catch {
        mensagemFavorito.textContent = "O armazenamento local está indisponível neste navegador.";
    }
}
