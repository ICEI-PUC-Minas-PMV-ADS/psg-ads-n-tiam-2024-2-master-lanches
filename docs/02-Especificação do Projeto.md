# Especificações do Projeto

Nesta seção, abordaremos tópicos que partem da perspectiva do usuário, organizados da seguinte forma:

1_ **Personas**

2_ **Histórias de Usuários**

3_ **Requisitos**
   - 3.1_ **Requisitos Funcionais**
   - 3.2_ **Requisitos Não Funcionais**

4_ **Restrições**

5_ **Diagrama de Casos de Uso**

6_ **Gerenciamento de Tempo**

7_ **Gerenciamento de Equipe**

8_ **Gestão de Orçamento**

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente através de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros.


## Histórias de Usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

| **Eu como... `PERSONA`**    | **Quero/Preciso... `FUNCIONALIDADE`**                         | **Para... `MOTIVO/VALOR`**                                                           |
|-----------------------------|---------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Estudante                   | Fazer pedidos de forma rápida e simples                      | Poder me concentrar mais nos meus estudos e não desperdiçar tanto tempo nisso         |
| Amante de Gastronomia       | Explorar e experimentar novos sabores de hambúrgueres artesanais | Satisfazer minha paixão por gastronomia e descobrir combinações inovadoras            |
| Dono de Hambúrgueria        | Gerir meu estabelecimento maximizando o alcance de atendimento  | Aumentar os lucros e facilitar o controle sobre minha hamburgueria                     |
| Consumidor de Hambúrgueres  | Fazer pedidos de hambúrgueres simples, mas bem preparados com carne de qualidade e acompanhamentos clássicos | Desfrutar de uma refeição autêntica e de qualidade sem complicações                    |
| Explorador de Sabores       | Encontrar hambúrgueres artesanais únicos e inovadores em cada pedido | Experimentar novos sabores e combinações em cada refeição                             |
| Entusiasta de Queijo        | Pedir hambúrgueres artesanais com muito queijo                  | Satisfazer meu desejo por um hambúrguer indulgente e cheio de queijo                   |
| Profissional ocupado    | Realizar pedidos com agilidade e através de uma interface intuitiva | Economizar tempo durante a pausa para o almoço e minimizar o estresse no trabalho       |
## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

####    Informações do orçamento
#####     Recursos Humanos:
 `Diego Rodrigues - 2.500,00 R$ * 5 (meses)` <br>

 `Fredson Marinho - 2.500,00 R$ * 5 (meses)` <br>
 
 `João Severino - 2.500,00 R$ * 5 (meses)` <br>

 `Matheus Campos - 2.500,00 R$ * 5 (meses)` <br>
 
 `Paulo Augusto - 2.500,00 R$ * 5 (meses)` <br>

 `Paulo Roberto - 2.500,00 R$ * 5 (meses)` <br>
 
 `Thiago Augusto - 2.500,00 R$ * 5 (meses)`

#####     Hardware:
 `Notebook - 2.500,00 R$ * 7 (Integrantes)`

#####     Rede:
 `500mb - 100,00 R$ * 7 (Integrantes) * 5 (meses)`

#####     Software:
 `Hospedagem - 128,45 R$ * 5 (meses)`

#####     Serviços:
 `0,00 R$`

![Orçamento](img/Orçamento.png)
