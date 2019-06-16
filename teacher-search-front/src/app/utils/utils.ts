import {FormGroup} from '@angular/forms';

export type FieldErrorChecker = (formControlName: string) => boolean;
export const checkValidFormGroup = (formGroup: FormGroup) => {
  return (formControlName: string): boolean => {
    const { touched, invalid } = formGroup.get(formControlName);

    return touched && invalid;
  };
};
