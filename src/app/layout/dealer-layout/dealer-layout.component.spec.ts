import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
//import { provideMockStore } from '@ngrx/store/testing';
//import { AppsConfigService } from 'src/app/apps/apps.config.service';
//import { PosConfig } from 'src/app/apps/_base/pos_config';
//import { ApiBaseService } from 'src/app/shared/services/api';

import { DealerLayoutComponent } from './dealer-layout.component';

describe('DealerLayoutComponent', () => {
  let component: DealerLayoutComponent;
  let fixture: ComponentFixture<DealerLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [DealerLayoutComponent],
      providers: [
        //PosConfig,
        //AppsConfigService,
        //ApiBaseService,
        //provideMockStore({}),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create theme layout', () => {
    expect(component).toBeTruthy();
  });
});
