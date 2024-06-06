<a id="section-character-codes"></a>17.13. <a id="c17s13"></a>Computerized character codes
------------------------------------------------------------------------------------------

<a id="id-1.18.15.2.1" class="indexterm"></a><a id="id-1.18.15.2.2" class="indexterm"></a><a id="id-1.18.15.2.3" class="indexterm"></a><a id="id-1.18.15.2.4" class="indexterm"></a><a id="id-1.18.15.2.5" class="indexterm"></a>Since the first application of computers to non-numerical information, character sets have existed, mapping numbers (called “character codes”) into selected lerfu, digits, and punctuation marks (collectively called “characters”). Historically, each of these character sets has only covered a particular writing system. International efforts have now created Unicode, a unified character set that can represent essentially all the characters in essentially all the world's writing systems. Lojban can take advantage of these encoding schemes by using the cmavo _<a id="id-1.18.15.2.8.1" class="indexterm"></a>[_se'e_](../go01#valsi-sehe)_ (of selma'o BY). This cmavo is conventionally followed by digit cmavo of selma'o PA representing the character code, and the whole string indicates a single character in some computerized character set:

<div class="interlinear-gloss-example example">
<a id="example-random-id-r2jv"></a>

**Example 17.45. <a id="c17e13d1"></a><a id="id-1.18.15.3.1.2" class="indexterm"></a><a id="id-1.18.15.3.1.3" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>me'o</td><td>se'e</td><td>cixa</td><td>cu</td><td>lerfu</td><td>la</td><td>.asycy'i'is.</td></tr><tr class="gloss"><td>The-expression</td><td>[code]</td><td>36</td><td>&nbsp;</td><td>is-a-letteral-in-set</td><td>&nbsp;</td><td>ASCII</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>loi</td><td>rupnu</td><td>be</td><td>fi</td><td>le</td><td>merko</td></tr><tr class="gloss"><td>for-the-mass-of</td><td>currency-units</td><td></td><td>in</td><td>the</td><td>American-system.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">The character code 36 in ASCII represents American dollars.</p></td></tr><tr class="para"><td colspan="12321"><p class="natlang"><span class="quote">“<span class="quote">$</span>”</span> represents American dollars.</p></td></tr></tbody></table>

</div>  

<a id="id-1.18.15.4.1" class="indexterm"></a>Understanding [Example 17.45](../section-character-codes#example-random-id-r2jv) depends on knowing the value in the ASCII character set (one of the simplest and oldest) of the “$” character. Therefore, the _<a id="id-1.18.15.4.4.1" class="indexterm"></a>[_se'e_](../go01#valsi-sehe)_ convention is only intelligible to those who know the underlying character set. For precisely specifying a particular character, however, it has the advantages of unambiguity and (relative) cultural neutrality, and therefore Lojban provides a means for those with access to descriptions of such character sets to take advantage of them.

<a id="id-1.18.15.5.1" class="indexterm"></a><a id="id-1.18.15.5.2" class="indexterm"></a>As another example, the Unicode character set (also known as ISO 10646) represents the international symbol of peace, an inverted trident in a circle, using the base-16 value 262E. In a suitable context, a Lojbanist may say:

<div class="interlinear-gloss-example example">
<a id="example-random-id-MXET"></a>

**Example 17.46. <a id="c17e13d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>me'o</td><td>se'e</td><td>rexarerei</td><td>sinxa</td><td>le</td><td>ka</td><td>panpi</td></tr><tr class="gloss"><td>the-expression</td><td>[code]</td><td>262E</td><td>is-a-sign-of</td><td>the</td><td>quality-of</td><td>being-at-peace</td></tr></tbody></table>

</div>  

<a id="id-1.18.15.7.1" class="indexterm"></a>When a _<a id="id-1.18.15.7.2.1" class="indexterm"></a>[_se'e_](../go01#valsi-sehe)_ string appears in running discourse, some metalinguistic convention must specify whether the number is base 10 or some other base, and which character set is in use.