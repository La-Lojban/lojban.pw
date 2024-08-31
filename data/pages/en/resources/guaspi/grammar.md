---
"title": "Introduction to Gua\\spi"
---



<table width="100%">
  <tbody>
    <tr>
      <td align="center">
        <a href="cases.html">
        Next
        </a>
      </td>
      <td align="center">
        <a href="guarefmn.html">
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

# Introduction to _Gua\spi_

Most human languages are natural: they evolved with their host societies without the benefit of intentional design. While some languages like French are maintained by dedicated stewards, and others like Spanish and Russian have been renovated recently, most drift with the fashions of peasants and teenagers which, though vital, lack logic and efficiency. A very few languages, however, have been created as artifacts with specific goals in mind. _Gua\spi_ is one of these. My goals in building _gua\spi_ were: 

  * To investigate the nature of language, and particularly the minimum content required for a language, through engineering and experiment. 
  * To create a language suited to use by artificial intelligences, such that the effort to map from letters to meanings does not overshadow the effort spent on using the resulting meanings. 
  * To create a language for my own use, free of the limitations of English, and to have fun doing so. 



The purpose of this monograph is to present the syntax of _gua\spi_ , as well as categorical information about the vocabulary, in the style of a reference manual. All the syntax is here (excepting only features under active development that were too late to make publication), and the vocabulary section contains an extensive list of how to say various types of expressions. To learn _gua\spi_ you also need a dictionary, a language textbook, and a set of _gua\spi_ reading material. 

## Artificial Intelligence

The significance of _gua\spi_ to artificial intelligence work is that it is a bridge between humans and machines: it is complete enough to express the real conversation of real humans to each other, unlike database representation languages, yet it is simple enough that a working Prolog parser can be put together in a few days, unlike natural languages and particularly English, which must be so stripped as to be scarcely useable before a simple parser can handle it. 

_Gua\spi_ has several characteristics that particularly suit it to use by humans and artificial intelligences together. 

  * _Gua\spi_ is simple. The formal syntax can be stated in a few lines, compared to thousands of lines for English. There are only eight classes of structure words (occupying only two distinct syntactic sites), with about six functionally and morphologically related words per class; a similar set of pronouns; and 21 digits. The content words number only about 1400, compared to half a million for English. 
  * _Gua\spi_ is modular. Morphology, grammar, organization and semantics are defined separately and interact to the minimum feasible extent. 
  * _Gua\spi_ is complete. The content words form a basis such that almost any meaning not tied to a specific place or culture, and many which are, can be represented by agglutination. Foreign words and scientific Latin are welcome in the language. 
  * _Gua\spi_ is flexible. A minimum of preconceptions are imposed on the user by the language. Trials show that _gua\spi_ can express human speech from daily life as well as highly technical scientific language. 
  * _Gua\spi_ is efficient. Words are short, and extensive defaults on articles and modal cases eliminate the majority of structure words. 
  * _Gua\spi_ is unambiguous. There is one sound per letter and one meaning per word; and every valid utterance can be parsed in only one way. 



## Ancestor Languages

The language artifact _Loglan_ , developed by James Cooke Brown [L1], was the inspiration for _gua\spi_. Brown realized that a very small set of content words could form a basis of a language, and produced such a set. By successfully writing large amounts of prose in _Loglan_ while creating almost no additional words, I validated his insight. 

Loglan was the first language to have such simple grammar --- a hundred times fewer syntax rules than English, for example. But aggressive simplification can still be applied, and this I have done in _gua\spi_. One is tempted to think of the resulting syntax and morphology rules as trivial. A better way to describe them is, they contain the essentials and nothing more. 

_Gua\spi_ 's syntax is much simpler than English or other languages, partly because the syntax is divided into modules each of which has its own purpose. _Gua\spi_ 's syntax modules are: 

Morphology
     How to divide letters or sounds into words. 
Grammar
     Joining words into phrases into sentences. 
Organization
     What each phrase does in the sentence. 
Semantics
     Giving meaning to syntactic structures. 

Natural language syntax is extremely complicated because the syntax expresses actual meanings such as tenses and numbers. In _gua\spi_ the first three levels are independent of the meaning of the words. This makes them less interesting than jewels like the ``perfective aspect'' of Russian or the ``long object case'' of Navajo, but it makes them much simpler and much easier to learn and use. 

