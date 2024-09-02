<a id="section-logical-connection"></a>5.6. <a id="c5s6"></a>Logical connection within tanru
--------------------------------------------------------------------------------------------

The following cmavo are discussed in this section:

<table class="cmavo-list"><colgroup></colgroup><tbody><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">je</p></td><td class="selmaho"><p class="selmaho">JA</p></td><td class="description"><p class="description">tanru logical <span class="quote">“<span class="quote">and</span>”</span></p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">ja</p></td><td class="selmaho"><p class="selmaho">JA</p></td><td class="description"><p class="description">tanru logical <span class="quote">“<span class="quote">or</span>”</span></p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">joi</p></td><td class="selmaho"><p class="selmaho">JOI</p></td><td class="description"><p class="description">mixed mass <span class="quote">“<span class="quote">and</span>”</span></p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">gu'e</p></td><td class="selmaho"><p class="selmaho">GUhA</p></td><td class="description"><p class="description">tanru forethought logical <span class="quote">“<span class="quote">and</span>”</span></p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">gi</p></td><td class="selmaho"><p class="selmaho">GI</p></td><td class="description"><p class="description">forethought connection separator</p></td></tr></tbody></table>

Consider the English phrase “big red dog”. How shall this be rendered as a Lojban tanru? The naive attempt:

<div class="interlinear-gloss-example example">
<a id="example-random-id-riAq"></a>

**Example 5.39. <a id="id-1.6.8.5.1.1" class="indexterm"></a><a id="c5e6d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>barda</td><td></td><td>xunre</td><td></td><td>gerku</td></tr><tr class="gloss"><td>(big</td><td>type-of</td><td>red)</td><td>type-of</td><td>dog</td></tr></tbody></table>

</div>  

will not do, as it means a dog whose redness is big, in whatever way redness might be described as “big”. Nor is

<div class="interlinear-gloss-example example">
<a id="example-random-id-6MqF"></a>

**Example 5.40. <a id="c5e6d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>barda</td><td></td><td>xunre</td><td>bo</td><td>gerku</td></tr><tr class="gloss"><td>big</td><td>type-of</td><td>(red</td><td>type-of</td><td>dog)</td></tr></tbody></table>

</div>  

<a id="id-1.6.8.8.1" class="indexterm"></a>much better. After all, the straightforward understanding of the English phrase is that the dog is big as compared with other dogs, not merely as compared with other red dogs. In fact, the bigness and redness are independent properties of the dog, and only obscure rules of English adjective ordering prevent us from saying “red big dog”.

