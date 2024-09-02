<a id="chapter-mekso"></a>Chapter 18. <a id="c18"></a>lojbau mekso: mathematical expressions in Lojban
======================================================================================================

<a id="chapter-mekso-picture"></a>![The picture for chapter 18](/assets//books/uncll/media/chapter-mekso.gif)

<a id="section-mekso-introduction"></a>18.1. <a id="c18s1"></a>Introductory
---------------------------------------------------------------------------

lojbau mekso ( “Lojbanic mathematical-expression”) is the part of the Lojban language that is tailored for expressing statements of a mathematical character, or for adding numerical information to non-mathematical statements. Its formal design goals include:

1.  <a id="id-1.19.3.3.1.1.1" class="indexterm"></a><a id="id-1.19.3.3.1.1.2" class="indexterm"></a>representing all the different forms of expression used by mathematicians in their normal modes of writing, so that a reader can unambiguously read off mathematical text as written with minimal effort and expect a listener to understand it;

2.  <a id="id-1.19.3.3.2.1.1" class="indexterm"></a><a id="id-1.19.3.3.2.1.2" class="indexterm"></a>providing a vocabulary of commonly used mathematical terms which can readily be expanded to include newly coined words using the full resources of Lojban;

3.  <a id="id-1.19.3.3.3.1.1" class="indexterm"></a>permitting the formulation, both in writing and in speech, of unambiguous mathematical text;

4.  <a id="id-1.19.3.3.4.1.1" class="indexterm"></a><a id="id-1.19.3.3.4.1.2" class="indexterm"></a>encompassing all forms of quantified expression found in natural languages, as well as encouraging greater precision in ordinary language situations than natural languages allow.

<a id="id-1.19.3.4.1" class="indexterm"></a><a id="id-1.19.3.4.2" class="indexterm"></a><a id="id-1.19.3.4.3" class="indexterm"></a>Goal 1 requires that mekso not be constrained to a single notation such as Polish notation or reverse Polish notation, but make provision for all forms, with the most commonly used forms the most easily used.

<a id="id-1.19.3.5.1" class="indexterm"></a>Goal 2 requires the provision of several conversion mechanisms, so that the boundary between mekso and full Lojban can be crossed from either side at many points.

<a id="id-1.19.3.6.1" class="indexterm"></a><a id="id-1.19.3.6.2" class="indexterm"></a>Goal 3 is the most subtle. Written mathematical expression is culturally unambiguous, in the sense that mathematicians in all parts of the world understand the same written texts to have the same meanings. However, international mathematical notation does not prescribe unique forms. For example, the expression

<div class="example">
<a id="example-random-id-dGcT"></a>

**Example 18.1. <a id="c18e1d1"></a>** 

3 ⁢ x + 2 ⁢ y

</div>  

<a id="id-1.19.3.8.1" class="indexterm"></a>contains omitted multiplication operators, but there are other possible interpretations for the strings 3⁢x and 2⁢y than as mathematical multiplication. Therefore, the Lojban verbal (spoken and written) form of [Example 18.1](../chapter-mekso#example-random-id-dGcT) must not omit the multiplication operators.

<a id="id-1.19.3.9.1" class="indexterm"></a><a id="id-1.19.3.9.2" class="indexterm"></a>The remainder of this chapter explains (in as much detail as is currently possible) the mekso system. This chapter is by intention complete as regards mekso components, but only suggestive about uses of those components – as of now, there has been no really comprehensive use made of mekso facilities, and many matters must await the test of usage to be fully clarified.