import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../types/book';

@Pipe({
  name: 'book',
  standalone: true
})
export class BookPipe implements PipeTransform {

  transform(value: Book[], args: string): any {
    const result = [];
    for (const book of value) {
      if (book.isbn.includes(args)){
        result.push(book);
      }
    }
    return result;
  }

}
