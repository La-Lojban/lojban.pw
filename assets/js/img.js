window.addEventListener("DOMContentLoaded", function () {
	var imgs = document.querySelectorAll("article .figure_img");
	var fullPage = document.querySelector("#fullpage");

	Array.prototype.forEach.call(imgs, function (figure_img) {
		figure_img.addEventListener("click", function () {
			fullPage.style.backgroundImage = figure_img.style.backgroundImage
			fullPage.style.display = "block";
		});
		fullPage.addEventListener("click", function () {
			fullPage.style.display = "none";
		});
	});
});
