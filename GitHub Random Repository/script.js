document.addEventListener("DOMContentLoaded", function () {
  const codeLanguage = document.getElementById("codeLanguage");
  const showRepoDiv = document.getElementById("showRepoDiv");
  const refershRepo = document.getElementById("refershRepo");
  refershRepo.style.visibility = "hidden";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.innerHTML = "Select a language";
  codeLanguage.appendChild(defaultOption);
  const urlCodeLanguage =
    "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";

  fetch(urlCodeLanguage)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message); // Pass the error message to catch block
        });
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((language, index) => {
        const option = document.createElement("option");
        option.value = language.value;
        option.innerHTML = language.title;
        codeLanguage.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`); // Display the error dynamically
    });

  codeLanguage.addEventListener("change", function () {
    const codeLanguageValue = codeLanguage.value;
    if (!codeLanguageValue) {
      showRepoDiv.innerHTML = "<p>Please select a valid language.</p>";
      return;
    }
    showRepoDiv.innerHTML = "<p>Loading Please wait...</p>";
    fetchRepo(codeLanguageValue);
  });

  refershRepo.addEventListener("click", function () {
    fetchRepo(codeLanguage.value);
  });
  const fetchRepo = (language) => {
    refershRepo.style.visibility = "visible";
    showRepoDiv.innerHTML = "<p>Loading Please wait ...</p>";
    let url = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message); // Pass the error message to the catch block
          });
        }
        return response.json(); // Parse JSON response if successful
      })
      .then((result) => {
        if (result.items.length === 0) {
          showRepoDiv.innerHTML =
            "<p>No repositories found for this language.</p>";
          return;
        }
        // Proceed if repositories are found
        refershRepo.classList.remove("retry-button");
        refershRepo.innerHTML = "Refresh";
        const showRepoIndex = Math.floor(Math.random() * result.items.length);
        const repo = result.items[showRepoIndex];
        showRepoDiv.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <div class="repo-stats">
            <span><img src="images/star.svg" alt="Stars" class="icon"> ${
              repo.stargazers_count
            }</span>
            <span><img src="images/fork.svg" alt="Forks" class="icon"> ${
              repo.forks
            }</span>
            <span><img src="images/issue.svg" alt="Open Issues" class="icon"> ${
              repo.open_issues
            }</span>
          </div>
          <a href="${repo.html_url}" target="_blank">Visit Repository</a>
        `;
      })

      .catch((error) => {
        console.error("Error:", error.message);
        refershRepo.innerHTML = "Click to retry";
        refershRepo.classList.add("retry-button");
        alert(`Error: ${error.message}`); // Display the error dynamically
      });
  };
});
