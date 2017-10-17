import { trigger, state, animate, transition, style, query, animateChild, group } from "@angular/animations";

export const loginAnimation = 
    trigger('loginAnimation', [
        transition(':enter', [
            style({transform: 'translateY(-200%)'}),
            animate('.7s cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
        ])
    ]);

export const errorAnimation = 
    trigger('errorAnimation', [
        transition(':enter', [
            style({transform: 'scale(0)'}),
            animate('.2s', style('*'))
        ])
    ]);