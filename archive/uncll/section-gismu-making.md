<a id="section-gismu-making"></a>4.14. <a id="c4s14"></a>The gismu creation algorithm
-------------------------------------------------------------------------------------

<a id="id-1.5.16.2.1" class="indexterm"></a>The gismu were created through the following process:

1.  <a id="id-1.5.16.3.1.1.1" class="indexterm"></a>At least one word was found in each of the six source languages (Chinese, English, Hindi, Spanish, Russian, Arabic) corresponding to the proposed gismu. This word was rendered into Lojban phonetics rather liberally: consonant clusters consisting of a stop and the corresponding fricative were simplified to just the fricative ( _tc_ became _c_ , _dj_ became _j_) and non-Lojban vowels were mapped onto Lojban ones. Furthermore, morphological endings were dropped. The same mapping rules were applied to all six languages for the sake of consistency.

2.  All possible gismu forms were matched against the six source-language forms. The matches were scored as follows:

    1.  If three or more letters were the same in the proposed gismu and the source-language word, and appeared in the same order, the score was equal to the number of letters that were the same. Intervening letters, if any, did not matter.

    2.  If exactly two letters were the same in the proposed gismu and the source-language word, and either the two letters were consecutive in both words, or were separated by a single letter in both words, the score was 2. Letters in reversed order got no score.

    3.  <a id="id-1.5.16.3.2.1.1.3.1.1" class="indexterm"></a>Otherwise, the score was 0.

    
3.  <a id="id-1.5.16.3.3.1.1" class="indexterm"></a><a id="id-1.5.16.3.3.1.2" class="indexterm"></a>The scores were divided by the length of the source-language word in its Lojbanized form, and then multiplied by a weighting value specific to each language, reflecting the proportional number of first-language and second-language speakers of the language. (Second-language speakers were reckoned at half their actual numbers.) The weights were chosen to sum to 1.00. The sum of the weighted scores was the total score for the proposed gismu form.

4.  Any gismu forms that conflicted with existing gismu were removed. Obviously, being identical with an existing gismu constitutes a conflict. In addition, a proposed gismu that was identical to an existing gismu except for the final vowel was considered a conflict, since two such gismu would have identical 4-letter rafsi.

    <a id="id-1.5.16.3.4.2.1" class="indexterm"></a>More subtly: If the proposed gismu was identical to an existing gismu except for a single consonant, and the consonant was "too similar” based on the following table, then the proposed gismu was rejected.

    | proposed gismu | existing gismu |
    | --- | --- |
    | _b_ | _p_ , _v_ |
    | _c_ | _j_ , _s_ |
    | _d_ | _t_ |
    | _f_ | _p_ , _v_ |
    | _g_ | _k_ , _x_ |
    | _j_ | _c_ , _z_ |
    | _k_ | _g_ , _x_ |
    | _l_ | _r_ |
    | _m_ | _n_ |
    | _n_ | _m_ |
    | _p_ | _b_ , _f_ |
    | _r_ | _l_ |
    | _s_ | _c_ , _z_ |
    | _t_ | _d_ |
    | _v_ | _b_ , _f_ |
    | _x_ | _g_ , _k_ |
    | _z_ | _j_ , _s_ |

    <a id="id-1.5.16.3.4.4.1" class="indexterm"></a>See [Section 4.4](../section-gismu) for an example.

5.  The gismu form with the highest score usually became the actual gismu. Sometimes a lower-scoring form was used to provide a better rafsi. A few gismu were changed in error as a result of transcription blunders (for example, the gismu _<a id="id-1.5.16.3.5.1.1.1" class="indexterm"></a>[_gismu_](../go01#valsi-gismu)_ should have been _gicmu_ , but it's too late to fix it now).

    The language weights used to make most of the gismu were as follows:

    <table><tbody><tr><td>Chinese</td><td>0.36</td></tr><tr><td>English</td><td>0.21</td></tr><tr><td>Hindi</td><td>0.16</td></tr><tr><td>Spanish</td><td>0.11</td></tr><tr><td>Russian</td><td>0.09</td></tr><tr><td>Arabic</td><td>0.07</td></tr></tbody></table>

    reflecting 1985 number-of-speakers data. A few gismu were made much later using updated weights:

    <table><tbody><tr><td>Chinese</td><td>0.347</td></tr><tr><td>Hindi</td><td>0.196</td></tr><tr><td>English</td><td>0.160</td></tr><tr><td>Spanish</td><td>0.123</td></tr><tr><td>Russian</td><td>0.089</td></tr><tr><td>Arabic</td><td>0.085</td></tr></tbody></table>

    <a id="id-1.5.16.3.5.6.1" class="indexterm"></a><a id="id-1.5.16.3.5.6.2" class="indexterm"></a>(English and Hindi switched places due to demographic changes.)

<a id="id-1.5.16.4.1" class="indexterm"></a>Note that the stressed vowel of the gismu was considered sufficiently distinctive that two or more gismu may differ only in this vowel; as an extreme example, _<a id="id-1.5.16.4.2.1" class="indexterm"></a>[_bradi_](../go01#valsi-bradi)_ , _<a id="id-1.5.16.4.3.1" class="indexterm"></a>[_bredi_](../go01#valsi-bredi)_ , _<a id="id-1.5.16.4.4.1" class="indexterm"></a>[_bridi_](../go01#valsi-bridi)_ , and _<a id="id-1.5.16.4.5.1" class="indexterm"></a>[_brodi_](../go01#valsi-brodi)_ (but fortunately not _brudi_) are all existing gismu.