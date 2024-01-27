---
title: History of Lojban
---

<div class="lojbo simple_blockquotes"></div>

Lojban is a language, proposed as a means of knowledge representation and as a bridge between spoken languages, programming languages and the languages of science and math.
Lojban was created by a group of researchers in 1987.

## History of Lojban

_by Bob LeChevalier, one of creators of Lojban_.

TLI Loglan grammar was originally designed with no formal parser analysis at all, and this history has driven the subsequent Lojban effort.

a) JCB discovered the works of Victor Yngve sometime in the 60s or early 70s, and therefore got the idea of codifying the grammar in a set of rules. He also conceived of several goals for this codified grammar which I don't remember very well. But he was unable to achieve these goals, whatever they were, though they were associated with encoding what JCB understood as the "human grammar".

b) Around 1976-78, the effort changed to using a YACC LALR-1 grammar as a standard for codifying the grammar because several people knew how to use YACC. Much of the grammar was encoded, but it seemed to be impossible to get the "machine grammar" to parse things quite the same as the "human grammar" did.

c) The problem was solved around 1980, I believe by Jeff Prothero, then a student at the University of Washington, to use elidable terminators to bracket constructs, which elisions YACC would supply using its error processing. It took until around 1982-1983 to actually achieve a complete YACC grammar for the language, using error correction.

When we started redeveloping Lojban, the intent was to retain the Loglan grammar in its entirety, changing only the words. Thus we were bound by the design limitations of the original language. JCB attempted to play copyright games with the formal grammar (as he had with the words of the language), but he was on impossible legal ground given that so much of the work had been done by Prothero and others, along with known legal issues in copyrighting a computer algorithm.

But we had reinvented the cmavo lexicon, and we wanted to include grammar components for tense and MEX that JCB had never managed. Thus, initially with the help of Prothero and a guy named Jeff Taylor and others who knew YACC, I attempted to reimplement the YACC grammar from scratch, but not really trying to reinvent any wheels. In 1991, Cowan took over what I had done, and cleaned it up considerably, eventually achieving the baseline grammar listed in CLL (which is still the official grammar). But the grammar was still a YACC grammar, with all its limitations.

Attempts to create a PEG grammar remain unofficial, and frankly I've never looked at the PEG grammar and probably wouldn't understand it if I did. YACC was hard enough for me, and having learned the YACC grammar for Lojban, I never managed to fluently use the supposedly simpler E-BNF grammar (even though I had learned a couple of computer languages using BNF).

Thus the long answer to your question, as I understand it is that the grammar was always intended to be as general purpose as possible. Elidability of terminators wasn't a high priority in general, though certain ones were desirable; there was nothing more obnoxious that trying to figure out what was and was not terminated when you expressed a string like kukukeiku. (JCB's language used <gu> instead of **ku**, and thus it sounded a lot like baby talk. Lojban with full terminators, is simply **kuku**.)

Some of the non-general purpose constructs arose because they couldn't get YACC to work with fully general constructs, or they required too much use of obnoxious terminators. Hence the plethora of different families of logical connectives, each linking a different type of construct. Those decisions generally dated from the JCB era, though we added some new things that were connectable (such as relative clauses), and hence some new families, most of which eventually went away (leaving for example zi'e which no longer is the basis for a family of logical connectives). We also abandoned the effort to impose a formal grammar on PA and UI compounds, so that there are strings of each of those cmavo that are technically grammatical but make no sense: pi'epaime'ipipi'e. But for the most part, the fundamental language grammar remains that of JCB's pre-formal language, with elidable terminator constructs added where they could enable useful and yet syntactically unambigious constructs.