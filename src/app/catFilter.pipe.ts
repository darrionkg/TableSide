import { Pipe, PipeTransform } from '@angular/core';

// filter observable array by category property
@Pipe({name: 'catFilter'})
export  class CatFilter implements PipeTransform {
  transform(catArray: Array<any>, category: string): Array<any> {
    return catArray.filter(item => item.category === category);
  }
}
