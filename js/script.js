javascript
const servico = document.querySelector("#servico");
const btnConsultar = document.querySelector("#btnConsultar");
const resultado = document.querySelector("#resultado");

const servicos = [
    {
        codigo: "formatacao",
        nome: "Formatação",
        descricao: "Formatação e instalação do sistema operacional."
    },
    {
        codigo: "manutencao",
        nome: "Manutenção",
        descricao: "Análise e manutenção de computadores e notebooks."
    },
    {
        codigo: "programas",
        nome: "Instalação de programas",
        descricao: "Instalação e configuração de programas para o usuário."
    }
];

btnConsultar.addEventListener("click", function () {

    const valorServico = servico.value;

    const servicoEncontrado = servicos.find(function (item) {
        return item.codigo === valorServico;
    });

    if (servicoEncontrado) {

        resultado.textContent =
            "Serviço: " +
            servicoEncontrado.nome +
            " - " +
            servicoEncontrado.descricao;

    } else {

        resultado.textContent = "Selecione um serviço.";

    }

});