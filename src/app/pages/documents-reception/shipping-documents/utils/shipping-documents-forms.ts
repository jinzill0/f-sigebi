import { FormControl, Validators } from '@angular/forms';
import { STRING_PATTERN } from 'src/app/core/shared/patterns';

export class SHIPPING_DOCUMENTS_FORM {
  officeNum = new FormControl<string>(null);
  officeCve = new FormControl<string>(null);
  date = new FormControl<string>(null, [Validators.required]);
  priority = new FormControl<string>(null, [Validators.required]);
  messageBody = new FormControl<string>(null, [
    Validators.required,
    Validators.pattern(STRING_PATTERN),
  ]);
  delegation = new FormControl<number>(null);
  subdelegation = new FormControl<number>(null);
  department = new FormControl<number>(null);
  sender = new FormControl<string>(null, [Validators.required]);
  receiver = new FormControl<string>(null, [Validators.required]);
  cpp = new FormControl<number>(null);
  messageType = new FormControl<'area' | 'direction'>(null);
}
