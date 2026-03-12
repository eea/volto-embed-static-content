import { slateAfterEach } from '../support/e2e';

const API_PATH = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
const AUTH = {
  user: 'admin',
  pass: 'admin',
};

const setEmbedStaticContentBlocks = () =>
  cy.request({
    method: 'PATCH',
    url: `${API_PATH}/cypress/my-page`,
    headers: {
      Accept: 'application/json',
    },
    auth: AUTH,
    body: {
      title: 'My Add-on Page',
      blocks: {
        title: {
          '@type': 'title',
        },
        embed: {
          '@type': 'embed_static_content',
          url: '/cypress/static-content-preview-image',
        },
      },
      blocks_layout: {
        items: ['title', 'embed'],
      },
    },
  });

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
  });
  afterEach(slateAfterEach);

  it('renders embedded static content from an internal image resource', () => {
    setEmbedStaticContentBlocks();

    cy.visit('/cypress/my-page');
    cy.waitForResourceToLoad('my-page');

    cy.contains('My Add-on Page');
    cy.get('.embed-content-static-inner img').should('be.visible');
  });
});
