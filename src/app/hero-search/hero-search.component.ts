import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero.service';
import { Hero } from 'src/app/hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  seachRefults: Hero[];

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit() {
  }

  search() {
    this.seachRefults = this.heroService.searchHeros(this.input.nativeElement.value);
  }
}
