import {
  Directive,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';
import {
  FormGroupDirective,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ComponentConfig } from '../data-access/models';
import { FormValidationService } from '../data-access/services/form-validation.service';
import { DynamicComponentService } from '../data-access/services/dynamic-component.service';
import { ValidationErrorMessageComponent } from '../components/validation-error-message/validation-error-message.component';

@Directive({
  selector: '[appFormControlValidation]',
  standalone: true,
  providers: [FormGroupDirective],
})
export class FormControlValidationDirective implements OnInit, OnDestroy {
  @Input() validationMsgId!: string;
  @Input() formLabel!: string;

  private _statusChangeSubscription!: Subscription;
  private _renderer: Renderer2;
  private _invalidFiledName: any = [];
  private _invalidFieldMessage: any = [];

  constructor(
    private readonly _control: NgControl,
    private readonly _validationMsgService: FormValidationService,
    private readonly _dynamicComponentService: DynamicComponentService,
    public viewContainerRef: ViewContainerRef,
    private readonly _rendererFactory: RendererFactory2
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    this._statusChangeSubscription = this._control.statusChanges?.subscribe(
      (status) => {
        if (
          status === 'INVALID' &&
          this._control.dirty &&
          this._control.touched
        ) {
          this._showError();
        } else {
          this._removeError();
        }
      }
    ) as Subscription;
  }

  /**
   * @description This is needed to handle the case of clicking a required field and moving out.
   * Rest all are handled by status change subscription
   * @returns {void}
   */
  @HostListener('blur', ['$event'])
  handleBlurEvent(): void {
    if (this._control.value === null || this._control.value === '') {
      if (this._control.errors) {
        this._showError();
      } else if (
        this._control.control?.validator &&
        this._control.control.validator(this._control.control) &&
        this._control.control
          .validator(this._control.control)
          ?.hasOwnProperty('required')
      ) {
        // Need to add required error - template driven forms.
        const targetFormControl = this._control.control;
        targetFormControl.setErrors({
          ...targetFormControl.errors,
          required: true,
        });
        this._showError();
      } else if (
        this._control.validator &&
        this._control.validator(this._control as any) &&
        this._control
          .validator(this._control as any)
          ?.hasOwnProperty('required')
      ) {
        // Need to add required error - reactive forms.
        const targetFormControl = this._control.control;
        targetFormControl?.setErrors({
          ...targetFormControl.errors,
          required: true,
        });
        this._showError();
      }
    } else {
      this._control.errors ? this._showError() : this._removeError();
    }
  }

  /**
   * @description attaches dynamic error component that displays error message
   * @returns void
   */
  private _showError(): void {
    this._removeError();
    this._invalidFieldMessage = [];
    this._invalidFiledName = [];

    const valErrors: ValidationErrors = this._control
      .errors as ValidationErrors;

    const errorMsgs: Array<string> = this._buildErrors(valErrors) || [];
    this._invalidFieldMessage.push(...errorMsgs);
    this._invalidFiledName.push(
      (this._control.name as string) || this.validationMsgId || ''
    );
    const componentConfig: ComponentConfig =
      this._buildComponentConfig(errorMsgs);
    const parentNode = this._getParentFormGroupNode(
      this.viewContainerRef.element.nativeElement
    );
    this._renderer.addClass(parentNode, 'has-error');
    import(
      '../components/validation-error-message/validation-error-message.component'
    ).then((m) => m.ValidationErrorMessageComponent);
    this._dynamicComponentService.loadComponentIntoNode(
      this.viewContainerRef,
      this._dynamicComponentService.buildDynamicItem(componentConfig),
      parentNode
    );
  }

  /**
   * @description removes dynamic error component that displays error message
   * @returns void
   */
  private _removeError(): void {
    const parentNode = this._getParentFormGroupNode(
      this.viewContainerRef.element.nativeElement
    );
    this._renderer.removeClass(parentNode, 'has-error');
    const errorElement = this.viewContainerRef.get(
      this.viewContainerRef.length - 1
    );
    if (errorElement) {
      this.viewContainerRef.remove(this.viewContainerRef.indexOf(errorElement));
    }
  }

  /**
   * @description Iterates through DOM to find nearest node with class=`form-group`
   * @param node current DOM node i.e. one that has FormControl
   * @returns parent node with class=`form-group`
   */
  private _getParentFormGroupNode(node: any): any {
    let parentNode = node;
    let found = false;
    while (!found) {
      parentNode = this._renderer.parentNode(parentNode);
      found = parentNode.className.includes('form-group');
    }
    return parentNode;
  }

  /**
   * @description Builds key required to fetch value from validation-message.ts file
   * @param errorType {string}
   * @returns {string}
   */
  private _buildErrorMsgKey(errorType: string): string {
    return errorType === 'required'
      ? errorType
      : `${this.validationMsgId}-${errorType}`;
  }

  /**
   * @description Iterates through ValidationErrors object and prepares error message that is
   * to be displayed. Example: ValidationErrors = { required: true }. It fetches `required`,
   * sends this to servic to fetch error message against this field
   * @param valErrors {ValidationErrors} list of errors on particular FormControl
   * @returns {Array<string>} list of error messages to be displayed
   */
  private _buildErrors(valErrors: ValidationErrors): Array<string> {
    const errorMsgs: Array<string> = [];
    const errorKeys = Object.keys(valErrors);
    errorKeys.forEach((key) => {
      if (valErrors[key] !== null) {
        const resolvedKey = key;
        errorMsgs.push(
          this._validationMsgService.getValidationMessage(
            this._buildErrorMsgKey(resolvedKey),
            this.formLabel
          )
        );
      }
    });
    return errorMsgs;
  }

  /**
   * @description Builds model for dynamic component to display errors on form fields
   * @param errorMessages {Array<string>} list of error messages to be displayed
   * @returns {ComponentConfig}
   */
  private _buildComponentConfig(errorMessages: Array<string>): ComponentConfig {
    return {
      dynamicComponentType: ValidationErrorMessageComponent,
      componentType: 'validation',
      data: {
        errorMessages,
      },
    };
  }

  ngOnDestroy(): void {
    if (this._statusChangeSubscription) {
      this._statusChangeSubscription.unsubscribe();
    }
  }
}
