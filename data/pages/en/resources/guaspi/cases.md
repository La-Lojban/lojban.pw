---
"title": "Cases and Relations"
---



<table width="100%">
  <tbody>
    <tr>
      <td align="center">
        <a href="pronouns.html">
        Next
        </a>
      </td>
      <td align="center">
        <a href="grammar.html">
        Previous
        </a>
      </td>
      <td align="center">
        <a href="guarefmn.html">
        Contents
        </a>
      </td>
    </tr>
  </tbody>
</table>


 

* * *

# Cases and Relations

The next layer of _gua\spi_ syntax is the organizational level, but to understand the reason for some organizations we have to make a detour into semantics to find out about cases. We also get to see some examples of _gua\spi_ sentences. 

At the beginning we will use this sentence for an example: 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i !tara /crw !kseo
        </i>
      </td>
      <td>
        The rat eats the cheese
        (start: rat eat cheese)
      </td>
    </tr>
  </tbody>
</table>




Please pronounce it correctly: <span class="latex">c</span> as English <span class="latex">ch</span> and <span class="latex">i</span> as <span class="latex">ee</span>. Mind the tones, lest you change it into <span class="latex">the eat rats the cheese</span> or some such. Since no dictionary is included with this paper, in examples where it is hard to match up the _gua\spi_ and English words the English translations are augmented with a <span class="latex">pidgin</span> translation using _gua\spi_ word order. The notation <span class="latex">_tara_ -rat</span> in examples means that _<span class="latex">tara</span>_ is the example word, and it means <span class="latex">rat</span> in English. Isolated words or phrases like this are written without a tone because it depends on the context where the word is used. 

## What is a Predicate

Human languages generally distinguish between <span class="latex">things</span> and <span class="latex">actions</span>, where an <span class="latex">action</span> is a relation between <span class="latex">things</span>. The formal term for such a relation is a <span class="latex">predicate</span>. Take for example: 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i !tara /crw !kseo
        </i>
      </td>
      <td>
        The rat eats the cheese
      </td>
    </tr>
  </tbody>
</table>




<span class="latex">_crw_ -eats</span>, called a <span class="latex">predicate word</span>, tells how the rat and the cheese are related and is a symbol for a certain predicate. The predicate is like a function whose arguments are things that might be related; the value of the function is true or false (or fuzzily in between) depending on whether or not they actually are thus related: in this sentence, whether the first actual parameter eats the second. 

The formal parameters of a predicate, regarded as a function, are referred to as <span class="latex">cases</span>. English has <span class="latex">nominative</span> and <span class="latex">accusative</span> cases (the rat occupies the nominative case and the cheese occupies the accusative case), and Latin has in addition <span class="latex">genitive</span>, <span class="latex">vocative</span> and others, but _gua\spi_ simply numbers the cases. Some _gua\spi_ words have as many as five numbered cases. In our example, <span class="latex">_tara_ -rat</span> fills the first case of <span class="latex">_crw_ -eats</span> and <span class="latex">_kseo_ -cheese</span> fills the second. 

The words denoting the actual parameters of a predicate are called <span class="latex">arguments</span>; being sub-phrases, they have their own predicate words. Here, _<span class="latex">!tara</span>_ and _<span class="latex">!kseo</span>_ are the arguments. The <span class="latex">thing</span> represented by an argument, which is the actual parameter of the sentence predicate, is something that can fill the first case of the argument's predicate. It is referred to as the <span class="latex">referent</span> of the argument. For example, 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        -xe -crw !kseo
        </i>
      </td>
      <td>
        The eater of cheese
      </td>
    </tr>
  </tbody>
</table>




is an argument phrase; the first case is left open, and our rat (which we have seen previously in the first case of this relation) is a candidate for the argument's referent. 

Not every first case occupant is a referent of the argument. The rules for forming the referent subset are presented later. 

A predicate might have only one case. Some such words are actions in English, like <span class="latex">_vde_ -alive</span>, but most are things, like <span class="latex">_tara_ -rat</span>. By itself <span class="latex">_tara_ -rat</span> is an argument, and its open first case can be filled by any one of numerous rats. 

