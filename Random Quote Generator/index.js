document.addEventListener("DOMContentLoaded", function () {
  const quoteHeading = document.getElementById("quoteId");
  const quoteParagraph = document.getElementById("quoteContent");
  const btn = document.getElementById("button");

  const url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  let fetchQuote = fetch(url);
  let response;
  fetchQuote
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      response = data;
      getQuote();
    });
  let getQuote = () => {
    const quotePick = Math.floor(Math.random() * response.quotes.length);
    quoteHeading.innerHTML = response.quotes[quotePick].author;
    quoteParagraph.innerHTML = response.quotes[quotePick].quote;
  };

  btn.addEventListener("click", getQuote);
});
