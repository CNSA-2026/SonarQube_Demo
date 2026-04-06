// unused client-side vars
const H_UNUSED_1 = 'hello';
let H_UNUSED_2;
const quickForm = document.getElementById("quick-greet-form");

quickForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quickForm);
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    return;
  }

  window.location.href = `/${encodeURIComponent(name)}`;
});
