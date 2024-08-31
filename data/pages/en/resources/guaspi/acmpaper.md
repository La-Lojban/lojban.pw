---
"title": "Gua\\spi , an Artifical Natural Language"
---

# _Gua\spi_ , an Artifical Natural Language 

### James F. Carter

15 September 1991

> Abstract: _Gua\spi_ is an artificial language suited to both humans and machines. It can express real human conversation. Yet the vocabulary and the grammar are two and three orders of magnitude simpler than English. Word and phrase meanings are defined through predicate calculus and hence can be represented and manipulated efficiently and unambiguously by programs (and people). 

_Gua\spi_ is a language artifact. It can do everything that can be done by a natural language like English, though it is wholly artificial. But since it is so much simpler, studies of the phenomenon of language can also be simpler, more conclusive, and less costly in the investigator's time, and software which functions by imitating human language behavior can be written more easily. 

The demonstration that _gua\spi_ is fully functional as a natural language involves a difficult process: the reader must think of some language behavior, it is translated into _gua\spi_ , and the reader then judges whether the translation is adequate, using his or her skill in _gua\spi_ to understand the result. This paper hasn't enough length to be a complete users' guide to _gua\spi_ , but I will present many of the basic concepts so the interested reader can make an independent judgement of whether simple phrases are adequately translated. Then I will give a short sample of live discourse, machine-translated from _gua\spi_ to pseudo-English as an example of the kind of topics that can be represented and how much of the meaning survives mechanistic parsing. I hope the reader may be lead to wonder how various advanced topics are handled in _gua\spi_ and that, on getting more complete information, he or she will find the treatment satisfactory. 

Salient characteristics of _gua\spi_ that particularly suit it to use by humans and artificial intelligences together are: 

  * _Gua\spi_ is simple. The formal syntax is stated in a few lines in the Appendix, compared to thousands of lines for English, and the content words number only about 1400, compared to about half a million for English. Every valid utterance can be parsed in only one way. 
  * _Gua\spi_ is efficient. Words are short, and extensive defaults on articles and modal cases eliminate the majority of structure words. Thus humans find it easy to speak. 
  * _Gua\spi_ is modular. Morphology, grammar, organization, semantics and vocabulary are specified separately and interact to the minimum feasible extent. 
  * _Gua\spi_ is complete. The content words form a basis such that almost any meaning not tied to a specific place or culture, and many which are, can be represented by agglutination. Foreign words and scientific Latin are welcome. 



The language artifact _Loglan_ , developed by James Cooke Brown [L1], was the inspiration for _gua\spi_. Brown realized that a very small set of content words could form a basis of a language, and produced such a set. By successfully writing large amounts of prose in _Loglan_ while creating almost no additional words, I validated his insight. _Loglan_ is almost 100 times simpler than English, and I have simplified the deep structures laid bare in _Loglan_ by almost 100 times more to give _gua\spi_. 

The description of _gua\spi_ that follows is necessarily incomplete. I hope that the reader will be led to wonder how _gua\spi_ handles this or that problem --- and that, on getting more information, he will find that the problem is handled adequately. A fuller description of _gua\spi_ is available, and a dictionary and teaching materials are in preparation [Ga]. 

## Morphology --- What is a Word

The phonemes (sounds) are divided in two classes, C's and V's, or _kona_ and _vumu_ in _gua\spi_. All C's are consonants in English and those English vowels used in _gua\spi_ are all in the V class, hence the names. In addition each word has a tone (_dinu_), a frequency modulation of the V's of each word in the Chinese manner. A word is written as a tone (see Table 3 [Tones]), one or more C's and one or more V's. What could be simpler? 

* * *



<table>
  <tbody>
    <tr>
      <th>
        C/V
      </th>
      <th>
        Length
      </th>
      <th>
        Sound
      </th>
      <th>
        Labial
      </th>
      <th>
        Dental
      </th>
      <th>
        Palatal
      </th>
      <th>
        Velar
      </th>
      <th>
        Glottal
      </th>
    </tr>
    <tr>
      <td>
        C
      </td>
      <td>
        Plosive
      </td>
      <td align="right">
        unvoiced
      </td>
      <td>
        p
      </td>
      <td>
        t
      </td>
      <td>
        c*
      </td>
      <td>
        k
      </td>
      <td>
        ---
      </td>
    </tr>
    <tr>
      <td>
        C
      </td>
      <td>
        Plosive
      </td>
      <td align="right">
        voiced
      </td>
      <td>
        b
      </td>
      <td>
        d
      </td>
      <td>
        j
      </td>
      <td>
        g
      </td>
      <td>
        :*
      </td>
    </tr>
    <tr>
      <td>
        C
      </td>
      <td>
        Spirant
      </td>
      <td align="right">
        unvoiced
      </td>
      <td>
        f
      </td>
      <td>
        s
      </td>
      <td>
        q*
      </td>
      <td>
        ---
      </td>
      <td>
        ---
      </td>
    </tr>
    <tr>
      <td>
        C
      </td>
      <td>
        Spirant
      </td>
      <td align="right">
        voiced
      </td>
      <td>
        v
      </td>
      <td>
        z
      </td>
      <td>
        x*
      </td>
      <td>
        ---
      </td>
      <td>
        #*
      </td>
    </tr>
    <tr>
      <td>
        V
      </td>
      <td align="right" colspan="2">
        Vowels
      </td>
      <td>
        u
      </td>
      <td>
        o
      </td>
      <td>
        y
      </td>
      <td>
        i,e
      </td>
      <td>
        a
      </td>
    </tr>
    <tr>
      <td>
        V
      </td>
      <td align="right" colspan="2">
        Nasal etc.
      </td>
      <td>
        m
      </td>
      <td>
        n
      </td>
      <td>
        l
      </td>
      <td>
        w*
      </td>
      <td>
        r
      </td>
    </tr>
    <tr>
      <td>
      </td>
    </tr>
  </tbody>
</table>


 

> Table 1 [Phonemes]. _Gua\spi_ phonemes, arranged by tongue position front to back (reading across) and sound type (reading down). Letters marked `*' differ from European standard usage. 

* * *

* * *



<table>
  <tbody>
    <tr>
      <td>
        <i>
        Gua\spi
        </i>
      </td>
      <td>
        English
      </td>
      <td>
        Examples of Pronunciation
      </td>
    </tr>
    <tr>
      <td>
        c
      </td>
      <td>
        ch
      </td>
      <td>
        CHew, Ciao (Italian)
      </td>
    </tr>
    <tr>
      <td>
        q
      </td>
      <td>
        sh
      </td>
      <td>
        SHoe
      </td>
    </tr>
    <tr>
      <td>
        x
      </td>
      <td>
        zh
      </td>
      <td>
        aZure, breZHnev (Russian)
      </td>
    </tr>
    <tr>
      <td>
        :
      </td>
      <td>
        (pause)
      </td>
      <td>
        the:apple, hawai:i (glottal stop)
      </td>
    </tr>
    <tr>
      <td>
        #
      </td>
      <td>
        uh
      </td>
      <td>
        thE, Among (schwa)
      </td>
    </tr>
    <tr>
      <td>
        u
      </td>
      <td>
        u, oo
      </td>
      <td>
        flUte, bOOt
      </td>
    </tr>
    <tr>
      <td>
        o
      </td>
      <td>
        o, oa
      </td>
      <td>
        bOne, bOAt
      </td>
    </tr>
    <tr>
      <td>
        y
      </td>
      <td>
        i
      </td>
      <td>
        knIt
      </td>
    </tr>
    <tr>
      <td>
        i
      </td>
      <td>
        i, ee
      </td>
      <td>
        grEEn machIne (not eye)
      </td>
    </tr>
    <tr>
      <td>
        e
      </td>
      <td>
        e
      </td>
      <td>
        bEd
      </td>
    </tr>
    <tr>
      <td>
        a
      </td>
      <td>
        a
      </td>
      <td>
        fAther (not cAt)
      </td>
    </tr>
    <tr>
      <td>
        mnlr
      </td>
      <td>
        mnlr
      </td>
      <td>
        LeMoN RiNd (no silent R)
      </td>
    </tr>
    <tr>
      <td>
        w
      </td>
      <td>
        ng
      </td>
      <td>
        stroNG
      </td>
    </tr>
    <tr>
      <td>
      </td>
    </tr>
  </tbody>
</table>


 

> Table 2 [Pronunciation]. How to pronounce _gua\spi_ phonemes. Nonstandard C's are shown; C's without examples are as in English. Standard radio broadcast accent is close to correct for the V's; Spanish is closer. Pronounce the vowels as one sound, not a glide between two sounds as in eye. 

* * *

Table 1 [Phonemes] shows the phonemes, categorized by tongue position and sound type. Some phonemes are represented confusingly in English, e.g. `sh' which sounds like neither `s' nor `h'. So in _gua\spi_ they are assigned individual letters which differ from English usage --- `q' for `sh'. Table 2 [Pronunciation] gives examples of these, and all the vowels. There is a 1-1 relation between written and spoken _gua\spi_. Written blanks have no sound, and are optional. There is no distinction between upper and lower case. 

