import { trigger, state, animate, transition, style, query, animateChild, group } from "@angular/animations";

export const routeAnimation = 
    trigger('routeAnimation', [
        transition(':enter', [
            style({position: 'absolute', width: '100%', opacity: 0}),
            animate('.5s cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
        ])
    ]); 