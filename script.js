// Default Settings
let defaultWeddingDate = localStorage.getItem('weddingDate') || '2025-04-10';
let defaultNotificationTime = localStorage.getItem('notificationTime') || '09:00';

// Countdown Timer
function updateCountdown() {
  const now = new Date();
  const weddingDate = new Date(defaultWeddingDate + 'T00:00:00');
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerText = "🎉 It's Wedding Day! 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('countdown').innerText = 
    `${days}d ${hours}h ${minutes}m ${seconds}s left`;
}
setInterval(updateCountdown, 1000);
updateCountdown(); // call immediately

// Notification Button
document.getElementById('notificationButton').addEventListener('click', function() {
  if (Notification.permission === 'granted') {
    alert('Notification already enabled!');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        alert('Notifications Enabled!');
      } else {
        alert('Notifications not allowed!');
      }
    });
  } else {
    alert('Notifications Blocked. Enable in settings.');
  }
});

// Rating Logic
function rate(stars) {
  const starElements = document.getElementById('ratingStars').children;
  for (let i = 0; i < starElements.length; i++) {
    if (i < stars) {
      starElements[i].classList.add('active');
    } else {
      starElements[i].classList.remove('active');
    }
  }

  let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
  ratings.push(stars);
  localStorage.setItem('ratings', JSON.stringify(ratings));

  document.getElementById('ratingMessage').innerText = `Thank you! You rated ${stars} star${stars > 1 ? 's' : ''}! 🌟`;
}

// Admin Access Logic
let footerClickCount = 0;
let footerTimer;

document.getElementById('footer').addEventListener('click', function() {
  footerClickCount++;
  clearTimeout(footerTimer);

  footerTimer = setTimeout(() => {
    footerClickCount = 0; // Reset if user slow
  }, 3000);

  if (footerClickCount >= 5) {
    const password = prompt('Enter Admin Password:');
    if (password === '654321') {
      showAdminPanel();
    } else {
      alert('Wrong password! 🚫');
    }
    footerClickCount = 0;
  }
});

function showAdminPanel() {
  document.getElementById('adminPanel').style.display = 'block';
  document.getElementById('weddingDateInput').value = defaultWeddingDate;
  document.getElementById('notificationTimeInput').value = defaultNotificationTime;

  let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
  if (ratings.length === 0) {
    document.getElementById('allRatings').innerText = 'No ratings yet.';
    return;
  }

  let sum = ratings.reduce((a, b) => a + b, 0);
  let average = (sum / ratings.length).toFixed(2);

  document.getElementById('allRatings').innerHTML = `
    <p><strong>Total Ratings:</strong> ${ratings.length}</p>
    <p><strong>Average Rating:</strong> ${average} ⭐</p>
    <p><strong>All Ratings:</strong> ${ratings.join(', ')}</p>
  `;
}

function saveAdminSettings() {
  const newWeddingDate = document.getElementById('weddingDateInput').value;
  const newNotificationTime = document.getElementById('notificationTimeInput').value;

  if (newWeddingDate && newNotificationTime) {
    localStorage.setItem('weddingDate', newWeddingDate);
    localStorage.setItem('notificationTime', newNotificationTime);
    defaultWeddingDate = newWeddingDate;
    defaultNotificationTime = newNotificationTime;
    alert('Settings saved! 🎉');
  } else {
    alert('Please fill both fields.');
  }
}
