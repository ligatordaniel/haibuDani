import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(lista: any[], texto:string): any[] {
    //console.log(lista);
    if(!texto) return lista
    return lista.filter(user => user.nombre.toLowerCase().includes(texto.toLowerCase()))
  }

}
/*
transform(lista: any[], texto:string): any[] {
  if(!texto) return lista
  return lista.filter(user => user.name.toLowerCase().includes(texto.toLowerCase))
}
*/
