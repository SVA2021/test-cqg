import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-title.component.html',
  styleUrl: './card-title.component.less'
})
export class CardTitleComponent implements OnInit {
  @Input() title: string = '';
  @Input() isHighlighted: boolean = false;
  @Input() isFiltered: boolean = false;

  public isSimple: boolean = false;
  public titleMain: string = '';
  public titleOther: string = '';

  ngOnInit() {
    if (this.title.includes('/')) {
      this.isSimple = true;
      this.titleMain = this.title.split('/')[0];
      this.titleOther = this.title.split('/')[1];
    }
  }
}
