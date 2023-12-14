import {
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
})
export class TabComponent {
  @Input() tabTitle: string = '';
  @Input() template: TemplateRef<any>;
  @Input() data: Record<string, any>;


  active: boolean = false;
}
