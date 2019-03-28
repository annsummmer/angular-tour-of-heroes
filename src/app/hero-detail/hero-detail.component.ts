import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  heroId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.heroId = +this.activatedRoute.snapshot.params['id'];
    this.getHero();
  }

  getHero() {
    this.heroService.getHero(this.heroId)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
