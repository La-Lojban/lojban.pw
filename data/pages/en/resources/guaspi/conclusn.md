[Next](guarefmn.html)

[Previous](vocab2.html)

[Contents](guarefmn.html)

------------------------------------------------------------------------

# Grammar Algorithms {#grammar-algorithms align="center"}

## [Backus-Naur Form]{#Backus} {#backus-naur-form align="center"}

For computer applications the normal way to represent *gua\\spi* syntax
is in a semi-procedural language such as Prolog, because the end of a
phrase comes when the next word\'s level passes up to or above that of
the phrase main word, rather than at a standardized ending word, and
such a relation is hard to represent in BNF. However, it is generally
expected that the syntax of a language will be presented in BNF, so here
it is.

; Morphology.

C

= (choice of letters)

Cseq

= (Cseq C) \| C

V

= (choice of letters)

Vseq

= (Vseq V) \| V

Word

= Cseq Vseq

; Tone categories.

Compound

= \`-\' \| \`=\'

Sametone

= \`\^\'

Down1

= \`!\' \| \`\|\'

Up1

= \`/\'

; Grammar. LHS \`-\' symbol indicates which end has a tone.

Prefix

= (subset of Word, e.g. *\`\`vo\'\'* or *\`\`zu\'\'*)

Primitive

= (subset of Word, e.g. *\`\`tara\'\'* or *\`\`crw\'\'*)

Phrase

= Prefix Args0 Phrase

\| Phrase-w

Phrase-w

= Primitive Phrase-w

\| Primitive

Phrase0-

= Phrase Sametone

\| Phrase Down1 Args1

; Args(n) is a list of phrases that jumps up n levels at the end.
Args3, 4, . . . are defined similar to Args1 and 2. Some finite bound
must be set on n to give a finite grammar.

-Args0-

= Compound (Just one tone)

\| Down1 Args1

Args1-

= Phrase Up1

\| Phrase Down1 Args2

\| Phrase0 Args1

Args2-

= Phrase \`!\' \`fu\'

\| Phrase Down1 Args3

\| Phrase0 Args2

; These add the effect of *\`\`fi\'\'*.

Afterargs

= Phrase0 Afterargs

\| Phrase Down1 Afterargs

\| Phrase

After1

\| After1 Down1 \`fi\' \`-\' After1

\| After1 \`-\' \`fi\' Down1 After1

\| Afterargs

-Preargs-

= Down1 After1 \`/fi\' Preargs

\| Down1 After1 Down1 \`fi\' \`/\' Args1

\| Args0

-Sentstart

= \`\^\' (choice of words such as *\`\`:i\'\'*)

Sentend

= Phrase Down1 After1

\| Phrase

-Sentence

= Sentstart Preargs Sentend

-Nonsentence

= Sentstart Down1 Sentend

-Unit

= Sentence \| Nonsentence

-Discourse

= (Discourse Unit) \| Unit

\`\`Discourse\'\' is the root grameme. Grammar for quoted non-*gua\\spi*
text is not shown, but foreign predicates and quoted *gua\\spi* are
processed by this grammar and are put together at the organizational
syntax level.

## Organizational Transformations {#organizational-transformations align="center"}

Formal syntax is finished at this point, and transformation begins, in
this sequence of steps:

-   Transform the tone \`\|\' into \`\`*!vu*-subordinate clause\'\'.
-   Do the transformations for retroactive downjumps and for error
    correction (*fa*).
-   Distinguish arguments from sentences. Insert *\`\`!so -jy\'\'* as
    the placeholder for arguments\' open first cases.
-   Re-order argument lists according to caselinks and conversions.
    Insert placeholders for missing cases.
-   Look up each word in the dictionary. Insert default articles,
    typically \`\`*xe*-the\'\', before arguments. Insert default
    *\`\`vo\'\'*.
-   In cases of compounding, replicate argument lists for parallel
    arguments; insert *\`\`vo\'\'* for compound infinitives; or demote a
    compound object into the argument list.
-   Replicate main phrase arguments into infinitives.
-   Substitute the antecedents for phrase-relative, modal and question
    pronouns. The antecedent of a question pronoun is found in the
    future answer.
-   Deal with modal case stack operations.
-   Insert modal case defaults in argument lists lacking them.
-   Retrieve the referent sets for all words. From them, compute the
    referent subsets of arguments and of sentences.
-   These are the relations being called to your program\'s attention.
    Update word referent sets accordingly, or take other appropriate
    action.

# Conclusion {#conclusion align="center"}

People developing applications in *gua\\spi* need some assurance that
the language is not going to shift out from under them; but *gua\\spi*
certainly did not arise perfectly formed from the brow of Athena. The
originator of the language certainly wants a certain amount of freedom
to tinker with his creation; but a significant reason for the limited
popularity of *Loglan* has been that people are not sure what the
language officially is and which way it will jump next. Therefore I am
making this baseline duration commitment: there will be no major changes
in *gua\\spi* until 1 January 1991 (two years hence); until then the
language described herein will be acceptable in the sense that software
ought to be able to understand it, even if upgraded to handle minor
revisions; and when the time of major revision comes, the changes will
be made after consultation with the community of people actively using
*gua\\spi*.

I hope this brief introduction to *gua\\spi* has whetted your appetite
to learn more about it. As you have seen, it expresses typical human
sentences easily and efficiently. But the meanings of the words, and
particularly the meanings of the phrases and sentences made from them,
are defined much more specifically and clearly than in even the best
natural languages. Finally, and most significant for artifical
intelligences, the resulting meanings are cast in a form that is ideal
for modern fifth-generation languages \-\-- which, in fact, those
languages were designed to represent. Thus the gap between human and
machine languages is closed by *gua\\spi*.

## Bibliography {#bibliography align="center"}

-   \[L1\] Brown, James C. Loglan 1: A Logical Language. The Loglan
    Institute, Inc., Gainesville, Fla., 1975.
-   \[L4\] Brown, James C. Loglan 4
    5: A Loglan-English / English-Loglan Dictionary. The Loglan
    Institute, Inc., Gainesville, Fla., 1975.
-   \[NB2\] Brown, James C. A Proposed Revision in the Structure of
    Loglan Words (Notebook No. 2). The Loglan Institute, Inc.,
    Gainesville, Fla., 1982.
-   \[TL43\] Parks-Clifford, J. Supplement to Loglan 1. \\sl The
    Loglanist 4, 3 (Nov. 1980).
-   \[La\] Information about *Loglan* may be obtained from The Loglan
    Institute, Inc., 1701 NE 75th Street, Gainesville, FL 32601.
-   \[Lja\] A modernized version of *Loglan*, much closer to the
    original *Loglan* than *gua\\spi*, is *Lojban*. Information is
    available from The Logical Languages Group, 2904 Beau Lane, Fairfax,
    VA 22031, or lojbab@lojban.org. For on-line access, send a message
    whose body is \`\`index lojban\'\' to
    listserv@hebrew.cc.columbia.edu.
-   \[Ga\] Please contact the author at UCLA Department of Mathematics,
    Los Angeles, CA 90024-1555, or e-mail to jimc@math.ucla.edu.

------------------------------------------------------------------------

[Next](guarefmn.html)

[Previous](vocab2.html)

[Contents](guarefmn.html)
