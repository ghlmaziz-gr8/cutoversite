/* Site configuration. Change these values to point the site at your own demo and contact details. */
const CUTOVER = {
  // The demo link used by every "Try the demo" button on the site.
  //demoUrl: 'https://claude.ai/artifact/N8avovG1NbrCqo2wMjVfqp',
  demoUrl: 'cutover-demo/index.html',
  // Sales and discovery-call contact.
  contactEmail: 'hello@cutover.site',
  // Hide the demo buttons by setting this to false.
  showDemo: true
};

// Fill in every element marked data-demo-link, data-contact, or data-industry-demo.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-demo-link]').forEach(el => {
    el.setAttribute('href', CUTOVER.demoUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
    if (!CUTOVER.showDemo) el.hidden = true;
  });
  document.querySelectorAll('[data-contact]').forEach(el => {
    el.setAttribute('href', `mailto:${CUTOVER.contactEmail}?subject=${encodeURIComponent('Cutover discovery call')}`);
  });
  document.querySelectorAll('[data-contact-text]').forEach(el => {
    el.textContent = CUTOVER.contactEmail;
  });
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