<a id="id-1.6.8.9.1" class="indexterm"></a>The Lojban approach to this problem is to introduce the cmavo _<a id="id-1.6.8.9.2.1" class="indexterm"></a>[_je_](../go01#valsi-je)_, which is one of the many equivalents of English “and”. A big red dog is one that is both big and red, and we can say:

<div class="interlinear-gloss-example example">
<a id="example-random-id-0UrF"></a>

**Example 5.41. <a id="c5e6d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>barda</td><td>je</td><td>xunre</td><td></td><td>gerku</td></tr><tr class="gloss"><td>(big</td><td>and</td><td>red)</td><td>type-of</td><td>dog</td></tr></tbody></table>

</div>  

Of course,

<div class="interlinear-gloss-example example">
<a id="example-random-id-DzeP"></a>

**Example 5.42. <a id="c5e6d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>xunre</td><td>je</td><td>barda</td><td></td><td>gerku</td></tr><tr class="gloss"><td>(red</td><td>and</td><td>big)</td><td>type-of</td><td>dog</td></tr></tbody></table>

</div>  

<a id="id-1.6.8.13.1" class="indexterm"></a>is equally satisfactory and means the same thing. As these examples indicate, joining two brivla with _<a id="id-1.6.8.13.2.1" class="indexterm"></a>[_je_](../go01#valsi-je)_ makes them a unit for tanru purposes. However, explicit grouping with _<a id="id-1.6.8.13.3.1" class="indexterm"></a>[_bo_](../go01#valsi-bo)_ or _<a id="id-1.6.8.13.4.1" class="indexterm"></a>[_ke_](../go01#valsi-ke)_ … _<a id="id-1.6.8.13.5.1" class="indexterm"></a>[_ke'e_](../go01#valsi-kehe)_ associates brivla more closely than _<a id="id-1.6.8.13.6.1" class="indexterm"></a>[_je_](../go01#valsi-je)_ does:

<div class="interlinear-gloss-example example">
<a id="example-random-id-LES9"></a>

**Example 5.43. <a id="c5e6d5"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>barda</td><td>je</td><td>pelxu</td><td>bo</td><td>xunre</td><td>gerku</td></tr><tr class="gloss"><td>(big</td><td>and</td><td>(yellow</td><td>type-of</td><td>red))</td><td>dog</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>barda</td><td>je</td><td>ke</td><td>pelxu</td><td></td><td>xunre</td><td>ke'e</td><td>gerku</td></tr><tr class="gloss"><td>(big</td><td>and</td><td>(</td><td>yellow</td><td>type-of</td><td>red)</td><td>)</td><td>dog</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">big yellowish-red dog</p></td></tr></tbody></table>

</div>  

With no grouping indicators, we get:

<div class="interlinear-gloss-example example">
<a id="example-random-id-fuhg"></a>

**Example 5.44. <a id="c5e6d6"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>barda</td><td>je</td><td>pelxu</td><td></td><td>xunre</td><td></td><td>gerku</td></tr><tr class="gloss"><td>((big</td><td>and</td><td>yellow)</td><td>type-of</td><td>red)</td><td>type-of</td><td>dog</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">biggish- and yellowish-red dog</p></td></tr></tbody></table>

</div>  

which again raises the question of [Example 5.39](../section-logical-connection#example-random-id-riAq): what does “biggish-red” mean?

<a id="id-1.6.8.18.1" class="indexterm"></a>Unlike _<a id="id-1.6.8.18.2.1" class="indexterm"></a>[_bo_](../go01#valsi-bo)_ and _<a id="id-1.6.8.18.3.1" class="indexterm"></a>[_ke_](../go01#valsi-ke)_ … _<a id="id-1.6.8.18.4.1" class="indexterm"></a>[_ke'e_](../go01#valsi-kehe)_, _<a id="id-1.6.8.18.5.1" class="indexterm"></a>[_je_](../go01#valsi-je)_ is useful as well as merely legal within simple tanru. It may be used to partly resolve the ambiguity of simple tanru:

<div class="interlinear-gloss-example example">
<a id="example-random-id-W56H"></a>

**Example 5.45. <a id="c5e6d7"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ta</td><td>blanu</td><td>je</td><td>zdani</td></tr><tr class="gloss"><td>that</td><td>is-blue</td><td>and</td><td>is-a-house</td></tr></tbody></table>

</div>  

definitely refers to something which is both blue and is a house, and not to any of the other possible interpretations of simple _<a id="id-1.6.8.20.1.1" class="indexterm"></a>blanu zdani_. Furthermore, _<a id="id-1.6.8.20.2.1" class="indexterm"></a>blanu zdani_ refers to something which is blue in the way that houses are blue; _<a id="id-1.6.8.20.3.1" class="indexterm"></a>blanu je zdani_ has no such implication – the blueness of a _<a id="id-1.6.8.20.4.1" class="indexterm"></a>blanu je zdani_ is independent of its houseness.

With the addition of _<a id="id-1.6.8.21.1.1" class="indexterm"></a>[_je_](../go01#valsi-je)_, many more versions of “pretty little girls' school” are made possible: see [Section 5.16](../section-pretty-school-groupings) for a complete list.

A subtle point in the semantics of tanru like [Example 5.41](../section-logical-connection#example-random-id-0UrF) needs special elucidation. There are at least two possible interpretations of:

<div class="interlinear-gloss-example example">
<a id="example-random-id-N5Bt"></a>

**Example 5.46. <a id="c5e6d8"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ta</td><td>melbi</td><td>je</td><td>nixli</td><td></td><td>ckule</td></tr><tr class="gloss"><td>That</td><td>is-a-(beautiful</td><td>and</td><td>girl)</td><td>type-of</td><td>school.</td></tr></tbody></table>

</div>  

It can be understood as:

<div class="example">
<a id="example-random-id-FCDa"></a>

**Example 5.47. <a id="c5e6d9"></a>** 

That is a girls' school and a beautiful school.

</div>  

or as:

<div class="example">
<a id="example-random-id-aFxm"></a>

**Example 5.48. <a id="c5e6d10"></a>** 

That is a school for things which are both girls and beautiful.

</div>  

<a id="id-1.6.8.28.1" class="indexterm"></a>The interpretation specified by [Example 5.47](../section-logical-connection#example-random-id-FCDa) treats the tanru as a sort of abbreviation for:

<div class="interlinear-gloss-example example">
<a id="example-random-id-pHHw"></a>

**Example 5.49. <a id="c5e6d11"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ta</td><td>ke</td><td>melbi</td><td></td><td>ckule</td><td>ke'e</td><td>je</td><td>ke</td><td>nixli</td><td></td><td>ckule</td><td>[ke'e]</td></tr><tr class="gloss"><td>That</td><td>is-a-(</td><td>beautiful</td><td>type-of</td><td>school</td><td>)</td><td>and</td><td>(</td><td>girl</td><td>type-of</td><td>school</td><td>)</td></tr></tbody></table>

</div>  

whereas the interpretation specified by [Example 5.48](../section-logical-connection#example-random-id-aFxm) does not. This is a kind of semantic ambiguity for which Lojban does not compel a firm resolution. The way in which the school is said to be of type “beautiful and girl” may entail that it is separately a beautiful school and a girls' school; but the alternative interpretation, that the members of the school are beautiful and girls, is also possible. Still another interpretation is:

<div class="example">
<a id="example-random-id-2cjH"></a>

**Example 5.50. <a id="c5e6d12"></a>** 

That is a school for beautiful things and also for girls.

</div>  

so while the logical connectives help to resolve the meaning of tanru, they by no means compel a single meaning in and of themselves.

<a id="id-1.6.8.33.1" class="indexterm"></a>In general, logical connectives within tanru cannot undergo the formal manipulations that are possible with the related logical connectives that exist outside tanru; see [Section 14.12](../section-tanru) for further details.

The logical connective _<a id="id-1.6.8.34.1.1" class="indexterm"></a>[_je_](../go01#valsi-je)_ is only one of the fourteen logical connectives that Lojban provides. Here are a few examples of some of the others:

<div class="interlinear-gloss-example example">
<a id="example-random-id-qJse"></a>

**Example 5.51. <a id="c5e6d13"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>le</td><td>bajra</td><td>cu</td><td>jinga</td><td>ja</td><td>te</td><td>jinga</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">the runner(s) is/are winner(s) or loser(s).</p></td></tr></tbody></table>

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qJsg"></a>

**Example 5.52. <a id="c5e6d14"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>blanu</td><td>naja</td><td>lenku</td><td>skapi</td></tr><tr class="gloss"><td>(blue</td><td>only-if</td><td>cold)</td><td>skin</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">skin which is blue only if it is cold</p></td></tr></tbody></table>

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qjsy"></a>

**Example 5.53. <a id="c5e6d15"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>xamgu</td><td>jo</td><td>tordu</td><td>nuntavla</td></tr><tr class="gloss"><td>(good</td><td>if-and-only-if</td><td>short)</td><td>speech</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">speech which is good if (and only if) it is short</p></td></tr></tbody></table>

</div>  
<div class="interlinear-gloss-example example">
<a id="example-random-id-qjtD"></a>

**Example 5.54. <a id="c5e6d16"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>vajni</td><td>ju</td><td>pluka</td><td>nuntavla</td></tr><tr class="gloss"><td>(important</td><td>whether-or-not</td><td>pleasing)</td><td>event-of-talking</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">speech which is important, whether or not it is pleasing</p></td></tr></tbody></table>

</div>  

In [Example 5.51](../section-logical-connection#example-random-id-qJse), _<a id="id-1.6.8.39.2.1" class="indexterm"></a>[_ja_](../go01#valsi-ja)_ is grammatically equivalent to _<a id="id-1.6.8.39.3.1" class="indexterm"></a>[_je_](../go01#valsi-je)_ but means “or” (more precisely, “and/or”). Likewise, _<a id="id-1.6.8.39.6.1" class="indexterm"></a>[_naja_](../go01#valsi-naja)_ means “only if” in [Example 5.52](../section-logical-connection#example-random-id-qJsg), _<a id="id-1.6.8.39.9.1" class="indexterm"></a>[_jo_](../go01#valsi-jo)_ means “if and only if” in [Example 5.53](../section-logical-connection#example-random-id-qjsy), and _<a id="id-1.6.8.39.12.1" class="indexterm"></a>[_ju_](../go01#valsi-ju)_ means “whether or not” in [Example 5.54](../section-logical-connection#example-random-id-qjtD).

<a id="id-1.6.8.40.1" class="indexterm"></a>Now consider the following example:

<div class="interlinear-gloss-example example">
<a id="example-random-id-NuWM"></a>

**Example 5.55. <a id="c5e6d17"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ricfu</td><td>je</td><td>blanu</td><td>jabo</td><td>crino</td></tr><tr class="gloss"><td>rich</td><td>and</td><td>(blue</td><td>or</td><td>green)</td></tr></tbody></table>

</div>  

<a id="id-1.6.8.42.1" class="indexterm"></a>which illustrates a new grammatical feature: the use of both _<a id="id-1.6.8.42.2.1" class="indexterm"></a>[_ja_](../go01#valsi-ja)_ and _<a id="id-1.6.8.42.3.1" class="indexterm"></a>[_bo_](../go01#valsi-bo)_ between tanru components. The two cmavo combine to form a compound whose meaning is that of _<a id="id-1.6.8.42.4.1" class="indexterm"></a>[_ja_](../go01#valsi-ja)_ but which groups more closely; _<a id="id-1.6.8.42.5.1" class="indexterm"></a>[_ja_](../go01#valsi-ja)_ _<a id="id-1.6.8.42.6.1" class="indexterm"></a>[_bo_](../go01#valsi-bo)_ is to _<a id="id-1.6.8.42.7.1" class="indexterm"></a>[_ja_](../go01#valsi-ja)_ as plain _<a id="id-1.6.8.42.8.1" class="indexterm"></a>[_bo_](../go01#valsi-bo)_ is to no cmavo at all. However, both _<a id="id-1.6.8.42.9.1" class="indexterm"></a>[_ja_](../go01#valsi-ja)_ and _<a id="id-1.6.8.42.10.1" class="indexterm"></a>[_ja_](../go01#valsi-ja)_ _<a id="id-1.6.8.42.11.1" class="indexterm"></a>[_bo_](../go01#valsi-bo)_ group less closely than _<a id="id-1.6.8.42.12.1" class="indexterm"></a>[_bo_](../go01#valsi-bo)_ does:

<div class="interlinear-gloss-example example">
<a id="example-random-id-KxqX"></a>

**Example 5.56. <a id="c5e6d18"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ricfu</td><td>je</td><td>blanu</td><td>jabo</td><td>crino</td><td>bo</td><td>blanu</td></tr><tr class="gloss"><td>rich</td><td>and</td><td>(blue</td><td>or</td><td>green</td><td>-</td><td>blue)</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">rich and (blue or greenish-blue)</p></td></tr></tbody></table>

</div>  

An alternative form of [Example 5.55](../section-logical-connection#example-random-id-NuWM) is:

<div class="interlinear-gloss-example example">
<a id="example-random-id-2WtT"></a>

**Example 5.57. <a id="c5e6d19"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ricfu</td><td>je</td><td>ke</td><td>blanu</td><td>ja</td><td>crino</td><td>[ke'e]</td></tr><tr class="gloss"><td>rich</td><td>and</td><td>(</td><td>blue</td><td>or</td><td>green</td><td>)</td></tr></tbody></table>

</div>  

<a id="id-1.6.8.46.1" class="indexterm"></a>In addition to the logical connectives, there are also a variety of non-logical connectives, grammatically equivalent to the logical ones. The only one with a well-understood meaning in tanru contexts is _<a id="id-1.6.8.46.2.1" class="indexterm"></a>[_joi_](../go01#valsi-joi)_, which is the kind of “and” that denotes a mixture:

<div class="interlinear-gloss-example example">
<a id="example-random-id-Hr1L"></a>

**Example 5.58. <a id="c5e6d20"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ti</td><td>blanu</td><td>joi</td><td>xunre</td><td>bolci</td></tr><tr class="gloss"><td>This</td><td>is-a-(blue</td><td>and</td><td>red)</td><td>ball.</td></tr></tbody></table>

</div>  

The ball described is neither solely red nor solely blue, but probably striped or in some other way exhibiting a combination of the two colors. [Example 5.58](../section-logical-connection#example-random-id-Hr1L) is distinct from:

<div class="interlinear-gloss-example example">
<a id="example-random-id-NAhT"></a>

**Example 5.59. <a id="c5e6d21"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ti</td><td>blanu</td><td>xunre</td><td>bolci</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">This is a bluish-red ball</p></td></tr></tbody></table>

</div>  

which would be a ball whose color is some sort of purple tending toward red, since _<a id="id-1.6.8.50.1.1" class="indexterm"></a>[_xunre_](../go01#valsi-xunre)_ is the more important of the two components. On the other hand,

<div class="interlinear-gloss-example example">
<a id="example-random-id-78C3"></a>

**Example 5.60. <a id="c5e6d22"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ti</td><td>blanu</td><td>je</td><td>xunre</td><td>bolci</td></tr><tr class="gloss"><td>This</td><td>is-a-(blue</td><td>and</td><td>red)</td><td>ball</td></tr></tbody></table>

</div>  

is probably self-contradictory, seeming to claim that the ball is independently both blue and red at the same time, although some sensible interpretation may exist.

<a id="id-1.6.8.53.1" class="indexterm"></a>Finally, just as English “and” has the variant form “both ... and”, so _<a id="id-1.6.8.53.4.1" class="indexterm"></a>[_je_](../go01#valsi-je)_ between tanru components has the variant form _<a id="id-1.6.8.53.5.1" class="indexterm"></a>[_gu'e_](../go01#valsi-guhe)_ … _<a id="id-1.6.8.53.6.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_, where _<a id="id-1.6.8.53.7.1" class="indexterm"></a>[_gu'e_](../go01#valsi-guhe)_ is placed before the components and _<a id="id-1.6.8.53.8.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ between them:

<div class="interlinear-gloss-example example">
<a id="example-random-id-gLbh"></a>

**Example 5.61. <a id="c5e6d23"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gu'e</td><td>barda</td><td>gi</td><td>xunre</td><td></td><td>gerku</td></tr><tr class="gloss"><td>(both</td><td>big</td><td>and</td><td>red)</td><td>type-of</td><td>dog</td></tr></tbody></table>

</div>  

is equivalent in meaning to [Example 5.41](../section-logical-connection#example-random-id-0UrF). For each logical connective related to _<a id="id-1.6.8.55.2.1" class="indexterm"></a>[_je_](../go01#valsi-je)_, there is a corresponding connective related to _<a id="id-1.6.8.55.3.1" class="indexterm"></a>[_gu'e_](../go01#valsi-guhe)_ … _<a id="id-1.6.8.55.4.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ in a systematic way.

<a id="id-1.6.8.56.1" class="indexterm"></a>The portion of a _<a id="id-1.6.8.56.2.1" class="indexterm"></a>[_gu'e_](../go01#valsi-guhe)_ … _<a id="id-1.6.8.56.3.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ construction before the _<a id="id-1.6.8.56.4.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ is a full selbri, and may use any of the selbri resources including _<a id="id-1.6.8.56.5.1" class="indexterm"></a>[_je_](../go01#valsi-je)_ logical connections. After the _<a id="id-1.6.8.56.6.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_, logical connections are taken to be wider in scope than the _<a id="id-1.6.8.56.7.1" class="indexterm"></a>[_gu'e_](../go01#valsi-guhe)_ … _<a id="id-1.6.8.56.8.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_, which has in effect the same scope as _<a id="id-1.6.8.56.9.1" class="indexterm"></a>[_bo_](../go01#valsi-bo)_:

<div class="interlinear-gloss-example example">
<a id="example-random-id-ETVe"></a>

**Example 5.62. <a id="c5e6d24"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gu'e</td><td>barda</td><td>je</td><td>xunre</td><td>gi</td><td>gerku</td><td>ja</td><td>mlatu</td></tr><tr class="gloss"><td>(both</td><td>(big</td><td>and</td><td>red)</td><td>and</td><td>dog)</td><td>or</td><td>cat</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">something which is either big, red, and a dog, or else a cat</p></td></tr></tbody></table>

</div>  

leaves _<a id="id-1.6.8.58.1.1" class="indexterm"></a>[_mlatu_](../go01#valsi-mlatu)_ outside the _<a id="id-1.6.8.58.2.1" class="indexterm"></a>[_gu'e_](../go01#valsi-guhe)_ … _<a id="id-1.6.8.58.3.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ construction. The scope of the _<a id="id-1.6.8.58.4.1" class="indexterm"></a>[_gi_](../go01#valsi-gi)_ arm extends only to a single brivla or to two or more brivla connected with _<a id="id-1.6.8.58.5.1" class="indexterm"></a>[_bo_](../go01#valsi-bo)_ or _<a id="id-1.6.8.58.6.1" class="indexterm"></a>[_ke_](../go01#valsi-ke)_ … _<a id="id-1.6.8.58.7.1" class="indexterm"></a>[_ke'e_](../go01#valsi-kehe)_.