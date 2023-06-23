---
title: Histoire de Lojban
---

<div class="lojbo"></div>

Lojban est une langue proposée comme moyen de représentation des connaissances et comme pont entre les langues parlées, les langages de programmation et les langues de la science et des mathématiques.
Lojban a été créé par un groupe de chercheurs en 1987.

## Histoire de Lojban

_par Bob LeChevalier, l'un des créateurs de Lojban_.

La grammaire TLI Loglan a été initialement conçue sans analyseur syntaxique formel, et cette histoire a conduit à l'effort ultérieur de Lojban.

a) JCB a découvert les travaux de Victor Yngve quelque part dans les années 60 ou au début des années 70, et a donc eu l'idée de codifier la grammaire dans un ensemble de règles. Il a également conçu plusieurs objectifs pour cette grammaire codifiée que je ne me souviens pas très bien. Mais il n'a pas été en mesure d'atteindre ces objectifs, quels qu'ils soient, bien qu'ils aient été associés à l'encodage de ce que JCB comprenait comme la "grammaire humaine".

b) Vers 1976-78, l'effort a changé pour utiliser une grammaire YACC LALR-1 comme norme pour codifier la grammaire car plusieurs personnes savaient comment utiliser YACC. Une grande partie de la grammaire a été encodée, mais il semblait impossible d'obtenir que la "grammaire machine" analyse les choses de la même manière que la "grammaire humaine".

c) Le problème a été résolu vers 1980, je crois par Jeff Prothero, alors étudiant à l'Université de Washington, en utilisant des terminaux élidables pour encadrer les constructions, que les élisions YACC fourniraient en utilisant son traitement d'erreur. Il a fallu jusqu'en 1982-1983 pour obtenir une grammaire YACC complète pour la langue, en utilisant la correction d'erreur.

Lorsque nous avons commencé à redévelopper Lojban, l'intention était de conserver la grammaire Loglan dans son intégralité, en ne changeant que les mots. Ainsi, nous étions liés par les limites de conception de la langue originale. JCB a tenté de jouer à des jeux de droits d'auteur avec la grammaire formelle (comme il l'avait fait avec les mots de la langue), mais il était sur un terrain juridique impossible étant donné que tant de travail avait été fait par Prothero et d'autres, ainsi que des problèmes juridiques connus dans la protection par droit d'auteur d'un algorithme informatique.

Mais nous avions réinventé le lexique cmavo, et nous voulions inclure des composants de grammaire pour le temps et MEX que JCB n'avait jamais réussi à gérer. Ainsi, initialement avec l'aide de Prothero et d'un gars nommé Jeff Taylor et d'autres qui connaissaient YACC, j'ai tenté de réimplémenter la grammaire YACC à partir de zéro, mais sans vraiment essayer de réinventer la roue. En 1991, Cowan a repris ce que j'avais fait, et l'a considérablement amélioré, atteignant finalement la grammaire de base répertoriée dans CLL (qui est toujours la grammaire officielle). Mais la grammaire était toujours une grammaire YACC, avec toutes ses limites.

Les tentatives de créer une grammaire PEG restent non officielles, et franchement, je n'ai jamais regardé la grammaire PEG et je ne la comprendrais probablement pas si je le faisais. YACC était assez difficile pour moi, et ayant appris la grammaire YACC pour Lojban, je n'ai jamais réussi à utiliser couramment la grammaire E-BNF soi-disant plus simple (même si j'avais appris quelques langages informatiques en utilisant BNF).

Voici donc la réponse longue à votre question, telle que je la comprends : la grammaire a toujours été conçue pour être aussi générale que possible. L'omission des terminaux n'était pas une priorité élevée en général, bien que certains d'entre eux étaient souhaitables ; il n'y avait rien de plus ennuyeux que d'essayer de comprendre ce qui était ou n'était pas terminé lorsque vous exprimiez une chaîne comme kukukeiku. (Le langage de JCB utilisait <gu> au lieu de **ku**, et donc cela ressemblait beaucoup à du langage bébé. Le lojban avec des terminaux complets est simplement **kuku**.)

Certains des éléments de construction non généraux sont apparus parce qu'ils ne pouvaient pas faire fonctionner YACC avec des constructions entièrement générales, ou qu'ils nécessitaient trop d'utilisation de terminaux ennuyeux. D'où la pléthore de différentes familles de connecteurs logiques, chacune reliant un type différent de construction. Ces décisions datent généralement de l'époque de JCB, bien que nous ayons ajouté de nouvelles choses qui étaient connectables (comme les propositions relatives), et donc de nouvelles familles, dont la plupart ont finalement disparu (laissant par exemple zi'e qui n'est plus la base d'une famille de connecteurs logiques). Nous avons également abandonné l'effort d'imposer une grammaire formelle aux composés PA et UI, de sorte qu'il existe des chaînes de chacun de ces cmavo qui sont techniquement grammaticales mais n'ont aucun sens : pi'epaime'ipipi'e. Mais pour la plupart, la grammaire fondamentale du langage reste celle du langage pré-formel de JCB, avec des constructions de terminaux éligibles ajoutées là où elles peuvent permettre des constructions utiles et pourtant syntaxiquement non ambiguës.