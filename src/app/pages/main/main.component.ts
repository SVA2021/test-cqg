import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardT} from "../../helpers/models/models";
import {ApiCallService} from "../../helpers/services/api-call.service";
import {TuiHoveredModule} from "@taiga-ui/cdk";
import {BehaviorSubject, combineLatest, map, Observable, startWith} from "rxjs";
import {CardComponent} from "../../components/card/card.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TuiInputModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiScrollbarModule, TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, CardComponent, TuiHoveredModule, TuiInputModule, ReactiveFormsModule, TuiTextfieldControllerModule, TuiButtonModule, TuiScrollbarModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
})
export class MainComponent implements OnInit, OnDestroy {
  public cards$: Observable<CardT[]> | null = null;

  public activeCard$ = new BehaviorSubject<CardT | null>(null);
  public activeCard: CardT | null = null;

  public searchString = new FormControl<string>('');

  private readonly apiCallService = inject(ApiCallService);

  ngOnInit() {
    this.cards$ =
      combineLatest(
        this.apiCallService.getCards(),
        this.searchString.valueChanges.pipe(
          startWith(''),
        )
      )
      .pipe(
        map(([cards, searchString]) => {
          return searchString ? cards.filter(card => card.id.includes(searchString)) : cards;
        })
      )
  }

  ngOnDestroy() {
    this.activeCard$.complete();
  }

  onSetActiveCard(event: boolean, card: CardT) {
    this.activeCard = event ? card : null;
    this.activeCard$.next(this.activeCard);
  }

  isCardDepsOfActive(card: CardT) {
    if (!this.activeCard) return false;
    return this.activeCard.dependencies.includes(card.id);
  }

  isCardHovered(card: CardT) {
    if (!this.activeCard) return false;
    return this.activeCard.id === card.id;
  }

  refreshCards() {
    this.searchString.reset('');
  }
}
