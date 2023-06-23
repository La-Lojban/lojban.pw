---
title: la sutysisku et la recherche de similarité
---

[la sutysisku](https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en) est une application web qui peut fonctionner hors ligne. Elle permet d'accéder aux dictionnaires Lojban, entre autres fonctionnalités.

![la sutysisku - recherche de similarité](/assets/pixra/arxivo/sutysisku_simsa.png)

Une fonctionnalité de la sutysisku est la recherche de similarité. Si vous voulez savoir comment dire "_marvellous_" en Lojban, vous ne vous attendez peut-être pas à trouver le mot "marvellous" dans la définition en Lojban, mais plutôt des mots de sens similaire comme "_brilliant_", "_delightful_", "_superlative_". La sutysisku essaie de trouver les mots ayant des définitions contenant des synonymes ou des mots de sens similaire.

Un autre cas est lorsque vous recherchez un mot mais que vous souhaitez trouver des mots qui pourraient être utilisés dans le même contexte, même s'ils ne sont pas des synonymes directs. Par exemple, lorsque vous recherchez "_attempt_", vous pouvez souhaiter trouver des mots signifiant "_fail_" car ces deux concepts peuvent être utiles pour décrire différentes étapes d'une situation. Ou lorsque vous recherchez ["_whisper_"](https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&sisku=whisper&bangu=en&versio=masno), vous pouvez bénéficier de la définition de mots connexes tels que "_quiet_", "_utter_", "_hear_", "_echo_", "_yell_".

Il va sans dire que l'anglais a beaucoup de mots ambigus ou de mots ayant plusieurs significations, par exemple "_left_" ("pas à droite" vs "restant"). La sutysisku dans de tels cas montre les meilleures suppositions pour la plupart de ces significations.

L'algorithme derrière les coulisses est appelé "vecteurs de mots" où chaque mot anglais est représenté par une liste de valeurs scalaires et les mots qui se produisent dans des contextes similaires obtiennent des valeurs similaires dans un tel espace "vectoriel". Le vocabulaire de base Lojban (verbes "gismu") a été cartographié manuellement sur les glossaires anglais pour vous aider à obtenir de meilleures correspondances.

Pour activer la recherche de similarité, choisissez le bouton "similar" après avoir entré un mot dans la sutysisku.

<div style="font-size:200%;">
<a href="https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en">Essayez la sutysisku maintenant</a>
</div>