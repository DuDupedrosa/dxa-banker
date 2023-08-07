import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Hydration') || err.message.includes('hydrating')) {
      return false;
    }
});