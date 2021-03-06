import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  async,
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { GlobalNotificationsService } from '../../../../services/global-notifications/global-notifications.service';
import { GlobalTypedNotificationComponent } from './global-typed-notification.component';
import { NotificationTypeEnum } from '../../../../enums/notificationType.enum';
import { IGlobalNotification } from '../../../../interfaces/global-notification';

describe('GlobalTypedNotification Component', () => {
  let component: GlobalTypedNotificationComponent;
  let fixture: ComponentFixture<GlobalTypedNotificationComponent>;
  let globalNotificationsService: jasmine.SpyObj<GlobalNotificationsService>;

  const MOCK_AUTO_CLOSE_AFTER: number = 1000;

  const MOCK_NOTIFICATION: IGlobalNotification = {
    id: 0,
    isClosable: true,
    isUltimante: false,
    message: 'message',
    type: NotificationTypeEnum.info
  };
  let isCreateAnimationPlayed: boolean = false;
  let isRemoveAnimationPlayed: boolean = false;
  const MOCK_CREATE_ANIMATION_CALLBACK: any = {
    create: (el) => {
      return {
        play: () => {
          isCreateAnimationPlayed = true;
        }
      };
    }
  };
  const MOCK_REMOVE_ANIMATION_CALLBACK: any = {
    create: (el) => {
      return {
        play: () => {
          isRemoveAnimationPlayed = true;
        }
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GlobalTypedNotificationComponent
      ],
      imports: [
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: GlobalNotificationsService,
          useValue: jasmine.createSpyObj('GlobalNotificationsService', [
            'removeNotificationById',
            'getCreationAnimation',
            'getRemovalAnimation'
          ]),
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalTypedNotificationComponent);
    globalNotificationsService = TestBed.get(GlobalNotificationsService);

    component = fixture.componentInstance;

    isCreateAnimationPlayed = false;
    isRemoveAnimationPlayed = false;

    globalNotificationsService.getCreationAnimation.and
      .returnValue(MOCK_CREATE_ANIMATION_CALLBACK);

    globalNotificationsService.getRemovalAnimation.and
      .returnValue(MOCK_REMOVE_ANIMATION_CALLBACK);

    component.notification = Object.assign({}, MOCK_NOTIFICATION);
  }));

  it('should create', () => {
    fixture.detectChanges();

    expect(component)
      .toBeDefined();
  });

  it('should create animations and play "create" animation', () => {
    fixture.detectChanges();

    expect(globalNotificationsService.getCreationAnimation)
      .toHaveBeenCalled();
    expect(globalNotificationsService.getRemovalAnimation)
      .toHaveBeenCalled();
    expect(isCreateAnimationPlayed)
      .toBeTruthy();
  });

  it('should close notification and play "remove" animation', fakeAsync(() => {
    fixture.detectChanges();
    globalNotificationsService.removeNotificationById.and
      .callThrough();

    component.closeNotification(MOCK_NOTIFICATION.id);

    tick(MOCK_AUTO_CLOSE_AFTER * 2);

    expect(isRemoveAnimationPlayed)
      .toBeTruthy();
    expect(globalNotificationsService.removeNotificationById)
      .toHaveBeenCalled();
    expect(globalNotificationsService.removeNotificationById)
      .toHaveBeenCalledWith(MOCK_NOTIFICATION.id);
  }));
});
