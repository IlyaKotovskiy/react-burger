describe('Полный сценарий работы с конструктором (API-запросы)', () => {
	const testUser = {
		email: 'ilundrikstv@gmail.com',
		password: 'Matilda026',
	};

	beforeEach(() => {
		cy.clearCookies();
		cy.visit('http://localhost:8080/');
		cy.get('[data-testid="ingredient-bun"]', { timeout: 5000 }).should('exist');
	});

	it('Полный цикл: неавторизованный пользователь -> логин -> сбор -> заказ', () => {
		// 1. Собираем бургер
		cy.get('[data-testid="ingredient-bun"]').first().trigger('dragstart');
		cy.get('[data-testid="constructor-drop-area"]').trigger('drop');
		cy.wait(500);

		cy.get('[data-testid="ingredient-main"]').first().trigger('dragstart');
		cy.get('[data-testid="constructor-drop-area"]').trigger('drop');
		cy.wait(500);

		// 2. Пытаемся оформить без авторизации -> редирект
		cy.get('[data-testid="order-button"]').click();
		cy.location('pathname').should('eq', '/login');

		// 3. Авторизуемся
		cy.get('[data-testid="email-input"]').type(testUser.email);
		cy.get('[data-testid="password-input"]').type(testUser.password);
		cy.get('[data-testid="login-button"]').click();

		// 4. Оформляем заказ
		cy.get('[data-testid="order-button"]').click();

		// 5. Ждем появления модального окна (до 30 секунд)
		cy.get('[data-testid="order-modal"]').should('exist');
		cy.get('[data-testid="order-number"]', { timeout: 30000 }).should(
			'not.be.empty'
		);
	});
});
