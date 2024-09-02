<a id="section-da-and-zohu"></a>16.2. <a id="c16s2"></a>Existential claims, prenexes, and variables
---------------------------------------------------------------------------------------------------

Let us consider, to begin with, a sentence that is not in the dialogue:

<div class="example">
<a id="example-random-id-Mxj3"></a>

**Example 16.7. <a id="c16e2d1"></a><a id="id-1.17.4.3.1.2" class="indexterm"></a>** 

Something sees me.

</div>  

There are two plausible Lojban translations of [Example 16.7](../section-da-and-zohu#example-random-id-Mxj3). The simpler one is:

<div class="interlinear-gloss-example example">
<a id="example-random-id-b9pV"></a>

**Example 16.8. <a id="c16e2d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>[zo'e]</td><td>viska</td><td>mi</td></tr><tr class="gloss"><td>Something-unspecified</td><td>sees</td><td>me.</td></tr></tbody></table>

</div>  

<a id="id-1.17.4.6.1" class="indexterm"></a><a id="id-1.17.4.6.2" class="indexterm"></a>The cmavo _<a id="id-1.17.4.6.3.1" class="indexterm"></a>[_zo'e_](../go01#valsi-zohe)_ indicates that a sumti has been omitted (indeed, even _<a id="id-1.17.4.6.4.1" class="indexterm"></a>[_zo'e_](../go01#valsi-zohe)_ itself can be omitted in this case, as explained in [Section 7.7](../section-zohe-cohe-series)) and the listener must fill in the correct value from context. In other words, [Example 16.8](../section-da-and-zohu#example-random-id-b9pV) means “‘You-know-what’ sees me. ”

However, [Example 16.7](../section-da-and-zohu#example-random-id-Mxj3) is just as likely to assert simply that there is someone who sees me, in which case a correct translation is:

<div class="interlinear-gloss-example example">
<a id="example-random-id-jjLd"></a>

**Example 16.9. <a id="c16e2d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>da</td><td>zo'u</td><td>da</td><td>viska</td><td>mi</td></tr><tr class="gloss"><td>There-is-an-X</td><td>such-that</td><td>X</td><td>sees</td><td>me.</td></tr></tbody></table>

</div>  

<a id="id-1.17.4.9.1" class="indexterm"></a><a id="id-1.17.4.9.2" class="indexterm"></a><a id="id-1.17.4.9.3" class="indexterm"></a><a id="id-1.17.4.9.4" class="indexterm"></a>[Example 16.9](../section-da-and-zohu#example-random-id-jjLd) does not presuppose that the listener knows who sees the speaker, but simply tells the listener that there is someone who sees the speaker. Statements of this kind are called “existential claims”. (Formally, the one doing the seeing is not restricted to being a person; it could be an animal or – in principle – an inanimate object. We will see in [Section 16.4](../section-restricted-claims) how to represent such restrictions.)

<a id="id-1.17.4.10.1" class="indexterm"></a><a id="id-1.17.4.10.2" class="indexterm"></a><a id="id-1.17.4.10.3" class="indexterm"></a><a id="id-1.17.4.10.4" class="indexterm"></a>[Example 16.9](../section-da-and-zohu#example-random-id-jjLd) has a two-part structure: there is the part _<a id="id-1.17.4.10.6.1" class="indexterm"></a>da zo'u_ , called the prenex, and the part _<a id="id-1.17.4.10.7.1" class="indexterm"></a>da viska mi_ , the main bridi. Almost any Lojban bridi can be preceded by a prenex, which syntactically is any number of sumti followed by the cmavo _<a id="id-1.17.4.10.8.1" class="indexterm"></a>[_zo'u_](../go01#valsi-zohu)_ (of selma'o ZOhU). For the moment, the sumti will consist of one or more of the cmavo _<a id="id-1.17.4.10.9.1" class="indexterm"></a>[_da_](../go01#valsi-da)_ , _<a id="id-1.17.4.10.10.1" class="indexterm"></a>[_de_](../go01#valsi-de)_ , and _<a id="id-1.17.4.10.11.1" class="indexterm"></a>[_di_](../go01#valsi-di)_ (of selma'o KOhA), glossed in the literal translations as “X” , “Y” , and “Z” respectively. By analogy to the terminology of symbolic logic, these cmavo are called “variables”.

Here is an example of a prenex with two variables:

<div class="interlinear-gloss-example example">
<a id="example-random-id-t4qI"></a>

**Example 16.10. <a id="c16e2d4"></a><a id="id-1.17.4.12.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>da</td><td>de</td><td>zo'u</td><td>da</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>There-is-an-X</td><td>there-is-a-Y</td><td>such</td><td>that</td><td>X</td><td>loves</td><td>Y.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">Somebody loves somebody.</p></td></tr></tbody></table>

</div>  

<a id="id-1.17.4.13.1" class="indexterm"></a><a id="id-1.17.4.13.2" class="indexterm"></a>In [Example 16.10](../section-da-and-zohu#example-random-id-t4qI) , the literal interpretation of the two variables _<a id="id-1.17.4.13.4.1" class="indexterm"></a>[_da_](../go01#valsi-da)_ and _<a id="id-1.17.4.13.5.1" class="indexterm"></a>[_de_](../go01#valsi-de)_ as “there-is-an-X” and “there-is-a-Y” tells us that there are two things which stand in the relationship that one loves the other. It might be the case that the supposed two things are really just a single thing that loves itself; nothing in the Lojban version of [Example 16.10](../section-da-and-zohu#example-random-id-t4qI) rules out that interpretation, which is why the colloquial translation does not say “Somebody loves somebody else.” The things referred to by different variables may be different or the same. (We use “somebody” here rather than “something” for naturalness; lovers and beloveds are usually persons, though the Lojban does not say so.)

<a id="id-1.17.4.14.1" class="indexterm"></a>It is perfectly all right for the variables to appear more than once in the main bridi:

<div class="interlinear-gloss-example example">
<a id="example-random-id-wBYE"></a>

**Example 16.11. <a id="c16e2d5"></a><a id="id-1.17.4.15.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>da</td><td>zo'u</td><td>da</td><td>prami</td><td>da</td></tr><tr class="gloss"><td>There-is-an-X</td><td>such-that</td><td>X</td><td>loves</td><td>X</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">Somebody loves himself/herself.</p></td></tr></tbody></table>

</div>  

<a id="id-1.17.4.16.1" class="indexterm"></a><a id="id-1.17.4.16.2" class="indexterm"></a>What [Example 16.11](../section-da-and-zohu#example-random-id-wBYE) claims is fundamentally different from what [Example 16.10](../section-da-and-zohu#example-random-id-t4qI) claims, because _<a id="id-1.17.4.16.5.1" class="indexterm"></a>da prami da_ is not structurally the same as _<a id="id-1.17.4.16.6.1" class="indexterm"></a>da prami de_. However,

<div class="interlinear-gloss-example example">
<a id="example-random-id-3QV5"></a>

**Example 16.12. <a id="c16e2d6"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>de</td><td>zo'u</td><td>de</td><td>prami</td><td>de</td></tr><tr class="gloss"><td>There-is-a-Y</td><td>such-that</td><td>Y</td><td>loves</td><td>Y</td></tr></tbody></table>

</div>  

<a id="id-1.17.4.18.1" class="indexterm"></a>means exactly the same thing as [Example 16.11](../section-da-and-zohu#example-random-id-wBYE) ; it does not matter which variable is used as long as they are used consistently.

It is not necessary for a variable to be a sumti of the main bridi directly:

<div class="interlinear-gloss-example example">
<a id="example-random-id-ArXX"></a>

**Example 16.13. <a id="c16e2d7"></a><a id="id-1.17.4.20.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>da</td><td>zo'u</td><td>le</td><td>da</td><td>gerku</td><td>cu</td><td>viska</td><td>mi</td></tr><tr class="gloss"><td>There-is-an-X</td><td>such-that</td><td>the</td><td>of-X</td><td>dog</td><td></td><td>sees</td><td>me</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">Somebody's dog sees me</p></td></tr></tbody></table>

</div>  

is perfectly correct even though the _<a id="id-1.17.4.21.1.1" class="indexterm"></a>[_da_](../go01#valsi-da)_ is used only in a possessive construction. (Possessives are explained in [Section 8.7](../section-possessive-sumti).)

<a id="id-1.17.4.22.1" class="indexterm"></a>It is very peculiar, however, even if technically grammatical, for the variable not to appear in the main bridi at all:

<div class="interlinear-gloss-example example">
<a id="example-random-id-mE4m"></a>

**Example 16.14. <a id="c16e2d8"></a><a id="id-1.17.4.23.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>da</td><td>zo'u</td><td>la</td><td>.ralf.</td><td>gerku</td></tr><tr class="gloss"><td>There-is-an-X</td><td>such-that</td><td>that-named</td><td>Ralph</td><td>is-a-dog</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">There is something such that Ralph is a dog.</p></td></tr></tbody></table>

</div>  

has a variable bound in a prenex whose relevance to the claim of the following bridi is completely unspecified.