# **Registro de Testes de Software**

<span style="color:red">**Pré-requisitos**: <a href="3-Projeto de Interface.md">Projeto de Interface</a>, <a href="8-Plano de Testes de Software.md">Plano de Testes de Software</a></span>

[**Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado em um plano de testes pré-definido**.](https://youtu.be/CzNwrYsEPa4?si=eS_Detyt4sPzjoX5)  
**Observação**: O vídeo no link acima mostra a execução do código e fornece evidências visuais dos testes realizados.

---

## **Avaliação**

A avaliação dos testes foi realizada com base no **Plano de Testes de Software** previamente definido. O planejamento tinha como objetivo verificar a execução correta de diversas funcionalidades essenciais do sistema, com foco em usabilidade, integridade dos dados e performance. A seguir, apresentamos os resultados obtidos, destacando os **pontos fortes**, **pontos fracos** e as **estratégias de melhoria** para as próximas iterações.

### **Pontos Fortes**

A partir dos testes realizados, as seguintes funcionalidades se destacaram positivamente:

1. **Cadastro de Usuário**:
   - O fluxo de criação de conta funcionou de acordo com o esperado, com a validação adequada de e-mail, nome e senha. Os casos de erro relacionados a dados inválidos (e-mail incorreto, senha fraca) foram corretamente identificados e tratadas as exceções.
   
2. **Login de Usuário**:
   - A validação das credenciais de login foi eficiente, garantindo que usuários com dados corretos pudessem acessar suas contas, enquanto erros de senha ou e-mail inexistente foram devidamente tratados, fornecendo feedback claro ao usuário.

3. **Finalização de Pedido**:
   - A escolha de métodos de pagamento e a validação dos dados de pagamento ocorreram sem falhas, e o status do pedido foi corretamente atualizado após a confirmação de pagamento, validando com sucesso o fluxo de compras.

### **Pontos Fracos**

Além das falhas relacionadas ao cache, também foi identificada uma falha importante na **integração geral das telas**. Essa falha afetou a interação entre diferentes seções do sistema, impactando negativamente a fluidez e a consistência da experiência do usuário.

1. **Integração de Telas**:
   - **Falha de Sincronização entre Telas**: Durante os testes, foi notado que as telas do sistema não estavam corretamente integradas. Por exemplo, quando o usuário adicionava um item ao carrinho ou alterava a quantidade de um item, essa alteração não era refletida na tela de checkout ou nas telas subsequentes, devido à falta de sincronização adequada entre as telas. Isso causou um comportamento inconsistente, onde os usuários não conseguiam ver as alterações de forma imediata e o fluxo do aplicativo ficou fragmentado.

2. **Escolha e Adição de Itens ao Carrinho**:
   - O cache não era atualizado corretamente, o que resultava em falhas na visualização do número de itens no carrinho após alterações. Essa falha de integração entre as telas de navegação e o carrinho causou uma desconexão entre as ações do usuário e o que era exibido.

3. **Tela de Carrinho e Checkout**:
   - A transição entre as telas de carrinho e checkout também não ocorreu de forma fluida. Mudanças no carrinho não se refletiam corretamente na tela de checkout, o que gerava uma discrepância entre os dados visíveis para o usuário e os dados do sistema. Além disso, o cache não era atualizado automaticamente, o que fazia com que o usuário não visse as informações corretas sem recarregar a página.

4. **Modal de Produtos**:
   - A falha de integração também afetou o modal de produtos. Quando adicionais eram adicionados ao produto, o preço final não era atualizado em outras telas, como a tela de carrinho e a de pagamento, resultando em um valor incorreto exibido no momento de finalização do pedido.

### **Estratégias para Iterações Futuras**

Com as falhas de integração e cache identificadas, a equipe planejou as seguintes melhorias para garantir uma experiência mais fluida e consistente nas próximas versões do sistema:

1. **Correção da Sincronização entre Telas**:
   - Será implementada uma **síncrona mais eficiente** entre as telas do sistema para garantir que todas as interações (como adição, remoção ou alteração de itens no carrinho) sejam refletidas instantaneamente nas outras telas. A comunicação entre as telas será aprimorada para garantir consistência de dados em todas as etapas do fluxo de compra.

2. **Aprimoramento do Cache e Atualização em Tempo Real**:
   - O sistema será ajustado para garantir que o **cache seja atualizado em tempo real**, especialmente nas interações que envolvem o carrinho e o modal de produtos, de modo que as alterações feitas pelo usuário sejam refletidas imediatamente nas telas subsequentes, sem a necessidade de recarregar a página.

3. **Refinamento da Navegação entre Telas**:
   - A navegação entre as telas será revisada para garantir que o fluxo do usuário seja contínuo e sem interrupções. A transição de telas será otimizada para que as alterações no carrinho ou nas opções de pagamento sejam sempre refletidas corretamente, garantindo que o usuário tenha uma experiência consistente.

### **Falhas Detectadas**

- **Problemas de Integração entre Telas**: As telas do sistema não estavam integradas corretamente, causando falhas na atualização dos dados entre elas (como carrinho e checkout).
- **Problemas no Cache**: O cache não estava sendo atualizado de forma eficiente, o que resultou em inconsistências nas informações exibidas nas diferentes telas, especialmente na tela de carrinho e checkout.

### **Melhorias Geradas**

Baseadas nas falhas identificadas, as seguintes melhorias estão sendo implementadas ou planejadas:

1. **Sincronização de Dados Entre Telas**: A equipe implementará uma sincronização mais eficaz entre as telas para garantir que todas as interações, como a modificação de itens no carrinho, sejam refletidas instantaneamente em outras telas do sistema.
   
2. **Atualização Automática do Cache**: Será ajustado o cache do sistema para garantir que ele seja atualizado em tempo real, de modo que as alterações feitas pelo usuário em qualquer parte do sistema sejam refletidas de imediato em todas as telas relacionadas.

Essas melhorias têm como objetivo garantir uma experiência **mais fluida**, **consistente** e **precisa** para o usuário, minimizando as falhas de integração e a desatualização de dados durante a navegação no sistema.

---

> **Links Úteis**:
> - [Ferramentas de Teste para JavaScript](https://geekflare.com/javascript-unit-testing/)

---
