import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  httpLoad = signal(0);

  readonly isLoading = computed(() => this.httpLoad() > 0)

  show() {
    this.httpLoad.update((x) => x + 1);
  }
  hide() {
    this.httpLoad.update((x) => Math.max(0, x - 1));
  }

}
