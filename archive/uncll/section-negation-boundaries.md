<a id="section-negation-boundaries"></a>16.9. <a id="c16s9"></a>Negation boundaries
-----------------------------------------------------------------------------------

<a id="id-1.17.11.2.1" class="indexterm"></a>This section, as well as [Section 16.10](../section-connectives) through [Section 16.12](../section-demorgans-law) , are in effect a continuation of [Chapter 15](../chapter-negation) , introducing features of Lojban negation that require an understanding of prenexes and variables. In the examples below, “there is a Y” and the like must be understood as “there is at least one Y, possibly more”.

<a id="id-1.17.11.3.1" class="indexterm"></a>As explained in [Section 15.2](../section-bridi-negation) , the negation of a bridi is usually accomplished by inserting _<a id="id-1.17.11.3.3.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ at the beginning of the selbri:

<div class="interlinear-gloss-example example">
<a id="example-random-id-hBRH"></a>

**Example 16.57. <a id="c16e9d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>na</td><td>klama</td><td>le</td><td>zarci</td></tr><tr class="gloss"><td>I</td><td>[false]</td><td>go-to</td><td>the</td><td>store.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">It is false that I go to the store.</p></td></tr><tr class="para"><td colspan="12321"><p class="natlang">I don't go to the store.</p></td></tr></tbody></table>

</div>  

The other form of bridi negation is expressed by using the compound cmavo _<a id="id-1.17.11.5.1.1" class="indexterm"></a>naku_ in the prenex, which is identified and compounded by the lexer before looking at the sentence grammar. In Lojban grammar, _<a id="id-1.17.11.5.2.1" class="indexterm"></a>naku_ is then treated like a sumti. In a prenex, _<a id="id-1.17.11.5.3.1" class="indexterm"></a>naku_ means precisely the same thing as the logician's “it is not the case that” in a similar English context. (Outside of a prenex, _<a id="id-1.17.11.5.5.1" class="indexterm"></a>naku_ is also grammatically treated as a single entity – the equivalent of a sumti – but does not have this exact meaning; we'll discuss these other situations in [Section 16.11](../section-na-outside-prenex).)

