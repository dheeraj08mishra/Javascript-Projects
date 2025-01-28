document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.querySelector(".image-slide");
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  // Fetch dog images from API
  fetch("https://dog.ceo/api/breed/hound/images")
    .then((response) => response.json())
    .then((data) => {
      const { message } = data;

      // Remove loading text
      imageContainer.innerHTML = "";

      // Create the image element
      const image = document.createElement("img");
      image.src = message[0];
      image.alt = "dog";
      imageContainer.appendChild(image);

      let index = 0;

      // Next button logic
      nextButton.addEventListener("click", () => {
        index = (index + 1) % message.length; // Loop back to the start
        image.src = message[index];
      });

      // Prev button logic
      prevButton.addEventListener("click", () => {
        index = (index - 1 + message.length) % message.length; // Loop back to the end
        image.src = message[index];
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
      imageContainer.innerHTML = `<p class="error">Failed to load images. Please try again later.</p>`;
    });
});
