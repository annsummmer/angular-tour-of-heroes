import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  heroes: Hero[];
  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  ngOnDestroy() {
  }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(resHeroes => this.heroes = resHeroes.slice(1, 5));
  }

}
