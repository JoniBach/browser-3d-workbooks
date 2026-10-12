// If anything goes wrong, say so on screen: phones have no console to look in.
// Loaded as a plain script before the workbook's own code, so it catches errors there too.

function showError(message) {
  let box = document.querySelector('.error');
  if (!box) {
    box = document.createElement('p');
    box.className = 'error';
    document.body.append(box);
  }
  box.textContent = `Something went wrong: ${message}`;
}

addEventListener('error', (event) => showError(event.message));
addEventListener('unhandledrejection', (event) => showError(event.reason?.message ?? event.reason));
