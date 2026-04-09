const games = [
  {
    id: '3035570',
    title: "ASSASSIN'S CREED<br>MIRAGE",
    subtitle: "Action / RPG",
    description: "In Assassin's Creed® Mirage, you are Basim, a cunning street thief with nightmarish visions seeking answers and justice. Experience a narrative-driven action-adventure.",
    bgUrl: "https://wallpapercave.com/wp/wp12300513.jpg",
    cardUrl: "https://steamcdn-a.akamaihd.net/steam/apps/3035570/library_600x900.jpg",
    steamUrl: "https://store.steampowered.com/app/3035570/"
  },
  {
    id: '1222140',
    title: "DETROIT<br>BECOME HUMAN",
    subtitle: "Choices Matter",
    description: "Detroit: Become Human puts the destiny of both mankind and androids in your hands, taking you to a near future where machines have become more intelligent than humans.",
    bgUrl: "https://wallpapercave.com/wp/wp3091196.jpg",
    cardUrl: "https://steamcdn-a.akamaihd.net/steam/apps/1222140/library_600x900.jpg",
    steamUrl: "https://store.steampowered.com/app/1222140/"
  },
  {
    id: '3224770',
    title: "UMAMUSUME<br>PRETTY DERBY",
    subtitle: "Simulation",
    description: "Take on the role of a trainer to help Umamusume (horse girls) compete in races, deepen bonds, and achieve their goals in this immersive sports life simulation.",
    bgUrl: "https://wallpapercave.com/wp/wp15723726.jpg",
    cardUrl: "https://wallpapercave.com/w/wp7445405",
    steamUrl: "https://store.steampowered.com/app/3224770/"
  }
];

let currentIndex = 0;

// DOM Elements
const bgImage = document.getElementById('bg-image');
const mainTitle = document.getElementById('main-title');
const subtitle = document.getElementById('subtitle');
const description = document.getElementById('description');
const buyBtn = document.getElementById('buy-now-btn');
const cardsTrack = document.getElementById('cards-track');
const slideIndicator = document.getElementById('slide-indicator');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function init() {
  renderCards();
  updateUI(currentIndex);
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : games.length - 1;
    updateUI(currentIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < games.length - 1) ? currentIndex + 1 : 0;
    updateUI(currentIndex);
  });
}

function renderCards() {
  cardsTrack.innerHTML = '';
  games.forEach((game, index) => {
    const cleanTitle = game.title.replace('<br>', ' ');
    const card = document.createElement('div');
    card.className = `game-card ${index === currentIndex ? 'active' : ''}`;
    card.onclick = () => {
      currentIndex = index;
      updateUI(currentIndex);
    };
    
    card.innerHTML = `
      <img src="${game.cardUrl}" alt="${cleanTitle}">
      <div class="card-info">
        <p>${game.subtitle}</p>
        <h4>${cleanTitle}</h4>
      </div>
    `;
    cardsTrack.appendChild(card);
  });
}

function updateUI(index) {
  const game = games[index];
  
  // Animate text change
  mainTitle.style.opacity = 0;
  description.style.opacity = 0;
  bgImage.style.opacity = 0;
  
  setTimeout(() => {
    bgImage.innerHTML = '';
    bgImage.style.backgroundImage = `url('${game.bgUrl}')`;
    
    mainTitle.innerHTML = game.title;
    subtitle.innerHTML = game.subtitle;
    description.innerHTML = game.description;
    buyBtn.href = game.steamUrl;
    
    mainTitle.style.opacity = 1;
    description.style.opacity = 1;
    bgImage.style.opacity = 1;
    
    mainTitle.style.transition = 'opacity 0.4s ease';
    description.style.transition = 'opacity 0.4s ease';
    bgImage.style.transition = 'opacity 0.8s ease';
  }, 300);

  // Update slider indicator
  slideIndicator.innerHTML = `0${index + 1}`;
  
  // Update active state on cards
  const cards = document.querySelectorAll('.game-card');
  cards.forEach((card, i) => {
    if (i === index) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