All words must begin with a C and end with a V so foreign words must be modified to fit. They appear in _gua\spi_ as possibly several CnVn syllables. A prefix, most commonly _qo_ for a foreign name, signals that the syllables are not to be looked up in the dictionary and are to be kept together when other compound words are split up during organization. 

## Grammar by Tones --- How Words Join 

The grammar is stated in Backus-Naur form in the Appendix. The job of grammar is to stick words together into phrases (_zdua_). _Gua\spi_ grammar produces a strict tree-structure parse for each sentence wherein one phrase is at the root forming the main sentence, and each phrase has an ordered list of zero or more sub-phrases. The grammar does not support meaning of any kind --- no tenses, no possessives, no nouns, no verbs. These ideas are handled at the organizational and semantic levels, using the grammar as a foundation. Like its morphology, the grammar of _gua\spi_ is nearly minimal. 

For grammatical purposes there is only one kind of phrase (though distinctions are made at the organizational level), but words have five categories: the two grammar words _fu_ and _fi_ , sentence start prefixes, other prefixes, and everything else. The main part of a phrase is a sequence of one or more words collectively called the phrase predicate; any prefixes in this must come first. During grammatical analysis there may be several content words in the predicate, though later transformations split up all compound words into separate phrases. After any of the prefixes or after the whole predicate the sub-phrases are interspersed where convenient; they attach to the current phrase at the next higher level. 

Fig. 1 [Parsetree] shows a parse tree for a simple sentence with two levels of sub-phrases. The tones (see Table 3 [tones]) show the level of each word relative to the one before it. 

* * *

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
        ^:i !tara /vme -crw !kseo ^vu -tum !kfor ^fe -fnau
        </i>
      </td>
      <td>
        The rat devours (violently eats) the cheese with a fork and knife
      </td>
    </tr>
  </tbody>
</table>



    
    
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
    
    

> Figure 1 [Parsetree]. A Sample Parse Tree. Each phrase is part of the most recent one at the next higher level. Each phrase may have sub-phrases. Tone symbols (see Table 3 [Tones]) show jumps into and out of sub-phrases; they show the difference in level between adjacent words. 

* * *

The tone, or frequency modulation, of a _gua\spi_ word represents its parse tree level relative to the word just before it. Table 3 [Tones] shows the sounds and interpretations of the tones. The tones are the most terrifying aspect of _gua\spi_ for speakers of European languages. Informal experimentation shows that naive non-Asian listeners can hear the tones reliably. Please remember that over a billion people in China and Southeast Asia speak tonal languages. If they can do it, so can you. 

* * *



<table>
  <tbody>
    <tr>
      <th>
        Number
      </th>
      <th>
        Sound
      </th>
      <th>
        Level
      </th>
      <th>
        Type
      </th>
      <th colspan="2">
        Symbols
      </th>
    </tr>
    <tr>
      <td>
        1
      </td>
      <td>
        High-even
      </td>
      <td>
        Predicate
      </td>
      <td>
        Compound
      </td>
      <td>
        -
      </td>
      <td>
        -
      </td>
    </tr>
    <tr>
      <td>
        2
      </td>
      <td>
        Rising
      </td>
      <td>
        One higher
      </td>
      <td>
        Phrase
      </td>
      <td>
        /
      </td>
      <td>
        /
      </td>
    </tr>
    <tr>
      <td>
        3
      </td>
      <td>
        Down-up
      </td>
      <td>
        One lower
      </td>
      <td>
        Clause
      </td>
      <td>
        |
      </td>
      <td>
        *
      </td>
    </tr>
    <tr>
      <td>
        4
      </td>
      <td>
        Falling
      </td>
      <td>
        One lower
      </td>
      <td>
        Argument
      </td>
      <td>
        \
      </td>
      <td>
        !
      </td>
    </tr>
    <tr>
      <td>
        5
      </td>
      <td>
        Up-down
      </td>
      <td>
        No change
      </td>
      <td>
        Phrase
      </td>
      <td>
        ^
      </td>
      <td>
        @
      </td>
    </tr>
    <tr>
      <td>
        6
      </td>
      <td>
        Low-even
      </td>
      <td>
        Predicate
      </td>
      <td>
        Transitive
      </td>
      <td>
        =
      </td>
      <td>
        %
      </td>
    </tr>
    <tr>
      <td>
      </td>
    </tr>
  </tbody>
</table>


 

> Table 3 [Tones]. Sounds and interpretations of the tones. Level refers to the parse tree level of the word with that tone, relative to the structure before it. Type indicates the organizational type of that word or phrase. The first set of symbols shown, ascii characters, is preferred but the second set can substitute on a manual typewriter. In this paper, `!' is used instead of `\' for convenience in typesetting. 

* * *

Tones `-' and `=' join adjacent words of a compound phrase predicate. Tones `!' and `|' start a sub-phrase of the current phrase. Tone `^' closes the current sub-phrase and starts a new one, part of the same containing phrase. Tone `/' closes a sub-phrase and resumes the predicate of the containing phrase, if among its prefixes, or otherwise starts a new phrase at the higher level. Distinctions within these tone classes are important later but do not affect the grammar. 

A sentence start prefix such as _^:i_ is automatically at root level, and _/fi_ jumps to root level without ending the sentence. Other multi-level upjumps are available with _fu_ but are needed rarely. 

## Cases --- Members of a Relation 

The next layer of _gua\spi_ syntax is the organizational level, but to understand the reason for some organizations we have to make a detour into semantics to find out about cases (_skam_). We also get to see some examples of _gua\spi_ sentences. To minimize vocabulary we will use variations on this one: 

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
        (sentence: rat eat cheese)
      </td>
    </tr>
  </tbody>
</table>




