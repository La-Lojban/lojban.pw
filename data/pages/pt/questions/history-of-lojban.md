---
title: História do Lojban
---

<div class="lojbo"></div>

Lojban é uma língua, proposta como um meio de representação do conhecimento e como uma ponte entre línguas faladas, linguagens de programação e as línguas da ciência e da matemática.
Lojban foi criado por um grupo de pesquisadores em 1987.

## História do Lojban

_por Bob LeChevalier, um dos criadores do Lojban_.

A gramática do TLI Loglan foi originalmente projetada sem análise formal de parser, e essa história impulsionou o subsequente esforço do Lojban.

a) JCB descobriu as obras de Victor Yngve em algum momento dos anos 60 ou início dos anos 70, e, portanto, teve a ideia de codificar a gramática em um conjunto de regras. Ele também concebeu vários objetivos para essa gramática codificada, que eu não me lembro muito bem. Mas ele não conseguiu alcançar esses objetivos, quaisquer que fossem, embora estivessem associados à codificação do que JCB entendia como a "gramática humana".

b) Por volta de 1976-78, o esforço mudou para o uso de uma gramática YACC LALR-1 como padrão para codificar a gramática porque várias pessoas sabiam como usar o YACC. Grande parte da gramática foi codificada, mas parecia ser impossível fazer com que a "gramática da máquina" analisasse as coisas exatamente da mesma forma que a "gramática humana" fazia.

c) O problema foi resolvido por volta de 1980, acredito que por Jeff Prothero, então estudante da Universidade de Washington, que usou terminadores elidíveis para delimitar construções, que o YACC forneceria usando seu processamento de erros. Levou até cerca de 1982-1983 para realmente alcançar uma gramática YACC completa para a linguagem, usando correção de erros.

Quando começamos a redesenvolver o Lojban, a intenção era manter a gramática do Loglan em sua totalidade, mudando apenas as palavras. Assim, estávamos limitados pelas limitações de design da linguagem original. JCB tentou jogar jogos de direitos autorais com a gramática formal (como ele havia feito com as palavras da linguagem), mas ele estava em terreno legal impossível, dado que muito do trabalho havia sido feito por Prothero e outros, juntamente com questões legais conhecidas em direitos autorais de um algoritmo de computador.

Mas reinventamos o léxico cmavo, e queríamos incluir componentes gramaticais para tempo e MEX que JCB nunca havia conseguido. Assim, inicialmente com a ajuda de Prothero e um cara chamado Jeff Taylor e outros que conheciam o YACC, tentei reimplementar a gramática YACC do zero, mas sem realmente tentar reinventar a roda. Em 1991, Cowan assumiu o que eu havia feito e o limpou consideravelmente, eventualmente alcançando a gramática básica listada em CLL (que ainda é a gramática oficial). Mas a gramática ainda era uma gramática YACC, com todas as suas limitações.

As tentativas de criar uma gramática PEG permanecem não oficiais, e francamente, nunca olhei para a gramática PEG e provavelmente não entenderia se o fizesse. YACC já foi difícil o suficiente para mim, e, tendo aprendido a gramática YACC para Lojban, nunca consegui usar fluentemente a gramática supostamente mais simples E-BNF (embora tenha aprendido algumas linguagens de computador usando BNF).

Assim, a resposta longa para sua pergunta, como eu entendo, é que a gramática sempre foi projetada para ser o mais geral possível. A elidibilidade de terminadores não era uma prioridade alta em geral, embora certos terminadores fossem desejáveis; não havia nada mais irritante do que tentar descobrir o que estava ou não terminado quando você expressava uma string como kukukeiku. (A linguagem de JCB usava <gu> em vez de **ku**, e assim parecia muito com fala de bebê. Lojban com terminadores completos é simplesmente **kuku**.)

Alguns dos construtos não gerais surgiram porque eles não conseguiram fazer o YACC funcionar com construtos totalmente gerais, ou eles exigiam muito uso de terminadores irritantes. Daí a infinidade de diferentes famílias de conectivos lógicos, cada uma ligando um tipo diferente de construto. Essas decisões geralmente datam da era de JCB, embora tenhamos adicionado algumas coisas novas que eram conectáveis (como orações relativas), e assim algumas novas famílias, a maioria das quais eventualmente desapareceu (deixando, por exemplo, zi'e que não é mais a base para uma família de conectivos lógicos). Também abandonamos o esforço de impor uma gramática formal em compostos PA e UI, de modo que existem sequências de cada um desses cmavo que são tecnicamente gramaticais, mas não fazem sentido: pi'epaime'ipipi'e. Mas, na maior parte, a gramática fundamental da linguagem permanece a da linguagem pré-formal de JCB, com construtos de terminadores elidíveis adicionados onde eles poderiam permitir construtos úteis e ainda assim sintaticamente não ambíguos.