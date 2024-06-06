<a id="chapter-abstractions"></a>Chapter 11. <a id="c11"></a>Events, qualities, quantities, and other vague words: on Lojban abstraction
========================================================================================================================================

<a id="chapter-abstractions-picture"></a>![The picture for chapter 11](/assets//books/uncll/media/chapter-abstractions.svg.png)

<a id="section-syntax"></a>11.1. <a id="c11s1"></a>The syntax of abstraction
----------------------------------------------------------------------------

The purpose of the feature of Lojban known as “abstraction” is to provide a means for taking whole bridi and packaging them up, as it were, into simple selbri. Syntactically, abstractions are very simple and uniform; semantically, they are rich and complex, with few features in common between one variety of abstraction and another. We will begin by discussing syntax without regard to semantics; as a result, the notion of abstraction may seem unmotivated at first. Bear with this difficulty until [Section 11.2](../section-events).

An abstraction selbri is formed by taking a full bridi and preceding it by any cmavo of selma'o NU. There are twelve such cmavo; they are known as “abstractors”. The bridi is closed by the elidable terminator _<a id="id-1.12.3.3.2.1" class="indexterm"></a>[_kei_](../go01#valsi-kei)_ , of selma'o KEI. Thus, to change the bridi

<div class="interlinear-gloss-example example">
<a id="example-random-id-6EI1"></a>

**Example 11.1. <a id="c11e1d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>klama</td><td>le</td><td>zarci</td></tr><tr class="gloss"><td>I</td><td>go-to</td><td>the</td><td>store</td></tr></tbody></table>

</div>  

into an abstraction using _<a id="id-1.12.3.5.1.1" class="indexterm"></a>[_nu_](../go01#valsi-nu)_ , one of the members of selma'o NU, we change it into

<div class="interlinear-gloss-example example">
<a id="example-random-id-Via0"></a>

**Example 11.2. <a id="c11e1d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>nu</td><td>mi</td><td>klama</td><td>le</td><td>zarci</td><td>[kei]</td></tr><tr class="gloss"><td>an-event-of</td><td>my</td><td>going-to</td><td>the</td><td>store</td></tr></tbody></table>

</div>  

<a id="id-1.12.3.7.1" class="indexterm"></a><a id="id-1.12.3.7.2" class="indexterm"></a>The bridi may be a simple selbri, or it may have associated sumti, as here. It is important to beware of eliding _<a id="id-1.12.3.7.3.1" class="indexterm"></a>[_kei_](../go01#valsi-kei)_ improperly, as many of the common uses of abstraction selbri involve following them with words that would appear to be part of the abstraction if _<a id="id-1.12.3.7.4.1" class="indexterm"></a>[_kei_](../go01#valsi-kei)_ had been elided.

(Technically, _<a id="id-1.12.3.8.1.1" class="indexterm"></a>[_kei_](../go01#valsi-kei)_ is never necessary, because the elidable terminator _<a id="id-1.12.3.8.2.1" class="indexterm"></a>[_vau_](../go01#valsi-vau)_ that closes every bridi can substitute for it; however, _<a id="id-1.12.3.8.3.1" class="indexterm"></a>[_kei_](../go01#valsi-kei)_ is specific to abstractions, and using it is almost always clearer.)

<a id="id-1.12.3.9.1" class="indexterm"></a><a id="id-1.12.3.9.2" class="indexterm"></a>The grammatical uses of an abstraction selbri are exactly the same as those of a simple brivla. In particular, abstraction selbri may be used as observatives, as in [Example 11.2](../chapter-abstractions#example-random-id-Via0) , or used in tanru:

<div class="interlinear-gloss-example example">
<a id="example-random-id-0Ff4"></a>

**Example 11.3. <a id="c11e1d3"></a><a id="id-1.12.3.10.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>la</td><td>.djan.</td><td></td><td>cu</td><td>nu</td><td>sonci</td><td>kei</td><td>&nbsp;</td><td>djica</td></tr><tr class="gloss"><td>That-named</td><td>John</td><td>is-an</td><td></td><td>(event-of</td><td>being-a-soldier</td><td>)</td><td>type-of</td><td>desirer.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">John wants to be a soldier.</p></td></tr></tbody></table>

</div>  

<a id="id-1.12.3.11.1" class="indexterm"></a>Abstraction selbri may also be used in descriptions, preceded by _<a id="id-1.12.3.11.2.1" class="indexterm"></a>[_le_](../go01#valsi-le)_ (or any other member of selma'o LE):

<div class="interlinear-gloss-example example">
<a id="example-random-id-sQ33"></a>

**Example 11.4. <a id="c11e1d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>la</td><td>.djan.</td><td>cu</td><td>djica</td><td>le</td><td>nu</td><td>sonci</td><td>[kei]</td></tr><tr class="gloss"><td>That-named</td><td>John</td><td>&nbsp;</td><td>desires</td><td>the</td><td>event-of</td><td>being-a-soldier.</td></tr></tbody></table>

</div>  

We will most often use descriptions containing abstraction either at the end of a bridi, or just before the main selbri with its _<a id="id-1.12.3.13.1.1" class="indexterm"></a>[_cu_](../go01#valsi-cu)_ ; in either of these circumstances, _<a id="id-1.12.3.13.2.1" class="indexterm"></a>[_kei_](../go01#valsi-kei)_ can normally be elided.

<a id="id-1.12.3.14.1" class="indexterm"></a>The place structure of an abstraction selbri depends on the particular abstractor, and will be explained individually in the following sections.

Note: In glosses of bridi within abstractions, the grammatical form used in the English changes. Thus, in the gloss of [Example 11.2](../chapter-abstractions#example-random-id-Via0) we see “my going-to the store” rather than “I go-to the store” ; likewise, in the glosses of [Example 11.3](../chapter-abstractions#example-random-id-0Ff4) and [Example 11.4](../chapter-abstractions#example-random-id-sQ33) we see “being-a-soldier” rather than “is-a-soldier”. This procedure reflects the desire for more understandable glosses, and does not indicate any change in the Lojban form. A bridi is a bridi, and undergoes no change when it is used as part of an abstraction selbri.