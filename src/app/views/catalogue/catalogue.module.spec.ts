import { CatalogueModule } from './catalogue.module';

describe('CatalogueModule', () => {
  let catalogueModule: CatalogueModule;

  beforeEach(() => {
    catalogueModule = new CatalogueModule();
  });

  it('should create a module instance that will have cars and car details components. This module will be lazy loaded', () => {
    expect(catalogueModule).toBeTruthy();
  });
});
