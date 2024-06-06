<a id="section-connectives"></a>16.10. <a id="c16s10"></a>bridi negation and logical connectives
------------------------------------------------------------------------------------------------

<a id="id-1.17.12.2.1" class="indexterm"></a><a id="id-1.17.12.2.2" class="indexterm"></a><a id="id-1.17.12.2.3" class="indexterm"></a><a id="id-1.17.12.2.4" class="indexterm"></a>A complete discussion of logical connectives appears in [Chapter 14](../chapter-connectives). What is said here is intentionally quite incomplete and makes several oversimplifications.

A logical connective is a cmavo or compound cmavo. In this chapter, we will make use of the logical connectives “and” and “or” (where “or” really means “and/or” , “either or both”). The following simplified recipes explain how to make some logical connectives:

*   <a id="id-1.17.12.4.1.1.1" class="indexterm"></a>To logically connect two Lojban sumti with “and” , put them both in the bridi and separate them with the cmavo _<a id="id-1.17.12.4.1.1.3.1" class="indexterm"></a>[_.e_](../go01#valsi-e)_.

*   To logically connect two Lojban bridi with “and” , replace the regular separator cmavo _<a id="id-1.17.12.4.2.1.2.1" class="indexterm"></a>[_.i_](../go01#valsi-i)_ with the compound cmavo _<a id="id-1.17.12.4.2.1.3.1" class="indexterm"></a>[_.ije_](../go01#valsi-ije)_.

*   To logically connect two Lojban sumti with “or” , put them both in the bridi and separate them with the cmavo _<a id="id-1.17.12.4.3.1.2.1" class="indexterm"></a>[_.a_](../go01#valsi-a)_.

*   To logically connect two Lojban bridi with “or” , replace the regular separator cmavo _<a id="id-1.17.12.4.4.1.2.1" class="indexterm"></a>[_.i_](../go01#valsi-i)_ with the compound cmavo _<a id="id-1.17.12.4.4.1.3.1" class="indexterm"></a>[_.ija_](../go01#valsi-ija)_.

More complex logical connectives also exist; in particular, one may place _<a id="id-1.17.12.5.1.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ before _<a id="id-1.17.12.5.2.1" class="indexterm"></a>[_.e_](../go01#valsi-e)_ or _<a id="id-1.17.12.5.3.1" class="indexterm"></a>[_.a_](../go01#valsi-a)_ , or between _<a id="id-1.17.12.5.4.1" class="indexterm"></a>[_.i_](../go01#valsi-i)_ and _<a id="id-1.17.12.5.5.1" class="indexterm"></a>[_je_](../go01#valsi-je)_ or _<a id="id-1.17.12.5.6.1" class="indexterm"></a>[_ja_](../go01#valsi-ja)_ ; likewise, one may place _<a id="id-1.17.12.5.7.1" class="indexterm"></a>[_nai_](../go01#valsi-nai)_ at the end of a connective. Both _<a id="id-1.17.12.5.8.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ and _<a id="id-1.17.12.5.9.1" class="indexterm"></a>[_nai_](../go01#valsi-nai)_ have negative effects on the sumti or bridi being connected. Specifically, _<a id="id-1.17.12.5.10.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ negates the first or left-hand sumti or bridi, and _<a id="id-1.17.12.5.11.1" class="indexterm"></a>[_nai_](../go01#valsi-nai)_ negates the second or right-hand one.

Whenever a logical connective occurs in a sentence, that sentence can be expanded into two sentences by repeating the common terms and joining the sentences by a logical connective beginning with _<a id="id-1.17.12.6.1.1" class="indexterm"></a>[_.i_](../go01#valsi-i)_. Thus the following sentence:

<div class="interlinear-gloss-example example">
<a id="example-random-id-jmDS"></a>

**Example 16.73. <a id="c16e10d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>.e</td><td>do</td><td>klama</td><td>ti</td></tr><tr class="gloss"><td>I</td><td>and</td><td>you</td><td>come-to</td><td>this-here</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">I and you come here.</p></td></tr></tbody></table>

</div>  

can be expanded to:

<div class="interlinear-gloss-example example">
<a id="example-random-id-KTQH"></a>

**Example 16.74. <a id="c16e10d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>klama</td><td>ti</td><td>.ije</td><td>do</td><td>klama</td><td>ti</td></tr><tr class="gloss"><td>I</td><td>come-to</td><td>this-here</td><td>and</td><td>you</td><td>come-to</td><td>this-here</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">I come here, and, you come here.</p></td></tr></tbody></table>

</div>  

The same type of expansion can be performed for any logical connective, with any valid combination of _<a id="id-1.17.12.10.1.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ or _<a id="id-1.17.12.10.2.1" class="indexterm"></a>[_nai_](../go01#valsi-nai)_ attached. No change in meaning occurs under such a transformation.

Clearly, if we know what negation means in the expanded sentence forms, then we know what it means in all of the other forms. But what does negation mean between sentences?

<a id="id-1.17.12.12.1" class="indexterm"></a><a id="id-1.17.12.12.2" class="indexterm"></a><a id="id-1.17.12.12.3" class="indexterm"></a>The mystery is easily solved. A negation in a logical expression is identical to the corresponding bridi negation, with the negator placed at the beginning of the prenex. Thus:

<div class="interlinear-gloss-example example">
<a id="example-random-id-pLiB"></a>

**Example 16.75. <a id="c16e10d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>.enai</td><td>do</td><td>prami</td><td>roda</td></tr><tr class="gloss"><td>I</td><td>and-not</td><td>you</td><td>love</td><td>everything</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">I, and not you, love everything.</p></td></tr></tbody></table>

</div>  

expands to:

<div class="interlinear-gloss-example example">
<a id="example-random-id-h6Wz"></a>

**Example 16.76. <a id="c16e10d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>prami</td><td>roda</td><td>.ijenai</td><td>do</td><td>prami</td><td>roda</td></tr><tr class="gloss"><td>I</td><td>love</td><td>everything,</td><td>and-not,</td><td>you</td><td>love</td><td>everything.</td></tr></tbody></table>

</div>  

and then into prenex form as:

<div class="interlinear-gloss-example example">
<a id="example-random-id-JxDJ"></a>

**Example 16.77. <a id="c16e10d5"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>roda</td><td>zo'u</td><td>mi</td><td>prami</td><td>da</td><td>.ije</td></tr><tr class="gloss"><td>For-each-thing</td><td>:</td><td>I</td><td>love</td><td>it,</td><td>and</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>do</td><td>prami</td><td>da</td></tr><tr class="gloss"><td>it-is-false-that</td><td>you</td><td>love</td><td>(the-same)-it.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">For each thing: I love it, and it is false that you love (the same) it.</p></td></tr></tbody></table>

</div>  

<a id="id-1.17.12.18.1" class="indexterm"></a>By the rules of predicate logic, the _<a id="id-1.17.12.18.2.1" class="indexterm"></a>[_ro_](../go01#valsi-ro)_ quantifier on _<a id="id-1.17.12.18.3.1" class="indexterm"></a>[_da_](../go01#valsi-da)_ has scope over both sentences. That is, once you've picked a value for _<a id="id-1.17.12.18.4.1" class="indexterm"></a>[_da_](../go01#valsi-da)_ for the first sentence, it stays the same for both sentences. (The _<a id="id-1.17.12.18.5.1" class="indexterm"></a>[_da_](../go01#valsi-da)_ continues with the same fixed value until a new paragraph or a new prenex resets the meaning.)

Thus the following example has the indicated translation:

<div class="interlinear-gloss-example example">
<a id="example-random-id-yCA1"></a>

**Example 16.78. <a id="c16e10d6"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>su'oda</td><td>zo'u</td><td>mi</td><td>prami</td><td>da</td></tr><tr class="gloss"><td>For-at-least-one-thing</td><td>:</td><td>I</td><td>love</td><td>that-thing.</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>.ije</td><td>naku</td><td>zo'u</td><td>do</td><td>prami</td><td>da</td></tr><tr class="gloss"><td>And</td><td>it-is-false-that</td><td>:</td><td>you</td><td>love</td><td>that-(same)-thing.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">There is something that I love that you don't.</p></td></tr></tbody></table>

</div>  

<a id="id-1.17.12.21.1" class="indexterm"></a>If you remember only two rules for prenex manipulation of negations, you won't go wrong:

*   <a id="id-1.17.12.22.1.1.1" class="indexterm"></a>Within a prenex, whenever you move _<a id="id-1.17.12.22.1.1.2.1" class="indexterm"></a>naku_ past a bound variable (_<a id="id-1.17.12.22.1.1.3.1" class="indexterm"></a>[_da_](../go01#valsi-da)_, _<a id="id-1.17.12.22.1.1.4.1" class="indexterm"></a>[_de_](../go01#valsi-de)_, _<a id="id-1.17.12.22.1.1.5.1" class="indexterm"></a>[_di_](../go01#valsi-di)_, etc.), you must invert the quantifier.

*   <a id="id-1.17.12.22.2.1.1" class="indexterm"></a><a id="id-1.17.12.22.2.1.2" class="indexterm"></a>A _<a id="id-1.17.12.22.2.1.3.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ before the selbri is always transformed into a _<a id="id-1.17.12.22.2.1.4.1" class="indexterm"></a>naku_ at the left-hand end of the prenex, and vice versa.