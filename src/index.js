import './style.css';
import loadHome from './home.js';
import loadMenu from './menu.js';
import loadContact from './contact.js';

// Create header + nav dynamically
function createHeader() {
  const header = document.createElement('header');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  const tabs = ['Home', 'Menu', 'Contact'];

  tabs.forEach(tabName => {
    const button = document.createElement('button'); // use button, not li
    button.textContent = tabName;

    button.addEventListener('click', () => {
      if (tabName === 'Home') loadHome();
      if (tabName === 'Menu') loadMenu();
      if (tabName === 'Contact') loadContact();
    });

    ul.appendChild(button);
  });

  nav.appendChild(ul);
  header.appendChild(nav);
  return header;
}

function initializeWebsite() {
  const content = document.getElementById('content');
  const header = createHeader();

  // Insert header first
  content.appendChild(header);

  // Load default tab
  loadHome();
}

// Initialize the site
initializeWebsite();
