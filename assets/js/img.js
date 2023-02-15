window.addEventListener("DOMContentLoaded", function () {
	var imgs = document.querySelectorAll("article img");
	var fullPage = document.querySelector("#fullpage");

	Array.prototype.forEach.call(imgs, function (img) {
		img.addEventListener("click", function () {
			fullPage.style.backgroundImage = "url(" + img.src + ")";
			fullPage.style.display = "block";
		});
		fullPage.addEventListener("click", function () {
			fullPage.style.display = "none";
		});
	});
});
