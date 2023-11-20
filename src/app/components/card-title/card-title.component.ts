import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-title.component.html',
  styleUrl: './card-title.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTitleComponent implements OnInit {
  @Input({required: true}) title: string = '';
  @Input() isHighlighted: boolean = false;
  @Input() isFiltered: boolean = false;

  public isSimple: boolean = false;
  public titleMain: string = '';
  public titleOther: string = '';

  ngOnInit() {
    this.isSimple = !this.title.includes('/');
    this.titleMain = this.title.split('/')[0];
    this.titleOther = this.title.split('/')[1];
  }
}