Please pronounce it correctly: `c' as English `ch' and `i' as `ee'. Mind the tones, lest you change it into the eat rats the cheese or some such. (Chinese is worse: you could change mother into horse with a wrong tone. But Chinese people survive nicely.) The notation _tara_ -rat in examples means that _tara_ is the example word, and it means rat in English. Isolated words or phrases like this are written without a tone because it depends on the context where the word is used. 

Natural languages generally distinguish between things and actions, where an action is a relation between things. The formal term for such a relation is a predicate (_gna_). Take for example: 

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




_crw_ -eats, called a predicate word (_qury_), is a symbol for the predicate by which the rat and the cheese are related. The predicate is like a function whose arguments are things that might be related; the value of the function is true or false (or fuzzily in between) depending on whether or not they actually are thus related: in this sentence, whether the first actual parameter eats the second. 

The formal parameters of a predicate, regarded as a function, are referred to as cases. English has nominative and accusative cases (the rat occupies the nominative case and the cheese occupies the accusative case), and Latin has in addition genitive, ablative and others, but _gua\spi_ simply numbers the cases. Some _gua\spi_ words have as many as five numbered cases. In our example, _tara_ -rat fills the first case of _crw_ -eats and _kseo_ -cheese fills the second. Natural languages and -gua!spi have obvious regularities in how particular cases are used, but it is not possible, at least in -gua!spi, to make a universal theory of what cases mean. Users should attend closely to case patterns in related words, but each category must be learned individually. 

The words denoting the actual parameters of a predicate are called arguments; being sub-phrases, they have their own predicate words. Here, _!tara_ and _!kseo_ are the arguments. The thing represented by an argument, which is the actual parameter of the sentence predicate, is something that can fill the first case of the argument's predicate. It is referred to as the referent of the argument. For example, 

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
        crw !kseo
        </i>
      </td>
      <td>
        Eater of cheese
      </td>
    </tr>
  </tbody>
</table>




is an argument phrase; the first case is left open, and our rat (which we have seen previously in the first case of this relation) is a candidate for the argument's referent. Not every first case occupant is a referent of the argument. The rules for forming the referent subset are presented later. 

While English partially segregates nouns and verbs, _gua\spi_ uses the same predicate words (_qury_) in both argument and sentence phrases. 

### What Definitions Mean

In a dictionary words are defined in one or two sentences, but for _gua\spi_ these sentences are considered to be merely a learning aid. The effective definition is a set of lists of thus-related referents. For example, the referent set of eats includes a member list with our example rat in first case and our example cheese in second, as well as numerous other members containing other rats, foods, and so on ad (almost literally) infinitum. Other predicates like _cu_ -pair have referent sets that are actually infinite. 

Language users are not expected to be familiar with every object list that was, is now or ever shall be thus related. A big part of language behavior consists of the listener adding to his knowledge of which items are thus related, which information the speaker sends to him or her. Each person has his own limited experience of the world, but we speak of the referent set of a word independent of a person because words are supposed to mean the same thing to each person, and language users really do agree on meanings most of the time. 

Humans are very good at generalizing from a few referent set members so as to recognize novel referents, and they are not satisfied with a word until they can do such a general recognition algorithm and usually come out with the same answers their neighbors do. But mechanical users of _gua\spi_ cannot be expected to show such skill, and neither can beginning human users such as infants. They must build up a referent set for a word by exhaustively hearing referent set members. If an advanced human, or advanced software, can transcend the official definition of _gua\spi_ words, that's fine --- a common (but risky) strategy for humans will be to use their native language as a guide to _gua\spi_ meanings. However, _gua\spi_ words are still defined officially in terms of referent sets simply because this definition is known to be tractable both for theory and for practical implementation. A _gua\spi_ referent set is perfectly suited to be represented as a Prolog database, if truncated to a practical size. 

### The Interpretation of Language Behavior 

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
        ^:i |va -jiw /vn -sper -jiol
        </i>
      </td>
      <td>
        Hey, a crocodile!
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




your knowledge of the referent set of _jun_ -hunt includes a member which John will want to append to the ones he knows, before the cheese is stolen. This is the ultimate meaning of the _gua\spi_ sentence. 

## The Organizational Syntax Level

Now that we have an unambiguous parse tree made up of phrases, what shall we do with it? Modern theories of parsing are very good at describing the transition from input tokens to a parse tree, but they leave the subsequent use of that structure pretty much to ad-hoc patchwork, and _gua\spi_ is no better. However, the use of the parse tree can be divided profitably into two phases, organization and semantics. Semantics in _gua\spi_ consists mainly of computing and updating referent sets, whereas organization refers to a collection of preparatory transformations including assigning sub-phrases to cases, handling imbedded sentences, replacing pronouns by their antecedents, and transforming compound words into sub-phrases. One way to look at the organizational level is that these surface structures of -gua!spi are transformed into a single deep structure, the predicate with its arguments, which is a uniform and simple interface into the semantic level. 

### Which Words Go in Which Cases 

The tones of grammar deliver to the organizational syntax level, for each phrase, an ordered list of attached sub-phrases, which are the arguments of the phrase predicate. For example in _!tara /crw !kseo_ , _tara_ -rat and _kseo_ -cheese are attached to _crw_ -eats as sub-phrases and therefore are its arguments. In the simplest and most common variation the arguments fill a sentence predicate's cases in order by number, much like English and Chinese, so _tara_ -rat fills the first case of _crw_ -eats and _kseo_ -cheese fills the second. In arguments the first case is skipped over, being filled by an invisible placeholder for the referent. This organizational syntax can be so simple because the grammar delivers unambiguous lists of arguments, whereas in English or Latin a combined syntax has to deal with both getting the arguments on the right predicates and getting them into the right cases, and so is a lot more complicated. 

The root phrase is assumed, in the absence of special cue words like _vn_ , to be a sentence; thus its first sub-phrase fills its first case. All sub-phrases are assumed to be arguments with empty first cases, except if they have tones or prefixed cue words that make them subordinate or infinitive clauses. 

Should it be inconvenient to have cases filled in order, _gua\spi_ has ways to change the order. First, certain prefixes signify that the relation word is converted: one case is moved in front of the others. This is most useful for arguments, and lets one _gua\spi_ word do the job of as many as five English words. For example in _zu -crw_ the second case comes first, and the referent of such an argument would be something occupying the second case of eats before conversion: the meaning is food. The original first case, the eater, comes afterward: _zu -crw !xo -tara_ means rat food. The English passive voice is a conversion in a sentence. 

Second, an argument can be directed to a specific case by a caselink prefix analogous to the case endings of Latin. For example, take 

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
        ^:i !tara /fer !se -dowu
        </i>
      </td>
      <td>
        The rat carries (something) from
        the house
      </td>
    </tr>
  </tbody>
</table>




_fer_ means X1 carries X2 to X3 from X4 via X5. Its arguments are _!tara_ in the first case, but _se_ links the next argument, _dowu_ -house, to the fourth case: the start point. 

A predicate word can act as a caselink too, linking a modal case by means of an imbedded sentence. Such sentences are covered in the next two sections. 

The motion words have complicated definitions, so all the definitions have been made similar: ``X1 (moves) to X2 from X3 via X4'' or X1 makes X2 (move) to X3 from X4 via X5. Many other word categories have uniform definitions too. 

### Sentences as Arguments --- Infinitives 

A _gua\spi_ sentence or argument expresses a relation between specific referents, and this specific referent set member is called an event. (Frequently the sentence represents several similar events.) It is common for several cases of the predicate to be vacant: in the previous example the thing carried, the destination and the route were not specified. Nonetheless there must have been a thing carried, a destination and a route, and the sentence asserts a relation between all five arguments. The next organizational elements we will look at are linking words that attach sentence predicates (with their arguments). The linked sentences represent lists of specific events with specific argument referents and with all cases filled even if not specified by words. 

Returning to organization, the first sentence link word is _vo_ , which acts to change a sentence into a one-argument predicate, referred to as an infinitive, which means that the occupant of its first case is an instance of the sentence relation. Though the infinitive can itself be a sentence predicate it is much more commonly used in arguments, like this: 

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
        ^:i !tara /vyu !vo -crw !tara
        </i>
      </td>
      <td>
        The rat likes for the rat to eat
      </td>
    </tr>
  </tbody>
</table>




_vyu_ means X1 enjoys doing (_vo_) X2, where the second case is some kind of activity --- a natural place to fill with an infinitive. The sentence linked by _vo_ is _!tara /crw_ = the rat eats, and an instance of that relation, an event, is the referent of the argument _vo -crw !tara_. (The argument _!tara_ may come before or after the sentence predicate _crw_ , wherever convenient.) 

_vyu_ includes the prefix _vo_ on its second case by default, as do all words which commonly have infinitive arguments. Also, there are various patterns in which main sentence arguments are replicated into infinitives, and by far the most common is for the argument just before the infinitive to be replicated, if the infinitive has none --- _!tara_ here. So you could just say 

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
        ^:i !tara /vyu !crw
        </i>
      </td>
      <td>
        The rat likes to eat
      </td>
    </tr>
  </tbody>
</table>




### Subordinate Clauses 

A subordinate clause is a sentence within a sentence. Its predicate relates one (or more) of its internal arguments to the phrase it modifies; the internal argument is called a modal case of the modified phrase. A subordinate clause can specify a tense, location, possession (genitive case), listener (vocative case), speaker in dialogue, gender, plural number, repeated action, and numerous miscellaneous cases as in the examples below. Its purpose is signalled by a linking word: 

_ve_
     A supplementary comment, giving additional information about the modified phrase, typically adding a modal case. 
_vu_
     A restrictive clause, which events of the modified phrase must satisfy, or they are thrown out of the referent set. 
_vi_
     A discursive comment, a helpful assertion by the speaker of the relation between the modified phrase and the previous sentence. 
_va_
     A supplementary assertion often stating the speaker's relation to the modified phrase. 

Subordinate clauses are more common in _gua\spi_ than in English, and also can be complicated, so two special rules are provided to make them simpler: 

  * Because subordinate clauses are so common the tone `|' is allocated specifically to them which automatically supplies the linking prefix _ve_. When this tone does not apply, of course, _ve_ may be used explicitly. `|' is used commonly with the other linking words too. 
  * The restricted phrase is automatically replicated via a placeholder pronoun into whichever case of the subordinate clause is intended for an event, indicated by default _vo_ or _bi_ , or the first case if no event is expected or if the event case is occupied. 



