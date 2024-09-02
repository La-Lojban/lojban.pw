<a id="chapter-grammars"></a>Chapter 21. <a id="c21"></a>Formal grammars
========================================================================

<a id="chapter-grammars-picture"></a>![The picture for chapter 21](/assets//books/uncll/media/chapter-grammars.svg.png)

<a id="section-EBNF"></a>21.1. <a id="c21s2"></a>EBNF grammar of Lojban
-----------------------------------------------------------------------

Lojban Machine Grammar, EBNF Version, Final Baseline

This EBNF document is explicitly dedicated to the public domain by its author, The Logical Language Group, Inc. Contact that organization at: 2904 Beau Lane, Fairfax VA 22031 USA 703-385-0273 (intl: +1 703 385 0273)

Explanation of notation: All rules have the form:

name number = bnf-expression

which means that the grammatical construct “name” is defined by “bnf-expression”.

1.  Names in lower case are grammatical constructs.

2.  Names in UPPER CASE are selma'o (lexeme) names, and are terminals.

3.  Concatenation is expressed by juxtaposition with no operator symbol.

4.  | represents alternation (choice).

5.  \[\] represents an optional element.

6.  & represents and/or. “A & B” is the same as “A | B | A B” but not “B A”. Furthermore, “A & B & C & D” permits one or more of A, B, C, and/or D, but only in that order.

7.  ... represents optional repetition of the construct to the left. Left-grouping is implied; right-grouping is shown by explicit self-referential recursion with no “...”

8.  () serves to indicate the grouping of the other operators. Otherwise, “...” binds closer than &, which binds closer than |.

9.  \# is shorthand for “\[free ...\]” , a construct which appears in many places.

10.  // encloses an elidable terminator, which may be omitted (without change of meaning) if no grammatical ambiguity results.

<a id="b0"></a><a id="cll_bnf-0"></a>text 0 =

\[NAI ...\] \[CMEVLA ... # | (indicators & free ...)\] \[joik-jek\] text-1<a id="b2"></a><a id="cll_bnf-2"></a>

text-1 2 =

\[(I \[jek | joik\] \[\[stag\] BO\] #) ... | NIhO ... #\] \[paragraphs\]<a id="b4"></a><a id="cll_bnf-4"></a>

paragraphs 4 =

paragraph \[NIhO ... # paragraphs\]<a id="b10"></a><a id="cll_bnf-10"></a>

paragraph 10 =

(statement | fragment) \[I # \[statement | fragment\]\] ...<a id="b11"></a><a id="cll_bnf-11"></a>

statement 11 =

statement-1 | prenex statement<a id="b12"></a><a id="cll_bnf-12"></a>

statement-1 12 =

statement-2 \[I joik-jek \[statement-2\]\] ...<a id="b13"></a><a id="cll_bnf-13"></a>

statement-2 13 =

statement-3 \[I \[jek | joik\] \[stag\] BO # \[statement-2\]\]<a id="b14"></a><a id="cll_bnf-14"></a>

statement-3 14 =

sentence | \[tag\] TUhE # text-1 /TUhU#/<a id="b20"></a><a id="cll_bnf-20"></a>

fragment 20 =

ek # | gihek # | quantifier | NA # | terms /VAU#/ | prenex | relative-clauses | links | linkargs<a id="b30"></a><a id="cll_bnf-30"></a>

prenex 30 =

terms ZOhU #<a id="b40"></a><a id="cll_bnf-40"></a>

sentence 40 =

\[terms \[CU #\]\] bridi-tail<a id="b41"></a><a id="cll_bnf-41"></a>

subsentence 41 =

sentence | prenex subsentence<a id="b50"></a><a id="cll_bnf-50"></a>

bridi-tail 50 =

bridi-tail-1 \[gihek \[stag\] KE # bridi-tail /KEhE#/ tail-terms\]<a id="b51"></a><a id="cll_bnf-51"></a>

bridi-tail-1 51 =

bridi-tail-2 \[gihek # bridi-tail-2 tail-terms\] ...<a id="b52"></a><a id="cll_bnf-52"></a>

bridi-tail-2 52 =

bridi-tail-3 \[gihek \[stag\] BO # bridi-tail-2 tail-terms\]<a id="b53"></a><a id="cll_bnf-53"></a>

bridi-tail-3 53 =

selbri tail-terms | gek-sentence<a id="b54"></a><a id="cll_bnf-54"></a>

gek-sentence 54 =

gek subsentence gik subsentence tail-terms | \[tag\] KE # gek-sentence /KEhE#/ | NA # gek-sentence<a id="b71"></a><a id="cll_bnf-71"></a>

tail-terms 71 =

\[terms\] /VAU#/<a id="b80"></a><a id="cll_bnf-80"></a>

terms 80 =

terms-1 ...<a id="b81"></a><a id="cll_bnf-81"></a>

terms-1 81 =

terms-2 \[PEhE # joik-jek terms-2\] ...<a id="b82"></a><a id="cll_bnf-82"></a>

terms-2 82 =

term \[CEhE # term\] ...<a id="b83"></a><a id="cll_bnf-83"></a>

term 83 =

sumti | (tag | FA #) (sumti | /KU#/) | termset | NA KU #<a id="b85"></a><a id="cll_bnf-85"></a>

termset 85 =

NUhI # gek terms /NUhU#/ gik terms /NUhU#/ | NUhI # terms /NUhU#/<a id="b90"></a><a id="cll_bnf-90"></a>

sumti 90 =

sumti-1 \[VUhO # relative-clauses\]<a id="b91"></a><a id="cll_bnf-91"></a>

sumti-1 91 =

sumti-2 \[(ek | joik) \[stag\] KE # sumti /KEhE#/\]<a id="b92"></a><a id="cll_bnf-92"></a>

sumti-2 92 =

sumti-3 \[joik-ek sumti-3\] ...<a id="b93"></a><a id="cll_bnf-93"></a>

sumti-3 93 =

sumti-4 \[(ek | joik) \[stag\] BO # sumti-3\]<a id="b94"></a><a id="cll_bnf-94"></a>

sumti-4 94 =

sumti-5 | gek sumti gik sumti-4<a id="b95"></a><a id="cll_bnf-95"></a>

sumti-5 95 =

\[quantifier\] sumti-6 \[relative-clauses\] | quantifier selbri /KU#/ \[relative-clauses\]<a id="b97"></a><a id="cll_bnf-97"></a>

sumti-6 97 =

(LAhE # | NAhE BO #) \[relative-clauses\] sumti /LUhU#/ | KOhA # | lerfu-string /BOI#/ | LA # \[relative-clauses\] CMEVLA ... # | (LA | LE) # sumti-tail /KU#/ | LI # mex /LOhO#/ | ZO any-word # | LU text /LIhU#/ | LOhU any-word ... LEhU # | ZOI any-word anything any-word #<a id="b111"></a><a id="cll_bnf-111"></a>

sumti-tail 111 =

\[sumti-6 \[relative-clauses\]\] sumti-tail-1 | relative-clauses sumti-tail-1<a id="b112"></a><a id="cll_bnf-112"></a>

sumti-tail-1 112 =

\[quantifier\] selbri \[relative-clauses\] | quantifier sumti<a id="b121"></a><a id="cll_bnf-121"></a>

relative-clauses 121 =

relative-clause \[ZIhE # relative-clause\] ...<a id="b122"></a><a id="cll_bnf-122"></a>

relative-clause 122 =

GOI # term /GEhU#/ | NOI # subsentence /KUhO#/<a id="b130"></a><a id="cll_bnf-130"></a>

selbri 130 =

\[tag\] selbri-1<a id="b131"></a><a id="cll_bnf-131"></a>

selbri-1 131 =

selbri-2 | NA # selbri<a id="b132"></a><a id="cll_bnf-132"></a>

selbri-2 132 =

selbri-3 \[CO # selbri-2\]<a id="b133"></a><a id="cll_bnf-133"></a>

selbri-3 133 =

selbri-4 ...<a id="b134"></a><a id="cll_bnf-134"></a>

selbri-4 134 =

selbri-5 \[joik-jek selbri-5 | joik \[stag\] KE # selbri-3 /KEhE#/\] ...<a id="b135"></a><a id="cll_bnf-135"></a>

selbri-5 135 =

selbri-6 \[(jek | joik) \[stag\] BO # selbri-5\]<a id="b136"></a><a id="cll_bnf-136"></a>

selbri-6 136 =

tanru-unit \[BO # selbri-6\] | \[NAhE #\] guhek selbri gik selbri-6<a id="b150"></a><a id="cll_bnf-150"></a>

tanru-unit 150 =

tanru-unit-1 \[CEI # tanru-unit-1\] ...<a id="b151"></a><a id="cll_bnf-151"></a>

tanru-unit-1 151 =

tanru-unit-2 \[linkargs\]<a id="b152"></a><a id="cll_bnf-152"></a>

tanru-unit-2 152 =

BRIVLA # | GOhA \[RAhO\] # | KE # selbri-3 /KEhE#/ | ME # sumti /MEhU#/ \[MOI #\] | (number | lerfu-string) MOI # | NUhA # mex-operator | SE # tanru-unit-2 | JAI # \[tag\] tanru-unit-2 | any-word (ZEI any-word) ... | NAhE # tanru-unit-2 | NU \[NAI\] # \[joik-jek NU \[NAI\] #\] ... subsentence /KEI#/<a id="b160"></a><a id="cll_bnf-160"></a>

linkargs 160 =

BE # term \[links\] /BEhO#/<a id="b161"></a><a id="cll_bnf-161"></a>

links 161 =

BEI # term \[links\]<a id="b300"></a><a id="cll_bnf-300"></a>

quantifier 300 =

number /BOI#/ | VEI # mex /VEhO#/<a id="b310"></a><a id="cll_bnf-310"></a>

mex 310 =

mex-1 \[operator mex-1\] ... | FUhA # rp-expression<a id="b311"></a><a id="cll_bnf-311"></a>

mex-1 311 =

mex-2 \[BIhE # operator mex-1\]<a id="b312"></a><a id="cll_bnf-312"></a>

mex-2 312 =

operand | \[PEhO #\] operator mex-2 ... /KUhE#/<a id="b330"></a><a id="cll_bnf-330"></a>

rp-expression 330 =

rp-operand rp-operand operator<a id="b332"></a><a id="cll_bnf-332"></a>

rp-operand 332 =

operand | rp-expression<a id="b370"></a><a id="cll_bnf-370"></a>

operator 370 =

operator-1 \[joik-jek operator-1 | joik \[stag\] KE # operator /KEhE#/\] ...<a id="b371"></a><a id="cll_bnf-371"></a>

operator-1 371 =

operator-2 | guhek operator-1 gik operator-2 | operator-2 (jek | joik) \[stag\] BO # operator-1<a id="b372"></a><a id="cll_bnf-372"></a>

operator-2 372 =

mex-operator | KE # operator /KEhE#/<a id="b374"></a><a id="cll_bnf-374"></a>

mex-operator 374 =

SE # mex-operator | NAhE # mex-operator | MAhO # mex /TEhU#/ | NAhU # selbri /TEhU#/ | VUhU #<a id="b381"></a><a id="cll_bnf-381"></a>

operand 381 =

operand-1 \[(ek | joik) \[stag\] KE # operand /KEhE#/\]<a id="b382"></a><a id="cll_bnf-382"></a>

operand-1 382 =

operand-2 \[joik-ek operand-2\] ...<a id="b383"></a><a id="cll_bnf-383"></a>

operand-2 383 =

operand-3 \[(ek | joik) \[stag\] BO # operand-2\]<a id="b385"></a><a id="cll_bnf-385"></a>

operand-3 385 =

quantifier | lerfu-string /BOI#/ | NIhE # selbri /TEhU#/ | MOhE # sumti /TEhU#/ | JOhI # mex-2 ... /TEhU#/ | gek operand gik operand-3 | (LAhE # | NAhE BO #) operand /LUhU#/<a id="b812"></a><a id="cll_bnf-812"></a>

number 812 =

PA \[PA | lerfu-word\] ...<a id="b817"></a><a id="cll_bnf-817"></a>

lerfu-string 817 =

lerfu-word \[PA | lerfu-word\] ...<a id="b987"></a><a id="cll_bnf-987"></a>

lerfu-word 987 =

BY | any-word BU | LAU lerfu-word | TEI lerfu-string FOI<a id="b802"></a><a id="cll_bnf-802"></a>

ek 802 =

\[NA\] \[SE\] A \[NAI\]<a id="b818"></a><a id="cll_bnf-818"></a>

gihek 818 =

\[NA\] \[SE\] GIhA \[NAI\]<a id="b805"></a><a id="cll_bnf-805"></a>

jek 805 =

\[NA\] \[SE\] JA \[NAI\]<a id="b806"></a><a id="cll_bnf-806"></a>

joik 806 =

\[SE\] JOI \[NAI\] | interval | GAhO interval GAhO<a id="b932"></a><a id="cll_bnf-932"></a>

interval 932 =

\[SE\] BIhI \[NAI\]<a id="b421"></a><a id="cll_bnf-421"></a>

joik-ek 421 =

joik # | ek #<a id="b422"></a><a id="cll_bnf-422"></a>

joik-jek 422 =

joik # | jek #<a id="b807"></a><a id="cll_bnf-807"></a>

gek 807 =

\[SE\] GA \[NAI\] # | joik GI # | stag gik<a id="b808"></a><a id="cll_bnf-808"></a>

guhek 808 =

\[SE\] GUhA \[NAI\] #<a id="b816"></a><a id="cll_bnf-816"></a>

gik 816 =

GI \[NAI\] #<a id="b491"></a><a id="cll_bnf-491"></a>

tag 491 =

tense-modal \[joik-jek tense-modal\] ...<a id="b971"></a><a id="cll_bnf-971"></a>

stag 971 =

simple-tense-modal \[(jek | joik) simple-tense-modal\] ...<a id="b815"></a><a id="cll_bnf-815"></a>

tense-modal 815 =

simple-tense-modal # | FIhO # selbri /FEhU#/<a id="b972"></a><a id="cll_bnf-972"></a>

simple-tense-modal 972 =

\[NAhE\] \[SE\] BAI \[NAI\] \[KI\] | \[NAhE\] (time \[space\] | space \[time\]) & CAhA \[KI\] | KI | CUhE<a id="b1030"></a><a id="cll_bnf-1030"></a>

time 1030 =

ZI & time-offset ... & (ZEhA \[PU \[NAI\]\]) & interval-property ...<a id="b1033"></a><a id="cll_bnf-1033"></a>

time-offset 1033 =

PU \[NAI\] \[ZI\]<a id="b1040"></a><a id="cll_bnf-1040"></a>

space 1040 =

VA & space-offset ... & space-interval & (MOhI space-offset)<a id="b1045"></a><a id="cll_bnf-1045"></a>

space-offset 1045 =

FAhA \[NAI\] \[VA\]<a id="b1046"></a><a id="cll_bnf-1046"></a>

space-interval 1046 =

((VEhA & VIhA) \[FAhA \[NAI\]\]) & space-int-props<a id="b1049"></a><a id="cll_bnf-1049"></a>

space-int-props 1049 =

(FEhE interval-property) ...<a id="b1051"></a><a id="cll_bnf-1051"></a>

interval-property 1051 =

number ROI \[NAI\] | TAhE \[NAI\] | ZAhO \[NAI\]<a id="b32"></a><a id="cll_bnf-32"></a>

free 32 =

SEI # \[terms \[CU #\]\] selbri /SEhU/ | SOI # sumti \[sumti\] /SEhU/ | vocative \[relative-clauses\] selbri \[relative-clauses\] /DOhU/ | vocative \[relative-clauses\] CMEVLA ... # \[relative-clauses\] /DOhU/ | vocative \[sumti\] /DOhU/ | (number | lerfu-string) MAI | TO text /TOI/ | XI # (number | lerfu-string) /BOI/ | XI # VEI # mex /VEhO/<a id="b415"></a><a id="cll_bnf-415"></a>

vocative 415 =

(COI \[NAI\]) ... & DOI<a id="b411"></a><a id="cll_bnf-411"></a>

indicators 411 =

\[FUhE\] indicator ...<a id="b413"></a><a id="cll_bnf-413"></a>

indicator 413 =

(UI | CAI) \[NAI\] | Y | DAhO | FUhO

The following rules are non-formal:

<a id="b1100"></a><a id="cll_bnf-1100"></a>word 1100 =

\[BAhE\] any-word \[indicators\]

any-word =

“any single word (no compound cmavo)”

anything =

“any text at all, whether Lojban or not”<a id="b1101"></a><a id="cll_bnf-1101"></a>

null 1101 =

any-word SI | utterance SA | text SU

FAhO is a universal terminator and signals the end of parsable input.