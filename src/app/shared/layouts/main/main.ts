import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet ,} from '@angular/router';
import { Footer } from '../footer/footer';
import { Nav } from '../nav/nav';

import { SeoService } from '../../../core/services/seo.service';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);



  ngOnInit(): void {
    this.setupSeo();
  }

  private setupSeo(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;

          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        map((route) => route.snapshot.data['description']),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((description) => {
        if (description) {
          this.seoService.updateDescription(description);
        }
      });
  }
}