<a id="id-1.17.11.6.1" class="indexterm"></a><a id="id-1.17.11.6.2" class="indexterm"></a><a id="id-1.17.11.6.3" class="indexterm"></a><a id="id-1.17.11.6.4" class="indexterm"></a><a id="id-1.17.11.6.5" class="indexterm"></a><a id="id-1.17.11.6.6" class="indexterm"></a>To represent a bridi negation using a prenex, remove the _<a id="id-1.17.11.6.7.1" class="indexterm"></a>[_na_](../go01#valsi-na)_ from before the selbri and place _<a id="id-1.17.11.6.8.1" class="indexterm"></a>naku_ at the left end of the prenex. This form is called “external bridi negation” , as opposed to “internal bridi negation” using _<a id="id-1.17.11.6.11.1" class="indexterm"></a>[_na_](../go01#valsi-na)_. The prenex version of [Example 16.57](../section-negation-boundaries#example-random-id-hBRH) is

<div class="interlinear-gloss-example example">
<a id="example-random-id-IH8J"></a>

**Example 16.58. <a id="c16e9d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>zo'u</td><td>mi</td><td>klama</td><td>le</td><td>zarci</td></tr><tr class="gloss"><td>It-is-not-the-case-that</td><td>:</td><td>I</td><td>go-to</td><td>the</td><td>store.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">It is false that: I go to the store.</p></td></tr></tbody></table>

</div>  

<a id="id-1.17.11.8.1" class="indexterm"></a>However, _<a id="id-1.17.11.8.2.1" class="indexterm"></a>naku_ can appear at other points in the prenex as well. Compare

<div class="interlinear-gloss-example example">
<a id="example-random-id-cy6j"></a>

**Example 16.59. <a id="c16e9d3"></a><a id="id-1.17.11.9.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>de</td><td>zo'u</td><td>de</td><td>zutse</td></tr><tr class="gloss"><td>It-is-not-the-case-that:</td><td>for-some-Y</td><td>:</td><td>Y</td><td>sits.</td></tr><tr class="gloss"><td>It-is-false-that:</td><td>for-at-least-one-Y</td><td>:</td><td>Y</td><td>sits.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">It is false that something sits.</p></td></tr><tr class="para"><td colspan="12321"><p class="natlang">Nothing sits.</p></td></tr></tbody></table>

</div>  

with

<div class="interlinear-gloss-example example">
<a id="example-random-id-2Fw3"></a>

**Example 16.60. <a id="c16e9d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>su'ode</td><td>naku</td><td>zo'u</td><td>de</td><td>zutse</td></tr><tr class="gloss"><td>For-at-least-one-Y,</td><td>it-is-false-that</td><td>:</td><td>Y</td><td>sits.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">There is something that doesn't sit.</p></td></tr></tbody></table>

</div>  

The relative position of negation and quantification terms within a prenex has a drastic effect on meaning. Starting without a negation, we can have:

<div class="interlinear-gloss-example example">
<a id="example-random-id-21Y5"></a>

**Example 16.61. <a id="c16e9d5"></a><a id="id-1.17.11.13.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>roda</td><td>su'ode</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>For-every-X,</td><td>there-is-a-Y,</td><td>such-that</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">Everybody loves at least one thing (each, not necessarily the same thing).</p></td></tr></tbody></table>

</div>  

or:

<div class="interlinear-gloss-example example">
<a id="example-random-id-Tj99"></a>

**Example 16.62. <a id="c16e9d6"></a><a id="id-1.17.11.15.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>su'ode</td><td>roda</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>There-is-a-Y,</td><td>such-that-for-each-X</td><td>:</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">There is at least one particular thing that is loved by everybody.</p></td></tr></tbody></table>

</div>  

The simplest form of bridi negation to interpret is one where the negation term is at the beginning of the prenex:

<div class="interlinear-gloss-example example">
<a id="example-random-id-1LqV"></a>

**Example 16.63. <a id="c16e9d7"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>roda</td><td>su'ode</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>It-is-false-that:</td><td>for-every-X,</td><td>there-is-a-Y,</td><td>such-that:</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">It is false that: everybody loves at least one thing.</p></td></tr><tr class="para"><td colspan="12321"><p class="natlang">(At least) someone doesn't love anything.</p></td></tr></tbody></table>

</div>  

the negation of [Example 16.61](../section-negation-boundaries#example-random-id-21Y5) , and

<div class="interlinear-gloss-example example">
<a id="example-random-id-u1jY"></a>

**Example 16.64. <a id="c16e9d8"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>su'ode</td><td></td><td>roda</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>It-is-false-that:</td><td>there-is-a-Y</td><td>such-that</td><td>for-each-X</td><td>:</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">It is false that: there is at least one thing that is loved by everybody.</p></td></tr><tr class="para"><td colspan="12321"><p class="natlang">There isn't any one thing that everybody loves.</p></td></tr></tbody></table>

</div>  

the negation of [Example 16.62](../section-negation-boundaries#example-random-id-Tj99).

<a id="id-1.17.11.21.1" class="indexterm"></a><a id="id-1.17.11.21.2" class="indexterm"></a><a id="id-1.17.11.21.3" class="indexterm"></a>The rules of formal logic require that, to move a negation boundary within a prenex, you must “invert any quantifier” that the negation boundary passes across. Inverting a quantifier means that any _<a id="id-1.17.11.21.5.1" class="indexterm"></a>[_ro_](../go01#valsi-ro)_ (all) is changed to _<a id="id-1.17.11.21.6.1" class="indexterm"></a>[_su'o_](../go01#valsi-suho)_ (at least one) and vice versa. Thus, [Example 16.63](../section-negation-boundaries#example-random-id-1LqV) and [Example 16.64](../section-negation-boundaries#example-random-id-u1jY) can be restated as, respectively:

<div class="interlinear-gloss-example example">
<a id="example-random-id-cJLQ"></a>

**Example 16.65. <a id="c16e9d9"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>su'oda</td><td>naku</td><td>su'ode</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>For-some-X,</td><td>it-is-false-that:</td><td>there-is-a-Y</td><td>such-that:</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">There is somebody who doesn't love anything.</p></td></tr></tbody></table>

</div>  

and:

<div class="interlinear-gloss-example example">
<a id="example-random-id-hBXT"></a>

**Example 16.66. <a id="c16e9d10"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>rode</td><td>naku</td><td>roda</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>For-every-Y,</td><td>it-is-false-that:</td><td>for-every-X</td><td>:</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">For each thing, it is not true that everybody loves it.</p></td></tr></tbody></table>

</div>  

Another movement of the negation boundary produces:

<div class="interlinear-gloss-example example">
<a id="example-random-id-w6XF"></a>

**Example 16.67. <a id="c16e9d11"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>su'oda</td><td>rode</td><td>naku</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>There-is-an-X</td><td>such-that-for-every-Y,</td><td>it-is-false-that</td><td>:</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">There is someone who, for each thing, doesn't love that thing.</p></td></tr></tbody></table>

</div>  

and

<div class="interlinear-gloss-example example">
<a id="example-random-id-JY08"></a>

**Example 16.68. <a id="c16e9d12"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>rode</td><td>su'oda</td><td>naku</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>For-every-Y,</td><td>there-is-an-X,</td><td>such-that-it-is-false-that</td><td>:</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">For each thing there is someone who doesn't love it.</p></td></tr></tbody></table>

</div>  

<a id="id-1.17.11.29.1" class="indexterm"></a>Investigation will show that, indeed, each transformation preserves the meanings of [Example 16.63](../section-negation-boundaries#example-random-id-1LqV) and [Example 16.64](../section-negation-boundaries#example-random-id-u1jY).

<a id="id-1.17.11.30.1" class="indexterm"></a><a id="id-1.17.11.30.2" class="indexterm"></a>The quantifier _<a id="id-1.17.11.30.3.1" class="indexterm"></a>[_no_](../go01#valsi-no)_ (meaning “zero of”) also involves a negation boundary. To transform a bridi containing a variable quantified with _<a id="id-1.17.11.30.5.1" class="indexterm"></a>[_no_](../go01#valsi-no)_ , we must first expand it. Consider

<div class="interlinear-gloss-example example">
<a id="example-random-id-qCph"></a>

**Example 16.69. <a id="c16e9d13"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>noda</td><td>rode</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>There-is-no-X,</td><td>for-every-Y,</td><td>such-that</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">Nobody loves everything.</p></td></tr></tbody></table>

</div>  

which is negated by:

<div class="interlinear-gloss-example example">
<a id="example-random-id-fpeW"></a>

**Example 16.70. <a id="c16e9d14"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>noda</td><td>rode</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>It-is-false-that:</td><td>there-is-no-X-that,</td><td>for-every-Y</td><td>:</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">It is false that there is nobody who loves everything.</p></td></tr></tbody></table>

</div>  

<a id="id-1.17.11.34.1" class="indexterm"></a><a id="id-1.17.11.34.2" class="indexterm"></a><a id="id-1.17.11.34.3" class="indexterm"></a>We can simplify [Example 16.70](../section-negation-boundaries#example-random-id-fpeW) by transforming the prenex. To move the negation phrase within the prenex, we must first expand the _<a id="id-1.17.11.34.5.1" class="indexterm"></a>[_no_](../go01#valsi-no)_ quantifier. Thus “for no x” means the same thing as “it is false that for some x” , and the corresponding Lojban _<a id="id-1.17.11.34.8.1" class="indexterm"></a>[_noda_](../go01#valsi-noda)_ can be replaced by _<a id="id-1.17.11.34.9.1" class="indexterm"></a>naku su'oda_. Making this substitution, we get:

<div class="interlinear-gloss-example example">
<a id="example-random-id-xTie"></a>

**Example 16.71. <a id="c16e9d15"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>naku</td><td>naku</td><td>su'oda</td></tr><tr class="gloss"><td>It-is-false-that</td><td>it-is-false-that</td><td>there-is-some-X-such-that</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>…rode</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>for-every-X</td><td>:</td><td>X</td><td>loves</td><td>Y</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">It is false that it is false that: for an X, for every Y: X loves Y.</p></td></tr></tbody></table>

</div>  

Adjacent pairs of negation boundaries in the prenex can be dropped, so this means the same as:

<div class="interlinear-gloss-example example">
<a id="example-random-id-y7NU"></a>

**Example 16.72. <a id="c16e9d16"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>su'oda</td><td>rode</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>There-is-an-X-such-that,</td><td>for-every-Y</td><td>:</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">At least one person loves everything.</p></td></tr></tbody></table>

</div>  

which is clearly the desired contradiction of [Example 16.69](../section-negation-boundaries#example-random-id-qCph).

<a id="id-1.17.11.39.1" class="indexterm"></a><a id="id-1.17.11.39.2" class="indexterm"></a>The interactions between quantifiers and negation mean that you cannot eliminate double negatives that are not adjacent. You must first move the negation phrases so that they are adjacent, inverting any quantifiers they cross, and then the double negative can be eliminated.