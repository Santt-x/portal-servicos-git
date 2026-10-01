const servico = document.querySelector("#servico");
const btnConsultar = document.querySelector("#btnConsultar");
const resultado = document.querySelector("#resultado");

btnConsultar.addEventListener("click", function () {

    const valorServico = servico.value;

    resultado.textContent = "Serviço selecionado: " + valorServico;

});