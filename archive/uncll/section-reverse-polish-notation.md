<a id="section-reverse-polish-notation"></a>18.16. <a id="c18s16"></a>Reverse Polish notation
---------------------------------------------------------------------------------------------

The following cmavo is discussed in this section:

<table class="cmavo-list"><colgroup></colgroup><tbody><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">fu'a</p></td><td class="selmaho"><p class="selmaho">FUhA</p></td><td class="description"><p class="description">reverse Polish flag</p></td></tr></tbody></table>

<a id="id-1.19.18.4.1" class="indexterm"></a>So far, the Lojban notational conventions have mapped fairly familiar kinds of mathematical discourse. The use of forethought operators may have seemed odd when applied to “+” , but when applied to “f” they appear as the usual functional notation. Now comes a sharp break. Reverse Polish (RP) notation represents something completely different; even mathematicians don't use it much. (The only common uses of RP, in fact, are in some kinds of calculators and in the implementation of some programming languages.)

<a id="id-1.19.18.5.1" class="indexterm"></a><a id="id-1.19.18.5.2" class="indexterm"></a><a id="id-1.19.18.5.3" class="indexterm"></a><a id="id-1.19.18.5.4" class="indexterm"></a>In RP notation, the operator follows the operands. (Polish notation, where the operator precedes its operands, is another name for forethought mekso of the kind explained in [Section 18.6](../section-forethought).) The number of operands per operator is always fixed. No parentheses are required or permitted. In Lojban, RP notation is always explicitly marked by a _<a id="id-1.19.18.5.6.1" class="indexterm"></a>[_fu'a_](../go01#valsi-fuha)_ at the beginning of the expression; there is no terminator. Here is a simple example:

<div class="interlinear-gloss-example example">
<a id="example-random-id-V4xe"></a>

**Example 18.110. <a id="c18e16d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>fu'a</td><td>reboi</td><td>ci</td><td>su'i</td><td>du</td><td>li</td><td>mu</td></tr><tr class="gloss"><td>the-number</td><td>(RP!)</td><td>two,</td><td>three,</td><td>plus</td><td>equals</td><td>the-number</td><td>five.</td></tr></tbody></table>

</div>  

The operands are _<a id="id-1.19.18.7.1.1" class="indexterm"></a>[_re_](../go01#valsi-re)_ and _<a id="id-1.19.18.7.2.1" class="indexterm"></a>[_ci_](../go01#valsi-ci)_ ; the operator is _<a id="id-1.19.18.7.3.1" class="indexterm"></a>[_su'i_](../go01#valsi-suhi)_.

Here is a more complex example:

<div class="interlinear-gloss-example example">
<a id="example-random-id-PSpq"></a>

**Example 18.111. <a id="c18e16d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>fu'a</td><td>reboi</td><td>ci</td><td>pi'i</td><td>voboi</td><td>mu</td><td>pi'i</td><td>su'i</td></tr><tr class="gloss"><td>the-number</td><td>(RP!)</td><td>(two,</td><td>three,</td><td>times),</td><td>(four,</td><td>five,</td><td>times),</td><td>plus</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>du</td><td>li</td><td>rexa</td></tr><tr class="gloss"><td>equals</td><td>the-number</td><td>two-six</td></tr></tbody></table>

</div>  

Here the operands of the first _<a id="id-1.19.18.10.1.1" class="indexterm"></a>[_pi'i_](../go01#valsi-pihi)_ are _<a id="id-1.19.18.10.2.1" class="indexterm"></a>[_re_](../go01#valsi-re)_ and _<a id="id-1.19.18.10.3.1" class="indexterm"></a>[_ci_](../go01#valsi-ci)_ ; the operands of the second _<a id="id-1.19.18.10.4.1" class="indexterm"></a>[_pi'i_](../go01#valsi-pihi)_ are _<a id="id-1.19.18.10.5.1" class="indexterm"></a>[_vo_](../go01#valsi-vo)_ and _<a id="id-1.19.18.10.6.1" class="indexterm"></a>[_mu_](../go01#valsi-mu)_ (with _<a id="id-1.19.18.10.7.1" class="indexterm"></a>[_boi_](../go01#valsi-boi)_ inserted where needed), and the operands of the _<a id="id-1.19.18.10.8.1" class="indexterm"></a>[_su'i_](../go01#valsi-suhi)_ are _<a id="id-1.19.18.10.9.1" class="indexterm"></a>reboi ci pi'i_ , or 6, and _<a id="id-1.19.18.10.10.1" class="indexterm"></a>voboi mu pi'i_ , or 20. As you can see, it is easy to get lost in the world of reverse Polish notation; on the other hand, it is especially easy for a mechanical listener (who has a deep mental stack and doesn't get lost) to comprehend.

<a id="id-1.19.18.11.1" class="indexterm"></a><a id="id-1.19.18.11.2" class="indexterm"></a>The operands of an RP operator can be any legal mekso operand, including parenthesized mekso that can contain any valid syntax, whether more RP or something more conventional.

<a id="id-1.19.18.12.1" class="indexterm"></a><a id="id-1.19.18.12.2" class="indexterm"></a><a id="id-1.19.18.12.3" class="indexterm"></a>In Lojban, RP operators are always parsed with exactly two operands. What about operators which require only one operand, or more than two operands? The null operand _<a id="id-1.19.18.12.4.1" class="indexterm"></a>[_tu'o_](../go01#valsi-tuho)_ and the null operator _<a id="id-1.19.18.12.5.1" class="indexterm"></a>[_ge'a_](../go01#valsi-geha)_ provide a simple solution. A one-operand operator like _<a id="id-1.19.18.12.6.1" class="indexterm"></a>[_va'a_](../go01#valsi-vaha)_ always appears in a reverse Polish context as _<a id="id-1.19.18.12.7.1" class="indexterm"></a>tu'o va'a_. The _<a id="id-1.19.18.12.8.1" class="indexterm"></a>[_tu'o_](../go01#valsi-tuho)_ provides the second operand, which is semantically ignored but grammatically necessary. Likewise, the three-operand version of _<a id="id-1.19.18.12.9.1" class="indexterm"></a>[_gei_](../go01#valsi-gei)_ appears in reverse Polish as _<a id="id-1.19.18.12.10.1" class="indexterm"></a>ge'a gei_ , where the _<a id="id-1.19.18.12.11.1" class="indexterm"></a>[_ge'a_](../go01#valsi-geha)_ effectively merges the 2nd and 3rd operands into a single operand. Here are some examples:

<div class="interlinear-gloss-example example">
<a id="example-random-id-qiJp"></a>

**Example 18.112. <a id="c18e16d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>fu'a</td><td>ciboi</td><td>muboi</td><td>vu'u</td></tr><tr class="gloss"><td>The-number</td><td>(RP!)</td><td>(three,</td><td>five,</td><td>minus)</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>du</td><td>li</td><td>fu'a</td><td>reboi</td><td>tu'o</td><td>va'a</td></tr><tr class="gloss"><td>equals</td><td>the-number</td><td>(RP!)</td><td>two,</td><td>null,</td><td>negative-of.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">3 − 5 = -2</span></div></td></tr></tbody></table>

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qijY"></a>

**Example 18.113. <a id="c18e16d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>cinoki'oki'o</td><td>du</td></tr><tr class="gloss"><td>The-number</td><td>30-comma-comma</td><td>equals</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>fu'a</td><td>biboi</td><td>ciboi</td><td>panoboi</td><td>ge'a</td><td>gei</td></tr><tr class="gloss"><td>the-number</td><td>(RP!)</td><td>8,</td><td>(3,</td><td>10,</td><td>null-op),</td><td>exponential-notation.</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">30,000,000 = 3 × 10 ^ 8</span></div></td></tr></tbody></table>

</div>