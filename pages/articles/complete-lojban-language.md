---
title: 📕 Unofficial ‘Complete Lojban Language’ book
---

**CLL unofficial** (colloquially, *UnCLL*, *InCLL*) is a project organized by Gleki of regular experimental unofficial (not necessarily approved by the Logical Language Group) builds of the Complete Lojban Language book.

*   Send your feedback (noticed bugs, proposals, suggestions) to one of the following places:
    *   [Lojban Reddit group](https://www.reddit.com/r/lojban/)
    *   [Lojban Facebook group](https://www.facebook.com/groups/lojban)
    *   Live chat: [Telegram chat](https://t.me/joinchat/BLVsYz3hCF8mCAb6fzW1Rw) or [Discord chat](https://discord.gg/BVm4EYR)
    *   to <gleki.is.my.name@gmail.com> (Gleki&nbsp;Arxokuna), the maintainer of the UnCLL.


## Releases

### geklojban-1.2.14 July 2021

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.14" and has the name of the organization published it different from the LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.14/cll.pdf)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.14/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.14/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.14/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.14 to the UnCLL, version 1.2.12 (published in November 2020). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.14/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.14/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.14/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the previous version 'geklojban-1.2.11.1 October 2020'

#### Source code

* it's one of the major improvements. [Lojban Words Glossary](https://la-lojban.github.io/uncll/uncll-1.2.14/xhtml_section_chunks/go01.html) got around 200 new examples of sentences in Lojban with their translation to English. Since the number of core words in Lojban is around 2000 it means ~10% of this task is done
* fixed errors in with **bo**, **ke'e** in Chapter 5. 'Scalar negation of selbri'
* fix an incorrect name of one audio file
* more improvements to the index: added ZEhA and more BAI
* better explain cmevla according to the dotside
* add missing dots in cmavo where necessary
* fix punctuation in 'Kubla Khan' poem translation

[git source of the UnCLL](https://github.com/lojban/cll/compare/geklojban-master)

* [Compared with version 'geklojban-1.2.12 November 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.12...geklojban-1.2.14)
* [Comparison between the official CLL v.1.1 edition (2016) and the UnCLL November 2020 edition': git difference](https://github.com/lojban/cll/compare/6c0556c7b17f96b3bf41e.133ba18ef4868e056a...geklojban-1.2.12)

### geklojban-1.2.13 May 2021

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.13" and has the name of the organization published it different from the LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.13/cll.pdf)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.13/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.13/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.13/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.13 to the UnCLL, version 1.2.12 (published in November 2020). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.13/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.13/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.13/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the previous version 'geklojban-1.2.11.1 October 2020'

#### Source code

* add new beautiful chapter pictures by [la-ninpre](https://github.com/la-ninpre)
* add a translation of 'In Xanadu' poem to the chrestomathy
* fix weirdly dated attempt at set theory by [simpson](https://github.com/MostAwesomeDude)
* fix definition of **toldi** (_butterfly_)
* fix incorrect statement that implied fuhivla don't have rafsi
* make the explanation of **le vi tavla ba klama** less misleading (fix implemented by [mezohe](https://github.com/mezohe))
* Matrices of more than two dimensions can be built up using either **pi'a** or **sa'i** with an appropriate subscript labeling the dimension... Labels can be any anything that **xi** supports, e.g. **pa** or **mlatu bu**.
* Chapter 5: restore mention of **bo** grouping in section on NAhE, and add **bo** to one example (fix implemented by [mezohe](https://github.com/mezohe))
* Chapter 7: fix statement about **ra'o** in example 7.39 (fix implemented by [mezohe](https://github.com/mezohe))
* Chapter 2: fix diagram (predicate -> predication) (fix implemented by [mezohe](https://github.com/mezohe))
* add missing dots in cmavo
* fixed other minor mistypes, elements of indices, compilation scripts etc.

[git source of the UnCLL](https://github.com/lojban/cll/compare/geklojban-master)

* [Compared with version 'geklojban-1.2.12 November 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.12...geklojban-1.2.13)
* [Comparison between the official CLL v.1.1 edition (2016) and the UnCLL November 2020 edition': git difference](https://github.com/lojban/cll/compare/6c0556c7b17f96b3bf41e.133ba18ef4868e056a...geklojban-1.2.12)

### geklojban-1.2.12 November 2020

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.12" and has the name of the organization published it different from the LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.12/cll.pdf)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.12/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.12/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.12/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.12 to the CLL published in 2016 (2016-08-27 release). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.12/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.12/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.12/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the previous version 'geklojban-1.2.11.1 October 2020'

* Added standard pronunciation of {u} in IPA chapter (by [Vexatos](https://github.com/Vexatos))
* Subscript symbols in glosses are treated appropriately (bug noticed by [gr-g](https://github.com/gr-g))
* Fixed a grammatical error in Example 17.36 (bug noticed by [kotwys](https://github.com/kotwys))
* The particle **ri'u** was missing from Section 10.28 (as noticed by [gr-g](https://github.com/gr-g)). Added
* In Example 7.12 the first place of **lafti** is applied to a person. The predicate change to **lafmuvgau** (which is in the notes of the definition of **lafti**)
* In English text change .) to ). where necessary
* Display square root, infinity and golden ration phi with actual symbols
* Fix incorrect translation of **levi rozgu cu sofi'upanova'e xunre**
* other minor fixes

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.12)

#### Source code comparison with previous versions
* [Compared with version 'geklojban-1.2.11.1 October 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.11.1...geklojban-1.2.12)
* [Compared with version 'geklojban-1.2.3 January 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.3...geklojban-1.2.12)
* [Compared with the official CLL v.1.1 edition (2016)': git difference](https://github.com/lojban/cll/compare/6c0556c7b17f96b3bf41e8123ba18ef4868e056a...geklojban-1.2.12)


### geklojban-1.2.11.1 October 2020

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.11" and has the name of the organization published it different from the LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.11/cll.pdf)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.11/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.11/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.11/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.11 to the CLL published in 2016 (2016-08-27 release). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.11/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.11/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.11/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the previous version 'geklojban-1.2.10 August 2020'

* Audio links (audio by la tcakoi, la .lindar., la .aionys.) are added to "splits by sections" and "split by chapters" HTML versions of the book
* fix several mistypes
* add hanzi characters to one Chinese example
* 1.2.11.1 hotfix release: make audio buttons in HTML pages actually work

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.11)

#### Source code comparison with previous versions
* [Compared with version 'geklojban-1.2.10 August 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.10...geklojban-1.2.11)
* [Compared with version 'geklojban-1.2.3 January 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.3...geklojban-1.2.11)
* [Compared with the official CLL v.1.1 edition (2016)': git difference](https://github.com/lojban/cll/compare/6c0556c7b17f96b3bf41e8123ba18ef4868e056a...geklojban-1.2.11)

### geklojban-1.2.10 August 2020

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.10" and has the name of the organization published it different from the LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.10/cll.pdf)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.10/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.10/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.10/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.10 to the CLL published in 2016 (2016-08-27 release). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.10/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.10/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.10/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the previous version 'geklojban-1.2.9 July 2020'

* Chrestomathy (selected texts) volume added after the last chapter
* dots are never omitted in words, not even in Lojban Words Index

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.10)

#### Source code comparison with previous versions
* [Compared with version 'geklojban-1.2.9 July 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.9...geklojban-1.2.10)
* [Compared with version 'geklojban-1.2.3 January 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.3...geklojban-1.2.10)
* [Compared with the official CLL v.1.1 edition (2016)': git difference](https://github.com/lojban/cll/compare/6c0556c7b17f96b3bf41e8123ba18ef4868e056a...geklojban-1.2.10)


### geklojban-1.2.9 July 2020

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.9" and has the name of the organization published it different from the LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.9/cll.pdf)
    *   [EPUB format](https://la-lojban.github.io/uncll/uncll-1.2.9/cll.epub)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.9/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.9/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.9/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.9 to the CLL published in 2016 (2016-08-27 release). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.9/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.9/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.9/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the previous version 'geklojban-1.2.8.1 June 2020'

* HTML version now has tables and examples horizontally scrollable on narrow (e.g. mobile devices') screens. This makes the HTML version more mobile-friendly
* EPUB is generated again (was missing from version  1.2.8.1)
* Korean and Chinese symbols are now displayed using Noto CJK font
* places like "x1" are now displayed with numbers subscripted
* An example in Section 16.9 {naku zo'u la djan. klama} didn't correspond to other examples around it so it was replaced with {naku zo'u mi klama le zarci} (a bug noticed by [Corbin Simpson](https://github.com/MostAwesomeDude))
* a definition of the word {bu'u} is added to the list of other grammatical partices of class FAhA

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.9)

#### Source code comparison with previous versions
* [Compared with version 'geklojban-1.2.8.1 June 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.8.1...geklojban-1.2.9)
* [Compared with version 'geklojban-1.2.3 January 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.3...geklojban-1.2.9)
* [Compared with the official CLL v.1.1 edition (2016)': git difference](https://github.com/lojban/cll/compare/6c0556c7b17f96b3bf41e8123ba18ef4868e056a...geklojban-1.2.9)

### geklojban-1.2.8.1 June 2020

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.8.1" and has the name of the organization published it different from LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.8.1/cll.pdf)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.8.1/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.8.1/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.8.1/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.8.1 to the CLL published in 2016 (2016-08-27 release). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.8.1/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.8.1/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.8.1/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the previous version 'geklojban-1.2.7 May 2020'

* A new "diacritic" orthography named "zbalermorna" added. It's clearly mentioned as unofficial. Its symbols ("letters") are displayed with an appropriate font. Kudos to [Jack Humbert](https://jackhumbert.github.io/zbalermorna/) and their team (la saski'o, la xaspeljba and others) for the font and the revision of the explanation of the orthography.
* The indices have been revised (almost all of their 4000 entries). Numerous entries have been modified for the ease of use or moved from Lojban Words Index to General Index or vice versa.
* the rule for usage of the comma is [reverted](!https://github.com/lojban/cll/commit/b944ee1c8954175fc535a1285c38a5839a2c626d#diff-a81fd01b20e40cf4b0d02a734acf21fe) back to the version from the CLL 1.1 
* a better diff algorithm for viewing differences between versions (without extra clutter)
* version 1.2.8.1 hotfix release: fixed problems with zbalermorna symbols display in the PDF document

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.8.1)

#### Source code comparison with previous versions
* [Compared with version 'geklojban-1.2.7 May 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.7...geklojban-1.2.8.1)
* [Compared with version 'geklojban-1.2.3 January 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.3...geklojban-1.2.8.1)
* [Compared with the official CLL v.1.1 edition (2016)': git difference](https://github.com/lojban/cll/compare/6c0556c7b17f96b3bf41e8123ba18ef4868e056a...geklojban-1.2.8.1)

### geklojban-1.2.7 May 2020

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.7" and has the name of the organization published it different from LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.7/cll.pdf)
    *   [EPUB format](https://la-lojban.github.io/uncll/uncll-1.2.7/cll.epub)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.7/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.7/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.7/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.7 to the CLL published in 2016 (2016-08-27 release). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.7/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.7/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.7/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the previous version 'geklojban-1.2.6 April 2020'

* "The cmavo tu'a is used in forming abstractions, and is explained more fully in Section 11.11." but it isn't mentioned at all in that section. Changed the reference to Section 11.10. The bug is noticed by [Robert Baruch](https://github.com/RobertBaruch).
* all the references to selma'o are moved from lojban words index to general index in the appendix.
* Section 10.18. The phrase "Unlike -nai contradictory negation, scalar negation of tenses is not limited to PU and FAhA:" contradicted the following text of the section. Replaced with "An example of scalar negation of FAhA:"

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.7)
#### Source code comparison with previous versions
* [Compared with version 'geklojban-1.2.6 April 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.6...geklojban-1.2.7)
* [Compared with version 'geklojban-1.2.3 January 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.3...geklojban-1.2.7)
* [Compared with the official CLL v.1.1 edition (2016)': git difference](https://github.com/lojban/cll/compare/6c0556c7b17f96b3bf41e8123ba18ef4868e056a...geklojban-1.2.7)

### geklojban-1.2.6 April 2020

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.6" and has the name of the organization published it different from LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.6/cll.pdf)
    *   [EPUB format](https://la-lojban.github.io/uncll/uncll-1.2.6/cll.epub)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.6/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.6/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.6/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.6 to the CLL published in 2016 (2016-08-27 release). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.6/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.6/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.6/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the previous version 'geklojban-1.2.5 March 2020'

* new slick hi-res pictures for several chapters made by [la ninpre](https://github.com/la-ninpre) (possible copyright violation rejected)
* the rule 'commas are never required' is now temporarily limited to commas that are syllable separators
* added more links to various selma'o to lojban-word index

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.6)
#### Source code comparison with previous versions
* [Compared with version 'geklojban-1.2.5 March 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.5...geklojban-1.2.6)
* [Compared with version 'geklojban-1.2.3 January 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.3...geklojban-1.2.6)

### geklojban-1.2.5 March 2020

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.5" and has the name of the organization published it different from LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.5/cll.pdf)
    *   [EPUB format](https://la-lojban.github.io/uncll/uncll-1.2.5/cll.epub)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.5/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.5/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.5/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.5 to the CLL published in 2016 (2016-08-27 release). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.5/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.5/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.5/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the version 'geklojban-1.2.3 January 2020'
* temporarily remove controversial use of ni+ce'u
* use a better example for NU JA NU, remove expansion of NU JA NU (which may not be unambiguous in case of several NU JA NU in one bridi)
* add hanzi and prettier pinyin to Chinese examples
* Dotside: Adding an initial glottal stop to the IPA transcription in one example
* add "FA selma'o" to lojban-word index
* the rule 'commas are never required' is temporarily limited to cmevla only
* a few mistypes are fixed
* UTF symbols are added as they are (instead of their descriptions)
*   Dotside implemented
*   "cmene" and "cmevla" concepts are now separated
*   **sumti tcita** is renamed to **sumtcita**
*   **mi kucli le jei broda** is now **mi kucli tu'a le jei broda**
*   Dictionary with examples is now technically possible: the glossary can now have examples below definitions of words (and does so for the word **coi** as a showcase)
*   rafsi for **su'u**, **za'i**, **zu'o**, **pu'u**, **mu'e** are changed according to the cmavo.txt from year 2002.
*   immense amount of mistypes and minor errors fixed

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.5)
#### Source code comparison with previous versions
* [Compared with version 'geklojban-1.2.4 February 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.4...geklojban-1.2.5)
* [Compared with version 'geklojban-1.2.3 January 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.3...geklojban-1.2.5)


### geklojban-1.2.4 February 2020

#### Compiled version
*   read the final document that is to be used for printing and publication. Notice that the title page has the document explicitly marked as "geklojban-1.2.4" and has the name of the organization published it different from LLG; this is done to emphasize that it's not an LLG publication:
    *   [PDF format](https://la-lojban.github.io/uncll/uncll-1.2.4/cll.pdf)
    *   [EPUB format](https://la-lojban.github.io/uncll/uncll-1.2.4/cll.epub)
    *   [HTML format, one page is one section of the book](https://la-lojban.github.io/uncll/uncll-1.2.4/xhtml_section_chunks/)
    *   [HTML format - the whole book in one very long page](https://la-lojban.github.io/uncll/uncll-1.2.4/xhtml_no_chunks/)
* or read the so called ["difference" PDF document](https://la-lojban.github.io/uncll/uncll-1.2.4/cll_diffs/cll_difference_prefixed.pdf) that compares geklojban-1.2.4 to CLL published in 2016 (2016-08-27 release). The document has insertions marked with green and "ins\`" prefix and deletions marked with red and "del\`" prefix. Prefixes are added so that you can use Cmd+F or Ctrl+F to quickly find the differences in the PDF document. There is [an alternative difference version without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.4/cll_diffs/cll_difference.pdf) (but then you'll have to manually scroll the document to find the differences).
*   or read the difference document in HTML format instead:
    *   [with prefixes](https://la-lojban.github.io/uncll/uncll-1.2.4/cll_diffs/diff_new_xhtml_no_chunks/difference_prefixed.html),
    *   [without prefixes](https://la-lojban.github.io/uncll/uncll-1.2.4/cll_diffs/diff_new_xhtml_no_chunks/difference.html).

#### Short list of changes compared to the version 'geklojban-1.2.3 January 2020'
* a few mistypes are fixed
* UTF symbols are added as they are (instead of their descriptions)

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.4)

#### Source code comparison with previous versions
* [Compared with version 'geklojban-1.2.3 January 2020': git difference](https://github.com/lojban/cll/compare/geklojban-1.2.3...geklojban-1.2.4)
* [Compared with the official CLL v.1.1 edition (2016)': git difference](https://github.com/lojban/cll/compare/6c0556c7b17f96b3bf41e8123ba18ef4868e056a...geklojban-1.2.3)

### geklojban-1.2.3 January 2020

#### Short list of changes

*   Dotside implemented
*   "cmene" and "cmevla" concepts are now separated
*   **sumti tcita** is renamed to **sumtcita**
*   **mi kucli le jei broda** is now **mi kucli tu'a le jei broda**
*   Dictionary with examples is now technically possible: the glossary can now have examples below definitions of words (and does so for the word **coi** as a showcase)
*   rafsi for **su'u**, **za'i**, **zu'o**, **pu'u**, **mu'e** are changed according to the cmavo.txt from year 2002.
*   immense amount of mistypes and minor errors fixed

#### [git source](https://github.com/lojban/cll/compare/geklojban-1.2.3)
