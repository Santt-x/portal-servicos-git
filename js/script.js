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

// Catálogo compartilhado pela consulta e pela preferência.
const servicos = [
    { id: "formatacao", nome: "Formatação de computadores" },
    { id: "manutencao", nome: "Manutenção de computadores" },
    { id: "programas", nome: "Instalação de programas" }
];

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
        if (nome === "" || email === "" || servico === "") {
            mostrarMensagem("Preencha os campos obrigatórios antes de continuar.", true);
            if (!nome) campoNome.focus();
            else if (!email) campoEmail.focus();
            else campoServico.focus();
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
        resultado.textContent = selecionado
            ? `Serviço selecionado: ${selecionado.nome}`
            : "Selecione um serviço para consultar.";
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
