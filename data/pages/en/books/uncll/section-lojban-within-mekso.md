<a id="section-lojban-within-mekso"></a>18.18. <a id="c18s18"></a>Using Lojban resources within mekso
-----------------------------------------------------------------------------------------------------

The following cmavo are discussed in this section:

<table class="cmavo-list"><colgroup></colgroup><tbody><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">na'u</p></td><td class="selmaho"><p class="selmaho">NAhU</p></td><td class="description"><p class="description">selbri to operator</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">ni'e</p></td><td class="selmaho"><p class="selmaho">NIhE</p></td><td class="description"><p class="description">selbri to operand</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">mo'e</p></td><td class="selmaho"><p class="selmaho">MOhE</p></td><td class="description"><p class="description">sumti to operand</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">te'u</p></td><td class="selmaho"><p class="selmaho">TEhU</p></td><td class="description"><p class="description">terminator for all three</p></td></tr></tbody></table>

<a id="id-1.19.20.4.1" class="indexterm"></a><a id="id-1.19.20.4.2" class="indexterm"></a><a id="id-1.19.20.4.3" class="indexterm"></a>One of the mekso design goals requires the ability to make use of Lojban's vocabulary resources within mekso to extend the built-in cmavo for operands and operators. There are three relevant constructs: all three share the elidable terminator _<a id="id-1.19.20.4.4.1" class="indexterm"></a>[_te'u_](../go01#valsi-tehu)_ (which is also used to terminate vectors marked with _<a id="id-1.19.20.4.5.1" class="indexterm"></a>[_jo'i_](../go01#valsi-johi)_)

<a id="id-1.19.20.5.1" class="indexterm"></a><a id="id-1.19.20.5.2" class="indexterm"></a><a id="id-1.19.20.5.3" class="indexterm"></a><a id="id-1.19.20.5.4" class="indexterm"></a><a id="id-1.19.20.5.5" class="indexterm"></a>The cmavo _<a id="id-1.19.20.5.6.1" class="indexterm"></a>[_na'u_](../go01#valsi-nahu)_ makes a selbri into an operator. In general, the first place of the selbri specifies the result of the operator, and the other unfilled places specify the operands:

<div class="interlinear-gloss-example example">
<a id="example-random-id-k38f"></a>

**Example 18.124. <a id="c18e18d1"></a><a id="id-1.19.20.6.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>na'u</td><td>tanjo</td><td>te'u</td></tr><tr class="gloss"><td>The-number</td><td>the-operator</td><td>tangent</td><td>[end-operator]</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>vei</td><td>pai</td><td>fe'i</td><td>re</td><td>[ve'o]</td><td>du</td><td>li</td><td>ci'i</td></tr><tr class="gloss"><td>(</td><td>π</td><td>/</td><td>2</td><td>)</td><td>=</td><td>the-number</td><td>infinity.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">tan(π/2) = ∞</span></div></td></tr></tbody></table>

</div>  

_<a id="id-1.19.20.7.1.1" class="indexterm"></a>[_tanjo_](../go01#valsi-tanjo)_ is the gismu for “x1 is the tangent of x2” , and the _<a id="id-1.19.20.7.3.1" class="indexterm"></a>[_na'u_](../go01#valsi-nahu)_ here makes it into an operator which is then used in forethought

<a id="id-1.19.20.8.1" class="indexterm"></a><a id="id-1.19.20.8.2" class="indexterm"></a><a id="id-1.19.20.8.3" class="indexterm"></a><a id="id-1.19.20.8.4" class="indexterm"></a>The cmavo _<a id="id-1.19.20.8.5.1" class="indexterm"></a>[_ni'e_](../go01#valsi-nihe)_ makes a selbri into an operand. The x1 place of the selbri generally represents a number, and therefore is often a _<a id="id-1.19.20.8.7.1" class="indexterm"></a>[_ni_](../go01#valsi-ni)_ abstraction, since _<a id="id-1.19.20.8.8.1" class="indexterm"></a>[_ni_](../go01#valsi-ni)_ abstractions represent numbers. The _<a id="id-1.19.20.8.9.1" class="indexterm"></a>[_ni'e_](../go01#valsi-nihe)_ makes that number available as a mekso operand. A common application is to make equations relating pure dimensions:

<div class="interlinear-gloss-example example">
<a id="example-random-id-wCJQ"></a>

**Example 18.125. <a id="c18e18d2"></a><a id="id-1.19.20.9.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>ni'e</td><td>ni</td><td>clani</td><td>[te'u]</td></tr><tr class="gloss"><td>The-number</td><td></td><td>quantity-of</td><td>length</td><td></td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>pi'i</td><td>ni'e</td><td>ni</td><td>ganra</td><td>[te'u]</td></tr><tr class="gloss"><td>times</td><td></td><td>quantity-of</td><td>width</td><td></td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>pi'i</td><td>ni'e</td><td>ni</td><td>condi</td><td>te'u</td></tr><tr class="gloss"><td>times</td><td></td><td>quantity-of</td><td>depth</td><td></td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>du</td><td>li</td><td>ni'e</td><td>ni</td><td>canlu</td></tr><tr class="gloss"><td>equals</td><td>the-number</td><td></td><td>quantity-of</td><td>volume.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">Length × Width × Depth = Volume</span></div></td></tr></tbody></table>

</div>  

<a id="id-1.19.20.10.1" class="indexterm"></a><a id="id-1.19.20.10.2" class="indexterm"></a><a id="id-1.19.20.10.3" class="indexterm"></a><a id="id-1.19.20.10.4" class="indexterm"></a>The cmavo _<a id="id-1.19.20.10.5.1" class="indexterm"></a>[_mo'e_](../go01#valsi-mohe)_ operates similarly to _<a id="id-1.19.20.10.6.1" class="indexterm"></a>[_ni'e_](../go01#valsi-nihe)_ , but makes a sumti (rather than a selbri) into an operand. This construction is useful in stating equations involving dimensioned numbers:

<div class="interlinear-gloss-example example">
<a id="example-random-id-ETmX"></a>

**Example 18.126. <a id="c18e18d3"></a><a id="id-1.19.20.11.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>mo'e</td><td>re</td><td>ratcu</td><td>su'i</td><td>mo'e</td><td>re</td><td>ractu</td></tr><tr class="gloss"><td>The-number</td><td></td><td>two</td><td>rats</td><td>plus</td><td></td><td>two</td><td>rabbits</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>du</td><td>li</td><td>mo'e</td><td>vo</td><td>danlu</td></tr><tr class="gloss"><td>equals</td><td>the-number</td><td></td><td>four</td><td>animals.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">2 rats + 2 rabbits = 4 animals.</span></div></td></tr></tbody></table>

</div>  

<a id="id-1.19.20.12.1" class="indexterm"></a>Another use is in constructing Lojbanic versions of so-called “folk quantifiers” , such as “a pride of lions” :

<div class="interlinear-gloss-example example">
<a id="example-random-id-D4y4"></a>

**Example 18.127. <a id="c18e18d4"></a><a id="id-1.19.20.13.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>viska</td><td>vei</td><td>mo'e</td><td>lo'e</td><td>lanzu</td><td>ve'o</td><td>cinfo</td></tr><tr class="gloss"><td>I</td><td>see</td><td>(</td><td></td><td>the-typical</td><td>family</td><td>)-number-of</td><td>lions.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">I see a pride of lions.</p></td></tr></tbody></table>

</div>