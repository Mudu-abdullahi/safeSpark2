
document.addEventListener("DOMContentLoaded", () => {
  const blogGrid = document.getElementById("blogGrid");

  fetch("http://localhost:3000/blogs")
    .then((res) => res.json())
    .then((blogs) => {
      blogs.forEach((blog) => {
        const blogCard = document.createElement("div");
        blogCard.className =
          "bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition";
        blogCard.innerHTML = `
          <img src="${blog.image}" alt="${blog.title}" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-semibold text-blue-800 mb-2">${blog.title}</h3>
            <p class="text-gray-700 mb-4">
              ${blog.content.length > 100 ? blog.content.substring(0, 100) + '...' : blog.content}
            </p>
            <a href="${blog.link}" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium">
              Read More →
            </a>
          </div>
        `;

        blogGrid.appendChild(blogCard);
      });
    })
  .catch((error) => {
  console.error("Failed to load blogs:", error);
  alert("❌ Blogs-ka lama helin. Fadlan hubi in server-ka uu socdo.");
});

});

