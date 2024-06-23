import { Injectable } from '@angular/core';
import { VALIDATION_MESSAGES } from '../../utils/validation-message.const';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  private _errorMessages: any = VALIDATION_MESSAGES;

  /**
   * @description Processes the form control id and return error-validation-message
   *
   * @param id {string}, defaults to `generic-required`
   *
   * @returns error-message {string}
   */
  getValidationMessage(id = '-required', fieldKey: string): string {
    if (id === 'required') {
      return `${fieldKey} is required.`;
    } else {
      return (
        this._errorMessages[id] ||
        this._errorMessages[`generic-${id.split('-')[1]}`]
      );
    }
  }
}
