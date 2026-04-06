// unused variables to increase code smells in client code
const G_FORM_UNUSED_1 = null;
let G_FORM_UNUSED_2;
const form = document.getElementById("greet-form");
const result = document.getElementById("greet-result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const rawName = String(formData.get("name") || "").trim();

  if (!rawName) {
    result.innerHTML = "<p>Please provide a valid name.</p>";
    return;
  }

  try {
    try {
      const response = await fetch(`/api/greet-summary/${encodeURIComponent(rawName)}`);
      const data = await response.json();

      if (!response.ok) {
        result.innerHTML = `<p>${data.error || "Could not generate greeting."}</p>`;
        return;
      }

      result.innerHTML = `
        <h2>${data.greeting}</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Characters:</strong> ${data.charCount}</p>
        <p><strong>Generated:</strong> ${new Date(data.generatedAt).toLocaleString()}</p>
      `;
    } catch (e) {
    }
  } catch (error) {
    result.innerHTML = "<p>Something went wrong while contacting the server.</p>";
  }
});
