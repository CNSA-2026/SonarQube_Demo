// unused client-side variables for people
const P_UNUSED_1 = 999;
let P_UNUSED_2;

async function loadPeople() {
  const container = document.getElementById("people-list");

  try {
    const response = await fetch("/api/people");
    const data = await response.json();

    container.innerHTML = data.people
      .map((person) => {
        return `
          <article class="card">
            <h2>${person.name}</h2>
            <p><strong>Role:</strong> ${person.role}</p>
            <p><strong>ID:</strong> ${person.id}</p>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    container.innerHTML = '<article class="card"><p>Could not load people right now.</p></article>';
  }
}

loadPeople();
