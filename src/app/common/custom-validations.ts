import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch(psw: string, cnfpsw: string): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const passctrl = ctrl.get(psw);
    const cnfpassctrl = ctrl.get(cnfpsw);

    if (cnfpassctrl!.errors && !cnfpassctrl?.errors['mustMatch']) {
      return null;
    }

    if (passctrl != cnfpassctrl) {
      cnfpassctrl!.setErrors({ mustMatch: true });
    } else {
      cnfpassctrl!.setErrors(null);
    }

    return null;
  };
}
