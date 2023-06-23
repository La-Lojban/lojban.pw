---
title: la sutysisku e busca de similaridade
---

[la sutysisku](https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en) é um aplicativo da web que pode funcionar offline. Ele fornece acesso a dicionários Lojban, entre outras funcionalidades.

![la sutysisku - busca de similaridade](/assets/pixra/arxivo/sutysisku_simsa.png)

Uma das características de la sutysisku é a chamada busca de similaridade. Se você quiser saber como dizer "_maravilhoso_" em Lojban, pode não esperar encontrar a palavra "maravilhoso" na definição em Lojban, em vez disso, pode esperar palavras com significados semelhantes como "_brilhante_", "_encantador_", "_superlativo_". la sutysisku tenta encontrar as palavras com definições que contenham sinônimos ou palavras com significados semelhantes.

Outro caso é quando você consulta uma palavra, mas gostaria de encontrar palavras que possam ser usadas no mesmo contexto, mesmo que não sejam sinônimos diretos. Por exemplo, ao pesquisar "_tentativa_", você pode desejar encontrar palavras que signifiquem "_falha_", já que ambos esses conceitos podem ser úteis ao descrever diferentes estágios de uma situação. Ou ao pesquisar por ["_sussurro_"](https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&sisku=whisper&bangu=en&versio=masno), você pode se beneficiar ao obter definições de palavras relacionadas como "_silencioso_", "_pronunciar_", "_ouvir_", "_eco_", "_gritar_".

Não é preciso dizer que o inglês tem muitas palavras ambíguas ou palavras com vários significados, por exemplo, "_left_" ("não à direita" vs. "restante"). la sutysisku, nesses casos, mostra as melhores suposições para a maioria desses significados.

O algoritmo por trás das cenas é chamado de "vetores de palavras", onde cada palavra em inglês é representada por uma lista de valores escalares e palavras que ocorrem em contextos semelhantes recebem valores semelhantes nesse espaço "vetorial". O vocabulário principal do Lojban (gismu "verbos") foi mapeado manualmente para glosswords em inglês para ajudá-lo a obter melhores correspondências.

Para habilitar a busca de similaridade, escolha o botão "similar" após inserir uma palavra em la sutysisku.

<div style="font-size:200%;">
<a href="https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en">Experimente la sutysisku agora</a>
</div>