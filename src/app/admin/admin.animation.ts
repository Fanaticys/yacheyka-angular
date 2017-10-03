import { trigger, animate, transition, style, query, group } from "@angular/animations";

export const adminRouteAnimation = 
trigger('adminRouteAnimation', [
    transition(':enter', [
        style({transform: 'translateX(100%)', position: 'absolute', width: '100%', opacity: 0}),
        animate('.4s .5s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translate(0)', opacity: 1 }))
    ]),
    transition(':leave', [
        style({transform: 'translateX(0)', position: 'absolute', width: '100%'}),
        animate('.4s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translate(100%)', opacity: 0 }))
    ])
]);

export const adminTableAnimation =
trigger('deletingAnimation', [
    transition('* => *', group([
    query('.deleting', animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(100%)', backgroundColor: 'red', opacity: 0, visibility: 'hidden' })), {optional: true})
    ]))
]);