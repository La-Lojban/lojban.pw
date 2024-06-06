<a id="section-vectors-matrices"></a>18.15. <a id="c18s15"></a>Vectors and matrices
-----------------------------------------------------------------------------------

The following cmavo are discussed in this section:

<table class="cmavo-list"><colgroup></colgroup><tbody><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">jo'i</p></td><td class="selmaho"><p class="selmaho">JOhI</p></td><td class="description"><p class="description">start vector</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">te'u</p></td><td class="selmaho"><p class="selmaho">TEhU</p></td><td class="description"><p class="description">end vector</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">pi'a</p></td><td class="selmaho"><p class="selmaho">VUhU</p></td><td class="description"><p class="description">matrix row combiner</p></td></tr><tr class="cmavo-entry"><td class="cmavo"><p class="cmavo">sa'i</p></td><td class="selmaho"><p class="selmaho">VUhU</p></td><td class="description"><p class="description">matrix column combiner</p></td></tr></tbody></table>

<a id="id-1.19.17.4.1" class="indexterm"></a><a id="id-1.19.17.4.2" class="indexterm"></a>A mathematical vector is a list of numbers, and a mathematical matrix is a table of numbers. Lojban considers matrices to be built up out of vectors, which are in turn built up out of operands.

<a id="id-1.19.17.5.1" class="indexterm"></a><a id="id-1.19.17.5.2" class="indexterm"></a><a id="id-1.19.17.5.3" class="indexterm"></a><a id="id-1.19.17.5.4" class="indexterm"></a>_<a id="id-1.19.17.5.5.1" class="indexterm"></a>[_jo'i_](../go01#valsi-johi)_ , the only cmavo of selma'o JOhI, is the vector indicator: it has a syntax reminiscent of a forethought operator, but has very high precedence. The components must be simple operands rather than full expressions (unless parenthesized). A vector can have any number of components; _<a id="id-1.19.17.5.6.1" class="indexterm"></a>[_te'u_](../go01#valsi-tehu)_ is the elidable terminator. An example:

<div class="interlinear-gloss-example example">
<a id="example-random-id-IVDJ"></a>

**Example 18.107. <a id="c18e15d1"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>li</td><td>jo'i</td><td>paboi</td><td>reboi</td><td>te'u</td><td>su'i</td><td>jo'i</td><td>ciboi</td><td>voboi</td><td></td></tr><tr class="gloss"><td>The-number</td><td>array(</td><td>one,</td><td>two</td><td>)</td><td>plus</td><td>array(</td><td>three,</td><td>four</td><td>)</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>du</td><td>li</td><td>jo'i</td><td>voboi</td><td>xaboi</td><td></td></tr><tr class="gloss"><td>equals</td><td>the-number</td><td>array(</td><td>four,</td><td>six</td><td>).</td></tr><tr class="informalequation"><td colspan="12321"><div class="informalequation"><span class="mathphrase">(1,2) + (3,4) = (4,6)</span></div></td></tr></tbody></table>

</div>  

<a id="id-1.19.17.7.1" class="indexterm"></a><a id="id-1.19.17.7.2" class="indexterm"></a><a id="id-1.19.17.7.3" class="indexterm"></a><a id="id-1.19.17.7.4" class="indexterm"></a>Vectors can be combined into matrices using either _<a id="id-1.19.17.7.5.1" class="indexterm"></a>[_pi'a_](../go01#valsi-piha)_ , the matrix row operator, or _<a id="id-1.19.17.7.6.1" class="indexterm"></a>[_sa'i_](../go01#valsi-sahi)_ , the matrix column operator. The first combines vectors representing rows of the matrix, and the second combines vectors representing columns of the matrix. Both of them allow any number of arguments: additional arguments are tacked on with the null operator _<a id="id-1.19.17.7.7.1" class="indexterm"></a>[_ge'a_](../go01#valsi-geha)_.

Therefore, the “magic square” matrix

<table><tbody><tr><td>8</td><td>1</td><td>6</td></tr><tr><td>3</td><td>5</td><td>7</td></tr><tr><td>4</td><td>9</td><td>2</td></tr></tbody></table>

can be represented either as:

<div class="interlinear-gloss-example example">
<a id="example-random-id-zbJP"></a>

**Example 18.108. <a id="id-1.19.17.11.1.1" class="indexterm"></a><a id="c18e15d2"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>jo'i</td><td>biboi</td><td>paboi</td><td>xa</td><td>pi'a</td><td>jo'i</td><td>ciboi</td><td>muboi</td><td>ze</td></tr><tr class="gloss"><td>the-vector</td><td>(8</td><td>1</td><td>6)</td><td>matrix-row</td><td>the-vector</td><td>(3</td><td>5</td><td>7),</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ge'a</td><td>jo'i</td><td>voboi</td><td>soboi</td><td>re</td></tr><tr class="gloss"><td></td><td>the-vector</td><td>(4</td><td>9</td><td>2)</td></tr></tbody></table>

</div>  

or as

<div class="interlinear-gloss-example example">
<a id="example-random-id-06dx"></a>

**Example 18.109. <a id="c18e15d3"></a>** 

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>jo'i</td><td>biboi</td><td>ciboi</td><td>vo</td><td>sa'i</td><td>jo'i</td><td>paboi</td><td>muboi</td><td>so</td></tr><tr class="gloss"><td>the-vector</td><td>(8</td><td>3</td><td>4)</td><td>matrix-column</td><td>the-vector</td><td>(1</td><td>5</td><td>9),</td></tr></tbody></table>

<table class="interlinear-gloss"><colgroup></colgroup><tbody><tr class="jbo"><td>ge'a</td><td>jo'i</td><td>xaboi</td><td>zeboi</td><td>re</td></tr><tr class="gloss"><td></td><td>the-vector</td><td>(6</td><td>7</td><td>2)</td></tr></tbody></table>

</div>  

<a id="id-1.19.17.14.1" class="indexterm"></a><a id="id-1.19.17.14.2" class="indexterm"></a><a id="id-1.19.17.14.3" class="indexterm"></a><a id="id-1.19.17.14.4" class="indexterm"></a><a id="id-1.19.17.14.5" class="indexterm"></a><a id="id-1.19.17.14.6" class="indexterm"></a>The regular mekso operators can be applied to vectors and to matrices, since grammatically both of these are expressions. It is usually necessary to parenthesize matrices when used with operators in order to avoid incorrect groupings. There are no VUhU operators for the matrix operators of inner or outer products, but appropriate operators can be created using a suitable symbolic lerfu word or string prefixed by _<a id="id-1.19.17.14.7.1" class="indexterm"></a>[_ma'o_](../go01#valsi-maho)_.

<a id="id-1.19.17.15.1" class="indexterm"></a><a id="id-1.19.17.15.2" class="indexterm"></a>Matrices of more than two dimensions can be built up using either _<a id="id-1.19.17.15.3.1" class="indexterm"></a>[_pi'a_](../go01#valsi-piha)_ or _<a id="id-1.19.17.15.4.1" class="indexterm"></a>[_sa'i_](../go01#valsi-sahi)_ with an appropriate subscript labeling the dimension. When subscripted, there is no difference between _<a id="id-1.19.17.15.5.1" class="indexterm"></a>[_pi'a_](../go01#valsi-piha)_ and _<a id="id-1.19.17.15.6.1" class="indexterm"></a>[_sa'i_](../go01#valsi-sahi)_. Labels can be any anything that _<a id="id-1.19.17.15.7.1" class="indexterm"></a>[_xi_](../go01#valsi-xi)_ supports, e.g. _<a id="id-1.19.17.15.8.1" class="indexterm"></a>[_pa_](../go01#valsi-pa)_ or _<a id="id-1.19.17.15.9.1" class="indexterm"></a>mlatu bu_.