# Morphology: What is a Word

The phonemes are divided in two classes, C's and V's. All C's are consonants in English and those English vowels used in _gua\spi_ are all in the V class, hence the names. In addition each word has a tone, a frequency modulation of the V's of each word in the Chinese manner. A word is written as a tone (see [Table 4 [Tones]](grammar.html#Tones)), one or more C's and one or more V's. What could be simpler? 

## The Phonemes

Phonemes can be distinguished by where the tongue is placed to make them, whether they are sudden (plosive) or continuous (spirant), and whether their sound comes from the vocal cords (voiced) or the rush of air (unvoiced). Particular ranges of tongue position produce each phoneme, much like states on a map. But each listener has unique map boundaries for recognizing phonemes, especially for the vowels, so the speaker should try to hit the center of the phoneme region so as to maximize the likelihood that any particular listener will be able to recognize his speech. Nonetheless, the more difficult phoneme distinctions have been removed from _gua\spi_ and so speakers of any natural language should find most phonemes easy to say and to hear. 

[Table 1 [Phonemes]](grammar.html#Phonemes) shows the phonemes, categorized by tongue position and sound source. Some phonemes are represented confusingly in European languages, e.g. `sh' which sounds like neither `s' nor `h'. So in _gua\spi_ they are assigned individual letters which differ from European usage --- `q' for `sh'. [Table 2 [Pronunciation]](grammar.html#Pronunciation) gives examples of these, and all the vowels. Written blanks have no sound, and are optional. There is no distinction between upper and lower case. 

* * *



<table>
  <tbody>
    <tr>
      <th>
        C/V
      </th>
      <th>
        Stop Class
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
      <th>
        <i>
        Gua\spi
        </i>
      </th>
      <th>
        English
      </th>
      <th>
        Examples of Pronunciation
      </th>
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


 

> Table 2 [Pronunciation]. How to pronounce _gua\spi_ phonemes. Nonstandard C's are shown; C's without examples are as in English. Standard radio broadcast accent is close to correct for the V's; Spanish is closer. Pronounce the vowels as one sound, not a glide between two sounds as in ``eye''. 

* * *

The sound `#' or `uh' is common in English; all vowel letters are sometimes pronounced `#'. The `a' of ``among'' is a good example. This sound is called ``schwa''; that German name is pronounced (with _gua\spi_ letters) ``sqv#''. `#' is not used in regular words; its purpose is to break up CC pairs that a particular speaker finds hard to pronounce, since virtually all speakers will be able to handle C#C. It is to be ignored and it is only written in explanations like this one. Though normally considered a vowel, it is in the C class because it occurs among C's, and a word is defined as some C's followed by some V's. 

The glottal stop `:' pronounced alone is a sudden (plosive) `#', but it is normally followed by a V so that it sounds like a brief pause after which the V comes on. In many English dialects, as in _gua\spi_ , it is found between a vowel-final and vowel-initial word, like ``the:apple'', while the Cockney dialect uses it much more extensively. The glottal stop is not used in regular words; its place is at the beginning of each sentence start word, and in vowel-initial foreign words. 

English has thirteen subtly different vowels plus four official diphthongs but only five letters to represent them. _Gua\spi_ uses only six easily distinguished vowel sounds, recruiting Y for one of them, and adds some vowel-like sounds which are considered consonants in English. Unfortunately, many regional accents of English turn simple vowels into diphthongs, invalidating the example words given in [Table 2 [Pronuncation]](grammar.html#Pronunciation). Other accents transform sounds beyond the bounds that a _gua\spi_ speaker can recognize. If you speak with a regional accent, please use the vowel sounds that you can hear on television or radio (American or British will both work). Particularly troublesome examples, rendered with _gua\spi_ letters, are shown in this table: 

* * *



<table>
  <tbody>
    <tr>
      <td>
        Standard
      </td>
      <td>
        Accented English
      </td>
    </tr>
    <tr>
      <td>
        flUte
      </td>
      <td>
        flIUte
      </td>
    </tr>
    <tr>
      <td>
        bOAt
      </td>
      <td>
        bAt
      </td>
      <td>
        (a very closed `o')
      </td>
    </tr>
    <tr>
      <td>
        machIne
      </td>
      <td>
        machI#n
      </td>
    </tr>
    <tr>
      <td>
        bEd
      </td>
      <td>
        bAI#d
      </td>
    </tr>
    <tr>
      <td>
        fAtheR
      </td>
      <td>
        f%thA
      </td>
      <td>
        (% represents `a' in ``cat'')
      </td>
    </tr>
    <tr>
      <td>
      </td>
    </tr>
  </tbody>
</table>


 

> Table 3 [Accent]. Accented Vowels Troublesome in _Gua\spi_. If you normally speak a regional dialect, try to use standard pronunciation in _gua\spi_. 

* * *

Japanese speakers are famous for producing `l' and `r' that Europeans cannot distinguish. Chinese has distinct `l' and `r' but uses phoneme boundaries different from the European norm, so its speakers also have some trouble being understood. The _gua\spi_ `l' and `r' are biased to European norms, and Asian speakers should take special care with these phonemes. 

Preliminary experience shows that the errors English-speaking beginners make most often are to interchange `q' with `c', `x' with `j', and `i' with `y'; and to pronounce `w' as `oo' (should be `ng'). 

Written blanks have no sound, and are optional. In this document a blank usually comes before each word (except in the phrase ``_gua\spi_ ''), although in running text it looks nicer to omit blanks before the tone `-'. There is no distinction between upper and lower case. The tones (described next) make punctuation unnecessary. There are no periods at the ends of sentences; however, each sentence start word begins with a glottal stop, written as a colon. This colon is a letter, not a punctuation. 

A feature of _gua\spi_ (like Loglan before it, and unlike English) is that writing and speech are isomorphic, that is, each letter has a single phoneme (sound) and each phoneme has a single letter (with trivial exceptions), so that each spoken text can be spelled easily and without ambiguity, and each written text can be read off equally easily. 

# Grammar by Tones

The job of grammar is to stick words together into phrases. The grammar does not support meaning of any kind --- no tenses, no possessives, no nouns, no verbs. These ideas are handled at the organizational and semantic levels, using the grammar as a foundation. Like its morphology, the grammar of _gua\spi_ is nearly minimal. 

## Parse Tree

The grammar is stated in Backus-Naur form in [Section [Backus]](conclusn.html#Backus). For grammatical purposes there is only one kind of phrase (though distinctions are made at the organizational level), but words have five categories: the two words _``fu''_ and _``fi''_ , sentence start words, other prefixes, and everything else. The main part of a phrase is a sequence of one or more words collectively called the ``phrase predicate''; any prefixes in this must come first. After any of the prefixes or after the whole predicate the sub-phrases are interspersed. They, of course, have their own prefixes, predicates and sub-phrases. 

Let us understand phrases with the help of the example in the following figure, showing the ``parse tree'' of a simple sentence. The root phrase is at the top; parse trees grow upside down. Sub-phrases with their own predicates come at the next lower level. These in turn may have their own sub-phrases. Each phrase is at a certain level and it attaches to the most recent phrase at the next higher level. The tones (see [Table 4 [Tones]](grammar.html#Tones)) show the level of each word relative to the one before it. 

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
    
    

> Figure 1 [Parsetree]. A Sample Parse Tree. Each phrase is part of the most recent one at the next higher level. Each phrase may have sub-phrases. Tone symbols (see [Table 4 [Tones]](grammar.html#Tones)) show jumps into and out of sub-phrases; they show the difference in level between adjacent words. 

* * *

The root phrase predicate of the example sentence is ``devour'' (violently eat), and the start word is at the same level. ``Rat'', attaching to ``violent'', is therefore at the next level below the start word, indicated by `!'. ``Violent'' is at the level above ``rat'', indicated by `/'. ``Eat'' is attached to ``violent'' in a compound, indicated by `-'. For grammatical purposes the pair of words, plus the start word, form the root phrase predicate, although later at the organizational syntax level ``eat'' will be split from ``violent''. Like ``rat'', ``cheese'' attaches below ``eat'' (`!'). The next phrase also attaches to ``eat'', indicated by `^', because ``eat'' is the most recent word at the next level up. It is a subordinate clause, indicated by the prefix _``vu''_ , that tells what was ``used'' to eat; in a similar tone pattern ``fork'' and ``knife'' both attach to ``using''. ``Using'' and ``knife'' attach to their prefixes with compounding tone `-'. To summarize, words attach to the previous word at the next higher level, and the tones of _gua\spi_ represent the attachment level of the present word relative to the one just before it. Every word has such a tone. 

## The Tones

The tones are the most terrifying aspect of _gua\spi_ for speakers of European languages. Please remember that over a billion people in China and Southeast Asia speak tonal languages. If they can do it, so can you. 

A tone is a specific change in pitch or vocal frequency. In English a falling tone marks the end of the sentence, a rising tone marks a question, a down-up combination is a kind of verbal comma, and most of the sentence is said at a fairly even tone. Chinese has similar tones but each word has one and the tones distinguish between meanings, e.g. _``-ma''_ (high even tone) means ``mother'' while _``|ma''_ (down-up) means ``horse''. _Gua\spi_ is intermediate in its use of tones: each word has a tone, but rather than affecting the meaning of the word it tells which neighboring word it attaches to. The tones are shown in this table: 

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


 

> Table 4 [Tones]. Sounds and interpretations of the tones. ``Level'' refers to the parse tree level of the word with that tone, relative to the structure before it. ``Type'' indicates the organizational type of that word or phrase. The first set of symbols shown, ascii characters, is preferred but the second set can substitute on a manual typewriter. In this paper, `!' is used instead of `\' for convenience in typesetting. 

* * *

You don't speak this language, you sing it. Chinese speakers will have no problem to produce and hear the tones, but Europeans will need a lot of practice, particularly in listening. A Chinese person speaking clearly will let his voice vary over an interval of a fourth, e.g. C to F on the piano, and this should be enough for Europeans to catch. On the falling and rising tones Europeans tend to produce, and listen for, little curlicues at the end that make the tone sound like down-up or up-down. Avoid the curlicues, and recognize the two-direction tones only if they range over at least a third, e.g. C to E or D to F. 

Tones `-' and `=' join adjacent words of a compound phrase predicate. Tones `|' and `!' start a sub-phrase of the current phrase. Tone `^' closes the current sub-phrase and starts a new one, part of the same containing phrase. Tone `/' closes a sub-phrase and resumes the predicate of the containing phrase, if among its prefixes, or otherwise starts a new phrase at the higher level. Distinctions within these tone classes are important later but do not affect the grammar. 

A sentence start prefix with up-down tone such as _``^:i''_ is automatically at root level. _``fi''_ jumps to the root level or one or two levels lower without ending the sentence, depending on its tone selected from `!', `^' or `/', as if an imaginary level 1 word preceeded it. If a word is supposed to be more than one level higher (closer to the root) than the previous one but _``fi''_ does not apply, you use _``fu''_ to raise the level count by two to four depending on its tone, selected from `!', `^' or `/' respectively. You can repeat _``fu''_ for even higher levels, but this is rarely necessary since from level 7 or less you can reach any level from 0 (root) to 8 in one jump. On the level-shifting prefixes the tone `-' usually can substitute for `^', except after a foreign word, name or digit, where the prefix tends to get included in the previous structure. 

Sentence start words like _``:i''_ and other prefix words like _``se''_ or _``vu''_ come before and at the same level as the predicate of their phrase. The predicate normally has compounding (high even) tone unless some of its arguments precede it, and the linked predicate is considered to be a compound word with the prefix, whether or not arguments come between them. There may be several prefixes in a row before the predicate, all at the same level and linked in sequence. The one closest to the predicate has effect first. 

As befits a grammatical element, the tone of a word implies what kind of structure is attaching. In particular, the third tone, down-up, `|', is specifically for the very common case of putting a subordinate clause one level down from the previous word. 

There are two word sequences for quoting non-_gua\spi_ text. These are part of the grammar but are described with the other quote words, which are at the organizational level. 

That is the end of the _gua\spi_ grammar. A speaker used to natural languages surely will expect to have seen tenses, cases, numbers, aspects, moods and all the other baggage that inflates natural language grammars beyond the bounds of reason. _gua\spi_ grammar provides a framework upon which words can mean tenses, cases and so on, but the grammar by itself eschews any meaning --- so it can be much simpler than natural language. 

* * *



<table width="100%">
  <tbody>
    <tr>
      <td align="center">
        <a href="cases.html">
        Next
        </a>
      </td>
      <td align="center">
        <a href="guarefmn.html">
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


 
