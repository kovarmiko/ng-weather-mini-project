// tabs.component.ts
import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent, { descendants: true })
  tabs!: QueryList<TabComponent>;
  @Input() idProperty: string = 'id';
  @Input() selectedTabTemplate: TemplateRef<unknown>;
  @Output() tabRemoved: EventEmitter<string> = new EventEmitter();
  public activeTemplateData: Record<string, unknown>;

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab) => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.selectedTabTemplate = tab.template;
    this.activeTemplateData = tab.data;
    this.tabs.toArray().forEach((t) => (t.active = false));
    tab.active = true;
  }

  removeTab(tab: TabComponent, index: number): void {
    
    if (tab.active && this.tabs.length > 1) {
      this.showAdjacentTab(index);
    }
    this.tabRemoved.emit(tab.data[this.idProperty]);
  }

  private showAdjacentTab(index: number) {
    const leftPosition = index - 1;
    const rightPosition = index + 1;
    const leftPositionExists = leftPosition >= 0;
    const adjacentTabIndex = leftPositionExists ? leftPosition : rightPosition;
    this.selectTab(this.tabs.find((_tab, index) => index === adjacentTabIndex));
  }
}
