const apiKeys = "fb13a918efe2490e82fc04b0e0edc049";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-inp");
const searchButton = document.getElementById("search-button");

// Fetch the news articles
const randomNews = async () => {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKeys}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles; // Ensure to return the articles
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return []; // Return an empty array in case of error
  }
};

searchButton.addEventListener('click', async () => {
  const query = searchField.value.trim(); // Use .value instead of .ariaValueMax
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query); // Fetch the articles first
      displayBlogs(articles); // Then display them
    } catch (error) {
      console.error('Error fetching query:', error);
    }
  }
});

const fetchNewsQuery = async (query) => {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKeys}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles; // Ensure to return the articles
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return []; // Return an empty array in case of error
  }
};

// Display the fetched news articles
const displayBlogs = (articles) => {
  blogContainer.innerHTML = ""; // Clear existing content
  articles.forEach((article) => {
    console.log(article);
    const blogCard = document.createElement("div");
    blogCard.classList.add("card");

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");
    const strictTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
    title.textContent = strictTitle;

    const description = document.createElement("p");
    const strictDescription = article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
    description.textContent = strictDescription;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.onclick = () => {
      window.open(article.url, "_blank");
    };
    blogContainer.appendChild(blogCard);
  });
};

// Immediately Invoked Function Expression (IIFE) to fetch and display blogs
(async () => {
  try {
    const articles = await randomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
})();
