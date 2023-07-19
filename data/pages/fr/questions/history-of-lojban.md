---
title: Histoire du Lojban
---

<div class="lojbo"></div>

Le Lojban est une langue, proposée comme moyen de représentation des connaissances et comme pont entre les langues parlées, les langages de programmation et les langues des sciences et des mathématiques.
Le Lojban a été créé par un groupe de chercheurs en 1987.

## Histoire du Lojban

_par Bob LeChevalier, l'un des créateurs du Lojban_.

TLI Loglan grammaticalement était à l'origine conçu sans analyseur syntaxique formel, et cette histoire a influencé les efforts ultérieurs du Lojban.

a) JCB a découvert les travaux de Victor Yngve quelque part dans les années 60 ou au début des années 70, et a donc eu l'idée de codifier la grammaire dans un ensemble de règles. Il a également conçu plusieurs objectifs pour cette grammaire codifiée dont je ne me souviens pas très bien. Mais il n'a pas réussi à atteindre ces objectifs, quoi qu'ils aient été, bien qu'ils soient associés à ce que JCB comprenait comme "grammaire humaine".

b) Vers 1976-78, l'effort a changé pour utiliser une grammaire YACC LALR-1 comme norme pour codifier la grammaire car plusieurs personnes savaient comment utiliser YACC. Une grande partie de la grammaire a été codifiée, mais il semblait impossible d'obtenir que la "grammaire machine" analyse les choses de la même manière que la "grammaire humaine" le faisait.

c) Le problème a été résolu vers 1980, je crois par Jeff Prothero, alors étudiant à l'Université de Washington, qui a utilisé des terminaux omis pour encadrer les constructions, que YACC fournirait en utilisant son traitement des erreurs. Il a fallu jusqu'en 1982-1983 pour obtenir réellement une grammaire YACC complète pour la langue, en utilisant une correction d'erreur.

Lorsque nous avons commencé à re-développer le Lojban, l'intention était de conserver la grammaire du Loglan dans son intégralité, en ne changeant que les mots. Ainsi, nous étions liés par les limites de conception de la langue originale. JCB a tenté de jouer avec les droits d'auteur de la grammaire formelle (comme il l'avait fait avec les mots de la langue), mais il était sur un terrain légal impossible étant donné que tant de travail avait été effectué par Prothero et d'autres, ainsi que des problèmes juridiques connus dans le droit d'auteur d'un algorithme informatique.

Mais nous avions réinventé le lexique des cmavo, et nous voulions inclure des composants de grammaire pour le temps et le MEX que JCB n'avait jamais réussi à faire. Ainsi, initialement avec l'aide de Prothero et d'un certain Jeff Taylor et d'autres personnes qui connaissaient YACC, j'ai tenté de réimplémenter la grammaire YACC à partir de zéro, mais sans vraiment essayer de réinventer quoi que ce soit. En 1991, Cowan a repris ce que j'avais fait, et l'a considérablement amélioré, atteignant finalement la grammaire de référence énumérée dans le CLL (qui est toujours la grammaire officielle). Mais la grammaire était toujours une grammaire YACC, avec toutes ses limites.

Les tentatives de créer une grammaire PEG restent non officielles, et franchement je n'ai jamais regardé la grammaire PEG et je ne la comprendrais probablement pas si je le faisais. YACC était suffisamment difficile pour moi, et après avoir appris la grammaire YACC pour le Lojban, je n'ai jamais réussi à utiliser couramment la grammaire E-BNF soi-disant plus simple (bien que j'aie appris quelques langages informatiques utilisant BNF).

Ainsi, la longue réponse à votre question, telle que je la comprends, est que la grammaire a toujours été destinée à être aussi générale que possible. L'élidabilité des terminaisons n'était pas une priorité générale, bien que certaines soient souhaitables ; il n'y avait rien de plus agaçant que d'essayer de comprendre ce qui était ou non terminé quand vous exprimiez une chaîne comme kukukeiku. (La langue de JCB utilisait <gu> au lieu de **ku**, et donc cela ressemblait beaucoup à du langage enfantin. Le Lojban avec des terminaisons complètes se dit tout simplement **kuku**.)

Certaines des constructions non générales sont apparues parce qu'ils ne pouvaient pas faire fonctionner YACC avec des constructions entièrement générales, ou parce qu'ils exigeaient une utilisation excessive de terminaisons odieuses. D'où la pléthore de différentes familles de connecteurs logiques, chacune reliant un type de construction différent. Ces décisions datent généralement de l'époque de JCB, bien que nous ayons ajouté de nouvelles choses qui pouvaient être connectées (comme les propositions relatives), et donc de nouvelles familles, dont la plupart ont finalement disparu (laissant par exemple zi'e qui n'est plus la base d'une famille de connecteurs logiques). Nous avons également abandonné l'effort d'imposer une grammaire formelle aux composés PA et UI, de sorte qu'il existe des chaînes de chaque cmavo qui sont techniquement grammaticales mais sans signification : pi'epaime'ipipi'e. Mais pour la plupart, la grammaire fondamentale de la langue reste celle de la langue pré-formelle de JCB, avec des constructions terminales facultatives ajoutées là où elles peuvent permettre des constructions utiles et pourtant syntaxiquement non ambiguës.