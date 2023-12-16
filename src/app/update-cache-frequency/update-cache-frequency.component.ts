import { Component, OnInit, inject } from '@angular/core';
import { CachingHttpService } from '../caching-http.service';

@Component({
  selector: 'app-update-cache-frequency',
  templateUrl: './update-cache-frequency.component.html',
  styleUrl: './update-cache-frequency.component.css',
})
export class UpdateCacheFrequencyComponent implements OnInit {
  private cachingHttpService = inject(CachingHttpService);
  public cacheLifespan: number = 0

  ngOnInit(): void {
    this.cacheLifespan = this.cachingHttpService.getCacheTTL();
  }

  setCacheLifespan(duration: number) {
    this.cachingHttpService.setCacheTTL(duration);
  }
}
