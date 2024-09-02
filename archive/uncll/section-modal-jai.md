<a id="section-modal-jai"></a>9.12. <a id="c9s12"></a>Modal conversion: JAI
---------------------------------------------------------------------------

The following cmavo are discussed in this section:

<table class="cmavo-list"><colgroup></colgroup><tbody><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">jai</p></td><td class="selmaho"><p class="selmaho">JAI</p></td><td class="description"><p class="description">modal conversion</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">fai</p></td><td class="selmaho"><p class="selmaho">FA</p></td><td class="description"><p class="description">modal place structure tag</p></td></tr></tbody></table>

<a id="id-1.10.14.4.1" class="indexterm"></a><a id="id-1.10.14.4.2" class="indexterm"></a><a id="id-1.10.14.4.3" class="indexterm"></a>So far, conversion of numbered bridi places with SE and the addition of modal places with BAI have been two entirely separate operations. However, it is possible to convert a selbri in such a way that, rather than exchanging two numbered places, a modal place is made into a numbered place. For example,

<div class="interlinear-gloss-example example">
<a id="example-random-id-KMMX"></a>

**Example 9.82. <a id="c9e12d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>cusku</td><td></td><td>bau</td><td>la</td><td>.lojban.</td></tr><tr class="gloss"><td>I</td><td>express</td><td>[something]</td><td>in-language</td><td>that-named</td><td>Lojban.</td></tr></tbody></table>

</div>  

<a id="id-1.10.14.6.1" class="indexterm"></a><a id="id-1.10.14.6.2" class="indexterm"></a><a id="id-1.10.14.6.3" class="indexterm"></a><a id="id-1.10.14.6.4" class="indexterm"></a>has an explicit x1 place occupied by _<a id="id-1.10.14.6.6.1" class="indexterm"></a>[_mi_](../go01#valsi-mi)_ and an explicit _<a id="id-1.10.14.6.7.1" class="indexterm"></a>[_bau_](../go01#valsi-bau)_ place occupied by _<a id="id-1.10.14.6.8.1" class="indexterm"></a>la .lojban._ To exchange these two, we use a modal conversion operator consisting of _<a id="id-1.10.14.6.9.1" class="indexterm"></a>[_jai_](../go01#valsi-jai)_ (of selma'o JAI) followed by the modal cmavo. Thus, the modal conversion of [Example 9.82](../section-modal-jai#example-random-id-KMMX) is:

<div class="interlinear-gloss-example example">
<a id="example-random-id-KjyW"></a>

**Example 9.83. <a id="c9e12d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>la</td><td>.lojban.</td><td>jai&nbsp;bau&nbsp;cusku</td><td>fai</td><td>mi</td></tr><tr class="gloss"><td>That-named</td><td>Lojban</td><td>is-the-language-of-expression</td><td>used-by</td><td>me.</td></tr></tbody></table>

</div>  

<a id="id-1.10.14.8.1" class="indexterm"></a><a id="id-1.10.14.8.2" class="indexterm"></a>In [Example 9.83](../section-modal-jai#example-random-id-KjyW) , the modal place _<a id="id-1.10.14.8.4.1" class="indexterm"></a>la .lojban._ has become the x1 place of the new selbri _<a id="id-1.10.14.8.6.1" class="indexterm"></a>jai bau cusku_. What has happened to the old x1 place? There is no numbered place for it to move to, so it moves to a special “unnumbered place” marked by the tag _<a id="id-1.10.14.8.9.1" class="indexterm"></a>[_fai_](../go01#valsi-fai)_ of selma'o FA.

<a id="id-1.10.14.9.1" class="indexterm"></a>Note: For the purposes of place numbering, _<a id="id-1.10.14.9.2.1" class="indexterm"></a>[_fai_](../go01#valsi-fai)_ behaves like _<a id="id-1.10.14.9.3.1" class="indexterm"></a>[_fi'a_](../go01#valsi-fiha)_ ; it does not affect the numbering of the other places around it.

<a id="id-1.10.14.10.1" class="indexterm"></a>Like SE conversions, JAI conversions are especially convenient in descriptions. We may refer to “the language of an expression” as _<a id="id-1.10.14.10.3.1" class="indexterm"></a>le jai bau cusku_ , for example.

<a id="id-1.10.14.11.1" class="indexterm"></a><a id="id-1.10.14.11.2" class="indexterm"></a>In addition, it is grammatical to use _<a id="id-1.10.14.11.3.1" class="indexterm"></a>[_jai_](../go01#valsi-jai)_ without a following modal. This usage is not related to modals, but is explained here for completeness. The effect of _<a id="id-1.10.14.11.4.1" class="indexterm"></a>[_jai_](../go01#valsi-jai)_ by itself is to send the x1 place, which should be an abstraction, into the _<a id="id-1.10.14.11.6.1" class="indexterm"></a>[_fai_](../go01#valsi-fai)_ position, and to raise one of the sumti from the abstract sub-bridi into the x1 place of the main bridi. This feature is discussed in more detail in [Section 11.10](../section-sumti-raising). The following two examples mean the same thing:

<div class="interlinear-gloss-example example">
<a id="example-random-id-qMsd"></a>

**Example 9.84. <a id="c9e12d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>le</td><td>nu</td><td>mi</td><td>lebna</td><td>le</td><td>cukta</td><td>cu</td><td>se&nbsp;krinu</td></tr><tr class="gloss"><td>The</td><td>event-of</td><td>(I</td><td>take</td><td>the</td><td>book)</td><td></td><td>is-justified-by</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>le</td><td>nu</td><td>mi</td><td>viska</td><td>le</td><td>cukta</td></tr><tr class="gloss"><td>the</td><td>event-of</td><td>(I</td><td>see</td><td>the</td><td>book).</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">My taking the book is justified by my seeing it.</p></td></tr></tbody></table>

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qMse"></a>

**Example 9.85. <a id="c9e12d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>jai&nbsp;se&nbsp;krinu</td><td>le</td><td>nu</td><td>mi</td><td>viska</td><td>le</td><td>cukta</td><td>kei</td></tr><tr class="gloss"><td>I</td><td>am-justified-by</td><td>the</td><td>event-of</td><td>(I</td><td>see</td><td>the</td><td>book)</td><td></td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>[fai</td><td>le</td><td>nu</td><td>mi</td><td>lebna</td><td>le</td><td>cukta]</td></tr><tr class="gloss"><td>[namely,</td><td>the</td><td>event-of</td><td>(I</td><td>take</td><td>the</td><td>book)]</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">I am justified in taking the book by seeing the book.</p></td></tr></tbody></table>

</div>  

<a id="id-1.10.14.14.1" class="indexterm"></a>[Example 9.85](../section-modal-jai#example-random-id-qMse) , with the bracketed part omitted, allows us to say that “I am justified” whereas in fact it is my action that is justified. This construction is vague, but useful in representing natural-language methods of expression.

<a id="id-1.10.14.15.1" class="indexterm"></a><a id="id-1.10.14.15.2" class="indexterm"></a>Note: The uses of modals discussed in this section are applicable both to BAI modals and to _<a id="id-1.10.14.15.3.1" class="indexterm"></a>fi'o-_ plus-selbri modals.