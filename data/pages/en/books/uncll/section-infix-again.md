<a id="section-infix-again"></a>18.14. <a id="c18s14"></a>Infix operators revisited
-----------------------------------------------------------------------------------

The following cmavo are discussed in this section:

<table class="cmavo-list"><colgroup></colgroup><tbody><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">tu'o</p></td><td class="selmaho"><p class="selmaho">PA</p></td><td class="description"><p class="description">null operand</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">ge'a</p></td><td class="selmaho"><p class="selmaho">VUhU</p></td><td class="description"><p class="description">null operator</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">gei</p></td><td class="selmaho"><p class="selmaho">VUhU</p></td><td class="description"><p class="description">exponential notation</p></td></tr></tbody></table>

The infix operators presented so far have always had exactly two operands, and for more or fewer operands forethought notation has been required. However, it is possible to use an operator in infix style even though it has more or fewer than two operands, through the use of a pair of tricks: the null operand _<a id="id-1.19.16.4.1.1" class="indexterm"></a>[_tu'o_](../go01#valsi-tuho)_ and the null operator _<a id="id-1.19.16.4.2.1" class="indexterm"></a>[_ge'a_](../go01#valsi-geha)_. The first is suitable when there are too few operands, the second when there are too many. For example, suppose we wanted to express the numerical negation operator _<a id="id-1.19.16.4.3.1" class="indexterm"></a>[_va'a_](../go01#valsi-vaha)_ in infix form. We would use:

<div class="interlinear-gloss-example example">
<a id="example-random-id-8Uh9"></a>

**Example 18.103. <a id="c18e14d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>tu'o</td><td>va'a</td><td>ny.</td><td>du</td><td>li</td><td>no</td><td>vu'u</td><td>ny.</td></tr><tr class="gloss"><td>The-number</td><td>(null)</td><td>additive-inverse</td><td>n</td><td>equals</td><td>the-number</td><td>zero</td><td>minus</td><td>n.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">-n = 0 − n</span></div></td></tr></tbody></table>

</div>  

<a id="id-1.19.16.6.1" class="indexterm"></a><a id="id-1.19.16.6.2" class="indexterm"></a><a id="id-1.19.16.6.3" class="indexterm"></a>The _<a id="id-1.19.16.6.4.1" class="indexterm"></a>[_tu'o_](../go01#valsi-tuho)_ fulfills the grammatical requirement for a left operand for the infix use of _<a id="id-1.19.16.6.5.1" class="indexterm"></a>[_va'a_](../go01#valsi-vaha)_ , even though semantically none is needed or wanted.

<a id="id-1.19.16.7.1" class="indexterm"></a><a id="id-1.19.16.7.2" class="indexterm"></a><a id="id-1.19.16.7.3" class="indexterm"></a>Finding a suitable example of _<a id="id-1.19.16.7.4.1" class="indexterm"></a>[_ge'a_](../go01#valsi-geha)_ requires exhibiting a ternary operator, and ternary operators are not common. The operator _<a id="id-1.19.16.7.5.1" class="indexterm"></a>[_gei_](../go01#valsi-gei)_ , however, has both a binary and a ternary use. As a binary operator, it provides a terse representation of scientific (also called “exponential”) notation. The first operand of _<a id="id-1.19.16.7.7.1" class="indexterm"></a>[_gei_](../go01#valsi-gei)_ is the exponent, and the second operand is the mantissa or fraction:

<div class="interlinear-gloss-example example">
<a id="example-random-id-VjtV"></a>

**Example 18.104. <a id="c18e14d2"></a><a id="id-1.19.16.8.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>cinonoki'oki'o</td><td>du</td></tr><tr class="gloss"><td>The-number</td><td>three-zero-zero-comma-comma</td><td>equals</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>bi</td><td>gei</td><td>ci</td></tr><tr class="gloss"><td>the-number</td><td>eight</td><td>scientific</td><td>three.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">300,000,000 = 3 × 10 <sup>8</sup></span></div></td></tr></tbody></table>

</div>  

<a id="id-1.19.16.9.1" class="indexterm"></a><a id="id-1.19.16.9.2" class="indexterm"></a>Why are the arguments to _<a id="id-1.19.16.9.3.1" class="indexterm"></a>[_gei_](../go01#valsi-gei)_ in reverse order from the conventional symbolic notation? So that _<a id="id-1.19.16.9.4.1" class="indexterm"></a>[_gei_](../go01#valsi-gei)_ can be used in forethought to allow easy specification of a large (or small) imprecise number:

<div class="interlinear-gloss-example example">
<a id="example-random-id-zmqy"></a>

**Example 18.105. <a id="c18e14d3"></a><a id="id-1.19.16.10.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gei</td><td>reno</td></tr><tr class="gloss"><td>(scientific)</td><td>two-zero</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">10 <sup>20</sup></span></div></td></tr></tbody></table>

</div>  

<a id="id-1.19.16.11.1" class="indexterm"></a><a id="id-1.19.16.11.2" class="indexterm"></a><a id="id-1.19.16.11.3" class="indexterm"></a><a id="id-1.19.16.11.4" class="indexterm"></a><a id="id-1.19.16.11.5" class="indexterm"></a><a id="id-1.19.16.11.6" class="indexterm"></a>Note, however, that although 10 is far and away the most common exponent base, it is not the only possible one. The third operand of _<a id="id-1.19.16.11.7.1" class="indexterm"></a>[_gei_](../go01#valsi-gei)_ , therefore, is the base, with 10 as the default value. Most computers internally store so-called “floating-point” numbers using 2 as the exponent base. (This has nothing to do with the fact that computers also represent all integers in base 2; the IBM 360 series used an exponent base of 16 for floating point, although each component of the number was expressed in base 2.) Here is a computer floating-point number with a value of 40:

<div class="interlinear-gloss-example example">
<a id="example-random-id-7nMz"></a>

**Example 18.106. <a id="c18e14d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>papano</td><td>bi'eju'u</td><td>re</td><td>gei</td></tr><tr class="gloss"><td>(one-one-zero</td><td>base</td><td>2)</td><td>scientific</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>pipanopano</td><td>bi'eju'u</td><td>re</td><td>ge'a</td><td>re</td></tr><tr class="gloss"><td>(point-one-zero-one-zero</td><td>base</td><td>2)</td><td>with-base</td><td>2</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">.1010 <sub>2</sub> x 2 <sup>110 <sub>2</sub></sup></span></div></td></tr></tbody></table>

</div>