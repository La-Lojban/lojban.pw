---
title: Kasaysayan ng Lojban
---

<div class="lojbo simple_blockquotes"></div>

Ang Lojban ay isang wika, na ipinanukala bilang isang paraan ng pagsasalarawan ng kaalaman at bilang isang tulay sa pagitan ng mga pagsasalita, mga wika ng programasyon, at mga wika ng agham at matematika.

Ang Lojban ay nilikha ng isang pangkat ng mga mananaliksik noong 1987.

## Kasaysayan ng Lojban

_ni Bob LeChevalier, isa sa mga lumikha ng Lojban_.

Ang orihinal na disenyo ng TLI Loglan grammar ay walang pormal na pagsusuri ng parser, at ang kasaysayang ito ang nagtulak sa sumunod na pagsisikap ng Lojban.

- Natuklasan ni JCB ang mga gawa ni Victor Yngve sa mga panahon ng 60s o maagang 70s, kaya nakuha niya ang ideya ng pagkakakodipika ng grammar sa isang set ng mga patakaran. Nag-isip din siya ng ilang mga layunin para sa kodipikadong grammar na hindi ko gaanong matandaan. Ngunit hindi niya naabot ang mga layuning ito, anuman ang mga ito, bagaman ito ay kaugnay sa pag-encode ng kung ano ang nauunawaan ni JCB bilang "human grammar".
- Mula mga 1976-78, ang pagsisikap ay nagbago sa paggamit ng isang YACC LALR-1 grammar bilang isang pamantayan para sa pagkakakodipika ng grammar dahil maraming tao ang marunong gumamit ng YACC. Marami sa grammar ay na-encode, ngunit tila imposible na makuha ng "machine grammar" na mag-parse ng mga bagay nang eksakto tulad ng pag-parse ng "human grammar".
- Ang suliranin ay naresolba mga 1980, sa tingin ko ni Jeff Prothero, na noon ay isang mag-aaral sa University of Washington, upang gamitin ang elidable terminators upang bracket ang mga construct, na ang mga elision ay ibibigay ng YACC gamit ang kanyang error processing. Hanggang mga 1982-1983 bago talaga makamit ang isang kumpletong YACC grammar para sa wika, gamit ang error correction.

Nang simulan naming muling pagbuuin ang Lojban, ang layunin ay panatilihin ang Loglan grammar sa kabuuan nito, binabago lamang ang mga salita. Kaya't kami ay nakatali sa mga limitasyon ng orihinal na wika. Sinubukan ni JCB na maglaro ng copyright games sa pormal na grammar (tulad ng ginawa niya sa mga salita ng wika), ngunit siya ay nasa imposibleng legal na lupa dahil sa maraming bahagi ng trabaho ang ginawa ni Prothero at iba pa, kasama ang mga kilalang isyu sa copyrighting ng isang computer algorithm.

Ngunit nai-reinvent namin ang cmavo lexicon, at nais naming isama ang mga bahagi ng grammar para sa tensyon at MEX na hindi naabot ni JCB. Kaya, sa simula kasama ang tulong ni Prothero at isang lalaking nagngangalang Jeff Taylor at iba pang nakakaalam ng YACC, sinubukan kong muli ipatupad ang YACC grammar mula sa simula, ngunit hindi talaga sinusubukang muling buuin ang anumang mga gulong. Noong 1991, kinuha ni Cowan ang ginawa ko, at nilinis ito nang malaki, sa huli ay nakamit ang baseline grammar na nakalista sa CLL (na hanggang ngayon ay ang opisyal na grammar). Ngunit ang grammar ay pa rin isang YACC grammar, kasama ang lahat ng mga limitasyon nito.

Ang mga pagsisikap na lumikha ng isang PEG grammar ay nananatiling hindi opisyal, at sa totoo lang, hindi ko pa tiningnan ang PEG grammar at malamang ay hindi ko ito mauunawaan kung sakali. Mahirap na sa akin ang YACC, at kahit na natutunan ko ang YACC grammar para sa Lojban, hindi ko pa rin magawang gamitin nang mabilis ang mas simple na E-BNF grammar (kahit na natutunan ko ang ilang computer languages gamit ang BNF).

Kaya ang mahabang sagot sa iyong tanong, ayon sa aking pagkakaunawa, ay na ang grammar ay laging layuning maging pangkalahatang gamit. Ang kakayahang tanggalin ang mga terminator ay hindi gaanong prayoridad sa pangkalahatan, bagaman may ilang mga terminators na inaasahan; walang mas nakakairitang kaysa sa pagsubok na malaman kung ano ang tinatapos at hindi tinatapos kapag inilahad mo ang isang string tulad ng kukukeiku. (Ang wika ni JCB ay gumamit ng <gu> sa halip ng **ku**, kaya't ito ay tunog ng parang baby talk. Ang Lojban na may buong mga terminators, ay simpleng **kuku**.)

Ang ilan sa mga hindi pangkalahatang mga konstruksyon ay umusbong dahil hindi nila magawa na gumana ang YACC sa ganap na pangkalahatang mga konstruksyon, o kailangan nila ng labis na paggamit ng nakakairitang mga terminators. Kaya't ang dami ng iba't ibang mga pamilya ng logical connectives, bawat isa ay nag-uugnay sa iba't ibang uri ng konstruksyon. Ang mga desisyong iyon sa pangkalahatan ay nagmula sa panahon ng JCB, bagaman nagdagdag kami ng ilang bagong bagay na maaaring ikonekta (tulad ng mga relative clauses), at kaya't ilang bagong pamilya, karamihan sa mga ito ay sa huli ay nawala (naiwan halimbawa ang zi'e na hindi na ang batayan para sa isang pamilya ng logical connectives). Iniwan din namin ang pagsisikap na ipatupad ang isang pormal na grammar sa mga PA at UI compounds, kaya't may mga string ng bawat isa sa mga cmavo na teknikal na gramatikal ngunit walang kabuluhan: **pi'epaime'ipipi'e**. Ngunit sa karamihan ng bahagi, ang pangunahing grammar ng wika ay nananatiling yung kay JCB bago ang pormal na wika, na may mga elidable terminator constructs na idinagdag kung saan maaari itong makapagbigay ng kapaki-pakinabang at hindi pa rin syntactically unambiguous na mga konstruksyon.
