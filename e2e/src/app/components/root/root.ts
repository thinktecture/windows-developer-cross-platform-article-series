import {Component, OnInit} from '@angular/core';
import {DesktopIntegrationService} from '../../services/desktopIntegration';

@Component({
  selector: 'app-root',
  templateUrl: 'root.html',
  styleUrls: ['root.scss']
})
export class RootComponent implements OnInit {
  constructor(private _desktopIntegrationService: DesktopIntegrationService) {
  }

  public ngOnInit(): void {
    this._desktopIntegrationService.integrate();
  }
}
