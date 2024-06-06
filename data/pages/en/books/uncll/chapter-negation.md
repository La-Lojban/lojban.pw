<a id="chapter-negation"></a>Chapter 15. <a id="c15"></a>“No” problems: on Lojban negation
==========================================================================================

<a id="chapter-negation-picture"></a>![The picture for chapter 15](/assets//books/uncll/media/chapter-negation.gif)

<a id="section-negation-introduction"></a>15.1. <a id="c15s1"></a>Introductory
------------------------------------------------------------------------------

The grammatical expression of negation is a critical part of Lojban's claim to being logical. The problem of negation, simply put, is to come up with a complete definition of the word “not”. For Lojban's unambiguous grammar, this means further that meanings of “not” with different grammatical effect must be different words, and even different grammatical structures.

Logical assertions are implicitly required in a logical language; thus, an apparatus for expressing them is built into Lojban's logical connectives and other structures.

In natural languages, especially those of Indo-European grammar, we have sentences composed of two parts which are typically called “subject” and “predicate”. In the statement

<div class="example">
<a id="example-random-id-vrXe"></a>

**Example 15.1. <a id="c15e1d1"></a>** 

John goes to the store

</div>  

“John” is the subject, and “goes to the store” is the predicate. Negating [Example 15.1](../chapter-negation#example-random-id-vrXe) to produce

<div class="example">
<a id="example-random-id-gm3I"></a>

**Example 15.2. <a id="c15e1d2"></a>** 

John doesn't go to the store.

</div>  

has the effect of declaring that the predicate does not hold for the subject. [Example 15.2](../chapter-negation#example-random-id-gm3I) says nothing about whether John goes somewhere else, or whether someone else besides John goes to the store.

We will call this kind of negation “natural language negation”. This kind of negation is difficult to manipulate by the tools of logic, because it doesn't always follow the rules of logic. Logical negation is bi-polar: either a statement is true, or it is false. If a statement is false, then its negation must be true. Such negation is termed contradictory negation.

Let's look at some examples of how natural language negation can violate the rules of contradictory negation.

<div class="example">
<a id="example-random-id-qGWR"></a>

**Example 15.3. <a id="c15e1d3"></a>** 

Some animals are not white.

</div>  
<div class="example">
<a id="example-random-id-qgXI"></a>

**Example 15.4. <a id="c15e1d4"></a>** 

Some animals are white.

</div>  

Both of these statements are true; yet one is apparently the negation of the other. Another example:

<div class="example">
<a id="example-random-id-qgxL"></a>

**Example 15.5. <a id="c15e1d5"></a>** 

I mustn't go to the dance.

</div>  
<div class="example">
<a id="example-random-id-qGXL"></a>

**Example 15.6. <a id="c15e1d6"></a>** 

I must go to the dance.

</div>  

At first thought, [Example 15.5](../chapter-negation#example-random-id-qgxL) negates [Example 15.6](../chapter-negation#example-random-id-qGXL). Thinking further, we realize that there is an intermediate state wherein I am permitted to go to the dance, but not obligated to do so. Thus, it is possible that both statements are false.

Sometimes order is significant:

<div class="example">
<a id="example-random-id-qgyb"></a>

**Example 15.7. <a id="c15e1d7"></a>** 

The falling rock didn't kill Sam.

</div>  
<div class="example">
<a id="example-random-id-qGYX"></a>

**Example 15.8. <a id="c15e1d8"></a>** 

Sam wasn't killed by the falling rock.

</div>  

Our minds play tricks on us with this one. Because [Example 15.7](../chapter-negation#example-random-id-qgyb) is written in what is called the “active voice” , we immediately get confused about whether “the falling rock” is a suitable subject for the predicate “did kill Sam”. “Kill” implies volition to us, and rocks do not have volition. This confusion is employed by opponents of gun control who use the argument “Guns don't kill people; people kill people.”

Somehow, we don't have the same problem with [Example 15.8](../chapter-negation#example-random-id-qGYX). The subject is Sam, and we determine the truth or falsity of the statement by whether he was or wasn't killed by the falling rock.

[Example 15.8](../chapter-negation#example-random-id-qGYX) also helps us focus on the fact that there are at least two questionable facts implicit in this sentence: whether Sam was killed, and if so, whether the falling rock killed him. If Sam wasn't killed, the question of what killed him is moot.

This type of problem becomes more evident when the subject of the sentence turns out not to exist:

<div class="example">
<a id="example-random-id-qgzq"></a>

**Example 15.9. <a id="c15e1d9"></a>** 

The King of Mexico didn't come to dinner.

</div>  
<div class="example">
<a id="example-random-id-qgzv"></a>

**Example 15.10. <a id="c15e1d10"></a>** 

The King of Mexico did come to dinner.

</div>  

In the natural languages, we would be inclined to say that both of these statements are false, since there is no King of Mexico.

The rest of this chapter is designed to explain the Lojban model of negation.