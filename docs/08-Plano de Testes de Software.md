# Plano de Testes de Software 

Esses são alguns dos cenários de teste que vão garantir que os requisitos funcionais e não funcionais da aplicação sejam satisfeitos. Os testes foram elaborados com base nas principais funcionalidades do sistema, visando verificar a adequação do software às necessidades dos usuários e assegurar a qualidade da aplicação.

### Cenário de Teste: Cadastro de Usuário
- **Objetivo:** Verificar se o sistema está cadastrando usuários da forma correta e eficiente.
- **Funcionalidades Avaliadas:** 
  - Criar uma conta com dados válidos (e-mail, nome, senha).
  - Validação de dados incorretos.
  - Feedback para o usuário, em caso de erro ou sucesso.
- **Grupo de usuários:** Novos usuários que nunca tiveram acesso ao sistema.
- **Ferramentas utilizadas:** Expo GO

### Cenário de Teste: Login de Usuário
- **Objetivo:** Verificar se usuários já cadastrados no sistema, conseguem realizar o login na conta de forma segura e eficiente
- **Funcionalidades Avaliadas:**
  - Login com credenciais corretas
  - Tentativas de Login com senha incorreta e/ou e-mail inexistente
- **Grupo de usuários:** Usuários já cadastrados no APP
- **Ferramentas utilizadas:** Validação por meio da API

### Cenário de Teste: Escolha e Adição de Itens ao Carrinho
- **Objetivo:** Permitir que os usuários consigam acessar a Home Page do aplicativo e possam adicionar itens no carrinho de compras
- **Funcionalidades Avaliadas:**
  - Navegação pelo cardápio e visualização dos detalhes dos itens.
  - Adição de itens ao carrinho.
  - Atualização do carrinho ao modificar a quantidade de itens.
- **Grupo de Usuários:** Usuários cadastrados e novos usuários realizando o primeiro pedido.
- **Ferramentas utilizadas:** Expo GO

### Cenário de Teste: Finalização do Pedido
- **Objetivo:** Testar o fluxo completo de finalização do pedido, desde a escolha dos itens até a confirmação do pagamento.
- **Funcionalidades Avaliadas:**
  - Escolha do método de pagamento.
  - Validação de dados de pagamento.
  - Mensagem de confirmação de pedido e exibição do status do pedido.
- **Grupo de Usuários:** Usuários cadastrados realizando pedidos pela primeira vez e usuários recorrentes.
- **Ferramentas Utilizadas:** Testes manuais com usuários reais.


## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
