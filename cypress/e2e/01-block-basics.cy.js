import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'cypress',
      contentTitle: 'Cypress',
    });
    cy.createContent({
      contentType: 'Document',
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
    cy.visit('/cypress/static-content-preview-image');
    cy.waitForResourceToLoad('static-content-preview-image');
    cy.navigate('/cypress/static-content-preview-image/edit');
    cy.get('#field-preview_image')
      .focus()
      .selectFile('cypress/resources/image.png', { force: true });
    cy.wait(5000);
    cy.get('#toolbar-save').click({ force: true });
    cy.wait(5000);
  });
  afterEach(slateAfterEach);

  it('Add Block: Empty', () => {
    // Change page title
    cy.visit('/cypress/my-page');
    cy.navigate('/cypress/static-content-preview-image/edit');
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');
    cy.get('.documentFirstHeading').contains('My Add-on Page');
    cy.getSlate().click({ force: true });
    // // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click({ force: true });
    cy.get('.blocks-chooser .title').contains('Data Visualizations').click({ force: true });
    cy.get('.button.embed_static_content').click({ force: true });
    cy.get('button[aria-label=openUrlBrowser]').click({ force: true });
    cy.wait(2000);
    cy.get('.icon.right-arrow-icon').click({ force: true });
    cy.get('ul li').first().click({ force: true });
    cy.get('.embed-content-static-inner img');

    // // Save
    cy.get('#toolbar-save').click({ force: true });
  });
});
