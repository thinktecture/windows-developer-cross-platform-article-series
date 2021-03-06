import { Component, OnInit } from '@angular/core';
import { DesktopIntegrationService } from '../../services/desktopIntegration';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-root',
  templateUrl: 'root.html',
  styleUrls: ['root.scss']
})
export class RootComponent implements OnInit {
  constructor(private _desktopIntegrationService: DesktopIntegrationService, private _notifcationService: NotificationService) {
  }

  public ngOnInit(): void {
    this._desktopIntegrationService.integrate();
    this._notifcationService.register();
  }
}
