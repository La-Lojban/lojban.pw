---
title: História do Lojban
---

<div class="lojbo simple_blockquotes"></div>

Lojban é uma língua, proposta como um meio de representação do conhecimento e como uma ponte entre idiomas falados, idiomas de programação e idiomas da ciência e da matemática.
Lojban foi criado por um grupo de pesquisadores em 1987.

## História do Lojban

_por Bob LeChevalier, um dos criadores do Lojban_.

A gramática do TLI Loglan foi originalmente projetada sem análise formal de parser, e essa história impulsionou o esforço subsequente do Lojban.

* JCB descobriu os trabalhos de Victor Yngve em algum momento dos anos 60 ou início dos anos 70, e, portanto, teve a ideia de codificar a gramática em um conjunto de regras. Ele também concebeu vários objetivos para essa gramática codificada, que não me lembro muito bem. Mas ele não conseguiu alcançar esses objetivos, quaisquer que fossem, embora estivessem associados à codificação do que JCB entendia como a "gramática humana".
* Por volta de 1976-78, o esforço mudou para o uso de uma gramática YACC LALR-1 como padrão para codificar a gramática, porque várias pessoas sabiam como usar o YACC. Grande parte da gramática foi codificada, mas parecia ser impossível fazer com que a "gramática da máquina" analisasse as coisas da mesma forma que a "gramática humana" fazia.
* O problema foi resolvido por volta de 1980, acredito que por Jeff Prothero, na época estudante da Universidade de Washington, ao usar terminadores elidíveis para delimitar construções, que o YACC forneceria usando seu processamento de erros. Levou até cerca de 1982-1983 para realmente alcançar uma gramática YACC completa para a linguagem, usando correção de erros.

Quando começamos a recriar o Lojban, a intenção era manter a gramática do Loglan na íntegra, mudando apenas as palavras. Assim, estávamos limitados pelas limitações de design da linguagem original. JCB tentou brincar com direitos autorais da gramática formal (como ele fez com as palavras da linguagem), mas ele estava em terreno legal impossível, dado que grande parte do trabalho havia sido feito por Prothero e outros, juntamente com questões legais conhecidas sobre direitos autorais de um algoritmo de computador.

Mas reinventamos o léxico cmavo, e queríamos incluir componentes gramaticais para tempo e MEX que JCB nunca havia conseguido. Assim, inicialmente, com a ajuda de Prothero e um cara chamado Jeff Taylor e outros que conheciam o YACC, tentei reimplementar a gramática YACC do zero, mas sem realmente tentar reinventar a roda. Em 1991, Cowan assumiu o que eu havia feito e o aprimorou consideravelmente, eventualmente alcançando a gramática básica listada em CLL (que ainda é a gramática oficial). Mas a gramática ainda era uma gramática YACC, com todas as suas limitações.

As tentativas de criar uma gramática PEG permanecem não oficiais e, francamente, nunca olhei para a gramática PEG e provavelmente não entenderia se olhasse. O YACC já foi difícil o suficiente para mim, e, tendo aprendido a gramática YACC para o Lojban, nunca consegui usar fluentemente a gramática E-BNF supostamente mais simples (embora eu tenha aprendido algumas linguagens de programação usando BNF).

Assim, a resposta longa para sua pergunta, pelo que entendi, é que a gramática sempre foi destinada a ser o mais geral possível. A elidabilidade dos terminadores não era uma alta prioridade em geral, embora certos terminadores fossem desejáveis; não havia nada mais irritante do que tentar descobrir o que estava e o que não estava terminado quando você expressava uma sequência como kukukeiku. (A linguagem de JCB usava <gu> em vez de **ku**, e assim parecia muito com fala de bebê. O Lojban com terminadores completos é simplesmente **kuku**.)

Algumas das construções não-generais surgiram porque não foi possível fazer o YACC trabalhar com construções totalmente gerais, ou porque exigiam o uso excessivo de terminadores desagradáveis. Daí a abundância de diferentes famílias de conectivos lógicos, cada uma ligando um tipo diferente de construção. Essas decisões geralmente datam da era do JCB, embora tenhamos adicionado algumas coisas novas que eram conectáveis (como cláusulas relativas), e, portanto, algumas novas famílias, a maioria das quais acabou desaparecendo (por exemplo, zi'e, que já não é mais a base de uma família de conectivos lógicos). Também abandonamos o esforço de impor uma gramática formal às combinações de PA e UI, de modo que existam sequências de cada um desses cmavo que são tecnicamente gramaticais, mas não fazem sentido: **pi'epaime'ipipi'e**. Mas, na maior parte, a gramática fundamental da língua continua sendo a da linguagem pré-formal de JCB, com construções de terminadores elidíveis adicionadas onde eles podem permitir construções úteis, mas ainda assim sintaticamente inequívocas.