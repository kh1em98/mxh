import { FormControl } from '@angular/forms';

export function requiredFileType(
  control: FormControl,
  type = ['png', 'jpg', 'jpeg']
): { [s: string]: boolean } {
  const img = control.value;

  if (img) {
    const extension = img.split('.')[1].toLowerCase();
    if (type.indexOf(extension) === -1) {
      return {
        requiredFileType: true,
      };
    } else {
      return null;
    }
  }

  return null;
}
