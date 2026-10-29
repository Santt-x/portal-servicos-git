# Portal de Serviços de Informática

## Sobre o projeto

Portal acadêmico da disciplina de Programação Web Front-End, desenvolvido durante o semestre.
Reúne serviços de informática para computadores e notebooks em um catálogo consultável.
Ajuda o usuário a filtrar os serviços, registrar uma solicitação demonstrativa e guardar uma preferência.
Inclui consulta de endereço por CEP para apoiar o planejamento de um atendimento.

## Tecnologias utilizadas

- HTML5 semântico.
- CSS3, Flexbox e media query.
- JavaScript: eventos, funções, arrays, objetos, DOM, validação e LocalStorage.
- Fetch API, async/await e JSON.
- Git e GitHub.
- API pública ViaCEP.

## Funcionalidades

- Navegação entre Início, Serviços e Contato.
- Catálogo dinâmico com cinco serviços, criado com `forEach` e `document.createElement`.
- Filtro de Software, Hardware e Atendimento com `change`, `.value` e `filter`.
- `renderizarServicos(lista)` limpa os cards antes de renderizar e trata lista vazia.
- Consulta por select e botão, com decisão `if/else` e descrição do serviço escolhido.
- Formulário com labels, `required`, e-mail validado e verificação JavaScript com `trim`.
- Confirmação local da solicitação: não há envio a servidor.
- Favorito persistido na chave `servicoFavorito` com `localStorage.setItem/getItem`.
- Consulta de CEP com carregamento, validação, endereço, CEP inexistente e falhas tratadas.
- Navegação por teclado, foco visível, mensagens com `aria-live` e layout responsivo.

## Estrutura

```text
index.html
servicos.html
contato.html
css/style.css
js/script.js
js/cep.js
img/67gatinho.webp
README.md
```

## API utilizada