Here is a subordinate clause restricting an argument, illustrating _vu_ : 

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
        ^:i !tara /crw !xi -kseo |vu -xel
        </i>
      </td>
      <td>
        The rat eats smelly cheese
      </td>
    </tr>
  </tbody>
</table>




Not all cheeses but only those which smell (_|xel_) are eaten by the rat. The restricting sentence is X1 smells like X2, and argument referents (cheeses) are automatically brought into X1 through the placeholder. When in English we use adjectives and adverbs, in _gua\spi_ we usually use subordinate clauses like this one. Here are examples of the other subordinate linking words: 

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
        ^:i !tara /crw !kseo ^ve -tum !vden !xgno
        </i>
      </td>
      <td>
        The rat eats the cheese with its teeth
      </td>
    </tr>
  </tbody>
</table>




This subordinate clause adds a modal case. The clause is _!vden !xdro !fu -tum !vo (event)_ = its teeth are the tool for doing (event), and the asserted relation _!tara /crw !kseo_ = The rat eats the cheese also satisfies this sub-sentence. Because of the clause we know that the rat does not gum the cheese. The effect is as if an additional case were added to _crw_ -eat for the cutting tool. 

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
        ^:i |vi -bwy ^tara |va -cul !zu -crw /fi -go -crw !kseo
        </i>
      </td>
      <td>
        But the rat, which was full of food, didn't eat the cheese
      </td>
    </tr>
  </tbody>
</table>




_|vi -bwy_ appears to have no modal argument, but for this discursive category a pronoun is provided by default to represent the previous sentence. Thus the subordinate clause says ``this sentence differs from the previous one''. The other clause beginning with _va_ is a subordinate assertion, which is similar to a main sentence, but the reader can understand it better when it is imbedded. 

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
        ^:i |va -tan /pur -far !tara |zey !ji
        </i>
      </td>
      <td>
        Damn, my rat ran away
      </td>
    </tr>
  </tbody>
</table>




In _tan_ -annoy who is annoyed? _ji_ -me is provided by default in the first case (after conversion) of supplementary assertions, main phrases and infinitives that otherwise lack one (provided certain conditions are met). Forceful or emotional speech seems more free and expressive with this feature. The other clause _|zey !ji_ is a possessive phrase; most languages have special grammar just for possessives, but _gua\spi_ uses the general clause mechanism. 

### Pronouns Represent Words, Not Things 

The next organizational issue is the pronoun. English pronouns have referents just like any other argument. But _gua\spi_ pronouns represent words, not the referent of words. In computer terms, they are like functions that are expanded in-line rather than being called. The represented words are called the antecedent of the pronoun, and the sentence is analysed as if each pronoun were taken out and replaced by its antecedent. The antecedents, not the pronouns, have referents. In this way the organizational syntax level can be kept free of meaning, and the semantic level has to deal with only one class of words, predicates. 

For example, a document typically will have a signature line saying in effect this text is the output of Jim Carter. (Spoken discourse is analogous though identification is by sight or voice tone.) Then when there appears the pronoun _ji_ (me in English) the effect is as if the words Jim Carter had been written in its place. That is, A rat ate my cheese and A rat ate Jim Carter's cheese mean exactly the same thing. 

As illustrated below, various kinds of context are carried into a phrase by a pronoun-like mechanism. When an antecedent is replicated to replace a pronoun the context is replicated with it, so the antecedent will have the same referent in both places despite intervening context changes. And when the antecedent is copied any pronouns originally in it have already been replaced by their own antecedents. 

_Gua\spi_ includes question pronouns, phrase-relative pronouns, names and modal pronouns. For question pronouns the listener is supposed to say the antecedent; in other words, the speaker provides a sentence and the listener is to fill in the blanks. There are question pronouns corresponding to English who, how, how many, which and isn't it. 

Phrase-relative pronouns are for copying neighboring phrases --- arguments or entire sentences. One of the more common phrase-relative pronouns is _vgry_ , the whole phrase that the current listener last said, which typically is the question the speaker is filling blanks in. 

In _gua\spi_ a name is a pronoun. A name consists of a predicate prefixed by _qu_ , or _qo_ for foreign names, which disconnects the usual meaning of the predicate and substitutes the pronoun behavior. People are assigned permanent names at birth through a performative (ritual) statement like this: 

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
        ^:i !qo -ben /ga -zu-xim !jw |cil
        </i>
      </td>
      <td>
        Ben is (declared to be) the name of this child
      </td>
    </tr>
  </tbody>
</table>




From then on, _!jw |cil_ (this child, with context so the listeners remember which one) is the antecedent of the name _qo -ben_. 

The six variables _da, de, di, do, du, dy_ are names which you can assign to important concepts in nonfiction or characters in fiction. In mathematics it is also common to use letter words as pronouns for mathematical expressions. 

Modal pronouns are like _ji_ -me and _jn_ -now. A modal pronoun's antecedent is set by a modal phrase with a special prefix, saying to save the modal phrase on a kind of stack, separate for each modal predicate, from which it can be retrieved. The previous antecedent can be replaced, but of more interest, it can be saved and later restored. 

The modal stack is used for more than modal pronouns, though. For each kind of modal case, e.g. tense or speaker, every sentence that lacks a modal phrase for that case gets the stacked phrase automatically. Here is an example of stacked speaker cases, in story dialog: 

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
        ^:i |qe -jai !qo -kira /py /zu-zni !cyr -far !ju
        </i>
      </td>
      <td>
        Says Kira,
        <span class="latex">
        Why do you flee?
        </span>
        (default saved, set)
      </td>
    </tr>
    <tr>
      <td>
        <i>
        ^:i -po -sfa -daw -can -siw -dan !ju
        </i>
      </td>
      <td>
        <span class="latex">
        Don't you want to be rescued?
        </span>
        (default inserted automatically)
      </td>
    </tr>
    <tr>
      <td>
        <i>
        ^:i |va -pli ^vi -zu -gre ^jo /kuo !ji
        </i>
      </td>
      <td>
        <span class="latex">
        Please, at least talk to me!
        </span>
        (default inserted automatically)
      </td>
    </tr>
    <tr>
      <td>
        <i>
        ^:i |qa -jai ^qo -kira /jun !suy
        </i>
      </td>
      <td>
        Kira pursues the swimmer.  (prior default = narrator)
      </td>
    </tr>
  </tbody>
