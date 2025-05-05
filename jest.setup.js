// Configuraciones globales si es necesario
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn()
};
