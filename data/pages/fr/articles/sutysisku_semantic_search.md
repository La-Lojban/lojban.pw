---
title: la sutysisku et la recherche de similarité
---

[la sutysisku](https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en) est une application Web qui peut fonctionner hors ligne. Elle offre un accès à des dictionnaires en lojban, entre autres fonctionnalités.

![la sutysisku - recherche de similarité](/assets/pixra/arxivo/sutysisku_simsa.png)

Une fonctionnalité de la sutysisku est la recherche de similarité. Si vous souhaitez savoir comment dire "_merveilleux_" en lojban, vous ne vous attendez pas nécessairement au mot exact "merveilleux" dans la définition lojban, mais plutôt à des mots de sens similaire comme "_brillant_", "_enchanteur_", "_superlatif_". La sutysisku essaie au mieux de trouver des mots avec des définitions contenant ces mots synonymes ou de sens similaire.

Un autre cas se présente lorsque vous interrogez un mot mais que vous souhaitez trouver des mots qui pourraient être utilisés dans le même contexte, même s'ils ne sont pas des synonymes directs. Par exemple, lorsque vous recherchez "_tentative_", vous pouvez souhaiter trouver des mots signifiant "_échec_", car ces concepts peuvent être utiles pour décrire différentes étapes d'une situation. Ou lorsque vous recherchez "_chuchoter_", vous pouvez profiter de la définition de mots apparentés comme "_calme_", "_prononcer_", "_entendre_", "_écho_", "_crier_".

Inutile de dire que l'anglais comporte de nombreux mots ambigus ou des mots ayant plusieurs significations, par exemple "_left_" (« pas à droite » vs « restant »). Dans de tels cas, la sutysisku propose les meilleures suppositions pour la plupart de ces significations.

L'algorithme qui se cache derrière tout cela est appelé "vecteurs de mots", où chaque mot anglais est représenté par une liste de valeurs scalaires et les mots qui apparaissent dans des contextes similaires ont des valeurs similaires dans cet espace "vectoriel". Le vocabulaire de base du lojban (les gismu "verbes") a été cartographié manuellement vers des glossaires anglais pour vous aider à obtenir de meilleures correspondances.

Pour activer la recherche de similarité, choisissez le bouton "similar" après avoir saisi un mot dans la sutysisku.

<div style="font-size:200%;">
<a href="https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en">Essayez la sutysisku maintenant</a>
</div>