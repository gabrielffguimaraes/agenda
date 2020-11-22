import { FormControl } from '../../node_modules/@angular/forms';

export class Validacoes {
  static ValidaFoto( control: FormControl): { [key: string]: boolean } | null  {
   if (control.value){
     return null;
   }
   return { fotoInvalida: true };
  }
}
