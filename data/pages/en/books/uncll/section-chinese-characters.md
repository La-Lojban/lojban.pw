<a id="section-chinese-characters"></a>17.8. <a id="c17s8"></a>What about Chinese characters?
---------------------------------------------------------------------------------------------

<a id="id-1.18.10.2.1" class="indexterm"></a><a id="id-1.18.10.2.2" class="indexterm"></a><a id="id-1.18.10.2.3" class="indexterm"></a><a id="id-1.18.10.2.4" class="indexterm"></a><a id="id-1.18.10.2.5" class="indexterm"></a>Chinese characters ( “hànzi” in Chinese, _<a id="id-1.18.10.2.7.1" class="indexterm"></a>[_kanji_](../go01#valsi-kanji)_ in Japanese) represent an entirely different approach to writing from alphabets or syllabaries. (A syllabary, such as Japanese hiragana or Amharic writing, has one lerfu for each syllable of the spoken language.) Very roughly, Chinese characters represent single elements of meaning; also very roughly, they represent single syllables of spoken Chinese. There is in principle no limit to the number of Chinese characters that can exist, and many thousands are in regular use.

It is hopeless for Lojban, with its limited lerfu and shift words, to create an alphabet which will match this diversity. However, there are various possible ways around the problem.

<a id="id-1.18.10.4.1" class="indexterm"></a><a id="id-1.18.10.4.2" class="indexterm"></a><a id="id-1.18.10.4.3" class="indexterm"></a><a id="id-1.18.10.4.4" class="indexterm"></a>First, both Chinese and Japanese have standard Latin-alphabet representations, known as “pinyin” for Chinese and “romaji” for Japanese, and these can be used. Thus, the word “ han 4 zi 4 ” ( “hànzi”) is conventionally written with two characters, but it may be spelled out as:

<div class="interlinear-gloss-example example">
<a id="example-random-id-fBfe"></a>

**Example 17.19. <a id="c17e8d1"></a><a id="id-1.18.10.5.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>.y'y.bu</td><td>.abu</td><td>ny.</td><td>vo</td><td>zy.</td><td>.ibu</td><td>vo</td></tr><tr class="gloss"><td>h</td><td>a</td><td>n</td><td>4</td><td>z</td><td>i</td><td>4</td></tr></tbody></table>

</div>  

<a id="id-1.18.10.6.1" class="indexterm"></a><a id="id-1.18.10.6.2" class="indexterm"></a>The cmavo _<a id="id-1.18.10.6.3.1" class="indexterm"></a>[_vo_](../go01#valsi-vo)_ is the Lojban digit “4”. It is grammatical to intersperse digits (of selma'o PA) into a string of lerfu words; as long as the first cmavo is a lerfu word, the whole will be interpreted as a string of lerfu words. In Chinese, the digits can be used to represent tones. Pinyin is more usually written using accent marks, the mechanism for which was explained in [Section 17.6](../section-accents).

The Japanese company named “Mitsubishi” in English is spelled the same way in romaji, and could be spelled out in Lojban thus:

<div class="interlinear-gloss-example example">
<a id="example-random-id-pLUV"></a>

**Example 17.20. <a id="c17e8d2"></a><a id="id-1.18.10.8.1.2" class="indexterm"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>my.</td><td>.ibu</td><td>ty.</td><td>sy.</td><td>.ubu</td><td>by.</td><td>.ibu</td><td>sy.</td><td>.y'y.bu</td><td>.ibu</td></tr><tr class="gloss"><td>m</td><td>i</td><td>t</td><td>s</td><td>u</td><td>b</td><td>i</td><td>s</td><td>h</td><td>i</td></tr></tbody></table>

</div>  

<a id="id-1.18.10.9.1" class="indexterm"></a><a id="id-1.18.10.9.2" class="indexterm"></a>Alternatively, a really ambitious Lojbanist could assign lerfu words to the individual strokes used to write Chinese characters (there are about seven or eight of them if you are a flexible human being, or about 40 if you are a rigid computer program), and then represent each character with a _<a id="id-1.18.10.9.3.1" class="indexterm"></a>[_tei_](../go01#valsi-tei)_ , the stroke lerfu words in the order of writing (which is standardized for each character), and a _<a id="id-1.18.10.9.4.1" class="indexterm"></a>[_foi_](../go01#valsi-foi)_. No one has as yet attempted this project.