</table>




Kira said the first three sentences. In the first, _|qe_ indicates that the current speaker, the narrator, should be saved while Kira speaks. The words _|jai !qo -kira_ are added to the second and third sentences automatically. Finally, _qa_ restores the narrator as speaker and his modal phrase is put on automatically. 

Tenses are handled the same way. If you put _|qe -cnu !X_ on the opening descriptive sentence (where X is an event identifying when the sentence happens) then it will be propagated to subsequent sentences automatically --- unlike in English where a syntactically complicated and less precise tense has to be used on every sentence. John Parks-Clifford, then with the Loglan Institute, originally developed this concept of tense defaults [TL43]. 

### Compound Predicates 

A key organizational element of _gua\spi_ is the compound predicate, a sequence of words heading a phrase. The motivation to make compounds is threefold. First, you can use a single argument list to say what amounts to two sentences, which when compounded are much easier for the listener to interpret. Second, just as we use Latin prefixes in English to make many words from one, e.g. ob-ject, pro-ject, in-ject, ab-ject, most meanings in _gua\spi_ are achieved by combining a much broader range of predicates. A beginner can learn the primitive words (_qury_), about 1400, and then stick them together in self-created compounds which he can expect any listener to understand, while to achieve the same range of expression in natural languages the speaker and the listener must master a huge vocabulary in which most of the words are rarely used. Third, the compound words are deconstructed into phrases headed by one _qury_ word each, and semantically processing these phrases is much easier than in natural languages because there are so few _qury_ that must be kept track of. 

There are three main patterns to the compounds. First, if the main word has a case with a default linker of _vo_ or _bi_ \--- that is, a case for an infinitive --- a word compounded with high even tone `-' is the predicate of that infinitive, and the main word case before the infinitive (before conversion) becomes the infinitive's first case. (Exceptions are noted in the dictionary.) 

> 

<table width="100%">
  <colgroup>
  <col width="12%"/>
  <col width="12%"/>
  <col width="26%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td colspan="3">
        <i>
        ^:i !qo -kira /can -xna !fyni
        </i>
      </td>
      <td>
        Kira takes hold of the oar
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        can
        </i>
      </td>
      <td colspan="2">
        X1 changes so (
        <i>
        vo
        </i>
        ) X2 becomes true
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        xna
        </i>
      </td>
      <td colspan="2">
        X1 holds X2 with (body part) X3
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td colspan="2">
        <i>
        !qo -kira /xna !fyni
        </i>
      </td>
      <td>
        Kira holds the oar (X2 of
        <i>
        /can
        </i>
        )
      </td>
    </tr>
  </tbody>
</table>




Second, the words may share an argument list. The effect is as if you had made two sentences with the arguments copied into each. This pattern is cued by tone `-' when the infinitive argument pattern does not apply, or by a conjunction _-fe_ when it does. 

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
        ^:i !do /suy -pne -qmy !kqua
        </i>
      </td>
      <td>
        It swims down through the water
      </td>
    </tr>
    <tr>
      <td>
        <i>
        !do /suy !kqua + !do /pne !kqua + !do /qmy !kqua
        </i>
      </td>
      <td>
        It swims to water; it penetrates that water; it is above that water.
      </td>
    </tr>
  </tbody>
</table>




