describe('Sign-Up Process', () => {
  beforeEach(() => {
    // Visit the sign-up page
    cy.visit('http://localhost:3000/signup');
  });

  it('should display the sign-up form', () => {
    // Check if the sign-up form elements are visible
    cy.get('form').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="confirmPassword"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should allow a user to sign up with valid credentials', () => {
    // Fill out the sign-up form
    cy.get('input[name="username"]').type('newuser');
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    
    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check for a successful sign-up message or redirection
    cy.url().should('include', '/welcome');
    cy.contains('Welcome, newuser').should('be.visible');
  });

  it('should show validation errors for invalid input', () => {
    // Leave the form empty and submit
    cy.get('button[type="submit"]').click();
    cy.contains('Username is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
    cy.contains('Confirm Password is required').should('be.visible');

    // Enter a mismatched password and confirm password
    cy.get('input[name="username"]').type('newuser');
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password124');
    cy.get('button[type="submit"]').click();
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('should not allow signing up with an already taken username or email', () => {
    // Fill out the sign-up form with an existing username/email
    cy.get('input[name="username"]').type('existinguser');
    cy.get('input[name="email"]').type('existinguser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Check for error message indicating the username/email is already taken
    cy.contains('Username is already taken').should('be.visible');
    cy.contains('Email is already taken').should('be.visible');
  });
});