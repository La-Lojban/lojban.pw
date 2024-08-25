[Next](pronouns.html)

[Previous](grammar.html)

[Contents](guarefmn.html)

------------------------------------------------------------------------

# Cases and Relations {#cases-and-relations align="center"}

The next layer of *gua\\spi* syntax is the organizational level, but to
understand the reason for some organizations we have to make a detour
into semantics to find out about cases. We also get to see some examples
of *gua\\spi* sentences.

At the beginning we will use this sentence for an example:

> *\^:i !tara /crw !kseo*
>
> The rat eats the cheese (start: rat eat cheese)

Please pronounce it correctly: \`c\' as English \`ch\' and \`i\' as
\`ee\'. Mind the tones, lest you change it into \`\`the eat rats the
cheese\'\' or some such. Since no dictionary is included with this
paper, in examples where it is hard to match up the *gua\\spi* and
English words the English translations are augmented with a
\`\`pidgin\'\' translation using *gua\\spi* word order. The notation
\`\`*tara*-rat\'\' in examples means that *\`\`tara\'\'* is the example
word, and it means \`\`rat\'\' in English. Isolated words or phrases
like this are written without a tone because it depends on the context
where the word is used.

## What is a Predicate {#what-is-a-predicate align="center"}

Human languages generally distinguish between \`\`things\'\' and
\`\`actions\'\', where an \`\`action\'\' is a relation between
\`\`things\'\'. The formal term for such a relation is a
\`\`predicate\'\'. Take for example:

> *\^:i !tara /crw !kseo*
>
> The rat eats the cheese

\`\`*crw*-eats\'\', called a \`\`predicate word\'\', tells how the rat
and the cheese are related and is a symbol for a certain predicate. The
predicate is like a function whose arguments are things that might be
related; the value of the function is true or false (or fuzzily in
between) depending on whether or not they actually are thus related: in
this sentence, whether the first actual parameter eats the second.

The formal parameters of a predicate, regarded as a function, are
referred to as \`\`cases\'\'. English has \`\`nominative\'\' and
\`\`accusative\'\' cases (the rat occupies the nominative case and the
cheese occupies the accusative case), and Latin has in addition
\`\`genitive\'\', \`\`vocative\'\' and others, but *gua\\spi* simply
numbers the cases. Some *gua\\spi* words have as many as five numbered
cases. In our example, \`\`*tara*-rat\'\' fills the first case of
\`\`*crw*-eats\'\' and \`\`*kseo*-cheese\'\' fills the second.

The words denoting the actual parameters of a predicate are called
\`\`arguments\'\'; being sub-phrases, they have their own predicate
words. Here, *\`\`!tara\'\'* and *\`\`!kseo\'\'* are the arguments. The
\`\`thing\'\' represented by an argument, which is the actual parameter
of the sentence predicate, is something that can fill the first case of
the argument\'s predicate. It is referred to as the \`\`referent\'\' of
the argument. For example,

> *-xe -crw !kseo*
>
> The eater of cheese

is an argument phrase; the first case is left open, and our rat (which
we have seen previously in the first case of this relation) is a
candidate for the argument\'s referent.

Not every first case occupant is a referent of the argument. The rules
for forming the referent subset are presented later.

A predicate might have only one case. Some such words are actions in
English, like \`\`*vde*-alive\'\', but most are things, like
\`\`*tara*-rat\'\'. By itself \`\`*tara*-rat\'\' is an argument, and its
open first case can be filled by any one of numerous rats.

In literate English and most other languages a word should not be both a
noun and a verb, but in *gua\\spi* any predicate word can play either
role depending on cues recognized at the organizational syntax level;
the grammar is the same for sentences and arguments. This unification
cuts in half the complexity of the language, which is already simple.
The term \`\`phrase\'\' will be used to mean either a sentence or an
argument.

## What Definitions Mean {#what-definitions-mean align="center"}

A predicate word expresses a relation between the occupants of its
cases. In English and all natural languages, words are \`\`defined\'\'
by a sentence or two; the words in those sentences are often defined
circularly in terms of the word being defined. In *gua\\spi*, on the
other hand, the text definition is merely a learning aid. The relation
is actually defined by a set of all thus-related object lists. For
example, the referent set of \`\`eats\'\' includes a member with our
example rat in first case and our example cheese in second, as well as
numerous other members containing rats, foods, and so on ad (almost
literally) infinitum. Other predicates (such as \`\`pair\'\') have
referent sets that are actually infinite.

Language users are not expected to be familiar with every object set
that was, is now or ever shall be thus related. A big part of language
behavior consists of the listener adding to his knowledge of which items
are thus related, which information the speaker sends to him. Each
person has his own limited experience of the world, but we speak of
\`\`the referent set\'\' of a word independent of a person because words
are supposed to mean the same thing to each person, that is, if a person
is aware of a particular referent set member, typically he will agree
with other language users which word\'s definition it is a member of.

Humans are very good at generalizing from a few referent set members so
as to recognize novel referents, and they are not satisfied with a word
until they can do such a general recognition algorithm and usually come
out with the same answers their neighbors do. But mechanical users of
*gua\\spi* cannot be expected to show such skill, and neither can
beginning human users such as infants. They must build up a referent set
for a word by exhaustively hearing referent set members. If an advanced
human, or advanced software, can transcend the official definition of
*gua\\spi* words, that\'s fine \-\-- a common (but risky) strategy for
humans will be to use their native language as a guide to *gua\\spi*
meanings. However, *gua\\spi* words are still defined officially in
terms of referent sets simply because this definition is known to be
tractable both for theory and for practical implementation. A *gua\\spi*
referent set is perfectly suited to be represented as a Prolog database,
if truncated to a practical size.

## Interpreting Language Behavior {#interpreting-language-behavior align="center"}

When you speak an argument in a nonsentence you call the listener\'s
attention to its referents. For example,

> *\^:i \|jiw \^sper -fe -jiol*
>
> A crocodile!

When you speak a sentence or a subordinate assertion you do the same
thing: you call the listener\'s attention to the members of its referent
set. (Thanks to John Parks-Clifford, editor of *The Loglanist*, for this
insight \[TL43\].) Thus in:

> *\^:i \|qnu !qo -jan /tara /jun !kseo \|zey !ju*
>
> John, the rat is after your cheese!

your knowledge of the referent set of \`\`*jun*-hunt\'\' includes a
member which John will want to append to the ones he knows, before the
cheese is stolen. This is the ultimate meaning of the *gua\\spi*
sentence.

# Organization {#organization align="center"}

Now that we have an unambiguous parse tree made up of phrases, what
shall we do with it? Modern theories of parsing are very good at
describing the transition from input tokens to a parse tree, but they
leave the subsequent use of that structure pretty much to ad-hoc
patchwork, and *gua\\spi* is no better. However, the uses of the parse
tree can be divided profitably into two classes, organization and
semantics. Semantics in *gua\\spi* consists mainly of computing and
updating referent sets, whereas organization refers to a collection of
preparatory transformations including assigning sub-phrases to cases,
handling imbedded sentences, replacing pronouns by their bases, and
transforming compound words into sub-phrases.

## Which Words Go in Which Cases {#which-words-go-in-which-cases align="center"}

The tones of grammar deliver to the organizational syntax level, for
each phrase, an ordered list of attached sub-phrases, which are the
arguments of the phrase predicate. For example in *\`\`!tara /crw
!kseo\'\'*, \`\`*tara*-rat\'\' and \`\`*kseo*-cheese\'\' are attached to
\`\`*crw*-eats\'\' as sub-phrases and therefore are its arguments. In
the simplest and most common variation the arguments fill a sentence
predicate\'s cases in order by number, much like English and Chinese, so
\`\`*tara*-rat\'\' fills the first case of \`\`*crw*-eats\'\' and
\`\`*kseo*-cheese\'\' fills the second. In arguments the first case is
left unfilled. This organizational syntax can be so simple because the
grammar delivers unambiguous lists of arguments, whereas in English or
Latin a combined syntax has to deal with both getting the arguments on
the right predicates and getting them into the right cases, and so is a
lot more complicated.

The root phrase is assumed, in the absence of special cue words, to be a
sentence; thus its first sub-phrase fills its first case. All
sub-phrases are assumed to be arguments with empty first cases, except
if they have tones or prefixed cue words that make them subordinate or
infinitive clauses.

Should it be inconvenient to have cases filled in order, *gua\\spi* has
ways to change the order. First, certain prefixes signify that the
relation word is \`\`converted\'\': a certain case is exchanged with the
first and so brought to the front. This is most useful for arguments.
For example in *\`\`zu -crw\'\'* the first and second cases are
exchanged, and the referent of such an argument would be something
occupying the second case of \`\`eats\'\' before conversion: the meaning
is \`\`food\'\'. The second case after conversion would then be the
eater: *\`\`zu -crw !xo -tara\'\'* means \`\`rat food\'\'. The most
common converted meanings have words of their own, such as
\`\`*kqu*-food\'\'. Here is a florid example of conversion, in which one
word serves for a sentence predicate and five different argument
predicates:

> 0\.
>
> dou
>
> X1 throws X2 to X3 from X4 via X5
>
> 1\.
>
> dou
>
> Pitcher, projector, launcher
>
> 2\.
>
> zu -dou
>
> Missile (e.g. a brick or ball)
>
> 3\.
>
> za -dou
>
> Target
>
> 4\.
>
> ze -dou
>
> Firing position, pitcher\'s mound
>
> 5\.
>
> zi -dou
>
> Route, trajectory, flight path
>
> 1a.
>
> zo -dou
>
> Thrower (suppresses any automatic conversion)

Definitions show the case numbers as X1, X2, etc. A caselink or a
phrase-relative pronoun (described later) that pertains to a particular
case finds that case wherever in the argument list it has been moved by
conversion. Similarly, if there are several conversions on one predicate
(not recommended) the one closest to the predicate has effect first, and
the next one exchanges some case, wherever moved, with the new first
sequential case.

Second, an argument can be directed to a specific case by a
\`\`caselink\'\' prefix. For example, take

> *\^:i !qo -jan /fer !se -dowu*
>
> John carries (something) from the house.

*\`\`qo -jan\'\'* is \`\`John\'\'; *\`\`qo\'\'* marks a foreign name.
*\`\`fer\'\'* = \`\`X1 carries X2 to X3 from X4 via X5\'\'. Its
arguments are *\`\`qo -jan\'\'* in the first case, but *\`\`se\'\'*
links the next argument, \`\`*dowu*-house\'\', to the fourth case: the
start point. The caselink *\`\`se\'\'* attaches to and is one level down
from the sentence predicate *\`\`fer\'\'*, hence would have falling
tone. The argument predicate *\`\`dowu\'\'* attaches to *\`\`se\'\'* as
a compound, and hence has high even tone. Sequential arguments jump over
cases filled by caselinks.

English and many other natural languages use a
\`\`subject-verb-object\'\' word order with the actor first, but in
*gua\\spi* the predicate can occur before, after or among the arguments.
A sentence start word, or in sub-phrases some other prefix word at the
same level as the predicate, will always occur before all of the
arguments and will provide a jump point from which their grammatical
levels can be established.

Since listeners like subject-verb-object order you should use it when
possible, but listeners also like to hear complicated phrases at the end
of a sentence, and you can achieve this goal by judiciously moving the
predicate, by converting it, or by delaying a complicated argument to
the end of the sentence and using an explicit caselink word. In English,
converting the predicate produces the \`\`passive voice\'\', which has a
somewhat different meaning than the standard word order. No such
passivity attaches to a converted *gua\\spi* predicate. It is a fact,
though, that listeners like the actor to be first when it can be
expressed in one or two words, and do not like it to be omitted \-\--
common mistakes when people use the English passive voice.

It is permitted to say one or more arguments in isolation. This
construction is called a \`\`nonsentence\'\'. It begins with the usual
sentence start word *\`\`:i\'\'* and the arguments, as usual, are one
level down, but there just isn\'t any sentence predicate.

## Sentences as Arguments \-\-- Infinitives {#sentences-as-arguments-----infinitives align="center"}

A *gua\\spi* sentence or argument expresses a relation between specific
referents, and this specific referent set member is called an
\`\`event\'\'. (Frequently the sentence represents several similar
events.) It is common for several cases of the predicate to be vacant:
in the previous example the thing carried, the destination and the route
were not specified. Nonetheless there must have been a thing carried, a
destination and a route, and the sentence asserts a relation between all
five arguments. The next organizational elements we will look at are
linking words that attach sentence predicates (with their arguments).
The linked sentences represent lists of specific events with specific
argument referents and with all cases filled even if not specified by
words.

Returning to organization, the first sentence link word is *\`\`vo\'\'*,
which acts to convert a sentence into a one-argument predicate, referred
to as an \`\`infinitive\'\', which means that the occupant of its first
case is an instance of the sentence relation. Though *\`\`vo\'\'* can
itself be a sentence predicate it is much more commonly used in
arguments, like this:

> *\^:i !ji /vyu !vo -qia !ji*
>
> I enjoy my bath

*\`\`vyu\'\'* means \`\`X1 enjoys doing (*vo*) X2\'\', where the second
case is some kind of activity \-\-- a natural place to fill with an
infinitive. The sentence linked by *\`\`vo\'\'* is *\`\`qia !ji\'\'* =
\`\`I bathe\'\', and an instance of that relation, an event, is the
referent of the argument *\`\`vo -qia !ji\'\'* = \`\`my bath\'\'.

*\`\`vyu\'\'* includes the prefix *\`\`vo\'\'* on its second case by
default, as do all words which commonly have infinitive arguments. Also,
such words have various patterns, specified in the dictionary, in which
main sentence arguments are replicated into infinitives. The most common
is for the argument just before the infinitive to be replicated into the
infinitive\'s first case, if the infinitive has no argument caselinked
into the first case with *\`\`so\'\'*. Here *\`\`!ji\'\'* is replicated.
So you could say

> *\^:i !ji /vyu !qia*
>
> I enjoy bathing

The extensive defaults on structure words, of which the default *vo* is
one of the more common examples, increase the efficiency of *gua\\spi*
by letting the speaker not say most structure words.

## Subordinate Clauses {#subordinate-clauses align="center"}

A subordinate clause, indicated by the linking prefix *\`\`vu\'\'*, is a
sentence within a sentence. Its most common use is to restrict a phrase
(an argument or a sentence), so that a thing can be a referent of an
argument only if it actually fits in the subordinate sentence, or the
main sentence represents only events that fit in the subordinate
sentence. Subordinate clauses are more common in *gua\\spi* than in
English, and also can be complicated, so several special rules are
provided to make them simpler:

-   Because subordinate clauses are so common the tone \`\|\' is
    allocated specifically to them which automatically supplies the
    linking prefix *\`\`vu\'\'*. When this tone does not apply, of
    course, *\`\`vu\'\'* may be used explicitly.
-   When the predicate of a subordinate clause has a case for an event,
    indicated by default *\`\`vo\'\'* or *\`\`bi\'\'*, the predicate is
    automatically converted to put the event first.
-   The restricted phrase is automatically replicated in the first case
    of the clause which, if the previous rule applies, will be the event
    argument.

Here is a subordinate clause restricting an argument:

> *\^:i !xi -ftu -plyw \|xgi /fi -qke*
>
> Green apples are sour
>
> *\^:i -qke !xi -ftu -plyw \|xgi*

Not all apples (*ftu -plyw*) but only those which are green (*xgi*) are
described as being sour (*qke*). The restricting sentence is \`\`X1 is
green\'\', and argument referents (apples) are automatically plugged
into X1. The second version of the sentence is re-ordered to sound
better; subordinate clauses usually do better near the end of the
sentence. When in English we use adjectives and adverbs, in *gua\\spi*
we usually use subordinate clauses like this one.

Here is a subordinate clause restricting a sentence:

> *\^:i !tara /cie -pne !kara \^vu -tum !vden !xgno*
>
> The rat makes a hole in the box with its teeth (rat cut-penetrate box
> using teeth its)

The restricting sentence is *\`\`!vo -X1 /zu -tum !vden !xdro\'\'* =
\`\`\[X1 is done\] with its teeth as a tool\'\', and the asserted
relation *\`\`!tara /cie -pne !kara\'\'* = \`\`The rat penetrates the
box\'\' is also required to satisfy the subordinate clause. The effect
is as if an additional case were added to \`\`*cie*-cut\'\' for the
cutting tool. Note that *\`\`tum\'\'* auto-converts so that *\`\`zu\'\'*
is not needed in the subordinate clause.

The additional cases produced by subordinate clauses like this are
called \`\`modal cases\'\'. They specify tenses, locations, listeners
(vocative case), speakers in dialogue, repeated actions, and numerous
miscellaneous cases as in the previous sentence. These cases are the
\`\`context\'\' of a sentence. *Gua\\spi* handles the context in a
well-defined manner, whereas other languages handle context informally.
As with numbered cases, something must fill every modal case in each
event even if no words specify what that thing is. For example, many
events are done \`\`by means of\'\' something, though rarely do we put
words to the instrument. Many predicates in the language can give rise
to modal cases. Therefore a predicate potentially can have a
near-infinite number of cases.

*Gua\\spi* has two other clause link words: *\`\`va\'\'* for subordinate
assertions and *\`\`vi\'\'* for decorations that show the relation
between sentences and the speaker\'s attitude about a sentence. Their
syntax is the same as *\`\`vu\'\'*. For example (*go* being a mood
marker for negation),

> *\^:i \|vi -csn \^tara \|va -go -cul !zu -crw /fi -go -crw !kseo*
>
> Strangely, the rat, which was not full of food, didn\'t eat the cheese
>
> *\^:i \|vi -tan /pur -far !tara \|zey -ji*
>
> Damn, my rat ran away

In \`\`*tan*-annoy\'\' of the second sentence, who is annoyed?
\`\`*ji*-me\'\' is provided by default in the first case (before
conversion) of any subordinate clause or top-level sentence whose first
case ends up vacant, like this one. Thus top-level exclamations also
become more natural:

> *\^:i -fel*
>
> Hooray! (I am happy)

## Quoted Text {#quoted-text align="center"}

A special argument form is quoted text. A quote is a prefix that
transforms the following word or phrase to mean \`\`X1 is an instance of
\<something\> as speech or writing\'\'. Here are the quote words, with
the \<something\>s and with examples. The quoted phrases are underlined
or in italics.

> *bu*
>
> Word or words with compounding tone (high even, \`-\')
>
> *\^:i !xi [-bu -ster]{.underline} /stu !jai \|jir !xi -za -skul*
>
> *\`\`Shit\'\'* is unsuitable to be said at school
>
> *bi*
>
> Phrase (sentence), with its arguments and clauses
>
> *\^:i !zglo /kam [!bi !ji /daw -tao !term !ji]{.underline}*
>
> He/she cried, *\`\`I want (to be in contact with) my mother\'\'*
>
> *bo*
>
> Phrase, but which is stated only approximately
>
> *\^:i !ken /jai [!bo -juy]{.underline}*
>
> The boss (captain) says *yes*
>
> *bn*
>
> The referent of the next argument, as text
>
> *\^:i [!bn -jw \|zo -stul]{.underline} /fi -zu -srn !zglo*
>
> *This letter* (its content) is his response
>
> *be*
>
> Words, not necessarily *gua\\spi*, up to endmark *\`\`ba\'\'*
>
> *\^:i !qo -kirka \|ken /fi -jai [!be C\'est la vie ba]{.underline}*
>
> Captain Kirk said, *\`\`C\'est la vie\'\'*
>
> *br*
>
> Slash string (see text)
>
> *\^:i !qo -:amlet /jai [!br xa To be or not to be . . .
> xa]{.underline}*
>
> Hamlet said, *\`\`To be or not to be . . .\'\'*

The last example, the \`\`slash string\'\' quote *\`\`br\'\'*, is the
same as *\`\`ba\'\'* except that an arbitrary word (*\`\`xa\'\'* in the
example) comes before and after the quoted text, in case *\`\`be\'\'*
cannot be the endmark because it occurs in the text. *\`\`ba\'\'* and
*\`\`br\'\'* are actually interpreted as part of the grammar, as very
special cases, while the rest are recognized at the organizational
level.

Story dialog is represented by quoted sub-phrases in English, but in
*gua\\spi* the dialog is at the main level and the speaker and listener
are identified by a modal case with \`\`*jai*-say\'\', \`\`*kam*-cry\'\'
and related words. These words are defined as \`\`X1 says text (*bi*) X2
to X3\'\', with *\`\`bi\'\'* as the default prefix. Since *\`\`bi\'\'*
is an infinitive prefix, *\`\`jai\'\'* automatically converts in a modal
phrase so the sentence is first. For example,

> *\^:i \|jai !qo -kirka \|ken /qo -sulu \|dri =cana /fi !jo /qma -sao
> !duwi \|zu -tou*
>
> Captain Kirk said to Helmsman Sulu, \`\`Activate warp engines\'\'

Later on, some unique features of *gua\\spi* modal cases are illustrated
in connection with story dialog.

------------------------------------------------------------------------

[Next](pronouns.html)

[Previous](grammar.html)

[Contents](guarefmn.html)
