[Next](cases.html)

[Previous](guarefmn.html)

[Contents](guarefmn.html)

------------------------------------------------------------------------

# Introduction to *Gua\\spi* {#introduction-to-guaspi align="center"}

Most human languages are natural: they evolved with their host societies
without the benefit of intentional design. While some languages like
French are maintained by dedicated stewards, and others like Spanish and
Russian have been renovated recently, most drift with the fashions of
peasants and teenagers which, though vital, lack logic and efficiency. A
very few languages, however, have been created as artifacts with
specific goals in mind. *Gua\\spi* is one of these. My goals in building
*gua\\spi* were:

-   To investigate the nature of language, and particularly the minimum
    content required for a language, through engineering and experiment.
-   To create a language suited to use by artificial intelligences, such
    that the effort to map from letters to meanings does not overshadow
    the effort spent on using the resulting meanings.
-   To create a language for my own use, free of the limitations of
    English, and to have fun doing so.

The purpose of this monograph is to present the syntax of *gua\\spi*, as
well as categorical information about the vocabulary, in the style of a
reference manual. All the syntax is here (excepting only features under
active development that were too late to make publication), and the
vocabulary section contains an extensive list of how to say various
types of expressions. To learn *gua\\spi* you also need a dictionary, a
language textbook, and a set of *gua\\spi* reading material.

## Artificial Intelligence {#artificial-intelligence align="center"}

The significance of *gua\\spi* to artificial intelligence work is that
it is a bridge between humans and machines: it is complete enough to
express the real conversation of real humans to each other, unlike
database representation languages, yet it is simple enough that a
working Prolog parser can be put together in a few days, unlike natural
languages and particularly English, which must be so stripped as to be
scarcely useable before a simple parser can handle it.

*Gua\\spi* has several characteristics that particularly suit it to use
by humans and artificial intelligences together.

-   *Gua\\spi* is simple. The formal syntax can be stated in a few
    lines, compared to thousands of lines for English. There are only
    eight classes of structure words (occupying only two distinct
    syntactic sites), with about six functionally and morphologically
    related words per class; a similar set of pronouns; and 21 digits.
    The content words number only about 1400, compared to half a million
    for English.
-   *Gua\\spi* is modular. Morphology, grammar, organization and
    semantics are defined separately and interact to the minimum
    feasible extent.
-   *Gua\\spi* is complete. The content words form a basis such that
    almost any meaning not tied to a specific place or culture, and many
    which are, can be represented by agglutination. Foreign words and
    scientific Latin are welcome in the language.
-   *Gua\\spi* is flexible. A minimum of preconceptions are imposed on
    the user by the language. Trials show that *gua\\spi* can express
    human speech from daily life as well as highly technical scientific
    language.
-   *Gua\\spi* is efficient. Words are short, and extensive defaults on
    articles and modal cases eliminate the majority of structure words.
-   *Gua\\spi* is unambiguous. There is one sound per letter and one
    meaning per word; and every valid utterance can be parsed in only
    one way.

## Ancestor Languages {#ancestor-languages align="center"}

The language artifact *Loglan*, developed by James Cooke Brown \[L1\],
was the inspiration for *gua\\spi*. Brown realized that a very small set
of content words could form a basis of a language, and produced such a
set. By successfully writing large amounts of prose in *Loglan* while
creating almost no additional words, I validated his insight.

Loglan was the first language to have such simple grammar \-\-- a
hundred times fewer syntax rules than English, for example. But
aggressive simplification can still be applied, and this I have done in
*gua\\spi*. One is tempted to think of the resulting syntax and
morphology rules as trivial. A better way to describe them is, they
contain the essentials and nothing more.

*Gua\\spi*\'s syntax is much simpler than English or other languages,
partly because the syntax is divided into modules each of which has its
own purpose. *Gua\\spi*\'s syntax modules are:

Morphology
:   How to divide letters or sounds into words.

Grammar
:   Joining words into phrases into sentences.

Organization
:   What each phrase does in the sentence.

Semantics
:   Giving meaning to syntactic structures.

