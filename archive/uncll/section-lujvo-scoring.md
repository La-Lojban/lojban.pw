<a id="section-lujvo-scoring"></a>4.12. <a id="c4s12"></a>The lujvo scoring algorithm
-------------------------------------------------------------------------------------

This algorithm was devised by Bob and Nora LeChevalier in 1989. It is not the only possible algorithm, but it usually gives a choice that people find preferable. The algorithm may be changed in the future. The lowest-scoring variant will usually be the dictionary form of the lujvo. (In previous versions, it was the highest-scoring variant.)

1.  Count the total number of letters, including hyphens and apostrophes; call it L.

2.  Count the number of apostrophes; call it A.

3.  Count the number of _y-_ , _r-_ , and n-hyphens; call it H.

4.  For each rafsi, find the value in the following table. Sum this value over all rafsi; call it R :

    <table><tbody><tr><td>CVC/CV (final)</td><td>( <span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">-sarji</em></span>)</td><td>1</td></tr><tr><td>CVC/C</td><td>( <span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">-sarj-</em></span>)</td><td>2</td></tr><tr><td>CCVCV (final)</td><td>( <span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">-zbasu</em></span>)</td><td>3</td></tr><tr><td>CCVC</td><td>( <span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">-zbas-</em></span>)</td><td>4</td></tr><tr><td>CVC</td><td>( <span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">-nun-</em></span>)</td><td>5</td></tr><tr><td>CVV with an apostrophe</td><td>( <span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">-ta'u-</em></span>)</td><td>6</td></tr><tr><td>CCV</td><td>( <span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">-zba-</em></span>)</td><td>7</td></tr><tr><td>CVV with no apostrophe</td><td>( <span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">-sai-</em></span>)</td><td>8</td></tr></tbody></table>

5.  Count the number of vowels, not including _y_ ; call it V.

<a id="id-1.5.14.4.1" class="indexterm"></a><a id="id-1.5.14.4.2" class="indexterm"></a>The score is then:

(1000 \* L) - (500 \* A) + (100 \* H) - (10 \* R) - V

<a id="id-1.5.14.4.4" class="indexterm"></a>In case of ties, there is no preference. This should be rare. Note that the algorithm essentially encodes a hierarchy of priorities: short words are preferred (counting apostrophes as half a letter), then words with fewer hyphens, words with more pleasing rafsi (this judgment is subjective), and finally words with more vowels are chosen. Each decision principle is applied in turn if the ones before it have failed to choose; it is possible that a lower-ranked principle might dominate a higher-ranked one if it is ten times better than the alternative.

<a id="id-1.5.14.5.1" class="indexterm"></a>Here are some lujvo with their scores (not necessarily the lowest scoring forms for these lujvo, nor even necessarily sensible lujvo):

<div class="lujvo-making-example example">
<a id="example-random-id-qJKu"></a>

**Example 4.71. <a id="c4e12d1"></a>** 

<table class="lujvo-making"><colgroup></colgroup><tbody><tr><td><p class="jbo">zbasai</p></td></tr><tr><td><span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">zba + sai</em></span></td></tr><tr><td><p class="lujvo-score"><span class="mathphrase">(1000 * 6) - (500 * 0) + (100 * 0) - (10 * 15) - 3 = 5847</span></p></td></tr></tbody></table>

</div>  
<div class="lujvo-making-example example">
<a id="example-random-id-qjLd"></a>

**Example 4.72. <a id="c4e12d2"></a>** 

<table class="lujvo-making"><colgroup></colgroup><tbody><tr><td><p class="jbo">nunynau</p></td></tr><tr><td><span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">nun + y + nau</em></span></td></tr><tr><td><p class="lujvo-score"><span class="mathphrase">(1000 * 7) - (500 * 0) + (100 * 1) - (10 * 13) - 3 = 6967</span></p></td></tr></tbody></table>

</div>  
<div class="lujvo-making-example example">
<a id="example-random-id-qJLQ"></a>

**Example 4.73. <a id="c4e12d3"></a>** 

<table class="lujvo-making"><colgroup></colgroup><tbody><tr><td><p class="jbo">sairzbata'u</p></td></tr><tr><td><span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">sai + r + zba + ta'u</em></span></td></tr><tr><td><p class="lujvo-score"><span class="mathphrase">(1000 * 11) - (500 * 1) + (100 * 1) - (10 * 21) - 5 = 10385</span></p></td></tr></tbody></table>

</div>  
<div class="lujvo-making-example example">
<a id="example-random-id-qJmn"></a>

**Example 4.74. <a id="c4e12d4"></a>** 

<table class="lujvo-making"><colgroup></colgroup><tbody><tr><td><p class="jbo">zbazbasysarji</p></td></tr><tr><td><span xml:lang="jbo" class="foreignphrase" lang="jbo"><em xml:lang="jbo" class="foreignphrase" lang="jbo">zba + zbas + y + sarji</em></span></td></tr><tr><td><p class="lujvo-score"><span class="mathphrase">(1000 * 13) - (500 * 0) + (100 * 1) - (10 * 12) - 4 = 12976</span></p></td></tr></tbody></table>

</div>