In literate English and most other languages a word should not be both a noun and a verb, but in _gua\spi_ any predicate word can play either role depending on cues recognized at the organizational syntax level; the grammar is the same for sentences and arguments. This unification cuts in half the complexity of the language, which is already simple. The term <span class="latex">phrase</span> will be used to mean either a sentence or an argument. 

## What Definitions Mean

A predicate word expresses a relation between the occupants of its cases. In English and all natural languages, words are <span class="latex">defined</span> by a sentence or two; the words in those sentences are often defined circularly in terms of the word being defined. In _gua\spi_ , on the other hand, the text definition is merely a learning aid. The relation is actually defined by a set of all thus-related object lists. For example, the referent set of <span class="latex">eats</span> includes a member with our example rat in first case and our example cheese in second, as well as numerous other members containing rats, foods, and so on ad (almost literally) infinitum. Other predicates (such as <span class="latex">pair</span>) have referent sets that are actually infinite. 

Language users are not expected to be familiar with every object set that was, is now or ever shall be thus related. A big part of language behavior consists of the listener adding to his knowledge of which items are thus related, which information the speaker sends to him. Each person has his own limited experience of the world, but we speak of <span class="latex">the referent set</span> of a word independent of a person because words are supposed to mean the same thing to each person, that is, if a person is aware of a particular referent set member, typically he will agree with other language users which word's definition it is a member of. 

Humans are very good at generalizing from a few referent set members so as to recognize novel referents, and they are not satisfied with a word until they can do such a general recognition algorithm and usually come out with the same answers their neighbors do. But mechanical users of _gua\spi_ cannot be expected to show such skill, and neither can beginning human users such as infants. They must build up a referent set for a word by exhaustively hearing referent set members. If an advanced human, or advanced software, can transcend the official definition of _gua\spi_ words, that's fine --- a common (but risky) strategy for humans will be to use their native language as a guide to _gua\spi_ meanings. However, _gua\spi_ words are still defined officially in terms of referent sets simply because this definition is known to be tractable both for theory and for practical implementation. A _gua\spi_ referent set is perfectly suited to be represented as a Prolog database, if truncated to a practical size. 

## Interpreting Language Behavior

When you speak an argument in a nonsentence you call the listener's attention to its referents. For example, 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i |jiw ^sper -fe -jiol
        </i>
      </td>
      <td>
        A crocodile!
      </td>
    </tr>
  </tbody>
</table>




When you speak a sentence or a subordinate assertion you do the same thing: you call the listener's attention to the members of its referent set. (Thanks to John Parks-Clifford, editor of _The Loglanist_ , for this insight [TL43].) Thus in: 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i |qnu !qo -jan /tara /jun !kseo |zey !ju
        </i>
      </td>
      <td>
        John, the rat is after your cheese!
      </td>
    </tr>
  </tbody>
</table>




your knowledge of the referent set of <span class="latex">_jun_ -hunt</span> includes a member which John will want to append to the ones he knows, before the cheese is stolen. This is the ultimate meaning of the _gua\spi_ sentence. 

# Organization

Now that we have an unambiguous parse tree made up of phrases, what shall we do with it? Modern theories of parsing are very good at describing the transition from input tokens to a parse tree, but they leave the subsequent use of that structure pretty much to ad-hoc patchwork, and _gua\spi_ is no better. However, the uses of the parse tree can be divided profitably into two classes, organization and semantics. Semantics in _gua\spi_ consists mainly of computing and updating referent sets, whereas organization refers to a collection of preparatory transformations including assigning sub-phrases to cases, handling imbedded sentences, replacing pronouns by their bases, and transforming compound words into sub-phrases. 

## Which Words Go in Which Cases

The tones of grammar deliver to the organizational syntax level, for each phrase, an ordered list of attached sub-phrases, which are the arguments of the phrase predicate. For example in _<span class="latex">!tara /crw !kseo</span>_ , <span class="latex">_tara_ -rat</span> and <span class="latex">_kseo_ -cheese</span> are attached to <span class="latex">_crw_ -eats</span> as sub-phrases and therefore are its arguments. In the simplest and most common variation the arguments fill a sentence predicate's cases in order by number, much like English and Chinese, so <span class="latex">_tara_ -rat</span> fills the first case of <span class="latex">_crw_ -eats</span> and <span class="latex">_kseo_ -cheese</span> fills the second. In arguments the first case is left unfilled. This organizational syntax can be so simple because the grammar delivers unambiguous lists of arguments, whereas in English or Latin a combined syntax has to deal with both getting the arguments on the right predicates and getting them into the right cases, and so is a lot more complicated. 

