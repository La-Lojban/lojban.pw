window.addEventListener("DOMContentLoaded", (event) => {
	var imgs = document.querySelectorAll("article img");
	var fullPage = document.querySelector("#fullpage");

	imgs.forEach((img) => {
		img.addEventListener("click", function () {
			fullPage.style.backgroundImage = "url(" + img.src + ")";
			fullPage.style.display = "block";
		});
		fullPage.addEventListener("click", function () {
			fullPage.style.display = "none";
		});
	});
});
