import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardTitleComponent} from "../card-title/card-title.component";
import {CardT} from "../../helpers/models/models";
import {TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardTitleComponent, TuiSvgModule, TuiTextfieldControllerModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.less'
})
export class CardComponent {
  @Input() card: CardT | null = null;
  @Input() isHovered: boolean = false;
  @Input() isDepsOfActive: boolean = false;

  getDownloads() {
    if (!this.card) return 0;
    if (this.card.weeklyDownloads / 1000000 >= 1) {
      return Math.round(this.card.weeklyDownloads / 1000000) + 'M';
    }
    if (this.card.weeklyDownloads / 1000 >= 1) {
      return Math.round(this.card.weeklyDownloads / 1000) + 'K';
    }
    return this.card.weeklyDownloads;
  }

  getDependencies() {
    if (!this.card) return 0;
    return this.card.dependencies.length === 1 ? '1 dependency' : this.card.dependencies.length + ' dependencies';
  }
}
