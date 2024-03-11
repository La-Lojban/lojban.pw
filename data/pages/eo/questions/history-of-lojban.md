---
title: Historio de Lojban
---

<div class="lojbo simple_blockquotes"></div>

Lojban estas lingvo, proponita kiel rimedo de scia reprezentado kaj kiel ponto inter parolataj lingvoj, programlingvoj kaj la lingvoj de scienco kaj matematiko.

Lojban estis kreita de grupo de esploristoj en 1987.

## Historio de Lojban

_de Bob LeChevalier, unu el kreintoj de Lojban_.

La gramatiko de TLI Loglan estis originale dizajnita sen formala analizo de analizilo, kaj tiu historio instigis la postan Lojban-agon.

- JCB malkovris la verkojn de Victor Yngve iam en la 60-aj aŭ fruaj 70-aj jaroj, kaj tial ekhavis la ideon de kodigado de la gramatiko en serio de reguloj. Li ankaŭ konceptis plurajn celojn por tiu kodigita gramatiko, kiujn mi ne tre bone memoras. Sed li ne sukcesis atingi tiujn celojn, kio ili estis, kvankam ili estis asociitaj kun enkodigado de tio, kion JCB komprenis kiel la "homaran gramatikon".
- Ĉirkaŭ 1976-78, la penado ŝanĝiĝis al uzi YACC LALR-1 gramatikon kiel normon por kodigado de la gramatiko ĉar pluraj homoj sciis kiel uzi YACC. Multe de la gramatiko estis enkodigita, sed ŝajnis esti neebla por la "maŝina gramatiko" analizi aferojn tute same kiel la "homara gramatiko" faris.
- La problemo estis solvita ĉirkaŭ 1980, mi kredas de Jeff Prothero, tiam studento ĉe la Universitato de Vaŝingtono, por uzi eligeblajn finilojn por braketigi konstruaĵojn, kiujn elizioj YACC liverus uzante sian erarprocesadon. Ĝis ĉirkaŭ 1982-1983 efektive atingi kompleta YACC-gramatiko por la lingvo, uzante erarkorekton.

Kiam ni komencis rekrei Lojban, la intenco estis konservi la Loglan-gramatikon en ĝia tuto, ŝanĝante nur la vortojn. Do ni estis devigitaj de la dizajnlimigoj de la origina lingvo. JCB provis ludi kopirajtajn ludojn kun la formala gramatiko (kiel li faris kun la vortoj de la lingvo), sed li estis sur neebla leĝa tereno donita ke tiom multe de la laboro estis farita de Prothero kaj aliaj, kune kun konataj leĝaj problemoj pri kopirajtigo de komputila algoritmo.

Sed ni rekreis la cmavo-lexikonon, kaj ni volis inkluzivi gramatikajn komponentojn por tempo kaj MEX kiujn JCB neniam sukcesis. Do, unue kun la helpo de Prothero kaj viro nomita Jeff Taylor kaj aliaj kiuj sciis YACC, mi provis reimplmenti la YACC-gramatikon de nulo, sed ne vere provante rekrei iujn radojn. En 1991, Cowan prenis la kontrolon pri tio, kion mi faris, kaj multe purigis ĝin, fine atingante la bazlinian gramatikon listitan en CLL (kiu ankoraŭ estas la oficiala gramatiko). Sed la gramatiko estis ankoraŭ YACC-gramatiko, kun ĉiuj ĝiaj limigoj.

Fruaj provoj krei PEG-gramatikon restas neoficialaj, kaj honeste mi neniam rigardis la PEG-gramatikon kaj verŝajne ne komprenus ĝin se mi farus. YACC estis sufiĉe malfacila por mi, kaj post lerni la YACC-gramatikon por Lojban, mi neniam sukcesis flue uzi la supozeble pli simplan E-BNF-gramatikon (kvankam mi lernis kelkajn komputilingvojn uzante BNF).

Do la longa respondo al via demando, laŭ mia kompreno estas ke la gramatiko ĉiam estis intencita esti tiel ĝenerala kiel eble. La elirebleco de terminiloj ne estis alta prioritato ĝenerale, kvankam certaj estis dezirindaj; ne estis io pli malagrabla ol provi kompreni kio estis kaj kio ne estis terminita kiam vi esprimis vorton kiel kukukeiku. (La lingvo de JCB uzis <gu> anstataŭ **ku**, kaj tial ĝi sonis multe kiel beba parolado. Lojban kun plenaj terminiloj, estas simple **kuku**.)

Kelkaj el la ne-ĝeneralaj konstruaĵoj leviĝis ĉar ili ne povis fari YACC labori kun tute ĝeneralaj konstruaĵoj, aŭ ili postulis tro multe da uzo de malagrablaj terminiloj. Tial la multego de malsamaj familioj de logikaj konektiloj, ĉiu liganta malsaman tipon de konstruaĵo. Tiuj decidoj ĝenerale datis de la epoko de JCB, kvankam ni aldonis kelkajn novajn aferojn kiuj estis konekteblaj (ekzemple rilataj frazpartoj), kaj tial kelkaj novaj familioj, la plejparto el kiuj fine malaperis (lasante ekzemple zi'e kiu jam ne estas la bazo por familio de logikaj konektiloj). Ni ankaŭ forlasis la penon impozi formalan gramatikon sur PA kaj UI-komponaĵoj, tiel ke estas vicoj de ĉiu el tiuj cmavoj kiuj estas teknike gramatikaj sed sen signifo: **pi'epaime'ipipi'e**. Sed la plejparte, la fundamenta lingva gramatiko restas tiu de JCB antaŭ-formala lingvo, kun elireblaj terminilaj konstruaĵoj aldonitaj kie ili povus ebligi utilajn kaj tamen sintakse neambiguajn konstruaĵojn.
