/* eslint-disable prefer-arrow-callback */
import Vue from 'vue';
import { Observable } from 'rxjs';

export default function createAnimationObserver() {
  return Observable.create(function subscribe(observer) {
    let active = true;
    let lastTick = performance.now();

    function schedule() {
      requestAnimationFrame(() => {
        const now = performance.now();
        observer.next(now - lastTick);
        lastTick = now;
        if (active) {
          Vue.nextTick(() => {
            schedule();
          });
        }
      });
    }

    schedule();

    return function unsubscribe() {
      active = false;
    };
  });
}
