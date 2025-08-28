async function news(category) {
  const searchInput = document.getElementById('search').value;
  const query = category || searchInput || "latest";
  const container = document.getElementById('news-container');
  const loading = document.getElementById('loading');

  try {
    loading.style.display = "block";
    container.innerHTML = "";

    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=851c2eb87d974d2f8c4e6dd02c60d0df`;
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    let data = await res.json();
    const articles = data.articles;

    if (articles.length === 0) {
      container.innerHTML = `<p class="text-center text-muted">No news found for "${query}"</p>`;
      return;
    }

    articles.forEach(article => {
      let card = `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm border-0">
            <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" 
                 class="card-img-top" alt="News Image">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description || "Click below to read more..."}</p>
              <a href="${article.url}" target="_blank" class="btn btn-outline-primary btn-sm">Read More</a>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = `<p class="text-danger text-center">❌ Something went wrong. Please try again later.</p>`;
  } finally {
    loading.style.display = "none";
  }
}
