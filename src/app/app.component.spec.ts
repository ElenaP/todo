import { TestBed, ComponentFixture, async  } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { Item } from './models/item';
import { cold } from 'jasmine-marbles';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;
  const initialState: Item[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ provideMockStore({ initialState })]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  }));

  it('should delete the current todo item', () => {
    mockStore.setState(
      [{
        id: 0,
        title: 'Clean apartment',
        completed: false
      }, ...initialState]
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });
});
