import { trigger, state, animate, transition, style, query, animateChild, group } from "@angular/animations";

export const modalAnimation = trigger('modalAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1 }))
    ]),
    transition(':leave', animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0 })))
]);