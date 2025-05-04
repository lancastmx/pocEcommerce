import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estiloDivertido'
})
export class EstiloDivertidoPipe implements PipeTransform {
// Lista de clases CSS para las fuentes (corresponden a las definidas en CSS)
private readonly clasesFuente = ['font-roboto', 'font-lato', 'font-opensans'];
// Lista de clases CSS para los estilos (corresponden a las definidas en CSS)
private readonly clasesEstilo = ['text-normal', 'text-bold', 'text-italic', 'text-bold-italic'];

transform(value: string | null | undefined): string {
  if (!value) {
    return '';
  }

  let resultadoHtml = '';
  const numFuentes = this.clasesFuente.length;
  const numEstilos = this.clasesEstilo.length;

  for (let i = 0; i < value.length; i++) {
    const caracter = value[i];
    let caracterTransformado = '';

    // 1. Alternar Mayúsculas y Minúsculas (igual que antes)
    if (i % 2 === 0) {
      caracterTransformado = caracter.toLowerCase();
    } else {
      caracterTransformado = caracter.toUpperCase();
    }

    // 2. Determinar Clase de Fuente (cíclica)
    const claseFuente = this.clasesFuente[i % numFuentes];

    // 3. Determinar Clase de Estilo (cíclica)
    const claseEstilo = this.clasesEstilo[i % numEstilos];

    // 4. Construir el HTML con <span> y clases
    // Evitar añadir span si es un espacio en blanco para no romper el flujo natural
    if (caracterTransformado.trim() === '') {
       resultadoHtml += caracterTransformado; // Añadir espacio tal cual
    } else {
       resultadoHtml += `<span class="${claseFuente} ${claseEstilo}">${caracterTransformado}</span>`;
    }
  }

  return resultadoHtml;
}
}
