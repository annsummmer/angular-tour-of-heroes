import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  @ViewChild('heroName') heroName: ElementRef;
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(res => this.heroes = res);
  }

  addHero() {
    const name = this.heroName.nativeElement.value.trim();
    if (!name) { return; }
    this.heroName.nativeElement.value = '';
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  deleteHero(hero: Hero) {
    console.log(hero);
    this.heroService.deleteHero(hero)
      .subscribe(heroToDelete => {
        const index = this.heroes.findIndex(heroToDelete => heroToDelete.id === hero.id);
        this.heroes.splice(index, 1);
      });
  }
}
