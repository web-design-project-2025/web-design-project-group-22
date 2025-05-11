
/*get help from Ai to fix the problem and it wasent really help it was 
fixing the typo and give some advice
get help from Ai to fix the problem and it wasent really help it was 
https://chatgpt.com/share/6819faf9-4044-8004-a864-2fd6a08c20b8
 */  


let sliderCovers = [];
const sliderImage = document.getElementById("slider-image");
const sliderTitle = document.getElementById("slider-title");
const sliderDuration = document.getElementById("slider-duration");
const sliderScore = document.getElementById("slider-score");
const sliderElement = document.getElementById("slider");

let currentIndex= 0;

async function loadData() {
    const apiKey = "7c4ccf3d2a72adb09ff852ddc4aa8a76";
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRjY2YzZDJhNzJhZGIwOWZmODUyZGRjNGFhOGE3NiIsIm5iZiI6MTc0NDcyMzUxOS4yMzEsInN1YiI6IjY3ZmU1ZTNmYzFlMGE3MDhjYmFkNjRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B5lfXnQkC-jXEtPpjbpJLNo5FRm5YzpST9-rJnID008";
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    const data = await response.json();
    sliderCovers = data.results;

    updateSlider();

    setInterval(updateSlider, 8000);
}

function updateSlider() {
    const item = sliderCovers[currentIndex];
    const imageUrl = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;

    sliderImage.classList.remove("show");
  
    setTimeout(() => {
      sliderImage.onload = () => {
        sliderImage.classList.add("show");
      };
      sliderImage.src = imageUrl;
    }, 700); 

    sliderTitle.textContent = item.title || item.name || "Untitled";
    sliderDuration.textContent = item.media_type === "movie" ? "Movie" : "TV Show";
  
    sliderScore.textContent = `⭐ ${item.vote_average?.toFixed(1) || "N/A"}`;
    document.getElementById("slider-description").textContent = item.overview|| "No description";
    
    currentIndex = (currentIndex + 1) % sliderCovers.length;
  }
  

loadData();