A third pattern is found in which a transitive main word is followed by its object as a compound. It is cued by the tone `='. 

> 

<table width="100%">
  <colgroup>
  <col width="12%"/>
  <col width="38%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td colspan="2">
        <i>
        ^:i -spo !bri =kqua |bir ^dri =fli
        </i>
      </td>
      <td>
        Maybe the pilot already drowned
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        bri
        </i>
      </td>
      <td>
        X1 breathes X2
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        kqua
        </i>
      </td>
      <td>
        X1 is a serving/portion of water
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        bri =kqua
        </i>
      </td>
      <td>
        X1 drowns
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        dri
        </i>
      </td>
      <td>
        X1 drives X2 to X3 . . . (transitive motion word)
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        fli
        </i>
      </td>
      <td>
        X1 flies to X2 . . . (motion word)
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        dri =fli
        </i>
      </td>
      <td>
        X1 pilots the flyer (airplane) to X2 . . .
      </td>
    </tr>
  </tbody>
</table>




Though humans like to think of compound predicates as separate words analogous to the primitive words, compounds are actually defined through these transformations, so that each primitive word heads a separate phrase. For example in the third type of compound the compounded object is to be taken off and put in its proper case as a sub-phrase. Thus one can easily and reliably interpret a compound word that one has never heard before, as long as one knows all the primitive words. 

That is how _gua\spi_ is organized. Let us now turn to the semantics of arguments. 

## Argument Semantics --- Referent Sets 

As stated earlier, a predicate word expresses a relation between the occupants of its cases, and is defined by a referent set consisting of lists of case occupants that are thus related. 

To interpret an argument, you start with its predicate's referent set. You retain members consistent with any sub-phrases. From each member you extract the first case occupant (after conversion), and out of these you make the full referent set of the argument. The referent subset, which is the set of actual referents of the argument, is a subset of the full set which depends on a prefix word called an article (_tirl_). (More modern terminology might be determiner.) 

The most common article is _xe_ , and it is assumed with most predicates when arguments lack an article. Its English translation is the. The referent subset is whichever members the speaker has in mind to talk about, but generally there are prior context cues to show which out of numerous possibilities are intended as the referents. In particular, if a set of referents has been designated before and if it is the only such set that is a subset of the full referent set of the argument, then those are the referents of the argument. For example, 

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
        ^:i !xo -fkar |xda ^vu -xge /fi -can -tai !qel =fkar
        </i>
      </td>
      <td>
        An old, black car emerged from its garage.
      </td>
    </tr>
    <tr>
      <td>
        <i>
        ^:i !fkar /cyr -vle
        </i>
      </td>
      <td>
        The car turned left.
      </td>
    </tr>
  </tbody>
</table>




_fkar_ -car appears three times. The first instance designates one referent in detail using _xo_ , described below. The other two instances are typical arguments with _xe_ -the, but the article is unseen, being provided by default. Since the prior referent fits this predicate (and in the second sentence its garage does not), the prior referent is being redesignated. Because _gua\spi_ words are so short it is just as efficient to redesignate an argument like this as to use a phrase-relative pronoun, so pronouns are less commonly used in _gua\spi_ than in English. 

There are also articles that select the entire referent set, typical members of it, and no members of it (actually making a negative statement about all members). Another important article is _xo_ : From the full referent set one or more members are selected, and it doesn't matter which ones. For example, 

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
        ^:i |vi -pli ^jo ^sa -ji /gey !xo -kliw
        </i>
      </td>
      <td>
        Please give me some nails
      </td>
    </tr>
  </tbody>
</table>




All in the box are equivalent and it doesn't matter which you get. _xo_ is often used for arguments in the ``serving or portion'' category, called partitive nouns in English. 

There are two articles for each meaning; the first unfolds the referent subset so each member is a referent, while the second specifies that the referent is the referent subset as a set. The careful distinction between sets and extensions of their members is characteristic of _gua\spi_. 

Most Indo-European languages distinguish between genders and numbers of arguments. Like Chinese and English, _gua\spi_ has no gender, though you may use a subordinate clause like _|fmy_ -female. Number comes from the referent sets, not the grammar. You may specify the exact number of referents with a numeric predicate, like this: 

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
        ^:i |vi -pli ^jo ^sa -ji /gey !xo -beol |fmy ^vu -zu -cu
        </i>
      </td>
      <td>
        Please give me two nuts (female screws)
      </td>
    </tr>
  </tbody>
</table>




## Vocabulary 

A great deal of the machinery of language, which in natural languages is shared between the grammar and the vocabulary, is handled in _gua\spi_ purely by words. Here is a discussion of how the words were created, and four samples from a long list of models of how to say things. Frequently I have thought that some form or meaning required a new primitive word, or even a change in the grammar, but it has turned out that existing words were more than adequate if creatively used. 

### Word Creation 

The words of natural languages appear to be arbitrary symbol strings of tremendous variety of sound. _Gua\spi_ is similar in that its words were generated by a partially random process. However, the words were made to resemble natural language words so they would sound more pleasing and so occasional cognate relations might aid learning. To begin, the word lists of _Loglan_ [L4] and _Lojban_ [Lja] were merged and some additional words were added. An English, Chinese and Latin translation was determined for almost all words. (Latinoid English words were avoided.) Both _Loglan_ and _Lojban_ use many more natural languages as word creation fodder. 

Then experimental phonetic data [NB2] was used to assess candidate words for the accuracy with which speakers could distinguish them. For each _gua\spi_ meaning, randomly generated word candidates were evaluated for recognizability, for distance from other _gua\spi_ words, and also for similarity to their natural language equivalents. The final assignments were determined through a process of numerical annealing so as to maximize the summed quality scores. 

CV structure words were assigned by hand; related structure words, like articles, have the same C and varying V's. Structure words pertaining to numbered cases have the same V's as the corresponding digits, but contrasting consonants, making learning easier. 

A question often asked is, why create new words? Why not use Chinese or English words? First, some attempt has been made to keep _gua\spi_ culturally neutral, and if Chinese words were used it would intimidate English speakers and vice versa. More important, Chinese words are designed for use with Chinese. Many required meanings, like articles, simply do not exist in Chinese, and those meanings that are present are only approximations of the _gua\spi_ meanings. That is why the approach was rejected of simply stealing natural language vocabulary. 

How adequate is the word list? Can every required meaning be expressed by infinitive, parallel and transitive compounds? Only extensive literature in _gua\spi_ by a variety of authors can demonstrate adequacy. However, I have written about 20,000 words of prose and fiction in _Loglan_ , and I am satisfied with the coverage of the _Loglan_ word list, especially with the _Lojban_ additions and with my own. Some people are interested to discover just how few basis words we can get by with. While I do not believe that the _Lojban_ word list is minimal, I think it is fairly close. Thus I chose to use existing word lists for _gua\spi_ rather than to try for radical pruning or _de novo_ creation. 

### Modal Cases 

Here are examples of a few modal cases. However, virtually any word can be construed as a modal operator. Be alert for creative opportunities for expression. 

> 

<table width="100%">
  <colgroup>
  <col width="7%"/>
  <col width="43%"/>
  <col width="50%"/>
  </colgroup>
  <tbody>
    <tr>
      <td>
        <i>
        bir
        </i>
      </td>
      <td>
      </td>
      <td>
        Past tense
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        ^:i !ji /crw !kseo
        <u>
        ^vu -bir
        </u>
        !jun -vnl !tara
        </i>
      </td>
      <td>
        I ate the cheese
        <em>
        before
        </em>
        the rat came hunting
      </td>
    </tr>
    <tr>
      <td>
        <i>
        zey
        </i>
      </td>
      <td>
      </td>
      <td>
        Genitive or possessive case: a relation of pertinence
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        -fkar
        <u>
        |zey
        </u>
        !ji
        </i>
      </td>
      <td>
        <em>
        My
        </em>
        car (which I lease and which my brother is now driving)
      </td>
    </tr>
    <tr>
      <td>
        <i>
        jai
        </i>
      </td>
      <td>
      </td>
      <td>
        The speaker
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        ^:i
        <u>
        |jai
        </u>
        !qo -kira /ju /dwu -csn -zu -jeu
        </i>
      </td>
      <td>
        <em>
        Said
        </em>
        Kira,
        <span class="latex">
        You're a monster
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <i>
        plm
        </i>
      </td>
      <td>
      </td>
      <td>
        Such as: an example
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <i>
        -xy -pso |psi
        <u>
        ^vu -plm
        </u>
        !xy -kai |kei
        </i>
      </td>
      <td>
        Bad people
        <em>
        such as
        </em>
        thieves
      </td>
    </tr>
  </tbody>
</table>




### Varieties of Negation 

In _gua\spi_ negation is not a unitary concept; beside the obvious antonyms there are nine or ten ways to express negative meanings, most of which involve compound words. Here are a few examples. 

_^:i _-go_ !ji /kio !tara |zey !ju_
     I _don't_ have your rat. _go_ is a mood prefix which means that the asserted sentence is counter to fact. 
_^:i !jw |kseo /fi _-gl_ -zao_
     This cheese is flavor _less_. Some dimensions like _zao_ -flavor are quantifiable (more or less) but unsigned, so their degree ranges from zero to larger values. Others like _gal_ -high are signed. In either case _gl_ modifies a predicate so that its degree is zero or negligible. 
_^:i !jw |kseo /fi _-gr_ -ksi_
     This cheese is _not_ fresh. When the dimension ranges from positive to negative values, _gr_ interchanges positive and negative. For extremes of unfreshness one can use _fpu_ -rotten. 
_^:i !jw |kseo /fi _-vry_ -can -psl_
     This cheese is _de_ solidifying. _vry_ -reverse indicates that the process in its X2 case is occuring in the reverse of the usual order. 

### Causal Connectives

The root structure of syntax is a discourse, or sequence of sentences. But the sentences need not stand alone; they may be connected by predicates, like this: 

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
        ^:i -dae !kara ^:o
        <u>
        -bal
        </u>
        !crw |jro ^tara ^kseo
        </i>
      </td>
      <td>
        If the box is open
        <em>
        then maybe
        </em>
        the rat will eat the cheese.
      </td>
    </tr>
  </tbody>
</table>




The speaker may connect sentences with any useful word having suitable cases, such as _kau_ -cause, _kmo_ -motivate or _sny_ -imply. Like all _gua\spi_ words, the causal connectives can also be useful as arguments and as modal caselinks. In this example _^:o_ is a retroactive downjump, a special case in organization. A sentence start word, it transforms itself into a pronoun for the previous sentence, which goes into the first case of the following main word, the causal connective in these examples. Human speakers prefer infix causal connectives with a retroactive downjump rather than the obvious form with two explicit infinitives. 

### Mathematical Expressions

Any discussion sooner or later involves quantitative statements with units of measure. Therefore _gua\spi_ has quite an extensive facility for mathematical expressions, even if the more complicated possibilities are rarely used by non-scientists. First, _gua\spi_ syntax matches perfectly the definition of a number as an equivalence class of equal-count sets. This concept can be generalized to various extension rings and fields. 

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
        !xu -cu -cw -ci
        </i>
      </td>
      <td>
        The number 2.5 (the class of all sets of
        <span class="latex">
        count
        </span>
        2.5)
      </td>
    </tr>
  </tbody>
</table>




Mathematical functions are defined with such classes as formal parameters, and hence have _xu_ on parameter cases by default --- _xu_ means the entire referent set of an argument, as a set (or class). The first case of a function is its value, and the function is defined as ``X1 is in the equivalence class that comes from doing (function) on (_xu_) X2'', possibly with several parameters. For example, 

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
        ^:i !xa -ca /plw !co ^cu
        </i>
      </td>
      <td>
        3 is the sum of 1 and 2 (every triplet
        is in the equivalence class of 1+2)
      </td>
    </tr>
  </tbody>
</table>




Specifically, units of measure are defined to multiply a number or other expression by the unit. The resulting equivalence class is considered to contain _gua\spi_ events whose degree or measure are that big; hence the unit expression takes the form of a subordinate clause, and the main sentence predicate tells what dimension is being measured. For example, 

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
        ^:i !ji /vga |kyam !ku -cy
        </i>
      </td>
      <td>
        I weigh 70 kilos (I heavy kilo 7 0)
      </td>
    </tr>
  </tbody>
</table>




## Sample Text 

Here is a short passage from a story I am currently translating from _Loglan_ to _gua\spi_. If a second human knew _gua\spi_ I would have him or her translate it to English, but so far my only colleague is mechanical. Its purpose is to check syntax and organization, and its English is only good enough to substitute for a full parse tree printout. For example, it can't tell an infinitive from a gerund, and it is overly free with possessives. Nonetheless you can get an idea how much meaning a mechanical translator can recover from the text. 

Brackets `[ ]' surround sentence-type phrases; angle brackets `<>' mark subordinate clauses; backslashes `\\\' repeat the predicate of the phrase a subordinate clause restricts; parentheses `()' enclose the antecedent of any other pronoun; and when a word's meaning as an argument differs from its root meaning, the root comes afterward in slashes `//'. Subscripts give the case number of each argument. 

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
        ^:a |vi-gza ^vu-qe-kam !sa-cil 
        ^qu -jaiw=tiri |va-ga-xim !do /fi-jiw !su-cana-fer ^vi-gau
        </i>
      </td>
      <td>
        ¶ Tigereye cries to the children, the barge, look out!
      </td>
    </tr>
  </tbody>
</table>




[then the boat1 and2 carry2 surprise < paragraph \surprise1\> < speaker/cry/ tiger's2 eye1 < performative name \eye1\ variable b2> \surprise2\> < listener/warn/ you2 (child) \surprise2\> < time/present/ (something2) \surprise1\>]

Carry-boat is used for barge. _qe_ sets the speaker and listener modal case antecedents. However, _gau_ -warn supercedes _kam_ -cry as the predicate bearing the listener. _do_ -variable~b is assigned to represent Tigereye. Words for document structure like _gza_ -paragraph fit naturally into the text, written or spoken. 

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
        ^:i |faw ^jo /suy !jr
        </i>
      </td>
      <td>
        Swim over here!
      </td>
    </tr>
  </tbody>
</table>




[imperative1 (child) swim place2 (something) < listener/emphatic/ you3\,(child) \swim2\> < speaker/emphatic/ I1 (eye) \swim2\> < time/present/ (something2) \swim1\>]

_jo_ instead of _ju_ -you makes the sentence imperative. _faw_ -emphatic has a default _ji_ -me in the case for its speaker and _ju_ -you in the case for its listener, thus superceding the default _kam_ otherwise imported from the first sentence. 

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
        ^:i |qi-qnu !qo-qosefo /ve-faw ^jo /qma -duw !gunu !ju
        </i>
      </td>
      <td>
        Josepho, move your ass!
      </td>
    </tr>
  </tbody>
</table>




[imperative1 (qo se fo) make to2 [your2 (qo se fo's) buttock1 move] < listener/emphatic/ you3 (qo se fo) \make2\> < speaker/emphatic/ I1 (eye) \make2\> < time/present/ (something2) \make1\>]

Only a few words like _fer_ -carry are intrinsically transitive. Normally an infinitive compound with _qma_ -make makes words transitive. 

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
        ^:i -po !ju /daw -scu-zu-crw-zu-ter !fwa-pei !cana-fer
        </i>
      </td>
      <td>
        Do you want to be chewed up by the barge's propeller?
      </td>
    </tr>
  </tbody>
</table>




[you1 (qo se fo) is it desire to2 [to1 [[(qo se fo2) food1/eat/ by to's2 [push boat1 and2 carry2] device1] and [(device1) tear2 (qo se fo2)] complete] < speaker/cry/ (eye1) \desire2\> < experiencer/attention/ (qo se fo1) \desire2\> < time/present/ (something2) \desire1\>]]

A complicated sentence, just as efficient as English. See how Josepho is replicated into the internal infinitives. Push-device is used for propeller; completely eat-tear is chew up. The speaker and time are added automatically. 

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
        ^:i |qi-koy !do /va-gri ^ji /gul !qou !jw ^vu-cnu !xa-jl
        </i>
      </td>
      <td>
        Damn, I have to watch them every moment!
      </td>
    </tr>
  </tbody>
</table>




[I1 (eye) must to2 [(eye1) watch2 this2 < time/present/ all something2 \watch1\>] < performer/think/ variable b1 (eye) \must2\> < listener/think/ (eye3) \must2\> < actor/angry/ (eye2) I1 (eye) \must3\> < time/present/ (something2) \must1\>]

A subordinate clause gives, literally, at all times. 

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
        ^:i !pu /kau !qai-kar !jw ^jw /vi-faw
        </i>
      </td>
      <td>
        Why can't they take care of themselves?
      </td>
    </tr>
  </tbody>
</table>




[what1 cause to2 [this1 fail to2 [(this1) care2 this2]] < listener/emphatic/ you3 (eye) \cause2\> < speaker/emphatic/ I1 (eye) \cause2\> < time/present/ (something2) \cause1\>]

For a reflexive, repeat the argument. 

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
        ^:i !ji /suy |swa !dman =co
        </i>
      </td>
      <td>
        I swim for one second...
      </td>
    </tr>
  </tbody>
</table>




[I1 (eye) swim < duration all* one's2 second1 \swim2\> < performer/think/ variable b1 (eye) \swim2\> < listener/think/ (eye3) (swim2)> < time/present/ (something2) \swim1\>]

Here is another tense, this time a continuous one. One second is a simple mathematical expression. 

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
        ^:o -sno !can-zu-vem !jw
        </i>
      </td>
      <td>
        And that's enough for them to get into trouble.
      </td>
    </tr>
  </tbody>
</table>




[conjunction \swim1\ sufficient to2 [to2 [(this2) trouble] change by this1] < performer/think/ variable b1 (eye) (sufficient2)> < listener/think/ (eye3) (sufficient2)> < time/present/ (something2) \sufficient1\>]

_Gua\spi_ is much richer in causal connectives than English with its ambiguous because; thus this _gua\spi_ sentence is half the length of its English translation. 

This short sample exercises almost every feature of _gua\spi_ \, even including a mathematical expression. To verify every phrase the reader must know _gua\spi_ fairly well, but one can see easily the simple phrase organization of _gua\spi_. The lengths of the _gua\spi_ and native English sentences are comparable, showing how efficient _gua\spi_ is. The primitive words cover almost all meanings in this relatively unspecialized text, and the componds for barge and propeller are quite understandable. Finally, the sample makes it clear that _gua\spi_ is more than just a dry substitute for SQL; _gua\spi_ can support real life. 

## Conclusion 

What can one use _gua\spi_ for? Here is a brief list: 

  * In knowledge representation one always wonders if one's codes can really cover the totality of human experience. The _gua\spi_ word list has some history from which general coverage can be claimed. 
  * _Gua\spi_ provides a medium in which real humans can have real conversations, after which you are guaranteed that a computer can semantically analyse what was said so that you can study it. Freely spoken natural languages are too complex to handle. 
  * The phonology and morphology of _gua\spi_ is simpler than that of typical natural languages, so _gua\spi_ could be useful as a test case for automatic speech recognition, especially if semantic analysis of arbitrary speech is a goal. 
  * The modes of thought you typically use in _gua\spi_ are much more precise than is typical in English or other natural languages, and the connections between sentence parts are much clearer. _Gua\spi_ can be a kind of mirror of your native language that can help you use it better, and the _gua\spi_ thought patterns may affect the content of your thoughts --- the Whorf-Sapir hypothesis. 
  * _Gua\spi_ sidesteps the recognition algorithms by which normal humans assign objects to referent sets. A research project to incorporate such algorithms in a _gua\spi_ semantic analyser would be very interesting. 
  * Another interesting project is to investigate how small the primitive word basis can be. 
  * The simplicity and precision of _gua\spi_ helps a learner even if he is not mathematically inclined. _Gua\spi_ would make a good substitute for pidgin English in linguistically impoverished areas. 



I hope this brief introduction to _gua\spi_ has whetted your appetite to learn more about it. As you have seen, it expresses typical human sentences easily and efficiently. But the meanings of the words, and particularly the meanings of the phrases and sentences made from them, are defined much more specifically and clearly than in even the best natural languages. Finally, and most significant for artifical intelligences, the resulting meanings are cast in a form that is ideal for modern fifth-generation languages --- which, in fact, those languages were designed to represent. Thus the gap between human and machine languages is closed by _gua\spi_. 

## Appendix: _Gua!spi_ Grammar in Backus-Naur Form

Discourse is the root grameme. Grammar for quoted non-_gua\spi_ text is not shown, but foreign predicates and quoted _gua\spi_ are processed by this grammar and are recognized at the organizational syntax level. A procedural definition shows the simplicity of the grammar more clearly. 

<table width="100%">
  <colgroup>
  <col width="25%"/>
  <col width="75%"/>
  </colgroup>
  <tbody>
    <tr>
      <td colspan="2">
        ; Morphology.
      </td>
    </tr>
    <tr>
      <td>
        C
      </td>
      <td>
        = (choice of letters)
      </td>
    </tr>
    <tr>
      <td>
        Cseq
      </td>
      <td>
        = (Cseq C) | C
      </td>
    </tr>
    <tr>
      <td>
        V
      </td>
      <td>
        = (choice of letters)
      </td>
    </tr>
    <tr>
      <td>
        Vseq
      </td>
      <td>
        = (Vseq V) | V
      </td>
    </tr>
    <tr>
      <td>
        Word
      </td>
      <td>
        = Cseq Vseq
      </td>
    </tr>
    <tr>
      <td colspan="2">
        ; Tone categories.
      </td>
    </tr>
    <tr>
      <td>
        Compound
      </td>
      <td>
        = `-' | `='
      </td>
    </tr>
    <tr>
      <td>
        Sametone
      </td>
      <td>
        = `^'
      </td>
    </tr>
    <tr>
      <td>
        Down1
      </td>
      <td>
        = `!' | `|'
      </td>
    </tr>
    <tr>
      <td>
        Up1
      </td>
      <td>
        = `/'
      </td>
    </tr>
    <tr>
      <td colspan="2">
        ; Grammar.  LHS `-' symbol indicates which end has a tone.
      </td>
    </tr>
    <tr>
      <td>
        Prefix
      </td>
      <td>
        = (subset of Word, e.g.
        <i>
        <span class="latex">
        vo
        </span>
        </i>
        or
        <i>
        <span class="latex">
        zu
        </span>
        </i>
        )
      </td>
    </tr>
    <tr>
      <td>
        Primitive
      </td>
      <td>
        = (subset of Word, e.g.
        <i>
        <span class="latex">
        tara
        </span>
        </i>
        or
        <i>
        <span class="latex">
        crw
        </span>
        </i>
        )
      </td>
    </tr>
    <tr>
      <td>
        Phrase
      </td>
      <td>
        = Prefix Args0 Phrase
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Phrase-w
      </td>
    </tr>
    <tr>
      <td>
        Phrase-w
      </td>
      <td>
        = Primitive Phrase-w
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Primitive
      </td>
    </tr>
    <tr>
      <td>
        Phrase0-
      </td>
      <td>
        = Phrase Sametone
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Phrase Down1 Args1
      </td>
    </tr>
    <tr>
      <td colspan="2">
        ; Args(n) is a list of phrases that jumps up n levels at the
        end.  Args3, 4, . . . are defined similar to Args1 and 2.
        Some finite bound must be set on n to give a finite grammar.
      </td>
    </tr>
    <tr>
      <td>
        -Args0-
      </td>
      <td>
        = Compound (Just one tone)
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Down1 Args1
      </td>
    </tr>
    <tr>
      <td>
        Args1-
      </td>
      <td>
        = Phrase Up1
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Phrase Down1 Args2
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Phrase0 Args1
      </td>
    </tr>
    <tr>
      <td>
        Args2-
      </td>
      <td>
        = Phrase `!' `fu'
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Phrase Down1 Args3
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Phrase0 Args2
      </td>
    </tr>
    <tr>
      <td colspan="2">
        ; These add the effect of
        <i>
        <span class="latex">
        fi
        </span>
        </i>
        .
      </td>
    </tr>
    <tr>
      <td>
        Afterargs
      </td>
      <td>
        = Phrase0 Afterargs
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Phrase Down1 Afterargs
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Phrase
      </td>
    </tr>
    <tr>
      <td>
        After1
      </td>
      <td>
        | After1 Down1 `fi' `-' After1
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | After1 `-' `fi' Down1 After1
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Afterargs
      </td>
    </tr>
    <tr>
      <td>
        -Preargs-
      </td>
      <td>
        = Down1 After1 `/fi' Preargs
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Down1 After1 Down1 `fi' `/' Args1
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Args0
      </td>
    </tr>
    <tr>
      <td>
        -Sentstart
      </td>
      <td>
        = `^' (choice of words such as
        <i>
        <span class="latex">
        :i
        </span>
        </i>
        )
      </td>
    </tr>
    <tr>
      <td>
        Sentend
      </td>
      <td>
        = Phrase Down1 After1
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        | Phrase
      </td>
    </tr>
    <tr>
      <td>
        -Sentence
      </td>
      <td>
        = Sentstart Preargs Sentend
      </td>
    </tr>
    <tr>
      <td>
        -Nonsentence
      </td>
      <td>
        = Sentstart Down1 Sentend
      </td>
    </tr>
    <tr>
      <td>
        -Unit
      </td>
      <td>
        = Sentence | Nonsentence
      </td>
    </tr>
    <tr>
      <td>
        -Discourse
      </td>
      <td>
        = (Discourse Unit) | Unit
      </td>
    </tr>
  </tbody>
</table>


 

## Bibliography

  * [L1] Brown, James C. Loglan 1: A Logical Language.  The Loglan Institute, Inc., Gainesville, Fla., 1975. 
  * [L4] Brown, James C.  Loglan 4 5: A Loglan-English / English-Loglan Dictionary.  The Loglan Institute, Inc., Gainesville, Fla., 1975. 
  * [NB2] Brown, James C.  A Proposed Revision in the Structure of Loglan Words  (Notebook No. 2). The Loglan Institute, Inc., Gainesville, Fla., 1982. 
  * [TL43] Parks-Clifford, J.  Supplement to Loglan 1.  \sl The Loglanist 4, 3 (Nov. 1980). 
  * [La] Information about _Loglan_ may be obtained from The Loglan Institute, Inc., 1701 NE 75th Street, Gainesville, FL 32601. 
  * [Lja] A modernized version of _Loglan_ , much closer to the original _Loglan_ than _gua\spi_ , is _Lojban_. Information is available from The Logical Languages Group, 2904 Beau Lane, Fairfax, VA 22031, or lojbab@lojban.org. For on-line access, send a message whose body is index lojban to listserv@hebrew.cc.columbia.edu. 
  * [Ga] Please contact the author at UCLA Department of Mathematics, Los Angeles, CA 90024-1555, or e-mail to jimc@math.ucla.edu. 


