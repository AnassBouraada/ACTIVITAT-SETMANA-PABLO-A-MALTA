let numPage = 1;

async function obtenirDadesPelicules(numPage) {
  await fetch(`https://www.omdbapi.com/?apikey=ed8c126a&s=movie&page=${numPage}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error de xarxa: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // Assumim que la resposta conté un camp "Search" amb una llista de pel·lícules
      const pelicules = data.Search;

      // Iterem sobre cada pel·lícula i les afegim a la pàgina
      pelicules.forEach(pelicula => {
        // Creem una nova div per a cada pel·lícula
        const divPelicula = document.createElement('div');
        divPelicula.id = `pelicula-${pelicula.imdbID}`; // Agregamos un ID único para cada película

        // Afegim la imatge de la pel·lícula
        const img = document.createElement('img');
        img.src = pelicula.Poster;
        img.alt = pelicula.Title;
        divPelicula.appendChild(img);

        // Afegim el nom de la pel·lícula
        const name = document.createElement('h2');
        name.textContent = pelicula.Title;
        divPelicula.appendChild(name);

        console.log(name.textContent.length);
          // si la longitud del titol es mayor a 16 caracteres, se le añade el estilo de la clase pelicula-larga
        if (name.textContent.length > 16) {
          divPelicula.classList.add('pelicula-larga');
          divPelicula.classList.remove('pelicula');
        } else {
          divPelicula.classList.add('pelicula');
        }


        const buttons = document.createElement('div');

        buttons.id = 'buttons';

        divPelicula.appendChild(buttons);

        const editar = document.createElement('button');
        editar.style = 'background-color: green';
        editar.id = 'edit';
        editar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" fill="#000000"/></svg>';
        editar.onclick = () => {
          modificarNomPelicula(divPelicula.id);
        };
        buttons.appendChild(editar);

        const eliminar = document.createElement('button');
        eliminar.style = 'background-color: red';
        eliminar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';
        eliminar.onclick = () => {
          eliminarPelicula(divPelicula.id);
        }
        buttons.appendChild(eliminar);
        // Afegim la div de la pel·lícula al cos del document
        document.getElementById('pelicules-container').appendChild(divPelicula);
      });

    })
    .catch(error => {
      console.error('Hi ha hagut un problema amb la petició fetch:', error);
    });
}

// Funció per filtrar les pel·lícules per títol
function filtrarPerTitulo(titulo) {
  const pelicules = document.querySelectorAll('.pelicula');

  pelicules.forEach(pelicula => {
    const nombre = pelicula.querySelector('h2').textContent;

    // Comprovar si el nom de la pel·lícula coincideix amb el títol cercat
    if (nombre.toLowerCase().includes(titulo.toLowerCase())) {
      // Mostrar la pel·lícula si coincideix
      pelicula.style.display = '';
    } else {
      // Ocultar la pel·lícula si no coincideix
      pelicula.style.display = 'none';
    }
  });

   //borrar el valor del input
    document.getElementById('filtrarPerTitol').value = '';

}

function modificarNomPelicula(idPelicula) {
  const h2 = document.getElementById(idPelicula).querySelector('h2');
  const nouNom = prompt('Introdueix el nou nom de la pel·lícula');
  h2.textContent = nouNom;
}

function afegirPelicules(titolPelicula) {
  const novaPelicula = document.createElement('div');
  novaPelicula.classList.add('pelicula');
  novaPelicula.id = Math.random(toString().slice(2,11));

  const imgNovaPelicula = document.createElement('img');
  imgNovaPelicula.src = 'https://www.imprentaonline.net/blog/wp-content/uploads/DALL%C2%B7E-2023-10-16-10.41.49-Illustration-depicting-a-humanoid-robot-with-half-of-its-face-transparent-revealing-intricate-circuits-and-gears-inside.-The-robot-is-holding-a-light-1.png'
  imgNovaPelicula.alt = "Imatge nova pelicula";
  novaPelicula.appendChild(imgNovaPelicula);

  const titol = document.createElement('h2');
  titol.textContent = titolPelicula;
  novaPelicula.appendChild(titol);

  // si la longitud del titol es mayor a 16 caracteres, se le añade el estilo de la clase pelicula-larga
  if (titolPelicula.length > 16) {
    novaPelicula.classList.add('pelicula-larga');
    novaPelicula.classList.remove('pelicula');
  }

  const buttons = document.createElement('div');

  buttons.id = 'buttons';

  novaPelicula.appendChild(buttons);

  const editar = document.createElement('button');
  editar.style = 'background-color: green';
  editar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>';
  editar.onclick = () => {
    modificarNomPelicula(novaPelicula.id);
  }
  buttons.appendChild(editar)

  const eliminar = document.createElement('button');
  eliminar.style = 'background-color: red';
  eliminar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';
  eliminar.onclick = () => {
    eliminarPelicula(novaPelicula.id);
  }
  buttons.appendChild(eliminar);


  document.getElementById('pelicules-container').appendChild(novaPelicula);

  document.getElementById('titolNovaPelicula').value = '';
}

function eliminarPelicula(idPeliculaEliminar) {

  const PeliculaEliminar = document.getElementById(idPeliculaEliminar);

  PeliculaEliminar.remove();

}

function mostrarMesPelicules() {

  obtenirDadesPelicules(++numPage);

}


// Cridar a la funció per obtenir les dades de les pel·lícules
obtenirDadesPelicules(numPage);
