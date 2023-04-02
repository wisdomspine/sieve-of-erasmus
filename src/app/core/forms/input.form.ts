import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const defaultValues = { min: 2, max: 100 };
const valueGreaterOrEqualMin: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  const minValue = (control.parent as FormGroup)?.controls['min']?.value;

  if (minValue == null || value == null) return null;
  return value >= minValue
    ? null
    : {
        min: {
          required: minValue,
          actual: value,
        },
      };
};
const inputForm: {
  default: typeof defaultValues;
  (args?: Partial<typeof defaultValues>): FormGroup<{
    min: FormControl<number | null>;
    max: FormControl<number | null>;
  }>;
} = (args) =>
  new FormGroup({
    min: new FormControl<number>(args?.min ?? defaultValues.min, [
      Validators.min(2),
      Validators.required,
    ]),
    max: new FormControl<number>(args?.max ?? defaultValues.max, [
      valueGreaterOrEqualMin,
      Validators.required,
    ]),
  });

inputForm.default = defaultValues;

export { inputForm };
