<a id="section-lujvo-making"></a>4.11. <a id="c4s11"></a>The lujvo-making algorithm
-----------------------------------------------------------------------------------

<a id="id-1.5.13.2.1" class="indexterm"></a>The following is the current algorithm for generating Lojban lujvo given a known tanru and a complete list of gismu and their assigned rafsi. The algorithm was designed by Bob LeChevalier and Dr. James Cooke Brown for computer program implementation. It was modified in 1989 with the assistance of Nora LeChevalier, who detected a flaw in the original “tosmabru test”.

Given a tanru that is to be made into a lujvo:

1.  Choose a 3-letter or 4-letter rafsi for each of the gismu and cmavo in the tanru except the last.

2.  Choose a 3-letter (CVV-form or CCV-form) or 5-letter rafsi for the final gismu in the tanru.

3.  Join the resulting string of rafsi, initially without hyphens.

4.  <a id="id-1.5.13.4.4.1.1" class="indexterm"></a>Add hyphen letters where necessary. It is illegal to add a hyphen at a place that is not required by this algorithm. Right-to-left tests are recommended, for reasons discussed below.

    1.  If there are more than two words in the tanru, put an r-hyphen (or an n-hyphen) after the first rafsi if it is CVV-form. If there are exactly two words, then put an r-hyphen (or an n-hyphen) between the two rafsi if the first rafsi is CVV-form, unless the second rafsi is CCV-form (for example, _<a id="id-1.5.13.4.4.2.1.1.1.1" class="indexterm"></a>saicli_ requires no hyphen). Use an r-hyphen unless the letter after the hyphen is _r_ , in which case use an n-hyphen. Never use an n-hyphen unless it is required.

    2.  Put a y-hyphen between the consonants of any impermissible consonant pair. This will always appear between rafsi.

    3.  <a id="id-1.5.13.4.4.2.3.1.1" class="indexterm"></a>Put a y-hyphen after any 4-letter rafsi form.

    
5.  Test all forms with one or more initial CVC-form rafsi – with the pattern “CVC ... CVC + X” – for “tosmabru failure”. In order to fail, X must either be a CVCCV long rafsi that happens to have a permissible initial pair as the consonant cluster, or is something which has caused a y-hyphen to be inserted between the preceding CVC and X in step 4.b.

    The test is as follows:

    1.  Examine all the C/C consonant pairs up to the first y-hyphen, or up to the end of the word in case there are no y-hyphens.

        These consonant pairs are called "joints”.

    2.  If all of those joints are permissible initials, then the trial word will break up into a cmavo and a shorter brivla, so we need to add a “y”-hyphen at the first joint. If not, the word will not break up, and no further hyphens are needed.

    3.  Install a y-hyphen at the first such joint.

    

<a id="id-1.5.13.5.1" class="indexterm"></a><a id="id-1.5.13.5.2" class="indexterm"></a>Note that the “tosmabru test”, which affects hyphenation after the first rafsi, cannot be performed until after hyphenation to the right under step 4 has already been determined.