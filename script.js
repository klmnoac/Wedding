// SPLASH SCREEN LOGIC
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  setTimeout(() => {
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = "none";
    }, 500);
  }, 1500);

  // Show popup after 3 seconds
  setTimeout(() => {
    document.getElementById("popup").classList.add("show");
  }, 3000);

  // Request Notification Permission
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});

// POPUP CLOSE FUNCTION
function closePopup() {
  document.getElementById("popup").classList.remove("show");
}

// COUNTDOWN TIMER
function startCountdown() {
  const weddingDate = new Date("2025-04-07T11:00:00").getTime();

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "<h3>We are Married!</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }, 1000);
}
startCountdown();

// WEDDING DAY BROWSER NOTIFICATION AT 9:30 AM
setInterval(() => {
  const now = new Date();
  const weddingDay = new Date("2025-04-07");

  if (
    now.getFullYear() === weddingDay.getFullYear() &&
    now.getMonth() === weddingDay.getMonth() &&
    now.getDate() === weddingDay.getDate() &&
    now.getHours() === 0 &&
    now.getMinutes() === 36
  ) {
    sendWeddingNotification();
  }
}, 1); // Check every minute

function sendWeddingNotification() {
  if (Notification.permission === "granted") {
    new Notification("💖 Reminder: Our Wedding!", {
      body: "The celebration starts soon! See you there! 🎉",
      icon: "your-icon.png" // Optional: Add your wedding logo here
    });
  }
}
