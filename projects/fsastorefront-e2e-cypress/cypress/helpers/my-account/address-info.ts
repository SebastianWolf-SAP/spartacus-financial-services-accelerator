export function checkEmptyFields() {
  cy.get('[name=street]').should('be.empty');
  cy.get('[name=streetNumber]').should('be.empty');
}

export function checkRegisteredUserData() {
  cy.get('h2').should('contain.text', 'Address Info');
  cy.get('cx-fs-address-form').should('be.visible');
  cy.get('[formcontrolname=firstName]').should('have.attr', 'readonly');
  cy.get('[formcontrolname=firstName]').should('have.value', 'Ben');
  cy.get('[formcontrolname=lastName]').should('have.attr', 'readonly');
}

export function populateNewAddressInfo() {
  cy.get('[formcontrolname=isocode]').ngSelect('Serbia');
  cy.get('[formcontrolname=line1]').type('Omladinskih Brigada');
  cy.get('[formcontrolname=line2]').type('90g');
  cy.get('[formcontrolname=town]').type('Belgrade');
  cy.get('[formcontrolname=postalCode]').type('11070');
}

export function addNewAddressInfo() {
  cy.get('.btn-primary').should('contain.text', 'Add address').click();
  cy.get('.alert-success').should(
    'contain.text',
    'New address was added successfully'
  );
}

export function checkAddressInfoCard() {
  cy.get('.cx-card').should('be.visible');
  cy.get('.card-header').should('contain.text', 'DEFAULT');
  cy.get('.cx-card-label-bold').should('contain.text', 'Ben Moore');
  cy.get('.cx-card-label').should('contain.text', 'Omladinskih Brigada');
}

export function checkDisabledFieldsInsurance() {
  cy.get('[name=street]').should('be.disabled');
  cy.get('[name=streetNumber]').should('be.disabled');
  cy.get('[name=street]').should('have.value', 'Omladinskih Brigada');
  cy.get('[name=streetNumber]').should('have.value', '90g');
}

export function checkPopulatedFieldsBanking() {
  cy.get('[name=streetNumber]').should('not.be.disabled');
  cy.get('[name=street]').should('have.value', 'Omladinskih Brigada');
  cy.get('[name=streetNumber]').should('have.value', '90g');
}

export function addNewDataPersonalDetailsBanking() {
  cy.get('[name=street]').clear().type('New Street');
  cy.get('[name=streetNumber]').clear().type('544');
}
