---
title: la sutysisku y la búsqueda de similitud
---

[la sutysisku](https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en) es una aplicación web que puede funcionar sin conexión. Proporciona acceso a diccionarios de Lojban, entre otras características.

![la sutysisku - búsqueda de similitud](/assets/pixra/arxivo/sutysisku_simsa.png)

Una característica de la sutysisku es la llamada búsqueda de similitud. Si quieres saber cómo decir "_maravilloso_" en Lojban, es posible que no esperes encontrar la palabra exacta "maravilloso" en la definición de Lojban, en su lugar podrías esperar palabras similares en significado como "_brillante_", "_encantador_", "_superlativo_". La sutysisku hace todo lo posible para encontrar palabras con definiciones que contengan sinónimos o palabras similares en significado.

Otro caso es cuando buscas una palabra pero te gustaría encontrar palabras que podrían ser utilizadas en el mismo contexto, aunque no sean sinónimos directos. Por ejemplo, al buscar "_intentar_" podrías desear encontrar palabras que signifiquen "_fallar_" ya que ambos conceptos podrían ser útiles al describir diferentes etapas de una situación. O al buscar ["_susurrar_"](https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&sisku=whisper&bangu=en&versio=masno) podrías beneficiarte de obtener definiciones de palabras relacionadas como "_silencioso_", "_pronunciar_", "_escuchar_", "_eco_", "_gritar_".

No hace falta decir que el inglés tiene muchas palabras ambiguas o palabras con varios significados, por ejemplo, "_left_" ("no a la derecha" vs. "restante"). La sutysisku en tales casos muestra las mejores suposiciones para la mayoría de esos significados.

El algoritmo detrás de escena se llama "vectores de palabras", donde cada palabra en inglés está representada por una lista de valores escalares y las palabras que ocurren en contextos similares obtienen valores similares en ese espacio "vectorial". El vocabulario principal de Lojban (gismu "verbos") ha sido mapeado manualmente a palabras en inglés para ayudarte a obtener mejores coincidencias.

Para habilitar la búsqueda de similitud, elige el botón "similar" después de ingresar una palabra en la sutysisku.

<div style="font-size:200%;">
<a href="https://la-lojban.github.io/sutysisku/lojban/#seskari=cnano&versio=masno&sisku=marvellous&bangu=en">Prueba la sutysisku ahora</a>
</div>