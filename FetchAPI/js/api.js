import * as UI from './interfaz.js';

export class API {
     constructor(artista, cancion) {
          this.artista = artista;
          this.cancion = cancion;

          this.consultarAPI();
     }

     consultarAPI() {
               fetch(`https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`)
               .then(respuesta => respuesta.json())
               .then(resultado => {
                    // if(resultado.lyrics) {
                    //      // La canción Existe
                    //      const { lyrics } = resultado;
                    //      UI.divResultado.textContent = lyrics;
                    //      UI.headingResultado.textContent = 'Resultado';
                    // }
                    if (resultado.lyrics) {
                         // La canción Existe
                         const { lyrics } = resultado;
                         // Reemplazar los saltos de línea por <br> para el formato
                         const formattedLyrics = lyrics.replace(/\n/g, '<br>');
                         UI.divResultado.innerHTML = formattedLyrics;
                         UI.headingResultado.textContent = 'Resultado de la Canción';
                    } else {                         // La canción no existe
                         UI.divMensajes.innerHTML = 'La canción No existe, prueba con otra búsqueda';
                         UI.divMensajes.classList.add('error');
                         setTimeout(() => {
                              UI.divMensajes.innerHTML = '';
                              UI.divMensajes.classList.remove('error');
                              UI.formularioBuscar.reset();
                         }, 5000);
                    }
               })
               .catch(error => console.log(error));
     }
}