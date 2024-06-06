<a id="chapter-quantifiers"></a>Chapter 16. <a id="c16"></a>“Who did you pass on the road? Nobody”: Lojban and logic
====================================================================================================================

<a id="chapter-quantifiers-picture"></a>![The picture for chapter 16](/assets//books/uncll/media/chapter-quantifiers.gif)

<a id="section-quantifiers-introduction"></a>16.1. <a id="c16s1"></a>What's wrong with this picture?
----------------------------------------------------------------------------------------------------

<a id="id-1.17.3.2.1" class="indexterm"></a>The following brief dialogue is from _Chapter 7_ of _Through The Looking Glass_ by Lewis Carroll.

<div class="example">
<a id="example-random-id-KB90"></a>

**Example 16.1. <a id="c16e1d1"></a>** 

“Who did you pass on the road?” the King went on, holding out his hand to the Messenger for some more hay.

</div>  
<div class="example">
<a id="example-random-id-1UVT"></a>

**Example 16.2. <a id="c16e1d2"></a>** 

“Nobody,” said the Messenger.

</div>  
<div class="example">
<a id="example-random-id-x9fC"></a>

**Example 16.3. <a id="c16e1d3"></a>** 

“Quite right,” said the King: “this young lady saw him too. So of course Nobody walks slower than you.”

</div>  
<div class="example">
<a id="example-random-id-105i"></a>

**Example 16.4. <a id="c16e1d4"></a>** 

“I do my best,” the Messenger said in a sulky tone. “I'm sure nobody walks much faster than I do!”

</div>  
<div class="example">
<a id="example-random-id-ANLu"></a>

**Example 16.5. <a id="c16e1d5"></a>** 

“He can't do that,” said the King, “or else he'd have been here first.”

</div>  

This nonsensical conversation results because the King insists on treating the word “nobody” as a name, a name of somebody. However, the essential nature of the English word “nobody” is that it doesn't refer to somebody; or to put the matter another way, there isn't anybody to which it refers.

<a id="id-1.17.3.9.1" class="indexterm"></a>The central point of contradiction in the dialogue arises in [Example 16.3](../chapter-quantifiers#example-random-id-x9fC) , when the King says “... Nobody walks slower than you”. This claim would be plausible if “Nobody” were really a name, since the Messenger could only pass someone who does walk more slowly than he. But the Messenger interprets the word “nobody” in the ordinary English way, and says (in [Example 16.4](../chapter-quantifiers#example-random-id-105i)) “... nobody walks much faster than I do” (i.e., I walk faster, or as fast as, almost everyone), which the King then again misunderstands. Both the King and the Messenger are correct according to their respective understandings of the ambiguous word “nobody/Nobody”.

<a id="id-1.17.3.10.1" class="indexterm"></a>There are Lojban words or phrases corresponding to the problematic English words “somebody” , “nobody” , “anybody” , “everybody” (and their counterparts “some/no/any/everyone” and “some/no/any/everything”), but they obey rules which can often be surprising to English-speakers. The dialogue above simply cannot be translated into Lojban without distortion: the name “Nobody” would have to be represented by a Lojban name, which would spoil the perfection of the wordplay. As a matter of fact, this is the desired result: a logical language should not allow two conversationalists to affirm “Nobody walks slower than the Messenger” and “Nobody walks faster than the Messenger” and both be telling the truth. (Unless, of course, nobody but the Messenger walks at all, or everyone walks at exactly the same speed.)

<a id="id-1.17.3.11.1" class="indexterm"></a>This chapter will explore the Lojban mechanisms that allow the correct and consistent construction of sentences like those in the dialogue. There are no new grammatical constructs explained in this chapter; instead, it discusses the way in which existing facilities that allow Lojban-speakers to resolve problems like the above, using the concepts of modern logic. However, we will not approach the matter from the viewpoint of logicians, although readers who know something of logic will discover familiar notions in Lojban guise.

<a id="id-1.17.3.12.1" class="indexterm"></a>Although Lojban is called a logical language, not every feature of it is “logical”. In particular, the use of _<a id="id-1.17.3.12.3.1" class="indexterm"></a>[_le_](../go01#valsi-le)_ is incompatible with logical reasoning based on the description selbri, because that selbri may not truthfully apply: you cannot conclude from my statement that

<div class="interlinear-gloss-example example">
<a id="example-random-id-4J5Y"></a>

**Example 16.6. <a id="c16e1d6"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>mi</td><td>viska</td><td>le</td><td>nanmu</td></tr><tr class="gloss"><td>I</td><td>see</td><td>the-one-I-refer-to-as-the</td><td>man.</td></tr></tbody></table>

<table class="interlinear-gloss"><tbody><tr class="para"><td colspan="12321"><p class="natlang">I see the man/men.</p></td></tr></tbody></table>

</div>  

that there really is a man; the only thing you can conclude is that there is one thing (or more) that I choose to refer to as a man. You cannot even tell which man is meant for sure without asking me (although communication is served if you already know from the context).

<a id="id-1.17.3.15.1" class="indexterm"></a><a id="id-1.17.3.15.2" class="indexterm"></a>In addition, the use of attitudinals (see [Chapter 13](../chapter-attitudinals)) often reduces or removes the ability to make deductions about the bridi to which those attitudinals are applied. From the fact that I hope George will win the election, you can conclude nothing about George's actual victory or defeat.