---
title: Historia de Lojban
---

<div class="lojbo"></div>

Lojban es un lenguaje propuesto como medio de representación del conocimiento y como puente entre los lenguajes hablados, los lenguajes de programación y los lenguajes de la ciencia y las matemáticas.
Lojban fue creado por un grupo de investigadores en 1987.

## Historia de Lojban

_por Bob LeChevalier, uno de los creadores de Lojban_.

La gramática de TLI Loglan fue diseñada originalmente sin ningún análisis formal de análisis de analizador, y esta historia ha impulsado el posterior esfuerzo de Lojban.

a) JCB descubrió las obras de Victor Yngve en algún momento de los años 60 o principios de los 70, y por lo tanto tuvo la idea de codificar la gramática en un conjunto de reglas. También concibió varios objetivos para esta gramática codificada que no recuerdo muy bien. Pero no pudo lograr estos objetivos, cualesquiera que fueran, aunque estaban asociados con la codificación de lo que JCB entendía como la "gramática humana".

b) Alrededor de 1976-78, el esfuerzo cambió a usar una gramática YACC LALR-1 como estándar para codificar la gramática porque varias personas sabían cómo usar YACC. Gran parte de la gramática fue codificada, pero parecía imposible hacer que la "gramática de la máquina" analizara las cosas de la misma manera que lo hacía la "gramática humana".

c) El problema se resolvió alrededor de 1980, creo que por Jeff Prothero, entonces estudiante en la Universidad de Washington, para usar terminadores elidibles para delimitar construcciones, que las elisiones de YACC suministrarían usando su procesamiento de errores. Tomó hasta alrededor de 1982-1983 lograr una gramática YACC completa para el lenguaje, usando corrección de errores.

Cuando comenzamos a re-desarrollar Lojban, la intención era retener la gramática de Loglan en su totalidad, cambiando solo las palabras. Por lo tanto, estábamos limitados por las limitaciones de diseño del lenguaje original. JCB intentó jugar juegos de derechos de autor con la gramática formal (como lo había hecho con las palabras del lenguaje), pero estaba en un terreno legal imposible dado que gran parte del trabajo había sido hecho por Prothero y otros, junto con problemas legales conocidos en la protección de derechos de autor de un algoritmo informático.

Pero habíamos reinventado el léxico de cmavo, y queríamos incluir componentes gramaticales para el tiempo y MEX que JCB nunca había logrado. Así, inicialmente con la ayuda de Prothero y un tipo llamado Jeff Taylor y otros que conocían YACC, intenté reimplementar la gramática YACC desde cero, pero sin intentar realmente reinventar ninguna rueda. En 1991, Cowan se hizo cargo de lo que había hecho, y lo limpió considerablemente, logrando eventualmente la gramática base que se enumera en CLL (que sigue siendo la gramática oficial). Pero la gramática seguía siendo una gramática YACC, con todas sus limitaciones.

Los intentos de crear una gramática PEG siguen siendo no oficiales, y francamente nunca he mirado la gramática PEG y probablemente no la entendería si lo hiciera. YACC fue lo suficientemente difícil para mí, y habiendo aprendido la gramática YACC para Lojban, nunca logré usar con fluidez la gramática E-BNF supuestamente más simple (aunque había aprendido un par de lenguajes informáticos usando BNF).

Así que la respuesta larga a su pregunta, según entiendo, es que la gramática siempre se pretendió que fuera lo más general posible. La elidibilidad de los terminadores no era una prioridad alta en general, aunque ciertos terminadores eran deseables; no había nada más molesto que tratar de averiguar qué estaba y qué no estaba terminado cuando se expresaba una cadena como kukukeiku. (El lenguaje de JCB usaba <gu> en lugar de **ku**, y por lo tanto sonaba mucho como hablar de bebé. Lojban con terminadores completos es simplemente **kuku**).

Algunas de las construcciones no generales surgieron porque no pudieron hacer que YACC funcionara con construcciones completamente generales, o requerían demasiado uso de terminadores desagradables. De ahí la plétora de diferentes familias de conectores lógicos, cada una vinculando un tipo diferente de construcción. Esas decisiones generalmente datan de la era de JCB, aunque agregamos algunas cosas nuevas que eran conectables (como las cláusulas relativas), y por lo tanto algunas nuevas familias, la mayoría de las cuales eventualmente desaparecieron (dejando, por ejemplo, zi'e que ya no es la base para una familia de conectores lógicos). También abandonamos el esfuerzo de imponer una gramática formal en los compuestos PA y UI, por lo que hay cadenas de cada uno de esos cmavo que son técnicamente gramaticales pero no tienen sentido: pi'epaime'ipipi'e. Pero en su mayor parte, la gramática fundamental del lenguaje sigue siendo la del lenguaje pre-formal de JCB, con construcciones de terminadores elidibles agregadas donde podrían permitir construcciones útiles y aún así sintácticamente no ambiguas. 

El resultado en un bloque de código es:

```
Algunas de las construcciones no generales surgieron porque no pudieron hacer que YACC funcionara con construcciones completamente generales, o requerían demasiado uso de terminadores desagradables. De ahí la plétora de diferentes familias de conectores lógicos, cada una vinculando un tipo diferente de construcción. Esas decisiones generalmente datan de la era de JCB, aunque agregamos algunas cosas nuevas que eran conectables (como las cláusulas relativas), y por lo tanto algunas nuevas familias, la mayoría de las cuales eventualmente desaparecieron (dejando, por ejemplo, zi'e que ya no es la base para una familia de conectores lógicos). También abandonamos el esfuerzo de imponer una gramática formal en los compuestos PA y UI, por lo que hay cadenas de cada uno de esos cmavo que son técnicamente gramaticales pero no tienen sentido: pi'epaime'ipipi'e. Pero en su mayor parte, la gramática fundamental del lenguaje sigue siendo la del lenguaje pre-formal de JCB, con construcciones de terminadores elidibles agregadas donde podrían permitir construcciones útiles y aún así sintácticamente no ambiguas.