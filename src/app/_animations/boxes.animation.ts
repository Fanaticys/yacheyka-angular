import { trigger, state, animate, transition, style, query, animateChild, group } from "@angular/animations";

const deleting =
    trigger('deletingAnimation', [
      transition('* => *', group([
        query('.deleting', animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(100%)', backgroundColor: 'red', opacity: 0, visibility: 'hidden' })), {optional: true})
      ]))
    ]);

const changing = {

  parent: trigger('changeAnimationParent', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1 }))
      ]),
      transition(':leave', animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0 })))
    ]),

  child: trigger('changeAnimationChild', [
    transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateY(0)' }))
      ]),
    transition(':leave', animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateY(100%)' })))
  ])
}

export const boxesAnimation = {
  deleting,
  changing
}