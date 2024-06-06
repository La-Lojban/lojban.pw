<a id="section-forethought"></a>18.6. <a id="c18s6"></a>Forethought operators (Polish notation, functions)
----------------------------------------------------------------------------------------------------------

The following cmavo are discussed in this section:

<table class="cmavo-list"><colgroup></colgroup><tbody><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">boi</p></td><td class="selmaho"><p class="selmaho">BOI</p></td><td class="description"><p class="description">numeral/lerfu string terminator</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">va'a</p></td><td class="selmaho"><p class="selmaho">VUhU</p></td><td class="description"><p class="description">negation/additive inverse</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">pe'o</p></td><td class="selmaho"><p class="selmaho">PEhO</p></td><td class="description"><p class="description">forethought flag</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">ku'e</p></td><td class="selmaho"><p class="selmaho">KUhE</p></td><td class="description"><p class="description">forethought terminator</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">ma'o</p></td><td class="selmaho"><p class="selmaho">MAhO</p></td><td class="description"><p class="description">convert operand to operator</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">py.</p></td><td class="selmaho"><p class="selmaho">BY</p></td><td class="description"><p class="description">letter <span class="quote">“<span class="quote">p</span>”</span></p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">xy.</p></td><td class="selmaho"><p class="selmaho">BY</p></td><td class="description"><p class="description">letter <span class="quote">“<span class="quote">x</span>”</span></p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">zy.</p></td><td class="selmaho"><p class="selmaho">BY</p></td><td class="description"><p class="description">letter <span class="quote">“<span class="quote">z</span>”</span></p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">fy.</p></td><td class="selmaho"><p class="selmaho">BY</p></td><td class="description"><p class="description">letter <span class="quote">“<span class="quote">f</span>”</span></p></td></tr></tbody></table>

The infix form explained so far is reasonable for many purposes, but it is limited and rigid. It works smoothly only where all operators have exactly two operands, and where precedences can either be assumed from context or are limited to just two levels, with some help from parentheses.

But there are many operators which do not have two operands, or which have a variable number of operands. The preferred form of expression in such cases is the use of “forethought operators” , also known as Polish notation. In this style of writing mathematics, the operator comes first and the operands afterwards:

<div class="interlinear-gloss-example example">
<a id="example-random-id-I0Bm"></a>

**Example 18.32. <a id="c18e6d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>su'i</td><td>paboi</td><td>reboi</td><td>ci[boi]</td><td>du</td><td>li</td><td>xa</td></tr><tr class="gloss"><td>The-number</td><td>the-sum-of</td><td>one</td><td>two</td><td>three</td><td>equals</td><td>the-number</td><td>six.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">sum(1,2,3) = 6</span></div></td></tr></tbody></table>

</div>  