The root phrase is assumed, in the absence of special cue words, to be a sentence; thus its first sub-phrase fills its first case. All sub-phrases are assumed to be arguments with empty first cases, except if they have tones or prefixed cue words that make them subordinate or infinitive clauses. 

Should it be inconvenient to have cases filled in order, _gua\spi_ has ways to change the order. First, certain prefixes signify that the relation word is <span class="latex">converted</span>: a certain case is exchanged with the first and so brought to the front. This is most useful for arguments. For example in _<span class="latex">zu -crw</span>_ the first and second cases are exchanged, and the referent of such an argument would be something occupying the second case of <span class="latex">eats</span> before conversion: the meaning is <span class="latex">food</span>. The second case after conversion would then be the eater: _<span class="latex">zu -crw !xo -tara</span>_ means <span class="latex">rat food</span>. The most common converted meanings have words of their own, such as <span class="latex">_kqu_ -food</span>. Here is a florid example of conversion, in which one word serves for a sentence predicate and five different argument predicates: 

> 

<table>
  <tbody>
    <tr>
      <td>
        0.
      </td>
      <td>
        dou
      </td>
      <td>
        X1 throws X2 to X3 from X4 via X5
      </td>
    </tr>
    <tr>
      <td>
        1.
      </td>
      <td>
        dou
      </td>
      <td>
        Pitcher, projector, launcher
      </td>
    </tr>
    <tr>
      <td>
        2.
      </td>
      <td>
        zu -dou
      </td>
      <td>
        Missile (e.g. a brick or ball)
      </td>
    </tr>
    <tr>
      <td>
        3.
      </td>
      <td>
        za -dou
      </td>
      <td>
        Target
      </td>
    </tr>
    <tr>
      <td>
        4.
      </td>
      <td>
        ze -dou
      </td>
      <td>
        Firing position, pitcher's mound
      </td>
    </tr>
    <tr>
      <td>
        5.
      </td>
      <td>
        zi -dou
      </td>
      <td>
        Route, trajectory, flight path
      </td>
    </tr>
    <tr>
      <td>
        1a.
      </td>
      <td>
        zo -dou
      </td>
      <td>
        Thrower (suppresses any automatic conversion)
      </td>
    </tr>
    <tr>
      <td>
      </td>
    </tr>
  </tbody>
</table>




Definitions show the case numbers as X1, X2, etc. A caselink or a phrase-relative pronoun (described later) that pertains to a particular case finds that case wherever in the argument list it has been moved by conversion. Similarly, if there are several conversions on one predicate (not recommended) the one closest to the predicate has effect first, and the next one exchanges some case, wherever moved, with the new first sequential case. 

Second, an argument can be directed to a specific case by a <span class="latex">caselink</span> prefix. For example, take 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i !qo -jan /fer !se -dowu
        </i>
      </td>
      <td>
        John carries (something) from
        the house.
      </td>
    </tr>
  </tbody>
</table>




_<span class="latex">qo -jan</span>_ is <span class="latex">John</span>; _<span class="latex">qo</span>_ marks a foreign name. _<span class="latex">fer</span>_ = <span class="latex">X1 carries X2 to X3 from X4 via X5</span>. Its arguments are _<span class="latex">qo -jan</span>_ in the first case, but _<span class="latex">se</span>_ links the next argument, <span class="latex">_dowu_ -house</span>, to the fourth case: the start point. The caselink _<span class="latex">se</span>_ attaches to and is one level down from the sentence predicate _<span class="latex">fer</span>_ , hence would have falling tone. The argument predicate _<span class="latex">dowu</span>_ attaches to _<span class="latex">se</span>_ as a compound, and hence has high even tone. Sequential arguments jump over cases filled by caselinks. 

English and many other natural languages use a <span class="latex">subject-verb-object</span> word order with the actor first, but in _gua\spi_ the predicate can occur before, after or among the arguments. A sentence start word, or in sub-phrases some other prefix word at the same level as the predicate, will always occur before all of the arguments and will provide a jump point from which their grammatical levels can be established. 

