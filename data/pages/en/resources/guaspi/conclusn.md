---
"title": "Grammar Algorithms"
---



<table width="100%">
  <tbody>
    <tr>
      <td align="center">
        <a href="guarefmn.html">
        Next
        </a>
      </td>
      <td align="center">
        <a href="vocab2.html">
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

# Grammar Algorithms

## Backus-Naur Form

For computer applications the normal way to represent _gua\spi_ syntax is in a semi-procedural language such as Prolog, because the end of a phrase comes when the next word's level passes up to or above that of the phrase main word, rather than at a standardized ending word, and such a relation is hard to represent in BNF. However, it is generally expected that the syntax of a language will be presented in BNF, so here it is. 

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
        ``vo''
        </i>
        or
        <i>
        ``zu''
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
        ``tara''
        </i>
        or
        <i>
        ``crw''
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
        ``fi''
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
        ``:i''
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


 

``Discourse'' is the root grameme. Grammar for quoted non-_gua\spi_ text is not shown, but foreign predicates and quoted _gua\spi_ are processed by this grammar and are put together at the organizational syntax level. 

## Organizational Transformations

Formal syntax is finished at this point, and transformation begins, in this sequence of steps: 

  * Transform the tone `|' into ``_!vu_ -subordinate clause''. 
  * Do the transformations for retroactive downjumps and for error correction (_fa_). 
  * Distinguish arguments from sentences. Insert _``!so -jy''_ as the placeholder for arguments' open first cases. 
  * Re-order argument lists according to caselinks and conversions. Insert placeholders for missing cases. 
  * Look up each word in the dictionary. Insert default articles, typically ``_xe_ -the'', before arguments. Insert default _``vo''_. 
  * In cases of compounding, replicate argument lists for parallel arguments; insert _``vo''_ for compound infinitives; or demote a compound object into the argument list. 
  * Replicate main phrase arguments into infinitives. 
  * Substitute the antecedents for phrase-relative, modal and question pronouns. The antecedent of a question pronoun is found in the future answer. 
  * Deal with modal case stack operations. 
  * Insert modal case defaults in argument lists lacking them. 
  * Retrieve the referent sets for all words. From them, compute the referent subsets of arguments and of sentences. 
  * These are the relations being called to your program's attention. Update word referent sets accordingly, or take other appropriate action. 



# Conclusion

People developing applications in _gua\spi_ need some assurance that the language is not going to shift out from under them; but _gua\spi_ certainly did not arise perfectly formed from the brow of Athena. The originator of the language certainly wants a certain amount of freedom to tinker with his creation; but a significant reason for the limited popularity of _Loglan_ has been that people are not sure what the language officially is and which way it will jump next. Therefore I am making this baseline duration commitment: there will be no major changes in _gua\spi_ until 1 January 1991 (two years hence); until then the language described herein will be acceptable in the sense that software ought to be able to understand it, even if upgraded to handle minor revisions; and when the time of major revision comes, the changes will be made after consultation with the community of people actively using _gua\spi_. 

I hope this brief introduction to _gua\spi_ has whetted your appetite to learn more about it. As you have seen, it expresses typical human sentences easily and efficiently. But the meanings of the words, and particularly the meanings of the phrases and sentences made from them, are defined much more specifically and clearly than in even the best natural languages. Finally, and most significant for artifical intelligences, the resulting meanings are cast in a form that is ideal for modern fifth-generation languages --- which, in fact, those languages were designed to represent. Thus the gap between human and machine languages is closed by _gua\spi_. 

## Bibliography

  * [L1] Brown, James C. Loglan 1: A Logical Language.  The Loglan Institute, Inc., Gainesville, Fla., 1975. 
  * [L4] Brown, James C.  Loglan 4 5: A Loglan-English / English-Loglan Dictionary.  The Loglan Institute, Inc., Gainesville, Fla., 1975. 
  * [NB2] Brown, James C.  A Proposed Revision in the Structure of Loglan Words  (Notebook No. 2). The Loglan Institute, Inc., Gainesville, Fla., 1982. 
  * [TL43] Parks-Clifford, J.  Supplement to Loglan 1.  \sl The Loglanist 4, 3 (Nov. 1980). 
  * [La] Information about _Loglan_ may be obtained from The Loglan Institute, Inc., 1701 NE 75th Street, Gainesville, FL 32601. 
  * [Lja] A modernized version of _Loglan_ , much closer to the original _Loglan_ than _gua\spi_ , is _Lojban_. Information is available from The Logical Languages Group, 2904 Beau Lane, Fairfax, VA 22031, or lojbab@lojban.org. For on-line access, send a message whose body is ``index lojban'' to listserv@hebrew.cc.columbia.edu. 
  * [Ga] Please contact the author at UCLA Department of Mathematics, Los Angeles, CA 90024-1555, or e-mail to jimc@math.ucla.edu. 



* * *



<table width="100%">
  <tbody>
    <tr>
      <td align="center">
        <a href="guarefmn.html">
        Next
        </a>
      </td>
      <td align="center">
        <a href="vocab2.html">
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


 