Note that the normally elidable number terminator _<a id="id-1.19.8.7.1.1" class="indexterm"></a>[_boi_](../go01#valsi-boi)_ is required after _<a id="id-1.19.8.7.2.1" class="indexterm"></a>[_pa_](../go01#valsi-pa)_ and _<a id="id-1.19.8.7.3.1" class="indexterm"></a>[_re_](../go01#valsi-re)_ because otherwise the reading would be _<a id="id-1.19.8.7.4.1" class="indexterm"></a>pareci_ = 123. It is not required after _<a id="id-1.19.8.7.5.1" class="indexterm"></a>[_ci_](../go01#valsi-ci)_ but is inserted here in brackets for the sake of symmetry. The only time _<a id="id-1.19.8.7.6.1" class="indexterm"></a>[_boi_](../go01#valsi-boi)_ is required is, as in [Example 18.32](../section-forethought#example-random-id-I0Bm) , when there are two consecutive numbers or lerfu strings.

Forethought mekso can use any number of operands, in [Example 18.32](../section-forethought#example-random-id-I0Bm) , three. How do we know how many operands there are in ambiguous circumstances? The usual Lojban solution is employed: an elidable terminator, namely _<a id="id-1.19.8.8.2.1" class="indexterm"></a>[_ku'e_](../go01#valsi-kuhe)_. Here is an example:

<div class="interlinear-gloss-example example">
<a id="example-random-id-IxMG"></a>

**Example 18.33. <a id="c18e6d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>py.</td><td>su'i</td><td>va'a</td><td>ny.</td><td>ku'e</td><td>su'i</td><td>zy</td><td>du</td></tr><tr class="gloss"><td>The-number</td><td><span class="quote">“<span class="quote">p</span>”</span></td><td>plus</td><td>negative-of(</td><td><span class="quote">“<span class="quote">n</span>”</span></td><td>)</td><td>plus</td><td><span class="quote">“<span class="quote">z</span>”</span></td><td>equals</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>xy.</td></tr><tr class="gloss"><td>the-number</td><td><span class="quote">“<span class="quote">x</span>”</span></td><td>.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">p + -n + z = x</span></div></td></tr></tbody></table>

</div>  

where we know that _<a id="id-1.19.8.10.1.1" class="indexterm"></a>[_va'a_](../go01#valsi-vaha)_ is a forethought operator because there is no operand preceding it.

_<a id="id-1.19.8.11.1.1" class="indexterm"></a>[_va'a_](../go01#valsi-vaha)_ is the numerical negation operator, of selma'o VUhU. In contrast, _<a id="id-1.19.8.11.2.1" class="indexterm"></a>[_vu'u_](../go01#valsi-vuhu)_ is not used for numerical negation, but only for subtraction, as it always has two or more operands. Do not confuse _<a id="id-1.19.8.11.3.1" class="indexterm"></a>[_va'a_](../go01#valsi-vaha)_ and _<a id="id-1.19.8.11.4.1" class="indexterm"></a>[_vu'u_](../go01#valsi-vuhu)_ , which are operators, with _<a id="id-1.19.8.11.5.1" class="indexterm"></a>[_ni'u_](../go01#valsi-nihu)_ , which is part of a number.

In [Example 18.33](../section-forethought#example-random-id-IxMG) , the operator _<a id="id-1.19.8.12.2.1" class="indexterm"></a>[_va'a_](../go01#valsi-vaha)_ and the terminator _<a id="id-1.19.8.12.3.1" class="indexterm"></a>[_ku'e_](../go01#valsi-kuhe)_ serve in effect as parentheses. (The regular parentheses _<a id="id-1.19.8.12.4.1" class="indexterm"></a>[_vei_](../go01#valsi-vei)_ and _<a id="id-1.19.8.12.5.1" class="indexterm"></a>[_ve'o_](../go01#valsi-veho)_ are NOT used for this purpose.) If the _<a id="id-1.19.8.12.6.1" class="indexterm"></a>[_ku'e_](../go01#valsi-kuhe)_ were omitted, the _<a id="id-1.19.8.12.7.1" class="indexterm"></a>su'i zy_ would be swallowed up by the _<a id="id-1.19.8.12.8.1" class="indexterm"></a>[_va'a_](../go01#valsi-vaha)_ forethought operator, which would then appear to have two operands, _<a id="id-1.19.8.12.9.1" class="indexterm"></a>[_ny._](../go01#valsi-ny)_ and _<a id="id-1.19.8.12.10.1" class="indexterm"></a>su'i zy._ , where the latter is also a forethought expression.

Forethought mekso is also useful for matching standard functional notation. How do we represent “z = f(x)” ? The answer is:

<div class="interlinear-gloss-example example">
<a id="example-random-id-VybU"></a>

**Example 18.34. <a id="c18e6d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>zy</td><td>du</td><td>li</td><td>ma'o</td><td>fy.boi</td><td>xy.</td></tr><tr class="gloss"><td>The-number</td><td>z</td><td>equals</td><td>the-number</td><td>the-operator</td><td>f</td><td>x.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">z = f(x)</span></div></td></tr></tbody></table>

</div>  

Again, no parentheses are used. The construct _<a id="id-1.19.8.15.1.1" class="indexterm"></a>ma'o fy.boi_ is the equivalent of an operator, and appears in forethought here (although it could also be used as a regular infix operator). In mathematics, letters sometimes mean functions and sometimes mean variables, with only the context to tell which. Lojban chooses to accept the variable interpretation as the default, and uses the special flag _<a id="id-1.19.8.15.2.1" class="indexterm"></a>[_ma'o_](../go01#valsi-maho)_ to mark a lerfu string as an operator. The cmavo _<a id="id-1.19.8.15.3.1" class="indexterm"></a>[_xy._](../go01#valsi-xy)_ and _<a id="id-1.19.8.15.4.1" class="indexterm"></a>[_zy._](../go01#valsi-zy)_ are variables, but _<a id="id-1.19.8.15.5.1" class="indexterm"></a>[_fy._](../go01#valsi-fy)_ is an operator (a function) because _<a id="id-1.19.8.15.6.1" class="indexterm"></a>[_ma'o_](../go01#valsi-maho)_ marks it as such. The _<a id="id-1.19.8.15.7.1" class="indexterm"></a>[_boi_](../go01#valsi-boi)_ is required because otherwise the _<a id="id-1.19.8.15.8.1" class="indexterm"></a>[_xy._](../go01#valsi-xy)_ would look like part of the operator name. (The use of _<a id="id-1.19.8.15.9.1" class="indexterm"></a>[_ma'o_](../go01#valsi-maho)_ can be generalized from lerfu strings to any mekso operand: see [Section 18.21](../section-miscellany).)

When using forethought mekso, the optional marker _<a id="id-1.19.8.16.1.1" class="indexterm"></a>[_pe'o_](../go01#valsi-peho)_ may be placed in front of the operator. This usage can help avoid confusion by providing clearly marked _<a id="id-1.19.8.16.2.1" class="indexterm"></a>[_pe'o_](../go01#valsi-peho)_ and _<a id="id-1.19.8.16.3.1" class="indexterm"></a>[_ku'e_](../go01#valsi-kuhe)_ pairs to delimit the operand list. [Example 18.32](../section-forethought#example-random-id-I0Bm) to [Example 18.34](../section-forethought#example-random-id-VybU) , respectively, with explicit _<a id="id-1.19.8.16.6.1" class="indexterm"></a>[_pe'o_](../go01#valsi-peho)_ and _<a id="id-1.19.8.16.7.1" class="indexterm"></a>[_ku'e_](../go01#valsi-kuhe)_ :

<div class="interlinear-gloss-example example">
<a id="example-random-id-qhz5"></a>

**Example 18.35. <a id="c18e6d4"></a>** 

<a id="id-1.19.8.17.2.1" class="indexterm"></a>li pe'o su'i paboi reboi ciboi ku'e du li xa

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qhzu"></a>

**Example 18.36. <a id="c18e6d5"></a>** 

<a id="id-1.19.8.18.2.1" class="indexterm"></a>li py. su'i pe'o va'a ny. ku'e su'i zy du li xy.

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qi0g"></a>

**Example 18.37. <a id="c18e6d6"></a>** 

<a id="id-1.19.8.19.2.1" class="indexterm"></a>li zy du li pe'o ma'o fy.boi xy. ku'e

</div>  

Note: When using forethought mekso, be sure that the operands really are operands: they cannot contain regular infix expressions unless parenthesized with _<a id="id-1.19.8.20.1.1" class="indexterm"></a>[_vei_](../go01#valsi-vei)_ and _<a id="id-1.19.8.20.2.1" class="indexterm"></a>[_ve'o_](../go01#valsi-veho)_. An earlier version of the complex [Example 18.119](../section-connectives-within-mekso#example-random-id-k36J) came to grief because I forgot this rule.