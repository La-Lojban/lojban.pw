<a id="section-quantifier-grouping"></a>16.7. <a id="c16s7"></a>Grouping of quantifiers
---------------------------------------------------------------------------------------

<a id="id-1.17.9.2.1" class="indexterm"></a><a id="id-1.17.9.2.2" class="indexterm"></a>Let us consider a sentence containing two quantifier expressions neither of which is _<a id="id-1.17.9.2.3.1" class="indexterm"></a>[_ro_](../go01#valsi-ro)_ or _<a id="id-1.17.9.2.4.1" class="indexterm"></a>[_su'o_](../go01#valsi-suho)_ (remembering that _<a id="id-1.17.9.2.5.1" class="indexterm"></a>[_su'o_](../go01#valsi-suho)_ is implicit where no explicit quantifier is given):

<div class="interlinear-gloss-example example">
<a id="example-random-id-Uovr"></a>

**Example 16.41. <a id="c16e7d1"></a><a id="id-1.17.9.3.1.2" class="indexterm"></a><a id="id-1.17.9.3.1.3" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ci</td><td>gerku</td><td>cu</td><td>batci</td><td>re</td><td>nanmu</td></tr><tr class="gloss"><td>Three</td><td>dogs</td><td></td><td>bite</td><td>two</td><td>men.</td></tr></tbody></table>

</div>  

<a id="id-1.17.9.4.1" class="indexterm"></a><a id="id-1.17.9.4.2" class="indexterm"></a>The question raised by [Example 16.41](../section-quantifier-grouping#example-random-id-Uovr) is, does each of the dogs bite the same two men, or is it possible that there are two different men per dog, for six men altogether? If the former interpretation is taken, the number of men involved is fixed at two; but if the latter, then the speaker has to be taken as saying that there might be any number of men between two and six inclusive. Let us transform [Example 16.41](../section-quantifier-grouping#example-random-id-Uovr) step by step as we did with [Example 16.38](../section-quantified-variables#example-random-id-Kr4S) :

<div class="interlinear-gloss-example example">
<a id="example-random-id-neNT"></a>

**Example 16.42. <a id="c16e7d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ci</td><td>da</td><td>poi</td><td>gerku</td><td>cu</td><td>batci</td><td>re</td><td>de</td><td>poi</td><td>nanmu</td></tr><tr class="gloss"><td>Three</td><td>Xes</td><td>which</td><td>are-dogs</td><td></td><td>bite</td><td>two</td><td>Ys</td><td>which</td><td>are-men.</td></tr></tbody></table>

</div>  

(Note that we need separate variables _<a id="id-1.17.9.6.1.1" class="indexterm"></a>[_da_](../go01#valsi-da)_ and _<a id="id-1.17.9.6.2.1" class="indexterm"></a>[_de_](../go01#valsi-de)_ , because of the rule that says each indefinite description gets a variable never used before or since.)

<div class="interlinear-gloss-example example">
<a id="example-random-id-Iuj2"></a>

**Example 16.43. <a id="c16e7d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ci</td><td>da</td><td>poi</td><td>gerku</td><td>ku'o</td><td>re</td><td>de</td><td>poi</td><td>nanmu</td><td>zo'u</td></tr><tr class="gloss"><td>For-three</td><td>Xes</td><td>which</td><td>are-dogs</td><td>-,</td><td>for-two</td><td>Ys</td><td>which</td><td>are-men</td><td>:</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>da</td><td>batci</td><td>de</td></tr><tr class="gloss"><td>X</td><td>bites</td><td>Y.</td></tr></tbody></table>

</div>  

Here we see that indeed each of the dogs is said to bite two men, and it might be different men each time; a total of six biting events altogether.

<a id="id-1.17.9.9.1" class="indexterm"></a>How then are we to express the other interpretation, in which just two men are involved? We cannot just reverse the order of variables in the prenex to

<div class="interlinear-gloss-example example">
<a id="example-random-id-4Qxe"></a>

**Example 16.44. <a id="c16e7d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>re</td><td>de</td><td>poi</td><td>nanmu</td><td>ku'o</td><td>ci</td><td>da</td><td>poi</td><td>gerku</td><td>zo'u</td></tr><tr class="gloss"><td>For-two</td><td>Ys</td><td>which</td><td>are-men</td><td>-,</td><td>for-three</td><td>Xes</td><td>which</td><td>are-dogs,</td><td>:</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>da</td><td>batci</td><td>de</td></tr><tr class="gloss"><td>X</td><td>bites</td><td>Y.</td></tr></tbody></table>

</div>  

for although we have now limited the number of men to exactly two, we end up with an indeterminate number of dogs, from three to six. The distinction is called a “scope distinction” : in [Example 16.42](../section-quantifier-grouping#example-random-id-neNT) , _<a id="id-1.17.9.11.3.1" class="indexterm"></a>ci gerku_ is said to have wider scope than _<a id="id-1.17.9.11.4.1" class="indexterm"></a>re nanmu_ , and therefore precedes it in the prenex. In [Example 16.44](../section-quantifier-grouping#example-random-id-4Qxe) the reverse is true.

<a id="id-1.17.9.12.1" class="indexterm"></a><a id="id-1.17.9.12.2" class="indexterm"></a><a id="id-1.17.9.12.3" class="indexterm"></a>The solution is to use a termset, which is a group of terms either joined by _<a id="id-1.17.9.12.4.1" class="indexterm"></a>[_ce'e_](../go01#valsi-cehe)_ (of selma'o CEhE) between each term, or else surrounded by _<a id="id-1.17.9.12.5.1" class="indexterm"></a>[_nu'i_](../go01#valsi-nuhi)_ (of selma'o NUhI) on the front and _<a id="id-1.17.9.12.6.1" class="indexterm"></a>[_nu'u_](../go01#valsi-nuhu)_ (of selma'o NUhU) on the rear. Terms (which are either sumti or sumti prefixed by tense or modal tags) that are grouped into a termset are understood to have equal scope:

<div class="interlinear-gloss-example example">
<a id="example-random-id-JbVH"></a>

**Example 16.45. <a id="c16e7d5"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td></td><td>ci</td><td>gerku</td><td>ce'e</td><td>re</td><td>nanmu</td><td></td><td>cu</td><td>batci</td></tr><tr class="jbo"><td>nu'i</td><td>ci</td><td>gerku</td><td></td><td>re</td><td>nanmu</td><td>[nu'u]</td><td>cu</td><td>batci</td></tr><tr class="gloss"><td></td><td>Three</td><td>dogs</td><td>[plus]</td><td>two</td><td>men,</td><td></td><td></td><td>bite.</td></tr></tbody></table>

</div>  

which picks out two groups, one of three dogs and the other of two men, and says that every one of the dogs bites each of the men. The second Lojban version uses forethought; note that _<a id="id-1.17.9.14.1.1" class="indexterm"></a>[_nu'u_](../go01#valsi-nuhu)_ is an elidable terminator, and in this case can be freely elided.

<a id="id-1.17.9.15.1" class="indexterm"></a><a id="id-1.17.9.15.2" class="indexterm"></a><a id="id-1.17.9.15.3" class="indexterm"></a><a id="id-1.17.9.15.4" class="indexterm"></a>What about descriptors, like _<a id="id-1.17.9.15.5.1" class="indexterm"></a>ci lo gerku_ , _<a id="id-1.17.9.15.6.1" class="indexterm"></a>le nanmu_ or _<a id="id-1.17.9.15.7.1" class="indexterm"></a>re le ci mlatu_ ? They too can be grouped in termsets, but usually need not be, except for the _<a id="id-1.17.9.15.8.1" class="indexterm"></a>[_lo_](../go01#valsi-lo)_ case which functions like the case without a descriptor. Unless an actual quantifier precedes it, _<a id="id-1.17.9.15.9.1" class="indexterm"></a>le nanmu_ means _<a id="id-1.17.9.15.10.1" class="indexterm"></a>ro le nanmu_ , as is explained in [Section 6.7](../section-quantified-descriptions). Two sumti with _<a id="id-1.17.9.15.12.1" class="indexterm"></a>[_ro_](../go01#valsi-ro)_ quantifiers are independent of order, so:

<div class="interlinear-gloss-example example">
<a id="example-random-id-MADY"></a>

**Example 16.46. <a id="c16e7d6"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>[ro]</td><td>le</td><td>ci</td><td>gerku</td><td>cu</td><td>batci</td><td>[ro]</td><td>le</td><td>re</td><td>nanmu</td></tr><tr class="gloss"><td>[All-of]</td><td>the</td><td>three</td><td>dogs</td><td></td><td>bite</td><td>[all-of]</td><td>the</td><td>two</td><td>men.</td></tr></tbody></table>

</div>  

means that each of the dogs specified bites each of the men specified, for six acts of biting altogether. However, if there is an explicit quantifier before _<a id="id-1.17.9.17.1.1" class="indexterm"></a>[_le_](../go01#valsi-le)_ other than _<a id="id-1.17.9.17.2.1" class="indexterm"></a>[_ro_](../go01#valsi-ro)_ , the problems of this section reappear.