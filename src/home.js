import restaurantImg from './images/restaurant.jpg';

export default function loadHome() {
  const content = document.getElementById('content');
  while (content.lastChild !== document.querySelector('header')) {
    content.removeChild(content.lastChild);
  }
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('home');
  homeDiv.innerHTML = `
    <div class="hero">
    <img src="${restaurantImg}" alt="Restaurant Interior">
      <div class="hero-content">
        <h1>Welcome to JS Bistro</h1>
        <p>Experience culinary delights crafted with code and creativity. Join us for a unique dining experience!</p>
        <button class="cta-button" onclick="document.querySelector('nav button:nth-child(2)').click()">View Menu</button>
      </div>
    </div>
  `;
  content.appendChild(homeDiv);
}