import { trigger, state, animate, transition, style, query, animateChild, group } from "@angular/animations";

export const adminTableAnimation =
  trigger('deletingAnimation', [
    transition('* => *', group([
      query('.deleting', animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(100%)', backgroundColor: 'red', opacity: 0, visibility: 'hidden' })), {optional: true})
    ]))
  ]);