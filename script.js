// ========== REQUEST NOTIFICATION PERMISSION ==========
function requestNotificationPermission() {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    } else if (Notification.permission === "granted") {
      console.log("Notification already granted.");
    } else {
      console.log("Notification previously denied.");
    }
  } else {
    console.log("This browser does not support notifications.");
  }
}

// ========== SEND WEDDING NOTIFICATION ==========
function sendWeddingNotification() {
  if (Notification.permission === "granted") {
    new Notification("💖 Test Reminder!", {
      body: "This is a test for the wedding reminder! 🎉",
      icon: "your-icon.png" // Replace with your icon URL if needed
    });
  } else {
    console.log("Notification permission not granted.");
  }
}

// ========== CHECK TIME AND SEND NOTIFICATION ==========
function checkNotificationTime() {
  const now = new Date();
  const testDate = new Date("2025-04-07T00:46:00"); // April 7, 2025, 12:35 AM

  if (
    now.getFullYear() === testDate.getFullYear() &&
    now.getMonth() === testDate.getMonth() &&
    now.getDate() === testDate.getDate() &&
    now.getHours() === testDate.getHours() &&
    now.getMinutes() === testDate.getMinutes() &&
    now.getSeconds() === testDate.getSeconds()
  ) {
    sendWeddingNotification();
  }
}

// ========== INITIALIZE ==========
window.addEventListener("load", () => {
  requestNotificationPermission();

  // Check every second
  setInterval(checkNotificationTime, 1000);
});
