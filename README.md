# Portal de Serviços de Informática

Projeto acadêmico desenvolvido na disciplina de Programação Web.

## Autor

Bruno Loebens dos Santos

## Como executar

Abra a pasta no VS Code e inicie o projeto com Live Server. Acesse index.html
no endereço HTTP local e navegue pelos links Início, Serviços e Contato.
Use o mesmo endereço e porta ao testar a persistência do favorito.

## Funcionalidades acumuladas

- HTML5 semântico, navegação entre três páginas e imagem com texto alternativo.
- Labels associados, página atual identificada, foco visível e mensagens com aria-live.
- CSS compartilhado, Flexbox com quebra de linha e adaptação para telas pequenas.
- Aulas 09–10: cinco serviços de informática em um array de objetos com nome e descricao;
  cards gerados com forEach, createElement, textContent, append e appendChild.
- Aula 11: categoria em todos os objetos; filtro de Software, Hardware e Atendimento
  com change, value e filter; renderizarServicos(lista) limpa o catálogo antes de
  montar os cards e trata listas vazias.
- Consulta com select, botão e if/else preservada na página Contato.
- Aulas 12–13: validação HTML e JavaScript, mensagens no DOM, confirmação local
  e favorito salvo e recuperado com localStorage.setItem/getItem.
- Consulta e favorito usam o mesmo array do catálogo. IDs antigos de favoritos preservados.

A confirmação do formulário é uma demonstração local; não há envio a servidor.

## Roteiro de conferência antes da entrega

1. Em Serviços, confirme cinco cards na abertura.
2. Filtre Software (dois), Hardware (dois) e Atendimento (um).
3. Volte a Todos e alterne as categorias: os cinco cards devem voltar sem duplicação.
4. No Console da página Serviços, execute renderizarServicos([]) para conferir a
   mensagem de lista vazia; restaure com renderizarServicos(servicos).
5. Em Contato, consulte sem selecionar e depois consulte cada serviço.
6. Tente enviar campos vazios, e-mail inválido e mensagem somente com espaços.
   Com todos os campos válidos, deve aparecer uma confirmação local.
7. Salve um favorito e recarregue: a seleção e a mensagem devem ser recuperadas.
   Confira a chave servicoFavorito em Application > Local Storage.
8. Confira navegação por Tab, foco visível, telas pequenas e Console sem erros.
9. Antes da entrega, confira o histórico e publique os commits no repositório.

## Versionamento e entrega

Repositório informado no histórico: https://github.com/Santt-x/portal-servicos-git

A publicação remota e a URL do GitHub Pages precisam ser conferidas pelo autor.
Esta atualização não cria commits nem executa push. As atividades pedem evidências
de evolução, commits descritivos e links do repositório e do Pages, quando disponível.

## Registro de uso de IA

Foi solicitado ao Codex comparar o projeto com os anexos das Aulas 09–11 e com
os requisitos acumulados de validação e LocalStorage. A análise identificou cards
estáticos, ausência do filtro e dados incompletos. Após autorização, a IA implementou
o catálogo dinâmico, as categorias, o filtro e a integração com consulta e favorito,
além da validação de mensagem composta somente de espaços.

Antes de entregar, o autor deve executar o roteiro acima, registrar os resultados
e eventuais modificações próprias e conseguir explicar o código utilizado.
