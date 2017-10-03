import { trigger, state, animate, transition, style, query, animateChild, group, keyframes } from "@angular/animations";

export const helpComponentAnimation = 
    trigger('helpComponentAnimation', [
        transition(':enter', [
            query('.help', [
                style({transform: 'rotateX(-90deg)', opacity: 0}),
                animate('.3s', keyframes([
                    style({transform: 'rotateX(-90deg) translate(0, 8%)', opacity: 0, offset: 0}),
                    style({transform: 'rotateX(30deg) translate(0, 8%)', opacity: .6, offset: .7}),
                    style({transform: 'rotateX(0) translate(0, 8%)', opacity: 1, offset: 1})
                ]))
            ])
        ])
    ]);    