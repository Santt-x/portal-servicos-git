const campoCep = document.querySelector("#cep");
const botaoBuscarCep = document.querySelector("#btnBuscarCep");
const statusCep = document.querySelector("#statusCep");
const resultadoCep = document.querySelector("#resultadoCep");

function mostrarStatusCep(texto, erro = false) {
    statusCep.textContent = texto;
    statusCep.className = erro ? "mensagem-erro" : "mensagem-sucesso";
}

async function buscarCep() {
    // Impede consultas simultâneas, inclusive quando a tecla Enter é utilizada.
    if (botaoBuscarCep.disabled) return;
    const cep = campoCep.value.replace(/\D/g, "");
    resultadoCep.textContent = "";

    if (cep.length !== 8) {
        campoCep.setAttribute("aria-invalid", "true");
        mostrarStatusCep("Digite um CEP com 8 números.", true);
        campoCep.focus();
        return;
    }

    campoCep.removeAttribute("aria-invalid");
    mostrarStatusCep("Consultando CEP...");
    botaoBuscarCep.disabled = true;
    campoCep.readOnly = true;
    resultadoCep.setAttribute("aria-busy", "true");

    // Encerra a espera após 10 segundos se o serviço não responder.
    const controlador = new AbortController();
    const limiteDeEspera = setTimeout(() => controlador.abort(), 10000);

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            signal: controlador.signal
        });
        if (!resposta.ok) {
            throw new Error("Falha na consulta ao serviço.");
        }
        const dados = await resposta.json();
        if (dados.erro) {
            mostrarStatusCep("CEP não encontrado.", true);
            return;
        }
        if (!dados.localidade || !dados.uf) {
            throw new Error("Resposta de endereço incompleta.");
        }

        mostrarStatusCep("CEP encontrado.");
        // textContent exibe os dados externos como texto, sem interpretar HTML.
        resultadoCep.textContent =
            `${dados.logradouro || "Logradouro não informado"} - ` +
            `${dados.bairro || "Bairro não informado"} - ` +
            `${dados.localidade}/${dados.uf}`;
    } catch (erro) {
        const texto = erro.name === "AbortError"
            ? "A consulta demorou demais. Tente novamente."
            : "Não foi possível consultar o CEP agora. Verifique sua conexão e tente novamente.";
        mostrarStatusCep(texto, true);
    } finally {
        clearTimeout(limiteDeEspera);
        botaoBuscarCep.disabled = false;
        campoCep.readOnly = false;
        resultadoCep.setAttribute("aria-busy", "false");
    }
}

if (campoCep && botaoBuscarCep && statusCep && resultadoCep) {
    botaoBuscarCep.addEventListener("click", buscarCep);
    campoCep.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            evento.preventDefault();
            buscarCep();
        }
    });
}
