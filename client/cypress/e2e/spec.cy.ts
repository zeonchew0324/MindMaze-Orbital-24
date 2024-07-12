describe('My First Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5000/login');
  });

  it('login MindMaze fail (user not signed up)', () => {
    // Mock failed login attempt
    cy.intercept('POST', '/path/to/login/api', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    });

    cy.get('input[placeholder="Email"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('12345678');

    cy.contains('Login').click();
  });

  it('Redirect to sign up page and signup', () => {
    cy.contains('Sign up').click();
    cy.url().should('include', 'signup');

    cy.get('input[placeholder="Email"]').type('test123@example.com');
    cy.get('input[placeholder="Password"]').type('12345678');

    cy.contains('Continue').click();

    cy.contains('Login Here').click();
    cy.url().should('include', 'login');
  });

  it('Login Success', () => {
    // Mock successful login attempt
    cy.intercept('POST', '/path/to/login/api', {
      statusCode: 200,
      body: { token: 'fake-token' },
    });

    cy.get('input[placeholder="Email"]').type('test123@example.com');
    cy.get('input[placeholder="Password"]').type('12345678');

    cy.contains('Login').click();
    cy.url().should('include', 'home');
  });
});
