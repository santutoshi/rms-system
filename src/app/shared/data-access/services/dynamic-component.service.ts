import {
  ComponentFactoryResolver,
  Injectable,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';
import { ComponentConfig, DynamicComponent, DynamicItem } from '../models';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  private _renderer: Renderer2;
  public viewContainerRef!: ViewContainerRef;

  constructor(
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    private readonly _rendererFactory: RendererFactory2
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  /**
   * @description Creates Dynamic Component and attaches it to provided view ref
   * @param vcr {ViewContainerRef} reference in DOM where newly created dynamic component is
   * to be displayed
   * @param dynamicItem {DynamicItem} configuration object
   * @param parentNode OPTIONAL - if specified attaches dynamic component to parent node
   * else on VCR
   * @returns {void}
   */
  loadComponentIntoNode(
    vcr: ViewContainerRef,
    dynamicItem: DynamicItem,
    parentNode = null
  ): void {
    if (dynamicItem.component) {
      const componentFactory =
        this._componentFactoryResolver.resolveComponentFactory(
          dynamicItem.component
        );
      const parent = parentNode || vcr.element.nativeElement;
      vcr.clear();
      const componentRef = vcr.createComponent(componentFactory);
      const newChild = componentRef.injector.get(
        ValidationErrorMessageComponent
      ).elementRef.nativeElement;
      this._renderer.appendChild(
        parentNode || vcr.element.nativeElement,
        newChild
      );
      (componentRef.instance as DynamicComponent).data = dynamicItem.data;
    }
  }

  buildDynamicItem(componentConfig: ComponentConfig): DynamicItem {
    return new DynamicItem(
      componentConfig.dynamicComponentType,
      componentConfig.data
    );
  }

  set setTemplateRef(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  loadComponentDynamic(
    vcr: ViewContainerRef,
    dynamicItem: DynamicItem,
    parentNode: any
  ): void {
    if (dynamicItem.component) {
      const componentFactory =
        this._componentFactoryResolver.resolveComponentFactory(
          dynamicItem.component
        );
      const parent = parentNode || vcr.element.nativeElement;
      if (parent) {
        parent?.clear();
        const componentRef = parent.createComponent(componentFactory);

        (componentRef.instance as DynamicComponent).data = dynamicItem.data;
      }
    }
  }
}
