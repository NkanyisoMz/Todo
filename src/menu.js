import spaghettiImg from './images/spaghetti.jpg';
import curryImg from './images/Curry.jpg';
import tacosImg from './images/tacos.jpg';

export default function loadMenu() {
  const content = document.getElementById('content');
  while (content.lastChild !== document.querySelector('header')) {
    content.removeChild(content.lastChild);
  }
  const menuDiv = document.createElement('div');
  menuDiv.classList.add('menu');
  menuDiv.innerHTML = `
    <h2>Our Menu</h2>
    <div class="menu-grid">
      <div class="menu-item">
        <img src="${spaghettiImg}" alt="Spaghetti Code">
        <h3>Spaghetti Code</h3>
        <p class="price">$12</p>
        <p>A tangled delight of pasta with a rich, algorithmic sauce.</p>
      </div>
      <div class="menu-item">
        <img src="${curryImg}" alt="Closure Curry">
        <h3>Closure Curry</h3>
        <p class="price">$10</p>
        <p>A spicy blend of flavors that keeps you coming back.</p>
      </div>
      <div class="menu-item">
        <img src="${tacosImg}" alt="Async Tacos">
        <h3>Async Tacos</h3>
        <p class="price">$8</p>
        <p>Quick and delicious tacos, served with a side of promises.</p>
      </div>
    </div>
  `;
  content.appendChild(menuDiv);
}