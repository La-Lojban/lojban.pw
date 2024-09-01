---
title: Geschichte von Lojban
---

<div class="lojbo simple_blockquotes"></div>

Lojban ist eine Sprache, die als Mittel zur Wissensrepräsentation und als Brücke zwischen gesprochenen Sprachen, Programmiersprachen und den Sprachen der Wissenschaft und Mathematik vorgeschlagen wurde.

Lojban wurde 1987 von einer Gruppe von Forschern geschaffen.

## Geschichte von Lojban

_von Bob LeChevalier, einem der Schöpfer von Lojban_.

Die TLI Loglan-Grammatik wurde ursprünglich ohne formale Parser-Analyse entworfen, und diese Geschichte hat die nachfolgende Lojban-Bemühung geprägt.

- JCB entdeckte die Arbeiten von Victor Yngve irgendwann in den 60er oder frühen 70er Jahren und kam daher auf die Idee, die Grammatik in einem Satz von Regeln zu kodifizieren. Er hatte auch mehrere Ziele für diese kodifizierte Grammatik, an die ich mich nicht mehr sehr gut erinnere. Aber er konnte diese Ziele, was auch immer sie waren, nicht erreichen, obwohl sie mit der Kodierung dessen verbunden waren, was JCB als die "menschliche Grammatik" verstand.
- Um 1976-78 änderte sich die Bemühung, eine YACC LALR-1-Grammatik als Standard zur Kodifizierung der Grammatik zu verwenden, weil mehrere Leute wussten, wie man YACC benutzt. Ein Großteil der Grammatik wurde kodifiziert, aber es schien unmöglich zu sein, dass die "Maschinengrammatik" Dinge genau so parst wie die "menschliche Grammatik".
- Das Problem wurde um 1980 gelöst, glaube ich, von Jeff Prothero, damals Student an der University of Washington, indem er auslassbare Terminatoren verwendete, um Konstrukte zu umklammern, welche Auslassungen YACC mit seiner Fehlerverarbeitung liefern würde. Es dauerte bis etwa 1982-1983, um tatsächlich eine vollständige YACC-Grammatik für die Sprache zu erreichen, unter Verwendung von Fehlerkorrektur.

Als wir begannen, Lojban neu zu entwickeln, war die Absicht, die Loglan-Grammatik in ihrer Gesamtheit beizubehalten und nur die Wörter zu ändern. Daher waren wir an die Designbeschränkungen der ursprünglichen Sprache gebunden. JCB versuchte, Urheberrechtsspiele mit der formalen Grammatik zu spielen (wie er es mit den Wörtern der Sprache getan hatte), aber er war auf unmöglichem rechtlichen Boden, da so viel der Arbeit von Prothero und anderen geleistet worden war, zusammen mit bekannten rechtlichen Problemen beim Urheberrecht eines Computeralgorithmus.

Aber wir hatten das cmavo-Lexikon neu erfunden und wollten Grammatikkomponenten für Zeit und MEX einbeziehen, die JCB nie geschafft hatte. So versuchte ich zunächst mit der Hilfe von Prothero und einem Typen namens Jeff Taylor und anderen, die YACC kannten, die YACC-Grammatik von Grund auf neu zu implementieren, ohne wirklich das Rad neu zu erfinden. 1991 übernahm Cowan, was ich getan hatte, und bereinigte es erheblich, wodurch schließlich die Basisgrammatik erreicht wurde, die in CLL aufgeführt ist (die immer noch die offizielle Grammatik ist). Aber die Grammatik war immer noch eine YACC-Grammatik, mit all ihren Einschränkungen.

Attempts to create a PEG grammar remain unofficial, and frankly I've never looked at the PEG grammar and probably wouldn't understand it if I did. YACC was hard enough for me, and having learned the YACC grammar for Lojban, I never managed to fluently use the supposedly simpler E-BNF grammar (even though I had learned a couple of computer languages using BNF).

Versuche, eine PEG-Grammatik zu erstellen, bleiben inoffiziell, und ehrlich gesagt habe ich mir die PEG-Grammatik nie angesehen und würde sie wahrscheinlich auch nicht verstehen, wenn ich es täte. YACC war für mich schon schwer genug, und nachdem ich die YACC-Grammatik für Lojban gelernt hatte, schaffte ich es nie, die angeblich einfachere E-BNF-Grammatik fließend zu verwenden (obwohl ich ein paar Programmiersprachen mit BNF gelernt hatte).

Thus the long answer to your question, as I understand it is that the grammar was always intended to be as general purpose as possible. Elidability of terminators wasn't a high priority in general, though certain ones were desirable; there was nothing more obnoxious that trying to figure out what was and was not terminated when you expressed a string like kukukeiku. (JCB's language used <gu> instead of **ku**, and thus it sounded a lot like baby talk. Lojban with full terminators, is simply **kuku**.)

Daher ist die lange Antwort auf Ihre Frage, soweit ich sie verstehe, dass die Grammatik immer so allgemein wie möglich sein sollte. Die Auslassbarkeit von Terminatoren war im Allgemeinen keine hohe Priorität, obwohl bestimmte wünschenswert waren; es gab nichts Ärgerlicheres, als herauszufinden, was beendet war und was nicht, wenn man eine Zeichenkette wie kukukeiku ausdrückte. (JCBs Sprache verwendete <gu> anstelle von **ku**, und daher klang es sehr nach Babysprache. Lojban mit vollständigen Terminatoren ist einfach **kuku**.)

Some of the non-general purpose constructs arose because they couldn't get YACC to work with fully general constructs, or they required too much use of obnoxious terminators. Hence the plethora of different families of logical connectives, each linking a different type of construct. Those decisions generally dated from the JCB era, though we added some new things that were connectable (such as relative clauses), and hence some new families, most of which eventually went away (leaving for example zi'e which no longer is the basis for a family of logical connectives). We also abandoned the effort to impose a formal grammar on PA and UI compounds, so that there are strings of each of those cmavo that are technically grammatical but make no sense: **pi'epaime'ipipi'e**. But for the most part, the fundamental language grammar remains that of JCB's pre-formal language, with elidable terminator constructs added where they could enable useful and yet syntactically unambigious constructs.

Einige der nicht allgemein verwendbaren Konstrukte entstanden, weil sie YACC nicht dazu bringen konnten, mit vollständig allgemeinen Konstrukten zu arbeiten, oder sie erforderten zu viel Verwendung von ärgerlichen Terminatoren. Daher die Vielzahl verschiedener Familien von logischen Konnektoren, die jeweils eine andere Art von Konstrukt verbinden. Diese Entscheidungen stammen im Allgemeinen aus der JCB-Ära, obwohl wir einige neue Dinge hinzugefügt haben, die verbindbar waren (wie Relativsätze), und daher einige neue Familien, von denen die meisten schließlich verschwanden (zum Beispiel zi'e, das nicht mehr die Grundlage für eine Familie von logischen Konnektoren ist). Wir gaben auch den Versuch auf, eine formale Grammatik für PA- und UI-Verbindungen durchzusetzen, sodass es Zeichenketten von jedem dieser cmavo gibt, die technisch grammatikalisch sind, aber keinen Sinn ergeben: **pi'epaime'ipipi'e**. Aber größtenteils bleibt die grundlegende Sprachgrammatik die der vorformalen Sprache von JCB, mit auslassbaren Terminator-Konstrukten, die hinzugefügt wurden, wo sie nützliche und dennoch syntaktisch eindeutige Konstrukte ermöglichen konnten.
