<a id="section-demorgans-law"></a>16.12. <a id="c16s12"></a>Logical connectives and DeMorgan's law
--------------------------------------------------------------------------------------------------

<a id="id-1.17.14.2.1" class="indexterm"></a><a id="id-1.17.14.2.2" class="indexterm"></a>DeMorgan's Law states that when a logical connective between terms falls within a negation, then expanding the negation requires a change in the connective. Thus (where “p” and “q” stand for terms or sentences) “not (p or q)” is identical to “not p and not q” , and “not (p and q)” is identical to “not p or not q”. The corresponding changes for the other two basic Lojban connectives are: “not (p equivalent to q)” is identical to “not p exclusive-or not q” , and “not (p whether-or-not q)” is identical to both “not p whether-or-not q” and “not p whether-or-not not q”. In any Lojban sentence having one of the basic connectives, you can substitute in either direction from these identities. (These basic connectives are explained in [Chapter 14](../chapter-connectives).)

The effects of DeMorgan's Law on the logical connectives made by modifying the basic connectives with _<a id="id-1.17.14.3.1.1" class="indexterm"></a>[_nai_](../go01#valsi-nai)_ , _<a id="id-1.17.14.3.2.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ and _<a id="id-1.17.14.3.3.1" class="indexterm"></a>[_se_](../go01#valsi-se)_ can be derived directly from these rules; modify the basic connective for DeMorgan's Law by substituting from the above identities, and then, apply each _<a id="id-1.17.14.3.4.1" class="indexterm"></a>[_nai_](../go01#valsi-nai)_ , _<a id="id-1.17.14.3.5.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ and _<a id="id-1.17.14.3.6.1" class="indexterm"></a>[_se_](../go01#valsi-se)_ modifier of the original connectives. Cancel any double negatives that result.

<a id="id-1.17.14.4.1" class="indexterm"></a><a id="id-1.17.14.4.2" class="indexterm"></a><a id="id-1.17.14.4.3" class="indexterm"></a>When do we apply DeMorgan's Law? Whenever we wish to “distribute” a negation over a logical connective; and, for internal _<a id="id-1.17.14.4.5.1" class="indexterm"></a>naku_ negation, whenever a logical connective moves in to, or out of, the scope of a negation – when it crosses a negation boundary.

<a id="id-1.17.14.5.1" class="indexterm"></a>Let us apply DeMorgan's Law to some sample sentences. These sentences make use of forethought logical connectives, which are explained in [Section 14.5](../section-forethought-bridi-connection). It suffices to know that _<a id="id-1.17.14.5.3.1" class="indexterm"></a>[_ga_](../go01#valsi-ga)_ and _<a id="id-1.17.14.5.4.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ , used before each of a pair of sumti or bridi, mean “either” and “or” respectively, and that _<a id="id-1.17.14.5.7.1" class="indexterm"></a>[_ge_](../go01#valsi-ge)_ and _<a id="id-1.17.14.5.8.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ used similarly mean “both” and “and”. Furthermore, _<a id="id-1.17.14.5.11.1" class="indexterm"></a>[_ga_](../go01#valsi-ga)_ , _<a id="id-1.17.14.5.12.1" class="indexterm"></a>[_ge_](../go01#valsi-ge)_ , and _<a id="id-1.17.14.5.13.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ can all be suffixed with _<a id="id-1.17.14.5.14.1" class="indexterm"></a>[_nai_](../go01#valsi-nai)_ to negate the bridi or sumti that follows.

<a id="id-1.17.14.6.1" class="indexterm"></a><a id="id-1.17.14.6.2" class="indexterm"></a><a id="id-1.17.14.6.3" class="indexterm"></a><a id="id-1.17.14.6.4" class="indexterm"></a>We have defined _<a id="id-1.17.14.6.5.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ and _<a id="id-1.17.14.6.6.1" class="indexterm"></a>naku zo'u_ as, respectively, internal and external bridi negation. These forms being identical, the negation boundary always remains at the left end of the prenex. Thus, exporting or importing negation between external and internal bridi negation forms never requires DeMorgan's Law to be applied. [Example 16.94](../section-demorgans-law#example-random-id-qHPi) and [Example 16.95](../section-demorgans-law#example-random-id-qHPI) are exactly equivalent:

<div class="interlinear-gloss-example example">
<a id="example-random-id-qHPi"></a>

**Example 16.94. <a id="c16e12d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>la</td><td>.djan.</td><td>na</td><td>klama</td><td>ga</td></tr><tr class="gloss"><td>that-named</td><td>John</td><td>[false]</td><td>goes-to</td><td>either</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>la</td><td>.paris.</td><td>gi</td><td>la</td><td>.rom.</td></tr><tr class="gloss"><td>that-named</td><td>Paris</td><td>or</td><td>that-named</td><td>Rome.</td></tr></tbody></table>

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qHPI"></a>

**Example 16.95. <a id="c16e12d2"></a><a id="id-1.17.14.8.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>zo'u</td><td>la</td><td>.djan.</td><td>klama</td></tr><tr class="gloss"><td>It-is-false</td><td>that:</td><td>that-named</td><td>John</td><td>goes-to</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ga</td><td>la</td><td>.paris.</td><td>gi</td><td>la</td><td>.rom.</td></tr><tr class="gloss"><td>either</td><td>that-named</td><td>Paris</td><td>or</td><td>that-named</td><td>Rome.</td></tr></tbody></table>

</div>  

<a id="id-1.17.14.9.1" class="indexterm"></a><a id="id-1.17.14.9.2" class="indexterm"></a><a id="id-1.17.14.9.3" class="indexterm"></a>It is not an acceptable logical manipulation to move a negator from the bridi level to one or more sumti. However, [Example 16.94](../section-demorgans-law#example-random-id-qHPi) and related examples are not sumti negations, but rather expand to form two logically connected sentences. In such a situation, DeMorgan's Law must be applied. For instance, [Example 16.95](../section-demorgans-law#example-random-id-qHPI) expands to:

<div class="interlinear-gloss-example example">
<a id="example-random-id-KMct"></a>

**Example 16.96. <a id="c16e12d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td></td><td>ge</td><td>la</td><td>.djan.</td><td>la</td><td>.paris.</td><td>na</td><td>klama</td></tr><tr class="gloss"><td>[It-is-true-that]</td><td>both</td><td>that-named</td><td>John,</td><td>to-that-named</td><td>Paris,</td><td>[false]</td><td>goes,</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gi</td><td>la</td><td>.djan.</td><td>la</td><td>.rom.</td><td>na</td><td>klama</td></tr><tr class="gloss"><td>and</td><td>that-named</td><td>John,</td><td>to-that-named</td><td>Rome,</td><td>[false]</td><td>goes.</td></tr></tbody></table>

</div>  

The _<a id="id-1.17.14.11.1.1" class="indexterm"></a>[_ga_](../go01#valsi-ga)_ and _<a id="id-1.17.14.11.2.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ , meaning “either-or” , have become _<a id="id-1.17.14.11.4.1" class="indexterm"></a>[_ge_](../go01#valsi-ge)_ and _<a id="id-1.17.14.11.5.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ , meaning “both-and” , as a consequence of moving the negators into the individual bridi.

<a id="id-1.17.14.12.1" class="indexterm"></a><a id="id-1.17.14.12.2" class="indexterm"></a>Here is another example of DeMorgan's Law in action, involving bridi-tail logical connection (explained in [Section 14.9](../section-compound-bridi)):

<div class="interlinear-gloss-example example">
<a id="example-random-id-qHpR"></a>

**Example 16.97. <a id="c16e12d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>la</td><td>.djein.</td><td>le</td><td>zarci</td><td>na</td><td>ge</td><td>dzukla</td><td>gi</td><td>bajrykla</td></tr><tr class="gloss"><td>that-named</td><td>Jane</td><td>to-the</td><td>market</td><td>[false]</td><td>both</td><td>walks</td><td>and</td><td>runs.</td></tr></tbody></table>

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qHQ2"></a>

**Example 16.98. <a id="c16e12d5"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>la</td><td>.djein.</td><td>le</td><td>zarci</td><td>ganai</td><td>dzukla</td><td>ginai</td><td>bajrykla</td></tr><tr class="gloss"><td>that-named</td><td>Jane</td><td>to-the</td><td>market</td><td>either-([false]</td><td>walks)</td><td>or-([false]</td><td>runs.</td></tr><tr class="gloss"><td>that-named</td><td>Jane</td><td>to-the</td><td>market</td><td>if</td><td>walks</td><td>then-([false]</td><td>runs).</td></tr></tbody></table>

</div>  

(Placing _<a id="id-1.17.14.15.1.1" class="indexterm"></a>le zarci_ before the selbri makes sure that it is properly associated with both parts of the logical connection. Otherwise, it is easy to erroneously leave it off one of the two sentences.)

<a id="id-1.17.14.16.1" class="indexterm"></a>It is wise, before freely doing transformations such as the one from [Example 16.97](../section-demorgans-law#example-random-id-qHpR) to [Example 16.98](../section-demorgans-law#example-random-id-qHQ2) , that you become familiar with expanding logical connectives to separate sentences, transforming the sentences, and then recondensing. Thus, you would prove the transformation correct by the following steps. By moving its _<a id="id-1.17.14.16.4.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ to the beginning of the prenex as a _<a id="id-1.17.14.16.5.1" class="indexterm"></a>naku_ , [Example 16.97](../section-demorgans-law#example-random-id-qHpR) becomes:

<div class="interlinear-gloss-example example">
<a id="example-random-id-g5PI"></a>

**Example 16.99. <a id="c16e12d6"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>zo'u</td><td>la</td><td>.djein.</td><td>le</td><td>zarci</td></tr><tr class="gloss"><td>It-is-false-that</td><td>:</td><td>that-named</td><td>Jane</td><td>to-the</td><td>market</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ge</td><td>dzukla</td><td>gi</td><td>bajrykla</td></tr><tr class="gloss"><td>(both</td><td>walks</td><td>and</td><td>runs).</td></tr></tbody></table>

</div>  

And by dividing the bridi with logically connected selbri into two bridi,

<div class="interlinear-gloss-example example">
<a id="example-random-id-axCE"></a>

**Example 16.100. <a id="c16e12d7"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>zo'u</td><td>ge</td><td>la</td><td>.djein.</td><td>le</td><td>zarci</td><td>cu</td><td>dzukla</td></tr><tr class="gloss"><td>It-is-false</td><td>that:</td><td>both</td><td>(that-named</td><td>Jane</td><td>to-the</td><td>market</td><td></td><td>walks)</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gi</td><td>la</td><td>.djein.</td><td>le</td><td>zarci</td><td>cu</td><td>bajrykla</td></tr><tr class="gloss"><td>and</td><td>(that-named</td><td>Jane</td><td>to-the</td><td>market</td><td></td><td>runs).</td></tr></tbody></table>

</div>  

is the result.

At this expanded level, we apply DeMorgan's Law to distribute the negation in the prenex across both sentences, to get

<div class="interlinear-gloss-example example">
<a id="example-random-id-bsu7"></a>

**Example 16.101. <a id="c16e12d8"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ga</td><td>la</td><td>.djein.</td><td>le</td><td>zarci</td><td>na</td><td>dzukla</td></tr><tr class="gloss"><td>Either</td><td>that-named</td><td>Jane</td><td>to-the</td><td>market</td><td>[false]</td><td>walks,</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gi</td><td>la</td><td>.djein.</td><td>le</td><td>zarci</td><td>na</td><td>bajrykla</td></tr><tr class="gloss"><td>or</td><td>that-named</td><td>Jane</td><td>to-the</td><td>market</td><td>[false]</td><td>runs.</td></tr></tbody></table>

</div>  

which is the same as

<div class="interlinear-gloss-example example">
<a id="example-random-id-jYWu"></a>

**Example 16.102. <a id="c16e12d9"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ganai</td><td>la</td><td>.djein.</td><td>le</td><td>zarci</td><td>cu</td><td>dzukla</td></tr><tr class="gloss"><td>If</td><td>that-named</td><td>Jane</td><td>to-the</td><td>market</td><td></td><td>walks,</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ginai</td><td>la</td><td>.djein.</td><td>le</td><td>zarci</td><td>cu</td><td>bajrykla</td></tr><tr class="gloss"><td>then-([false]</td><td>that-named</td><td>Jane</td><td>to-the</td><td>market</td><td></td><td>runs).</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">If Jane walks to the market, then she doesn't run.</p></td></tr></tbody></table>

</div>  

which then condenses down to [Example 16.98](../section-demorgans-law#example-random-id-qHQ2).

<a id="id-1.17.14.26.1" class="indexterm"></a><a id="id-1.17.14.26.2" class="indexterm"></a>DeMorgan's Law must also be applied to internal _<a id="id-1.17.14.26.3.1" class="indexterm"></a>naku_ negations:

<div class="interlinear-gloss-example example">
<a id="example-random-id-qhQP"></a>

**Example 16.103. <a id="c16e12d10"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ga</td><td>la</td><td>.paris.</td><td>gi</td><td>la</td><td>.rom.</td></tr><tr class="gloss"><td>(Either</td><td>that-named</td><td>Paris</td><td>or</td><td>that-named</td><td>Rome)</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>se</td><td>klama</td><td>la</td><td>.djan.</td></tr><tr class="gloss"><td>is-not</td><td>gone-to-by</td><td>that-named</td><td>John.</td></tr></tbody></table>

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qhQw"></a>

**Example 16.104. <a id="c16e12d11"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>la</td><td>.djan.</td><td>naku</td><td>klama</td><td>ge</td></tr><tr class="gloss"><td>that-named</td><td>John</td><td>doesn't</td><td>go-to</td><td>both</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>la</td><td>.paris.</td><td>gi</td><td>la</td><td>.rom.</td></tr><tr class="gloss"><td>that-named</td><td>Paris</td><td>and</td><td>that-named</td><td>Rome.</td></tr></tbody></table>

</div>  

That [Example 16.103](../section-demorgans-law#example-random-id-qhQP) and [Example 16.104](../section-demorgans-law#example-random-id-qhQw) mean the same should become evident by studying the English. It is a good exercise to work through the Lojban and prove that they are the same.