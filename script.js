document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const newQuoteButton = document.getElementById("new-quote");

  const fetchQuote = () => {
    return fetch("https://api.quotable.io/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        return {
          text: data.content,
          author: data.author,
        };
      });
  };

  const displayQuote = (quote) => {
    quoteElement.textContent = quote.text;
    authorElement.textContent = `— ${quote.author}`;
  };
  const getNewQuote = () => {
    fetchQuote()
      .then((quote) => displayQuote(quote))
      .catch((error) => {
        quoteElement.textContent = "An error occurred. Please try again.";
        authorElement.textContent = "";
        console.error("Error fetching quote:", error);
      });
  };

  // Fetch and display a quote on page load
  getNewQuote();

  // Fetch and display a new quote when the button is clicked
  newQuoteButton.addEventListener("click", getNewQuote);
});