Natural language syntax is extremely complicated because the syntax
expresses actual meanings such as tenses and numbers. In *gua\\spi* the
first three levels are independent of the meaning of the words. This
makes them less interesting than jewels like the \`\`perfective
aspect\'\' of Russian or the \`\`long object case\'\' of Navajo, but it
makes them much simpler and much easier to learn and use.

# Morphology: What is a Word {#morphology-what-is-a-word align="center"}

The phonemes are divided in two classes, C\'s and V\'s. All C\'s are
consonants in English and those English vowels used in *gua\\spi* are
all in the V class, hence the names. In addition each word has a tone, a
frequency modulation of the V\'s of each word in the Chinese manner. A
word is written as a tone (see [Table 4 \[Tones\]](grammar.html#Tones)),
one or more C\'s and one or more V\'s. What could be simpler?

## The Phonemes {#the-phonemes align="center"}

Phonemes can be distinguished by where the tongue is placed to make
them, whether they are sudden (plosive) or continuous (spirant), and
whether their sound comes from the vocal cords (voiced) or the rush of
air (unvoiced). Particular ranges of tongue position produce each
phoneme, much like states on a map. But each listener has unique map
boundaries for recognizing phonemes, especially for the vowels, so the
speaker should try to hit the center of the phoneme region so as to
maximize the likelihood that any particular listener will be able to
recognize his speech. Nonetheless, the more difficult phoneme
distinctions have been removed from *gua\\spi* and so speakers of any
natural language should find most phonemes easy to say and to hear.

[Table 1 \[Phonemes\]](grammar.html#Phonemes) shows the phonemes,
categorized by tongue position and sound source. Some phonemes are
represented confusingly in European languages, e.g. \`sh\' which sounds
like neither \`s\' nor \`h\'. So in *gua\\spi* they are assigned
individual letters which differ from European usage \-\-- \`q\' for
\`sh\'. [Table 2 \[Pronunciation\]](grammar.html#Pronunciation) gives
examples of these, and all the vowels. Written blanks have no sound, and
are optional. There is no distinction between upper and lower case.
[]{#Phonemes}

------------------------------------------------------------------------

C/V

Stop Class

Sound

Labial

Dental

Palatal

Velar

Glottal

C

Plosive

unvoiced

p

t

c\*

k

\-\--

C

Plosive

voiced

b

d

j

g

:\*

C

Spirant

unvoiced

f

s

q\*

\-\--

\-\--

C

Spirant

voiced

v

z

x\*

\-\--

#\*

V

Vowels

u

o

y

i,e

a

V

Nasal etc.

m

n

l

w\*

r

> Table 1 \[Phonemes\]. *Gua\\spi* phonemes, arranged by tongue position
> front to back (reading across) and sound type (reading down). Letters
> marked \`\*\' differ from European standard usage.

------------------------------------------------------------------------

[]{#Pronunciation}

------------------------------------------------------------------------

*Gua\\spi*

English

Examples of Pronunciation

c

ch

CHew, Ciao (Italian)

q

sh

SHoe

x

zh

aZure, breZHnev (Russian)

:

(pause)

the:apple, hawai:i (glottal stop)

\#

uh

thE, Among (schwa)

u

u, oo

flUte, bOOt

o

o, oa

bOne, bOAt

y

i

knIt

i

i, ee

grEEn machIne (not eye)

e

e

bEd

a

a

fAther (not cAt)

mnlr

mnlr

LeMoN RiNd (no silent R)

w

ng

stroNG

> Table 2 \[Pronunciation\]. How to pronounce *gua\\spi* phonemes.
> Nonstandard C\'s are shown; C\'s without examples are as in English.
> Standard radio broadcast accent is close to correct for the V\'s;
> Spanish is closer. Pronounce the vowels as one sound, not a glide
> between two sounds as in \`\`eye\'\'.

------------------------------------------------------------------------

The sound \`#\' or \`uh\' is common in English; all vowel letters are
sometimes pronounced \`#\'. The \`a\' of \`\`among\'\' is a good
example. This sound is called \`\`schwa\'\'; that German name is
pronounced (with *gua\\spi* letters) \`\`sqv#\'\'. \`#\' is not used in
regular words; its purpose is to break up CC pairs that a particular
speaker finds hard to pronounce, since virtually all speakers will be
able to handle C#C. It is to be ignored and it is only written in
explanations like this one. Though normally considered a vowel, it is in
the C class because it occurs among C\'s, and a word is defined as some
C\'s followed by some V\'s.

The glottal stop \`:\' pronounced alone is a sudden (plosive) \`#\', but
it is normally followed by a V so that it sounds like a brief pause
after which the V comes on. In many English dialects, as in *gua\\spi*,
it is found between a vowel-final and vowel-initial word, like
\`\`the:apple\'\', while the Cockney dialect uses it much more
extensively. The glottal stop is not used in regular words; its place is
at the beginning of each sentence start word, and in vowel-initial
foreign words.

English has thirteen subtly different vowels plus four official
diphthongs but only five letters to represent them. *Gua\\spi* uses only
six easily distinguished vowel sounds, recruiting Y for one of them, and
adds some vowel-like sounds which are considered consonants in English.
Unfortunately, many regional accents of English turn simple vowels into
diphthongs, invalidating the example words given in
[Table 2 \[Pronuncation\]](grammar.html#Pronunciation). Other accents
transform sounds beyond the bounds that a *gua\\spi* speaker can
recognize. If you speak with a regional accent, please use the vowel
sounds that you can hear on television or radio (American or British
will both work). Particularly troublesome examples, rendered with
*gua\\spi* letters, are shown in this table: []{#Accent}

------------------------------------------------------------------------

Standard

Accented English

flUte

flIUte

bOAt

bAt

(a very closed \`o\')

machIne

machI#n

bEd

bAI#d

fAtheR

f%thA

(% represents \`a\' in \`\`cat\'\')

> Table 3 \[Accent\]. Accented Vowels Troublesome in *Gua\\spi*. If you
> normally speak a regional dialect, try to use standard pronunciation
> in *gua\\spi*.

------------------------------------------------------------------------

Japanese speakers are famous for producing \`l\' and \`r\' that
Europeans cannot distinguish. Chinese has distinct \`l\' and \`r\' but
uses phoneme boundaries different from the European norm, so its
speakers also have some trouble being understood. The *gua\\spi* \`l\'
and \`r\' are biased to European norms, and Asian speakers should take
special care with these phonemes.

Preliminary experience shows that the errors English-speaking beginners
make most often are to interchange \`q\' with \`c\', \`x\' with \`j\',
and \`i\' with \`y\'; and to pronounce \`w\' as \`oo\' (should be
\`ng\').

Written blanks have no sound, and are optional. In this document a blank
usually comes before each word (except in the phrase
\`\`*gua\\spi*\'\'), although in running text it looks nicer to omit
blanks before the tone \`-\'. There is no distinction between upper and
lower case. The tones (described next) make punctuation unnecessary.
There are no periods at the ends of sentences; however, each sentence
start word begins with a glottal stop, written as a colon. This colon is
a letter, not a punctuation.

A feature of *gua\\spi* (like Loglan before it, and unlike English) is
that writing and speech are isomorphic, that is, each letter has a
single phoneme (sound) and each phoneme has a single letter (with
trivial exceptions), so that each spoken text can be spelled easily and
without ambiguity, and each written text can be read off equally easily.

# Grammar by Tones {#grammar-by-tones align="center"}

The job of grammar is to stick words together into phrases. The grammar
does not support meaning of any kind \-\-- no tenses, no possessives, no
nouns, no verbs. These ideas are handled at the organizational and
semantic levels, using the grammar as a foundation. Like its morphology,
the grammar of *gua\\spi* is nearly minimal.

## Parse Tree {#parse-tree align="center"}

The grammar is stated in Backus-Naur form in
[Section \[Backus\]](conclusn.html#Backus). For grammatical purposes
there is only one kind of phrase (though distinctions are made at the
organizational level), but words have five categories: the two words
*\`\`fu\'\'* and *\`\`fi\'\'*, sentence start words, other prefixes, and
everything else. The main part of a phrase is a sequence of one or more
words collectively called the \`\`phrase predicate\'\'; any prefixes in
this must come first. After any of the prefixes or after the whole
predicate the sub-phrases are interspersed. They, of course, have their
own prefixes, predicates and sub-phrases.

Let us understand phrases with the help of the example in the following
figure, showing the \`\`parse tree\'\' of a simple sentence. The root
phrase is at the top; parse trees grow upside down. Sub-phrases with
their own predicates come at the next lower level. These in turn may
have their own sub-phrases. Each phrase is at a certain level and it
attaches to the most recent phrase at the next higher level. The tones
(see [Table 4 \[Tones\]](grammar.html#Tones)) show the level of each
word relative to the one before it. []{#Parsetree}

------------------------------------------------------------------------

> *\^:i !tara /vme -crw !kseo \^vu -tum !kfor \^fe -fnau*
>
> The rat devours (violently eats) the cheese with a fork and knife

       ^:i       /vme-crw
      (Start)    -1 devours
         |           |
         ------------------------------
                |         |           |
              !tara     !kseo      ^vu-tum
              +1 rat   +1 cheese   +0 using
                                      |
                                      -------------------
                                         |              | 
                                      !kfor         ^fe-fnau
                      +1 fork       +0 knife

> Figure 1 \[Parsetree\]. A Sample Parse Tree. Each phrase is part of
> the most recent one at the next higher level. Each phrase may have
> sub-phrases. Tone symbols (see
> [Table 4 \[Tones\]](grammar.html#Tones)) show jumps into and out of
> sub-phrases; they show the difference in level between adjacent words.

------------------------------------------------------------------------

The root phrase predicate of the example sentence is \`\`devour\'\'
(violently eat), and the start word is at the same level. \`\`Rat\'\',
attaching to \`\`violent\'\', is therefore at the next level below the
start word, indicated by \`!\'. \`\`Violent\'\' is at the level above
\`\`rat\'\', indicated by \`/\'. \`\`Eat\'\' is attached to
\`\`violent\'\' in a compound, indicated by \`-\'. For grammatical
purposes the pair of words, plus the start word, form the root phrase
predicate, although later at the organizational syntax level \`\`eat\'\'
will be split from \`\`violent\'\'. Like \`\`rat\'\', \`\`cheese\'\'
attaches below \`\`eat\'\' (\`!\'). The next phrase also attaches to
\`\`eat\'\', indicated by \`\^\', because \`\`eat\'\' is the most recent
word at the next level up. It is a subordinate clause, indicated by the
prefix *\`\`vu\'\'*, that tells what was \`\`used\'\' to eat; in a
similar tone pattern \`\`fork\'\' and \`\`knife\'\' both attach to
\`\`using\'\'. \`\`Using\'\' and \`\`knife\'\' attach to their prefixes
with compounding tone \`-\'. To summarize, words attach to the previous
word at the next higher level, and the tones of *gua\\spi* represent the
attachment level of the present word relative to the one just before it.
Every word has such a tone.

## The Tones {#the-tones align="center"}

The tones are the most terrifying aspect of *gua\\spi* for speakers of
European languages. Please remember that over a billion people in China
and Southeast Asia speak tonal languages. If they can do it, so can you.

A tone is a specific change in pitch or vocal frequency. In English a
falling tone marks the end of the sentence, a rising tone marks a
question, a down-up combination is a kind of verbal comma, and most of
the sentence is said at a fairly even tone. Chinese has similar tones
but each word has one and the tones distinguish between meanings, e.g.
*\`\`-ma\'\'* (high even tone) means \`\`mother\'\' while *\`\`\|ma\'\'*
(down-up) means \`\`horse\'\'. *Gua\\spi* is intermediate in its use of
tones: each word has a tone, but rather than affecting the meaning of
the word it tells which neighboring word it attaches to. The tones are
shown in this table: []{#Tones}

------------------------------------------------------------------------

Number

Sound

Level

Type

Symbols

1

High-even

Predicate

Compound

\-

\-

2

Rising

One higher

Phrase

/

/

3

Down-up

One lower

Clause

\|

\*

4

Falling

One lower

Argument

\\

!

5

Up-down

No change

Phrase

\^

@

6

Low-even

Predicate

Transitive

=

\%

> Table 4 \[Tones\]. Sounds and interpretations of the tones.
> \`\`Level\'\' refers to the parse tree level of the word with that
> tone, relative to the structure before it. \`\`Type\'\' indicates the
> organizational type of that word or phrase. The first set of symbols
> shown, [ascii]{.smallcaps} characters, is preferred but the second set
> can substitute on a manual typewriter. In this paper, \`!\' is used
> instead of \`\\\' for convenience in typesetting.

------------------------------------------------------------------------

You don\'t speak this language, you sing it. Chinese speakers will have
no problem to produce and hear the tones, but Europeans will need a lot
of practice, particularly in listening. A Chinese person speaking
clearly will let his voice vary over an interval of a fourth, e.g. C to
F on the piano, and this should be enough for Europeans to catch. On the
falling and rising tones Europeans tend to produce, and listen for,
little curlicues at the end that make the tone sound like down-up or
up-down. Avoid the curlicues, and recognize the two-direction tones only
if they range over at least a third, e.g. C to E or D to F.

Tones \`-\' and \`=\' join adjacent words of a compound phrase
predicate. Tones \`\|\' and \`!\' start a sub-phrase of the current
phrase. Tone \`\^\' closes the current sub-phrase and starts a new one,
part of the same containing phrase. Tone \`/\' closes a sub-phrase and
resumes the predicate of the containing phrase, if among its prefixes,
or otherwise starts a new phrase at the higher level. Distinctions
within these tone classes are important later but do not affect the
grammar.

A sentence start prefix with up-down tone such as *\`\`\^:i\'\'* is
automatically at root level. *\`\`fi\'\'* jumps to the root level or one
or two levels lower without ending the sentence, depending on its tone
selected from \`!\', \`\^\' or \`/\', as if an imaginary level 1 word
preceeded it. If a word is supposed to be more than one level higher
(closer to the root) than the previous one but *\`\`fi\'\'* does not
apply, you use *\`\`fu\'\'* to raise the level count by two to four
depending on its tone, selected from \`!\', \`\^\' or \`/\'
respectively. You can repeat *\`\`fu\'\'* for even higher levels, but
this is rarely necessary since from level 7 or less you can reach any
level from 0 (root) to 8 in one jump. On the level-shifting prefixes the
tone \`-\' usually can substitute for \`\^\', except after a foreign
word, name or digit, where the prefix tends to get included in the
previous structure.

Sentence start words like *\`\`:i\'\'* and other prefix words like
*\`\`se\'\'* or *\`\`vu\'\'* come before and at the same level as the
predicate of their phrase. The predicate normally has compounding (high
even) tone unless some of its arguments precede it, and the linked
predicate is considered to be a compound word with the prefix, whether
or not arguments come between them. There may be several prefixes in a
row before the predicate, all at the same level and linked in sequence.
The one closest to the predicate has effect first.

As befits a grammatical element, the tone of a word implies what kind of
structure is attaching. In particular, the third tone, down-up, \`\|\',
is specifically for the very common case of putting a subordinate clause
one level down from the previous word.

There are two word sequences for quoting non-*gua\\spi* text. These are
part of the grammar but are described with the other quote words, which
are at the organizational level.

That is the end of the *gua\\spi* grammar. A speaker used to natural
languages surely will expect to have seen tenses, cases, numbers,
aspects, moods and all the other baggage that inflates natural language
grammars beyond the bounds of reason. *gua\\spi* grammar provides a
framework upon which words can mean tenses, cases and so on, but the
grammar by itself eschews any meaning \-\-- so it can be much simpler
than natural language.

------------------------------------------------------------------------

[Next](cases.html)

[Previous](guarefmn.html)

[Contents](guarefmn.html)
