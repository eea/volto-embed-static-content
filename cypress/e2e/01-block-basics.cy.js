import { slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'cypress',
      contentTitle: 'Cypress',
    });
    cy.createContent({
      contentType: 'Image',
      contentId: 'static-content-preview-image',
      contentTitle: 'Static Content Preview Image',
      path: 'cypress',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
      path: 'cypress',
    });
    cy.visit('/cypress/my-page');
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/cypress/my-page/edit');
  });
  afterEach(slateAfterEach);

  it('Add Block: Empty', () => {
    // Ignore Not Found errors from partial URL lookups while typing
    cy.on('uncaught:exception', () => false);

    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');
    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.getSlate().click();

    // Add embed_static_content block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Data Visualizations').click();
    cy.get('.button.embed_static_content').click();

    // Type the URL in the sidebar InternalUrlWidget
    cy.get('.sidebar-container #field-url', { timeout: 10000 })
      .click()
      .type('/cypress/static-content-preview-image');

    // Wait for the embed to render
    cy.get('.embed-content-static-inner img', { timeout: 10000 });

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
    cy.get('.embed-content-static-inner img').should('be.visible');
  });
});
