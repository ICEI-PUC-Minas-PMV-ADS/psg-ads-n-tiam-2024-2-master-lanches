Claro! Abaixo está o seu documento modificado, com as devidas alterações de formatação para torná-lo mais organizado, incluindo os **Casos de Erro** que mencionei, além de algumas melhorias na estrutura para facilitar a leitura e o entendimento.

---

# **Plano de Testes de Software**

## **Cenários de Teste**

Esses são alguns dos cenários de teste que garantem que os requisitos funcionais e não funcionais da aplicação sejam satisfeitos. Os testes foram elaborados com base nas principais funcionalidades do sistema, visando verificar a adequação do software às necessidades dos usuários e assegurar a qualidade da aplicação.

---

### **Cenário de Teste 1: Cadastro de Usuário**
- **Objetivo**: Verificar se o sistema está cadastrando usuários da forma correta e eficiente.
- **Funcionalidades Avaliadas**:
  - Criação de conta com dados válidos (e-mail, nome, senha).
  - Validação de dados incorretos.
  - Feedback para o usuário, em caso de erro ou sucesso.
- **Grupo de Usuários**: Novos usuários que nunca tiveram acesso ao sistema.
- **Ferramentas Utilizadas**: Expo GO
- **Casos de Erro**:
  1. **Erro de e-mail inválido**: O sistema não deve permitir cadastrar um e-mail inválido (ex: sem o domínio `.com`).
  2. **Erro de senha fraca**: O sistema deve retornar uma mensagem de erro se a senha for muito curta ou não atender aos requisitos de segurança.
  3. **Usuário já existente**: Ao tentar cadastrar um e-mail já registrado, o sistema deve exibir um aviso de que o e-mail já está em uso.
  4. **Falta de dados obrigatórios**: O sistema não deve permitir o cadastro sem o preenchimento de campos obrigatórios (nome, e-mail, senha).

---

### **Cenário de Teste 2: Login de Usuário**
- **Objetivo**: Verificar se usuários já cadastrados conseguem realizar o login de forma segura e eficiente.
- **Funcionalidades Avaliadas**:
  - Login com credenciais corretas.
  - Tentativas de login com senha incorreta e/ou e-mail inexistente.
- **Grupo de Usuários**: Usuários já cadastrados no APP.
- **Ferramentas Utilizadas**: Validação por meio da API.
- **Casos de Erro**:
  1. **Senha incorreta**: O sistema deve exibir uma mensagem de erro e não permitir o login.
  2. **E-mail inexistente**: O sistema deve informar que o e-mail não está registrado.
  3. **Campo de e-mail vazio**: Ao tentar realizar login sem preencher o campo de e-mail, o sistema deve solicitar o preenchimento.
  4. **Campo de senha vazio**: O sistema deve alertar se o campo de senha estiver vazio.

---

### **Cenário de Teste 3: Escolha e Adição de Itens ao Carrinho**
- **Objetivo**: Permitir que os usuários consigam acessar a Home Page e adicionar itens ao carrinho de compras.
- **Funcionalidades Avaliadas**:
  - Navegação pelo cardápio e visualização dos detalhes dos itens.
  - Adição de itens ao carrinho.
  - Atualização do carrinho ao modificar a quantidade de itens.
- **Grupo de Usuários**: Usuários cadastrados e novos usuários realizando o primeiro pedido.
- **Ferramentas Utilizadas**: Expo GO
- **Casos de Erro**:
  1. **Erro na adição ao carrinho**: Quando o usuário tenta adicionar um item ao carrinho e não é possível, o sistema não deve permitir a ação.
  2. **Erro de navegação**: O sistema deve garantir que o usuário consiga navegar corretamente pelos itens, com imagens e descrições claras.
  3. **Erro na atualização do carrinho**: Quando o usuário tenta alterar a quantidade de um item, a mudança não é refletida corretamente no carrinho.

