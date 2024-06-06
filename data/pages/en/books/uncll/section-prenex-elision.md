<a id="section-prenex-elision"></a>16.5. <a id="c16s5"></a>Dropping the prenex
------------------------------------------------------------------------------

<a id="id-1.17.7.2.1" class="indexterm"></a>It isn't really necessary for every Lojban bridi involving variables to have a prenex on the front. In fact, none of the examples we've seen so far required prenexes at all! The rule for dropping the prenex is simple: if the variables appear in the same order within the bridi as they did in the prenex, then the prenex is superfluous. However, any _<a id="id-1.17.7.2.2.1" class="indexterm"></a>[_ro_](../go01#valsi-ro)_ or _<a id="id-1.17.7.2.3.1" class="indexterm"></a>[_poi_](../go01#valsi-poi)_ appearing in the prenex must be transferred to the first occurrence of the variable in the main part of the bridi. Thus, [Example 16.9](../section-da-and-zohu#example-random-id-jjLd) becomes just:

<div class="interlinear-gloss-example example">
<a id="example-random-id-9zAo"></a>

**Example 16.25. <a id="c16e5d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>da</td><td>viska</td><td>mi</td></tr><tr class="gloss"><td>There-is-an-X-which</td><td>sees</td><td>me.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">Something sees me.</p></td></tr></tbody></table>

</div>  

and [Example 16.23](../section-restricted-claims#example-random-id-njh0) becomes:

<div class="interlinear-gloss-example example">
<a id="example-random-id-na9C"></a>

**Example 16.26. <a id="c16e5d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ro</td><td>da</td><td>poi</td><td>gerku</td><td>cu</td><td>vasxu</td></tr><tr class="gloss"><td>For-every</td><td>X</td><td>which</td><td>is-a-dog,</td><td></td><td>it-breathes.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">Every dog breathes.</p></td></tr></tbody></table>

</div>  

<a id="id-1.17.7.6.1" class="indexterm"></a><a id="id-1.17.7.6.2" class="indexterm"></a>You might well suppose, then, that the purpose of the prenex is to allow the variables in it to appear in a different order than the bridi order, and that would be correct. Consider

<div class="interlinear-gloss-example example">
<a id="example-random-id-Cfnb"></a>

**Example 16.27. <a id="c16e5d3"></a><a id="id-1.17.7.7.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ro</td><td>da</td><td>poi</td><td>prenu</td><td>ku'o</td><td>de</td></tr><tr class="gloss"><td>For-every</td><td>X</td><td>which</td><td>is-a-person,</td><td></td><td>there-is-a-Y</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>poi</td><td>gerku</td><td>ku'o</td><td>zo'u</td><td>de</td><td>batci</td><td>da</td></tr><tr class="gloss"><td>which</td><td>is-a-dog</td><td></td><td>:</td><td>Y</td><td>bites</td><td>X.</td></tr></tbody></table>

</div>  

The prenex of [Example 16.27](../section-prenex-elision#example-random-id-Cfnb) is like that of [Example 16.18](../section-universal-claims#example-random-id-qHKm) (but with relative clauses): it notes that the following bridi is true of every person with respect to some dog, not necessarily the same dog for each. But in the main bridi part, the _<a id="id-1.17.7.8.3.1" class="indexterm"></a>[_de_](../go01#valsi-de)_ appears before the _<a id="id-1.17.7.8.4.1" class="indexterm"></a>[_da_](../go01#valsi-da)_. Therefore, the true translation is

<div class="example">
<a id="example-random-id-KLAr"></a>

**Example 16.28. <a id="c16e5d4"></a>** 

Every person is bitten by some dog (or other).

</div>  

If we tried to omit the prenex and move the _<a id="id-1.17.7.10.1.1" class="indexterm"></a>[_ro_](../go01#valsi-ro)_ and the relative clauses into the main bridi, we would get:

<div class="interlinear-gloss-example example">
<a id="example-random-id-c9bq"></a>

**Example 16.29. <a id="c16e5d5"></a><a id="id-1.17.7.11.1.2" class="indexterm"></a><a id="id-1.17.7.11.1.3" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>de</td><td>poi</td><td>gerku</td><td>cu</td><td>batci</td><td>ro</td><td>da</td><td>poi</td><td>prenu</td></tr><tr class="gloss"><td>There-is-a-Y</td><td>which</td><td>is-a-dog</td><td></td><td>which-bites</td><td>every</td><td>X</td><td>which</td><td>is-a-person</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">Some dog bites everyone.</p></td></tr></tbody></table>

</div>  

which has the structure of [Example 16.19](../section-universal-claims#example-random-id-qHKo) : it says that there is a dog (call him Fido) who bites, has bitten, or will bite every person that has ever existed! We can safely rule out Fido's existence, and say that [Example 16.29](../section-prenex-elision#example-random-id-c9bq) is false, while agreeing to [Example 16.27](../section-prenex-elision#example-random-id-Cfnb).

<a id="id-1.17.7.13.1" class="indexterm"></a>Even so, [Example 16.27](../section-prenex-elision#example-random-id-Cfnb) is most probably false, since some people never experience dogbite. Examples like [Example 16.27](../section-prenex-elision#example-random-id-Cfnb) and [Example 16.23](../section-restricted-claims#example-random-id-njh0) (might there be some dogs which never have breathed, because they died as embryos?) indicate the danger in Lojban of universal claims even when restricted. In English we are prone to say that “Everyone says” or that “Everybody does” or that “Everything is” when in fact there are obvious counterexamples which we are ignoring for the sake of making a rhetorical point. Such statements are plain falsehoods in Lojban, unless saved by a context (such as tense) which implicitly restricts them.

<a id="id-1.17.7.14.1" class="indexterm"></a><a id="id-1.17.7.14.2" class="indexterm"></a>How can we express [Example 16.27](../section-prenex-elision#example-random-id-Cfnb) in Lojban without a prenex? Since it is the order in which variables appear that matters, we can say:

<div class="interlinear-gloss-example example">
<a id="example-random-id-y90e"></a>

**Example 16.30. <a id="c16e5d6"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ro</td><td>da</td><td>poi</td><td>prenu</td><td>cu</td><td>se</td><td>batci</td><td>de</td><td>poi</td><td>gerku</td></tr><tr class="gloss"><td>Every</td><td>X</td><td>which</td><td>is-a-person</td><td></td><td></td><td>is-bitten-by</td><td>some-Y</td><td>which</td><td>is-a-dog.</td></tr></tbody></table>

</div>  

using the conversion operator _<a id="id-1.17.7.16.1.1" class="indexterm"></a>[_se_](../go01#valsi-se)_ (explained in [Section 5.11](../section-place-conversion)) to change the selbri _<a id="id-1.17.7.16.3.1" class="indexterm"></a>[_batci_](../go01#valsi-batci)_ ( “bites”) into _<a id="id-1.17.7.16.5.1" class="indexterm"></a>se batci_ ( “is bitten by”). The translation given in [Example 16.28](../section-prenex-elision#example-random-id-KLAr) uses the corresponding strategy in English, since English does not have prenexes (except in strained “logician's English”). This implies that a sentence with both a universal and an existential variable can't be freely converted with _<a id="id-1.17.7.16.9.1" class="indexterm"></a>[_se_](../go01#valsi-se)_ ; one must be careful to preserve the order of the variables.

<a id="id-1.17.7.17.1" class="indexterm"></a><a id="id-1.17.7.17.2" class="indexterm"></a><a id="id-1.17.7.17.3" class="indexterm"></a><a id="id-1.17.7.17.4" class="indexterm"></a>If a variable occurs more than once, then any _<a id="id-1.17.7.17.5.1" class="indexterm"></a>[_ro_](../go01#valsi-ro)_ or _<a id="id-1.17.7.17.6.1" class="indexterm"></a>[_poi_](../go01#valsi-poi)_ decorations are moved only to the first occurrence of the variable when the prenex is dropped. For example,

<div class="interlinear-gloss-example example">
<a id="example-random-id-4nqt"></a>

**Example 16.31. <a id="c16e5d7"></a><a id="id-1.17.7.18.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>di</td><td>poi</td><td>prenu</td><td>zo'u</td></tr><tr class="gloss"><td>There-is-a-Z</td><td>which</td><td>is-a-person</td><td>:</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ti</td><td>xarci</td><td>di</td><td>di</td></tr><tr class="gloss"><td>this-thing</td><td>is-a-weapon</td><td>for-use-against-Z</td><td>by-Z</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">This is a weapon for someone to use against himself/herself.</p></td></tr></tbody></table>

</div>  

(in which _<a id="id-1.17.7.19.1.1" class="indexterm"></a>[_di_](../go01#valsi-di)_ is used rather than _<a id="id-1.17.7.19.2.1" class="indexterm"></a>[_da_](../go01#valsi-da)_ just for variety) loses its prenex as follows:

<div class="interlinear-gloss-example example">
<a id="example-random-id-CseH"></a>

**Example 16.32. <a id="c16e5d8"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ti</td><td>xarci</td><td>di</td><td>poi</td><td>prenu</td><td>ku'o</td><td>di</td></tr><tr class="gloss"><td>This-thing</td><td>is-a-weapon-for-use-against</td><td>some-Z</td><td>which</td><td>is-a-person</td><td></td><td>by-Z.</td></tr></tbody></table>

</div>  

<a id="id-1.17.7.21.1" class="indexterm"></a>As the examples in this section show, dropping the prenex makes for terseness of expression often even greater than that of English (Lojban is meant to be an unambiguous language, not necessarily a terse or verbose one), provided the rules are observed.