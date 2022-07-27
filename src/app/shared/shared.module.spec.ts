import { SharedModule } from './shared.module';

describe('SharedModule', () => {
  let sharedModule: SharedModule;

  beforeEach(() => {
    sharedModule = new SharedModule();
  });

  it('should create a modue instance that provides exportable shared components for use in components', () => {
    expect(sharedModule).toBeTruthy();
  });
});