---

### **Cenário de Teste 4: Finalização do Pedido**
- **Objetivo**: Testar o fluxo completo de finalização do pedido, desde a escolha dos itens até a confirmação do pagamento.
- **Funcionalidades Avaliadas**:
  - Escolha do método de pagamento.
  - Validação de dados de pagamento.
  - Mensagem de confirmação de pedido e exibição do status do pedido.
- **Grupo de Usuários**: Usuários cadastrados realizando pedidos pela primeira vez e usuários recorrentes.
- **Ferramentas Utilizadas**: Testes manuais com usuários reais.
- **Casos de Erro**:
  1. **Erro na escolha do método de pagamento**: O sistema deve garantir que, se um método de pagamento inválido for escolhido, ele será rejeitado e o usuário será alertado.
  2. **Erro na validação do pagamento**: Caso os dados de pagamento sejam inválidos (ex: número de cartão de crédito incorreto), o sistema deve retornar um erro claro.
  3. **Erro na confirmação do pedido**: Após a confirmação do pagamento, o sistema deve exibir uma mensagem de sucesso e o status do pedido.

---

### **Cenário de Teste 5: Tela de Página Inicial**
- **Objetivo**: Garantir que a tela inicial seja carregada corretamente e sem erros.
- **Casos de Erro**:
  1. **Erro na adição de itens ao carrinho**: Se um item for adicionado ao carrinho e não for redirecionado para a página do carrinho, o fluxo de navegação deve ser revisado.

---

### **Cenário de Teste 6: Tela de Carrinho**
- **Objetivo**: Verificar o comportamento correto da tela de carrinho.
- **Casos de Erro**:
  1. **Erro ao remover item**: Ao tentar remover um item do carrinho, ele deve ser removido de forma imediata. Caso contrário, o erro deve ser registrado.
  2. **Erro ao modificar unidades**: Se o usuário tenta aumentar ou diminuir a quantidade de um item no carrinho e a alteração não se reflete, isso é um erro crítico.
  3. **Erro ao finalizar pedido**: Caso o usuário finalize o pedido e o que foi adicionado ao carrinho não seja refletido, o sistema deve corrigir o fluxo de dados.

---

### **Cenário de Teste 7: Tela de Pesquisa**
- **Objetivo**: Garantir que a funcionalidade de pesquisa funcione corretamente.
- **Casos de Erro**:
  1. **Erro na pesquisa**: Se o usuário realizar uma pesquisa e o sistema não retornar os resultados esperados, isso configura um erro. A pesquisa deve ser capaz de buscar itens com base no nome, categoria ou qualquer critério relevante.

---

### **Cenário de Teste 8: Modal de Produtos**
- **Objetivo**: Verificar o comportamento do modal de produtos ao adicionar itens ao carrinho.
- **Casos de Erro**:
  1. **Erro ao adicionar ao carrinho**: Quando o usuário tenta adicionar um item ao carrinho e o sistema não reflete a adição, isso é um erro.
  2. **Erro ao adicionar adicionais**: Se o usuário escolher adicionais (ex: extras, modificações) e o preço não for refletido corretamente, isso deve ser corrigido.

---

## **Conclusão**

Este plano de testes abrange todos os aspectos críticos da aplicação, desde o cadastro e login de usuários até a navegação, adição ao carrinho e finalização de pedidos. Os **casos de erro** garantem que as falhas comuns sejam identificadas e corrigidas, proporcionando uma experiência de usuário robusta e sem problemas.

Esse plano também pode ser ajustado conforme novas funcionalidades forem adicionadas ou requisitos forem atualizados. Se precisar de mais detalhes sobre algum cenário ou ajuda com outra parte do processo de testes, me avise!

---

Agora o documento está mais organizado, com as **formatações** adequadas para facilitar a compreensão e a aplicação dos testes. Se precisar de mais alguma alteração ou adição, estou à disposição!