Since listeners like subject-verb-object order you should use it when possible, but listeners also like to hear complicated phrases at the end of a sentence, and you can achieve this goal by judiciously moving the predicate, by converting it, or by delaying a complicated argument to the end of the sentence and using an explicit caselink word. In English, converting the predicate produces the <span class="latex">passive voice</span>, which has a somewhat different meaning than the standard word order. No such passivity attaches to a converted _gua\spi_ predicate. It is a fact, though, that listeners like the actor to be first when it can be expressed in one or two words, and do not like it to be omitted --- common mistakes when people use the English passive voice. 

It is permitted to say one or more arguments in isolation. This construction is called a <span class="latex">nonsentence</span>. It begins with the usual sentence start word _<span class="latex">:i</span>_ and the arguments, as usual, are one level down, but there just isn't any sentence predicate. 

## Sentences as Arguments --- Infinitives

A _gua\spi_ sentence or argument expresses a relation between specific referents, and this specific referent set member is called an <span class="latex">event</span>. (Frequently the sentence represents several similar events.) It is common for several cases of the predicate to be vacant: in the previous example the thing carried, the destination and the route were not specified. Nonetheless there must have been a thing carried, a destination and a route, and the sentence asserts a relation between all five arguments. The next organizational elements we will look at are linking words that attach sentence predicates (with their arguments). The linked sentences represent lists of specific events with specific argument referents and with all cases filled even if not specified by words. 

Returning to organization, the first sentence link word is _<span class="latex">vo</span>_ , which acts to convert a sentence into a one-argument predicate, referred to as an <span class="latex">infinitive</span>, which means that the occupant of its first case is an instance of the sentence relation. Though _<span class="latex">vo</span>_ can itself be a sentence predicate it is much more commonly used in arguments, like this: 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i !ji /vyu !vo -qia !ji
        </i>
      </td>
      <td>
        I enjoy my bath
      </td>
    </tr>
  </tbody>
</table>




_<span class="latex">vyu</span>_ means <span class="latex">X1 enjoys doing (_vo_) X2</span>, where the second case is some kind of activity --- a natural place to fill with an infinitive. The sentence linked by _<span class="latex">vo</span>_ is _<span class="latex">qia !ji</span>_ = <span class="latex">I bathe</span>, and an instance of that relation, an event, is the referent of the argument _<span class="latex">vo -qia !ji</span>_ = <span class="latex">my bath</span>. 

_<span class="latex">vyu</span>_ includes the prefix _<span class="latex">vo</span>_ on its second case by default, as do all words which commonly have infinitive arguments. Also, such words have various patterns, specified in the dictionary, in which main sentence arguments are replicated into infinitives. The most common is for the argument just before the infinitive to be replicated into the infinitive's first case, if the infinitive has no argument caselinked into the first case with _<span class="latex">so</span>_. Here _<span class="latex">!ji</span>_ is replicated. So you could say 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i !ji /vyu !qia
        </i>
      </td>
      <td>
        I enjoy bathing
      </td>
    </tr>
  </tbody>
</table>




The extensive defaults on structure words, of which the default _vo_ is one of the more common examples, increase the efficiency of _gua\spi_ by letting the speaker not say most structure words. 

## Subordinate Clauses

A subordinate clause, indicated by the linking prefix _<span class="latex">vu</span>_ , is a sentence within a sentence. Its most common use is to restrict a phrase (an argument or a sentence), so that a thing can be a referent of an argument only if it actually fits in the subordinate sentence, or the main sentence represents only events that fit in the subordinate sentence. Subordinate clauses are more common in _gua\spi_ than in English, and also can be complicated, so several special rules are provided to make them simpler: 

  * Because subordinate clauses are so common the tone <span class="latex">|</span> is allocated specifically to them which automatically supplies the linking prefix _<span class="latex">vu</span>_. When this tone does not apply, of course, _<span class="latex">vu</span>_ may be used explicitly. 
  * When the predicate of a subordinate clause has a case for an event, indicated by default _<span class="latex">vo</span>_ or _<span class="latex">bi</span>_ , the predicate is automatically converted to put the event first. 
  * The restricted phrase is automatically replicated in the first case of the clause which, if the previous rule applies, will be the event argument. 



