import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../types/book';

@Pipe({
  name: 'bookName',
  standalone: true
})
export class BookNamePipe implements PipeTransform {

  transform(value: Book[], args: string): any {
    const result = [];
    for (const book of value) {
       // Normalizar el argumento de búsqueda
       const argsSinEspacios = args.replace(' ', '');
       const argsSinTildes = argsSinEspacios.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
       const argsMinusculas = argsSinTildes.toLowerCase();
 
       // Normalizar el nombre de las empresas
       const nombreSinEspacios = book.name.replace(' ', '');
       const nombreSinTildes = nombreSinEspacios.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
       const nombreNormalizado = nombreSinTildes.toLowerCase();
 
       // Comprobar si el nombre de la empresa incluye el argumento de búsqueda
       if(nombreNormalizado.includes(argsMinusculas)) {
        result.push(book);
       }
    }
    return result;
  }

}
