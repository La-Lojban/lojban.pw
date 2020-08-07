function encodeValsiForWeb(v) {
	return encodeURIComponent(v).replace(/'/g, 'h')
}

function processNode(urli, Node, text, func) {
	try {
		var http = new XMLHttpRequest()
		http.open('HEAD', urli, false)
		http.send()
		if (http.status == 200) {
			var sance = new Audio(urli)
			sance.id = "sance_" + encodeValsiForWeb(text)
			sance.addEventListener('canplaythrough', function (event) {
				Node = func(Node, sance, text)
			})
		}
	} catch (error) { console.log(error) }
}

var words = document.querySelectorAll("em.glossterm");

Array.from(words).forEach(function (Node) {
	var text = Node.innerText;
	processNode("https://la-lojban.github.io/sutysisku/sance/vreji/" + encodeValsiForWeb(text) + ".mp3", Node, text, funcContentGloss)
});


function funcContentGloss(Node, sance, text) {
	Node.parentNode.parentNode.appendChild(sance);
	Node.parentNode.parentNode.innerHTML +=
		"<button class='tutci' onclick=\"document.getElementById('sance_" +
		encodeValsiForWeb(text) +
		"').play()\">▶</button>";
	return Node
}

var examples = document.querySelectorAll(".example > .title > strong");

Array.from(examples).forEach(function (Node) {
	var number = Node.innerText.trim().replace(/ *Example (.*?)\. *$/, '$1');
	processNode(document.location.href.replace(/\/[^\/]+$/, '/') + "assets/media/examples/" + text + ".ogg", Node, number, funcExample)
});

function funcExample(Node, sance, text) {
	Node.parentNode.appendChild(sance);
	Node.parentNode.innerHTML +=
		"<button class='tutci tutci-mupli' onclick=\"document.getElementById('sance_" +
		encodeValsiForWeb(text) +
		"').play()\">▶</button>";
	return Node
}

var terms = document.querySelectorAll("span.glossterm");

Array.from(terms).forEach(function (Node) {
	var text = Node.innerText;
	processNode("https://la-lojban.github.io/sutysisku/sance/vreji/" + encodeValsiForWeb(text) + ".mp3", Node, text, funcGlossary)
});

function funcGlossary(Node, sance, text) {
	Node.parentNode.appendChild(sance);
	Node.parentNode.innerHTML +=
		"<button class='tutci' onclick=\"document.getElementById('sance_" +
		encodeValsiForWeb(text) +
		"').play()\">▶</button>";
	return Node
}
