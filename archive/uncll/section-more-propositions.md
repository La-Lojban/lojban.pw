<a id="section-more-propositions"></a>14.7. <a id="c14s7"></a>More than two propositions
----------------------------------------------------------------------------------------

<a id="id-1.15.9.2.1" class="indexterm"></a>So far we have seen logical connectives used to connect exactly two sentences. How about connecting three or more? Is this possible in Lojban? The answer is yes, subject to some warnings and some restrictions.

<a id="id-1.15.9.3.1" class="indexterm"></a>Of the four primitive truth functions A , E , O , and U , all but O have the same truth values no matter how their component sentences are associated in pairs. Therefore,

<div class="interlinear-gloss-example example">
<a id="example-random-id-9tHr"></a>

**Example 14.31. <a id="c14e7d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>dotco</td><td>.ije</td><td>mi</td><td>ricfu</td><td>.ije</td><td>mi</td><td>nanmu</td></tr><tr class="gloss"><td>I</td><td>am-German.</td><td>And</td><td>I</td><td>am-rich.</td><td>And</td><td>I</td><td>am-a-man.</td></tr></tbody></table>

</div>  

means that all three component sentences are true. Likewise,

<div class="interlinear-gloss-example example">
<a id="example-random-id-MCsf"></a>

**Example 14.32. <a id="c14e7d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>dotco</td><td>.ija</td><td>mi</td><td>ricfu</td><td>.ija</td><td>mi</td><td>nanmu</td></tr><tr class="gloss"><td>I</td><td>am-German.</td><td>Or</td><td>I</td><td>am-rich.</td><td>Or</td><td>I</td><td>am-a-man.</td></tr></tbody></table>

</div>  

means that one or more of the component sentences is true.

<a id="id-1.15.9.8.1" class="indexterm"></a><a id="id-1.15.9.8.2" class="indexterm"></a>O , however, is different. Working out the truth table for

<div class="interlinear-gloss-example example">
<a id="example-random-id-3zE1"></a>

**Example 14.33. <a id="c14e7d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>dotco</td><td>.ijo</td><td>mi</td><td>ricfu</td><td>.ijo</td><td>mi</td><td>nanmu</td></tr><tr class="gloss"><td>I</td><td>am-German.</td><td>If-and-only-if</td><td>I</td><td>am-rich.</td><td>If-and-only-if</td><td>I</td><td>am-a-man.</td></tr></tbody></table>

</div>  

shows that [Example 14.33](../section-more-propositions#example-random-id-3zE1) does not mean that either I am all three of these things or none of them; instead, an accurate translation would be:

> Of the three properties – German-ness, wealth, and manhood – I possess either exactly one or else all three.

<a id="id-1.15.9.12.1" class="indexterm"></a><a id="id-1.15.9.12.2" class="indexterm"></a>Because of the counterintuitiveness of this outcome, it is safest to avoid O with more than two sentences. Likewise, the connectives which involve negation also have unexpected truth values when used with more than two sentences.

<a id="id-1.15.9.13.1" class="indexterm"></a>In fact, no combination of logical connectives can produce the “all or none” interpretation intended (but not achieved) by [Example 14.33](../section-more-propositions#example-random-id-3zE1) without repeating one of the bridi. See [Example 14.48](../section-afterthought-connectives-grouping#example-random-id-KyHw).

There is an additional difficulty with the use of more than two sentences. What is the meaning of:<a id="id-1.15.9.14.1" class="indexterm"></a>

<div class="interlinear-gloss-example example">
<a id="example-random-id-mLo1"></a>

**Example 14.34. <a id="c14e7d4"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>nelci</td><td>la</td><td>.djan.</td><td>.ije</td><td>mi</td><td>nelci</td><td>la</td><td>.martas.</td></tr><tr class="gloss"><td>I</td><td>like</td><td>that-named</td><td>John.</td><td>And</td><td>I</td><td>like</td><td>that-named</td><td>Martha.</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>.ija</td><td>mi</td><td>nelci</td><td>la</td><td>.meris.</td></tr><tr class="gloss"><td>Or</td><td>I</td><td>like</td><td>that-named</td><td>Mary.</td></tr></tbody></table>

</div>  

Does this mean:

<div class="example">
<a id="example-random-id-BSuT"></a>

**Example 14.35. <a id="c14e7d5"></a>** 

I like John, and I like either Martha or Mary or both.

</div>  

Or is the correct translation:

<div class="example">
<a id="example-random-id-dPcI"></a>

**Example 14.36. <a id="c14e7d6"></a>** 

Either I like John and I like Martha, or I like Mary, or both.

</div>  

<a id="id-1.15.9.20.1" class="indexterm"></a><a id="id-1.15.9.20.2" class="indexterm"></a>[Example 14.36](../section-more-propositions#example-random-id-dPcI) is the correct translation of [Example 14.34](../section-more-propositions#example-random-id-mLo1). The reason is that Lojban logical connectives pair off from the left, like many constructs in the language. This rule, called the left-grouping rule, is easy to forget, especially when intuition pulls the other way. Forethought connectives are not subject to this problem:

<div class="interlinear-gloss-example example">
<a id="example-random-id-487z"></a>

**Example 14.37. <a id="c14e7d7"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ga</td><td>ge</td><td>mi</td><td>nelci</td><td>la</td><td>.djan.</td></tr><tr class="gloss"><td>Either</td><td>(Both</td><td>I</td><td>like</td><td>that-named</td><td>John</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gi</td><td>mi</td><td>nelci</td><td>la</td><td>.martas.</td></tr><tr class="gloss"><td>and</td><td>I</td><td>like</td><td>that-named</td><td>Martha)</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gi</td><td>mi</td><td>nelci</td><td>la</td><td>.meris.</td></tr><tr class="gloss"><td>or</td><td>I</td><td>like</td><td>that-named</td><td>Mary.</td></tr></tbody></table>

</div>  

is equivalent in meaning to [Example 14.34](../section-more-propositions#example-random-id-mLo1) , whereas

<div class="interlinear-gloss-example example">
<a id="example-random-id-1Dd2"></a>

**Example 14.38. <a id="c14e7d8"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ge</td><td>mi</td><td>nelci</td><td>la</td><td>.djan.</td></tr><tr class="gloss"><td>Both</td><td>I</td><td>like</td><td>that-named</td><td>John</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gi</td><td>ga</td><td>mi</td><td>nelci</td><td>la</td><td>.martas.</td></tr><tr class="gloss"><td>and</td><td>(Either</td><td>I</td><td>like</td><td>that-named</td><td>Martha</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>gi</td><td>mi</td><td>nelci</td><td>la</td><td>.meris.</td></tr><tr class="gloss"><td>or</td><td>I</td><td>like</td><td>that-named</td><td>Mary).</td></tr></tbody></table>

</div>  

is not equivalent to [Example 14.34](../section-more-propositions#example-random-id-mLo1) , but is instead a valid translation into Lojban, using forethought, of [Example 14.35](../section-more-propositions#example-random-id-BSuT).