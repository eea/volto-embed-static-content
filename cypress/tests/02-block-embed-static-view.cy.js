import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Embed Static Content Block: View Mode Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Embed Static Content Block: Add and save', () => {
    const titleSelector = '.block.inner.title [contenteditable="true"]';
    cy.get(titleSelector).clear();
    cy.get(titleSelector).type('Embed Static Test');

    cy.get('.documentFirstHeading').contains('Embed Static Test');

    cy.get(titleSelector).type('{enter}');

    // Add embed static content block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Data Visualizations').click();
    cy.get('.content.active.data_visualizations .button.embed_static_content')
      .click({ force: true });

    // Save
    cy.get('#toolbar-save').click({ force: true });
    cy.contains('Embed Static Test');
  });
});