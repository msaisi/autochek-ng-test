import { HomeModule } from './home.module';

describe('HomeModule', () => {
  let homeModule: HomeModule;

  beforeEach(() => {
    homeModule = new HomeModule();
  });

  it('should create a module instance that will have home component. This module will be lazy loaded', () => {
    expect(homeModule).toBeTruthy();
  });
});
