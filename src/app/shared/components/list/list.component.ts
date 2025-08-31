import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false,
})
export class ListComponent {
  @Input() items: { title: string; link?: string }[] = [];

  goToLink(link?: string) {
    if (link) window.location.href = link;
  }

}