Here is a subordinate clause restricting an argument: 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i !xi -ftu -plyw |xgi /fi -qke
        </i>
      </td>
      <td>
        Green apples are sour
      </td>
    </tr>
    <tr>
      <td>
        <i>
        ^:i -qke !xi -ftu -plyw |xgi
        </i>
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>




Not all apples (_ftu -plyw_) but only those which are green (_xgi_) are described as being sour (_qke_). The restricting sentence is <span class="latex">X1 is green</span>, and argument referents (apples) are automatically plugged into X1. The second version of the sentence is re-ordered to sound better; subordinate clauses usually do better near the end of the sentence. When in English we use adjectives and adverbs, in _gua\spi_ we usually use subordinate clauses like this one. 

Here is a subordinate clause restricting a sentence: 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i !tara /cie -pne !kara ^vu -tum !vden !xgno
        </i>
      </td>
      <td>
        The rat makes a hole in the box with its teeth
        (rat cut-penetrate box using teeth its)
      </td>
    </tr>
  </tbody>
</table>




The restricting sentence is _<span class="latex">!vo -X1 /zu -tum !vden !xdro</span>_ = <span class="latex">[X1 is done] with its teeth as a tool</span>, and the asserted relation _<span class="latex">!tara /cie -pne !kara</span>_ = <span class="latex">The rat penetrates the box</span> is also required to satisfy the subordinate clause. The effect is as if an additional case were added to <span class="latex">_cie_ -cut</span> for the cutting tool. Note that _<span class="latex">tum</span>_ auto-converts so that _<span class="latex">zu</span>_ is not needed in the subordinate clause. 

The additional cases produced by subordinate clauses like this are called <span class="latex">modal cases</span>. They specify tenses, locations, listeners (vocative case), speakers in dialogue, repeated actions, and numerous miscellaneous cases as in the previous sentence. These cases are the <span class="latex">context</span> of a sentence. _Gua\spi_ handles the context in a well-defined manner, whereas other languages handle context informally. As with numbered cases, something must fill every modal case in each event even if no words specify what that thing is. For example, many events are done <span class="latex">by means of</span> something, though rarely do we put words to the instrument. Many predicates in the language can give rise to modal cases. Therefore a predicate potentially can have a near-infinite number of cases. 

_Gua\spi_ has two other clause link words: _<span class="latex">va</span>_ for subordinate assertions and _<span class="latex">vi</span>_ for decorations that show the relation between sentences and the speaker's attitude about a sentence. Their syntax is the same as _<span class="latex">vu</span>_. For example (_go_ being a mood marker for negation), 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i |vi -csn ^tara |va -go -cul !zu -crw /fi -go -crw !kseo
        </i>
      </td>
      <td>
        Strangely, the rat, which was not full of food,  
        didn't eat the cheese
      </td>
    </tr>
    <tr>
      <td>
        <i>
        ^:i |vi -tan /pur -far !tara |zey -ji
        </i>
      </td>
      <td>
        Damn, my rat ran away
      </td>
    </tr>
  </tbody>
</table>




In <span class="latex">_tan_ -annoy</span> of the second sentence, who is annoyed? <span class="latex">_ji_ -me</span> is provided by default in the first case (before conversion) of any subordinate clause or top-level sentence whose first case ends up vacant, like this one. Thus top-level exclamations also become more natural: 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i -fel
        </i>
      </td>
      <td>
        Hooray! (I am happy)
      </td>
    </tr>
  </tbody>
</table>




## Quoted Text

A special argument form is quoted text. A quote is a prefix that transforms the following word or phrase to mean <span class="latex">X1 is an instance of <something> as speech or writing</span>. Here are the quote words, with the <something>s and with examples. The quoted phrases are underlined or in italics. 

> 

