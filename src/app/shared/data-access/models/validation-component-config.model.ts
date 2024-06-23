import { Type } from '@angular/core';

export interface ComponentConfig {
    componentType: 'validation';
    dynamicComponentType: any;
    data: any;
}

export class DynamicItem {
    constructor(
        public component: Type<any>,
        public data: any
    ) {}
}

export interface DynamicComponent {
    data: {
        errorMessages: Array<string>;
    };
}