O [ViaCEP](https://viacep.com.br/) fornece dados de endereço em JSON, sem chave de API.
A consulta utiliza `GET https://viacep.com.br/ws/{cep}/json/` com oito dígitos.
O JavaScript remove os caracteres não numéricos antes de validar o tamanho do CEP.
`fetch` inicia a consulta, `await` aguarda a resposta, `resposta.ok` verifica o HTTP
e `resposta.json()` converte o JSON em dados para atualizar o DOM.

O portal diferencia formato inválido, CEP inexistente (`dados.erro`) e falha de comunicação.
Logradouro e bairro vazios recebem textos alternativos. Durante a espera, o botão
fica desabilitado para evitar consultas duplicadas. Após 10 segundos, a consulta
é cancelada; os controles são liberados em `finally`, inclusive após erro.
O CEP informado é enviado ao ViaCEP somente ao solicitar a busca.

## Como executar e testar

Abra a pasta no VS Code e use Live Server. Acesse `index.html` pelo endereço HTTP local.
Mantenha o mesmo endereço e porta ao testar o favorito. A consulta real de CEP exige Internet.

1. **Navegação:** abra as três páginas e teste os links do menu e dos cards.
2. **Catálogo:** confira cinco cards; filtre Software (2), Hardware (2) e Atendimento (1).
   Volte a Todos (5) e alterne novamente para conferir que não há duplicação.
3. **Lista vazia:** no Console de Serviços, execute `renderizarServicos([])`;
   deve aparecer uma orientação. Restaure com `renderizarServicos(servicos)`.
4. **Consulta antiga:** em Contato, consulte sem selecionar e depois consulte cada serviço.
5. **Formulário:** teste campos vazios, e-mail inválido, nome ou mensagem só com espaços
   e um preenchimento válido; confira a orientação e a confirmação local.
6. **Favorito:** salve um serviço, recarregue e confira seleção e mensagem restauradas.
   Inspecione `servicoFavorito` em DevTools > Application > Local Storage.
7. **CEP inválido:** vazio ou `123` deve orientar e não enviar requisição à API.
8. **CEP válido:** teste `01001-000` e `01001000`; confira o endereço e o carregamento.
9. **CEP inexistente:** teste `99999999`; deve aparecer “CEP não encontrado”.
10. **Falha de rede:** em DevTools > Network, ative Offline e consulte um CEP válido.
    Confira a mensagem de falha e continue usando catálogo e filtro; desative Offline depois.
11. **Acessibilidade:** use Tab e Shift+Tab; confira foco visível, labels e acionamento dos
    botões. No campo CEP, Enter também inicia a busca.
12. **Responsividade:** confira as três páginas em larguras de 320px, 375px e desktop.
13. **Console:** confira ausência de erros de JavaScript. Na simulação Offline, o navegador
    pode registrar a requisição que falhou; a página deve mostrar uma orientação.

## Publicação

- Repositório: [Santt-x/portal-servicos-git](https://github.com/Santt-x/portal-servicos-git).
- Branch principal confirmada: `master`.
- GitHub Pages: publicação e endereço final ainda precisam ser confirmados.

Depois de enviar a versão final, abra Settings > Pages e confirme a publicação da
branch `master`, pasta raiz. Copie o endereço exibido pelo GitHub para esta seção.
Abra o site publicado em outro navegador e repita os testes de navegação, CSS,
imagem, catálogo, filtro, formulário, favorito e API. A aprovação local não confirma
o funcionamento da versão publicada.

## Registro de uso de IA

O Codex foi consultado para comparar o projeto com os anexos das atividades,
identificar pendências e implementar o catálogo dinâmico, o filtro e a integração ViaCEP.
A IA também ajudou na validação de campos, documentação e verificação no navegador.
Os cenários e resultados desta etapa estão registrados abaixo, após a execução dos testes.
O autor deve revisar as alterações, registrar adaptações próprias e explicar o código na apresentação.

## Checklist final e resultados dos testes

Verificação realizada em 28/10/2026 no Microsoft Edge, com servidor HTTP local.

- [x] Consulta real ao ViaCEP: `01001-000` retornou Praça da Sé - Sé - São Paulo/SP.
- [x] Formato vazio, curto e não numérico recusado sem requisição.
- [x] CEP com e sem hífen, mensagem de carregamento e bloqueio de consultas simultâneas.
- [x] CEP inexistente, HTTP 503, JSON inválido, falha de rede e campos ausentes,
  com respostas simuladas no navegador para verificar cada caminho de tratamento.
- [x] Cancelamento após tempo limite e liberação dos controles, com relógio simulado.
- [x] Catálogo, três categorias, Todos, lista vazia e ausência de duplicação.
- [x] Consulta anterior dos cinco serviços e orientação sem seleção.
- [x] Campos obrigatórios, e-mail inválido, mensagem só com espaços e confirmação válida.
- [x] Favorito salvo e restaurado após recarregar.
- [x] Links internos das três páginas acessíveis pelo servidor local.
- [x] Campo CEP acessível por Tab, foco visível e busca pela tecla Enter.
- [x] Três páginas sem transbordamento horizontal em 320px, 375px e 1280px.
- [x] Revisão visual de Serviços em desktop e celular; sem cortes ou sobreposição.
- [x] Nenhuma exceção de JavaScript detectada durante os testes.
- [ ] Commit e push desta integração com a API.
- [ ] Publicação no GitHub Pages e inclusão do endereço publicado confirmado.
- [ ] Repetição dos testes na versão publicada.
- [ ] Revisão pessoal do Panorama Front-End e preparação para explicar o código.

A URL convencional `https://santt-x.github.io/portal-servicos-git/` retornou HTTP 404
na conferência desta etapa. Isso não confirma publicação ativa nem exclui um domínio
personalizado. Confira o endereço final em Settings > Pages.

## Onde explicar o código na apresentação

- `js/script.js`: array de objetos, `forEach`, `renderizarServicos(lista)` e `filter`.
- `js/script.js`: eventos do formulário, `preventDefault`, `trim` e mensagens no DOM.
- `js/script.js`: salvamento e recuperação do favorito com LocalStorage.
- `js/cep.js`: `buscarCep`, `fetch`, `await`, `resposta.ok`, `json`, `try/catch/finally`.
- `css/style.css`: Flexbox, largura adaptável, media query e foco visível.

## Autor

Bruno Loebens dos Santos

## Panorama Front-End

Texto de apoio para revisão pelo autor: adapte à sua forma de explicar antes da entrega.

1. **Componentização:** dividir a interface em partes reutilizáveis, como um card de serviço.
   Isso reduz repetição e facilita mudar todos os cards pela mesma função.
2. **Multipágina e SPA:** neste portal, cada link abre outro arquivo HTML. Em uma SPA,
   o JavaScript troca o conteúdo e controla a navegação dentro da mesma aplicação carregada.
3. **Bootstrap:** conjunto de estilos, componentes e utilitários que pode acelerar a montagem
   de interfaces responsivas. Este projeto usa CSS próprio e não depende dele.
4. **React, Vue e Angular:** React é uma biblioteca de interfaces baseada em componentes;
   Vue é um framework progressivo com templates declarativos; Angular é um framework com
   estrutura mais abrangente, incluindo recursos como roteamento e formulários.
5. **Base da Web:** frameworks continuam produzindo e manipulando HTML, CSS e JavaScript.
   Conhecer essa base ajuda a entender acessibilidade, layout, comportamento e erros.
6. **Uso de IA:** pode explicar um erro, sugerir uma alteração ou ajudar a planejar testes.
   Cabe ao estudante conferir o resultado, adaptar o código e entender cada parte que entrega.
