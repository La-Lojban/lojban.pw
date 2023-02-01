---
title: la sutysisku and similarity search
---

[la sutysisku](https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en) is a web application that can work offline. It provides access to Lojban dictionaries among other features.

![la sutysisku - similarity search](/assets/arxivo/sutysisku_simsa.png)

One feature of la sutysisku is the so called similarity search. If you want to know how to say "_marvellous_" in Lojban you may not expect the very word "marvellous" in the Lojban definition, instead you might expect similar in meaning words like "_brilliant_", "_delightful_", "_superlative_". la sutysisku tries its best to find words with definitions containing such synonymous or similar in meaning words.

Another case is when you query a word but would like to find words that might be used in the same context even they are not direct synonyms. E.g. when searching for "_attempt_" you might wish to find words meaning "_fail_" since both these concepts might be useful when describing different stages of a situation. Or when searching for ["_whisper_"](https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&sisku=whisper&bangu=en&versio=masno) you might benefit from getting definitions of related words like "_quiet_", "_utter_", "_hear_", "_echo_", "_yell_".

Needless to say, English has lots of ambiguous words or words with several meanings each, e.g. "_left_" ("not on the right" vs. "remaining"). la sutysisku in such cases shows best guesses for most of such meanings.

The algorithm behind the scenes are so called "word vectors" where each English word is represented by a list of scalar values and words that occur in similar contexts get similar values in such "vector" space. The core Lojban vocabulary (gismu "verbs") has been manually mapped to English glosswords to help you get better matches.

To enable similarity search choose "similar" button after entering a word in la sutysisku.

<div style="font-size:200%;">
<a href="https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en">Try la sutysisku now</a>
</div>
