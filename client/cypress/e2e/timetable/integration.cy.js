describe('Timetable Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('renders the timetable correctly', () => {
    cy.get('ol').should('have.length', 7); 
  });

  it('opens the popup when "Add Activity" button is clicked', () => {
    cy.contains('Add Activity').click();
    cy.get('[aria-label="Create Timeblock"]').should('be.visible');
  });

  it('validates form inputs', () => {
    cy.contains('Add Activity').click();
    cy.get('[name="startTime"]').select('10:00');
    cy.get('[name="endTime"]').select('09:00');
    cy.get('[type="submit"]').click();
    cy.contains('End time must be after start time').should('be.visible');  });

  it('creates a new time block', () => {
    cy.contains('Add Activity').click();
    cy.get('[name="name"]').type('New Block');
    cy.get('[name="startTime"]').select('09:00');
    cy.get('[name="endTime"]').select('10:00');
    cy.get('[name="day"]').select('Mon');
    cy.get('[type="submit"]').click();
    cy.contains('New Block').should('be.visible');
  });

  it('edits an existing time block', () => {
    cy.contains('Test Block 1').click();
    cy.get('[name="name"]').clear().type('Updated Block');
    cy.get('[type="submit"]').click();
    cy.contains('Updated Block').should('be.visible');
  });

  it('deletes an existing time block', () => {
    cy.contains('Test Block 1').click();
    cy.contains('Delete').click();
    cy.contains('Confirm').click();
    cy.contains('Test Block 1').should('not.exist');
  });

  it('handles overlapping time blocks correctly', () => {
    cy.contains('Test Block 1').then($block1 => {
      cy.contains('Test Block 2').then($block2 => {
        const block1Position = $block1[0].getBoundingClientRect();
        const block2Position = $block2[0].getBoundingClientRect();
        expect(block2Position.top).to.be.greaterThan(block1Position.bottom);
      });
    });
  });

  it('handles long time block names correctly', () => {
    cy.contains('Add Activity').click();
    cy.get('[name="name"]').type('A very very long time block name that should be truncated');
    cy.get('[name="startTime"]').select('09:00');
    cy.get('[name="endTime"]').select('10:00');
    cy.get('[name="day"]').select('Mon');
    cy.get('[type="submit"]').click();
    cy.contains('A very very long time block name that should be truncated').should('have.css', 'text-overflow', 'ellipsis');
  });
});