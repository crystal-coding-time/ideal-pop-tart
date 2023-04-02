const butInstall = document.getElementById('buttonInstall');

// Add an event listener for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
  // Store the event object for later use
  window.deferredPrompt = event;

  // Make the button visible by removing the 'hidden' class
  butInstall.classList.toggle('hidden', false);
});

// Add an event listener for clicks on the install button
butInstall.addEventListener('click', async () => {
  // Get the stored event object
  const promptEvent = window.deferredPrompt;

  // If there's no stored event, return
  if (!promptEvent) {
    return;
  }

  // Show the install prompt
  promptEvent.prompt();

  // Reset the stored event object to null, since it can only be used once
  window.deferredPrompt = null;

  // Hide the install button by adding the 'hidden' class
  butInstall.classList.toggle('hidden', true);
});

// Add an event listener for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  // Clear the stored event object
  window.deferredPrompt = null;
});
