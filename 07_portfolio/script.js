document.querySelectorAll(".project").forEach(button => {
  button.addEventListener("click", () => {
    window.open(button.dataset.link, "_blank");
  });
});

const year = new Date().getFullYear();
const footer = document.getElementById("footer");

if (footer) {
  footer.innerHTML += `<p>&copy; ${year} Vidhi Patel | Made with ❤️</p>`;
}