<table width="100%">
  <colgroup>
  <col width="8%"/>
  <col width="42%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        bu
        </i>
      </td>
      <td>
      </td>
      <td>
        Word or words with compounding tone (high even, <span class="latex">-</span>)
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        ^:i !xi
        <u>
        -bu -ster
        </u>
        /stu !jai |jir !xi -za -skul
        </i>
      </td>
      <td>
        <em>
        <span class="latex">Shit</span>
        </em>
        is unsuitable to be said at school
      </td>
    </tr>
    <tr>
      <td>
        <i>
        bi
        </i>
      </td>
      <td>
      </td>
      <td>
        Phrase (sentence), with its arguments and clauses
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        ^:i !zglo /kam
        <u>
        !bi !ji /daw -tao !term !ji
        </u>
        </i>
      </td>
      <td>
        He/she cried,
        <em>
        <span class="latex">I want (to be in contact with) my mother</span>
        </em>
      </td>
    </tr>
    <tr>
      <td>
        <i>
        bo
        </i>
      </td>
      <td>
      </td>
      <td>
        Phrase, but which is stated only approximately
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        ^:i !ken /jai
        <u>
        !bo -juy
        </u>
        </i>
      </td>
      <td>
        The boss (captain) says
        <em>
        yes
        </em>
      </td>
    </tr>
    <tr>
      <td>
        <i>
        bn
        </i>
      </td>
      <td>
      </td>
      <td>
        The referent of the next argument, as text
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        ^:i
        <u>
        !bn -jw |zo -stul
        </u>
        /fi -zu -srn !zglo
        </i>
      </td>
      <td>
        <em>
        This letter
        </em>
        (its content) is his response
      </td>
    </tr>
    <tr>
      <td>
        <i>
        be
        </i>
      </td>
      <td>
      </td>
      <td>
        Words, not necessarily
        <i>
        gua\spi
        </i>
        , up to endmark
        <i>
        <span class="latex">ba</span>
        </i>
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        ^:i !qo -kirka |ken /fi -jai
        <u>
        !be C'est la vie ba
        </u>
        </i>
      </td>
      <td>
        Captain Kirk said,
        <em>
        <span class="latex">C'est la vie</span>
        </em>
      </td>
    </tr>
    <tr>
      <td>
        <i>
        br
        </i>
      </td>
      <td>
      </td>
      <td>
        Slash string (see text)
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        ^:i !qo -:amlet /jai
        <u>
        !br xa To be or
        not to be . . . xa
        </u>
        </i>
      </td>
      <td>
        Hamlet said,
        <em>
        <span class="latex">To be or not to be . . .</span>
        </em>
      </td>
    </tr>
  </tbody>
</table>




The last example, the <span class="latex">slash string</span> quote _<span class="latex">br</span>_ , is the same as _<span class="latex">ba</span>_ except that an arbitrary word (_<span class="latex">xa</span>_ in the example) comes before and after the quoted text, in case _<span class="latex">be</span>_ cannot be the endmark because it occurs in the text. _<span class="latex">ba</span>_ and _<span class="latex">br</span>_ are actually interpreted as part of the grammar, as very special cases, while the rest are recognized at the organizational level. 

Story dialog is represented by quoted sub-phrases in English, but in _gua\spi_ the dialog is at the main level and the speaker and listener are identified by a modal case with <span class="latex">_jai_ -say</span>, <span class="latex">_kam_ -cry</span> and related words. These words are defined as <span class="latex">X1 says text (_bi_) X2 to X3</span>, with _<span class="latex">bi</span>_ as the default prefix. Since _<span class="latex">bi</span>_ is an infinitive prefix, _<span class="latex">jai</span>_ automatically converts in a modal phrase so the sentence is first. For example, 

> 

<table width="100%">
  <colgroup>
  <col width="50%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        ^:i |jai !qo -kirka |ken /qo -sulu |dri =cana 
        /fi !jo /qma -sao !duwi |zu -tou
        </i>
      </td>
      <td>
        Captain Kirk said to Helmsman  Sulu, <span class="latex">Activate warp engines</span>
      </td>
    </tr>
  </tbody>
</table>




Later on, some unique features of _gua\spi_ modal cases are illustrated in connection with story dialog. 

* * *



<table width="100%">
  <tbody>
    <tr>
      <td align="center">
        <a href="pronouns.html">
        Next
        </a>
      </td>
      <td align="center">
        <a href="grammar.html">
        Previous
        </a>
      </td>
      <td align="center">
        <a href="guarefmn.html">
        Contents
        </a>
      </td>
    </tr>
  </tbody>
</table>


 
