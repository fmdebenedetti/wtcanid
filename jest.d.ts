// Declaraciones de tipos personalizadas para Jest
declare namespace jest {
  type Mock<T extends (...args: any[]) => any> = {
    mockImplementation(fn?: (...args: Parameters<T>) => ReturnType<T>): jest.Mock<T>;
    mockResolvedValue(value: ReturnType<T>): jest.Mock<T>;
    mockReturnValue(value: ReturnType<T>): jest.Mock<T>;
    mockClear(): void;
    mockReset(): void;
    mockRestore(): void;
  } & jest.MockInstance<T>;

  function fn<T extends (...args: any[]) => any>(implementation?: T): Mock<T>;
  function mock(moduleName: string, factory?: any, options?: any): void;
  function clearAllMocks(): void;
}
