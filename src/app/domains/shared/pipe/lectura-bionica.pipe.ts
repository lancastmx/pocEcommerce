import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lecturaBionica'
})
export class LecturaBionicaPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    let resultHtml = '';
    const regex = /([a-zA-ZÀ-ÿüÜñÑ]+)|([^a-zA-ZÀ-ÿüÜñÑ]+)/g; // Misma regex
    let match;

    while ((match = regex.exec(value)) !== null) {
      if (match[1]) { // Es una palabra
        const word = match[1];
        const len = word.length;
        let wordHtml = '';

        if (len <= 1) {
          // Palabra muy corta: solo el peso más grueso
          wordHtml = `<span class="fw-700">${word}</span>`;
        } else if (len <= 3) {
          // Palabra corta: dos pasos (grueso, normal)
          const part1 = word.substring(0, 1); // Primera letra
          const part2 = word.substring(1);    // Resto
          wordHtml = `<span class="fw-700">${part1}</span><span class="fw-400">${part2}</span>`;
        } else {
          // Palabra más larga: tres pasos (grueso, semigrueso, normal)
          // Ajusta los porcentajes si lo deseas
          const index1 = Math.max(1, Math.ceil(len * 0.3)); // Índice final parte 1 (grueso)
          const index2 = Math.max(index1 + 1, Math.ceil(len * 0.6)); // Índice final parte 2 (semigrueso)

          const part1 = word.substring(0, index1);
          const part2 = word.substring(index1, index2);
          const part3 = word.substring(index2);

          // Solo añadir spans si la parte tiene contenido
          if (part1) wordHtml += `<span class="fw-700">${part1}</span>`;
          if (part2) wordHtml += `<span class="fw-600">${part2}</span>`;
          if (part3) wordHtml += `<span class="fw-400">${part3}</span>`;
        }
        resultHtml += wordHtml;

      } else if (match[2]) { // No es una palabra (espacios, puntuación)
        resultHtml += match[2]; // Añadir tal cual
      }
    }
    return resultHtml;
  }

}
