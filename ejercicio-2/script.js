/*
# Ejercicio Número 2 

# Jugando al chinchón

El chinchón es un juego de naipes de 2 a 8 jugadores principalmente jugado en España, Argentina, Colombia, Paraguay, Uruguay, Cabo Verde y otros países.

Existen muchas variaciones del juego.

Para este problema, usaremos la variación con 48 cartas sin comodín.
Cada una de las 48 cartas posibles tiene un número y un palo. 
El número varía desde 1 hasta 12 inclusive, y el palo puede ser cualquiera de los siguientes:

- Oros, Copas, Espadas o Bastos.
  Un momento importante en el chinchón ocurre a la hora de contar los puntos de penalización que recibirá un 
  jugador por las cartas que tiene en la mano cuando termina la ronda. Un jugador siempre termina la 
  ronda con 7 cartas en la mano, que puede agrupar formando juegos. Un juego es un conjunto de cartas 
  con cierto patrón particular. Los posibles juegos son:
- Escalera: se forma con 3 o más cartas del mismo palo, cuyos números sean consecutivos. 
Por ejemplo 1, 2, 3 forma escalera, al igual que 5, 6, 7, 8, 9, pero en cambio 11,
  12, 1 no es una escalera válida, ni tampoco lo son ni 4, 5, 7 ni 8, 9.
- Pierna: se forma con 3 o más cartas que tengan todas el mismo número.
- Chinchón: se forma con 7 cartas del mismo palo, cuyos números sean consecutivos. 
Es decir, el chinchón es una escalera de 7 cartas.



Al agrupar las cartas para formar juegos, `no se permite utilizar una misma carta para formar dos juegos diferentes.`
Es posible que queden cartas sin agrupar, es decir, sin formar ningún juego. 
`La penalización del jugador será igual a la suma de los números de las cartas que quedan sin agrupar`
Si el jugador puede agrupar sus cartas para formar juegos de varias maneras, 
siempre elegirá aquella que resulte en la mínima penalización posible.
Un caso especial se da cuando `el jugador logra agrupar todas sus 7 cartas formando un juego`: 
en este caso, en lugar de 0 puntos, `obtiene -10 puntos` (menos diez, que resta 10 puntos de penalización).
Un caso aún más especial se da cuando `el jugador logra no solo agrupar todas sus 7 cartas, 
sino además hacerlo formando un chinchón`. En ese caso, la penalización no es ni 0 ni -10, sino que es de `-50 puntos` (menos cincuenta puntos).

Debes escribir un programa que, dado un listado de 7 cartas, calcule la mínima
penalización posible si se agrupan correctamente las cartas.

### Objetivo

- Se debe implementar una función: `chinchon(numero, palo)`, donde palo es una cadena de exactamente 7 caracteres, 
y numero es un arreglo de exactamente 7 números.
- Para cada i entre 0 y 6 inclusive, la carta i-ésima tiene el número numero[i] y el palo indicado por la letra palo[i].
- Los palos se indican por su primera letra en mayúscula. [B, O, E, C]
- La función debe retornar un único entero: los puntos de penalización correspondientes a las cartas recibidas.

*/

function esMismoPalo(arrayPalos) {
  let contador = 0;
  let esChinchon = 0;
  for (let i = 0; i < arrayPalos.length; i++) {
    if (arrayPalos[i] === arrayPalos[i + 1]) {
      esChinchon = true;
      contador++;
    }
  }

  return {
    esChinchon,
    contador,
  };
}

function numeroConsecutivo(numero1, numero2) {
  if (numero1 == numero2 - 1) return true;
  if (numero2 === undefined) return true;
  return false;
}

function combinarArray(numero, palo) {
  const combinedArray = [];
  for (let i = 0; i < numero.length; i++) {
    combinedArray.push({
      numero: numero[i],
      palo: palo[i],
    });
  }

  return combinedArray;
}

function chinchon(numero, palo) {
  if (numero.length !== 7) return null;
  if (palo.length !== 7) return null;
  let puntos = 0;
  const arrayCombinado = combinarArray(numero, palo);

  const arrayPalos = palo.toUpperCase().split("");

  let esChinchon = esMismoPalo(arrayPalos).esChinchon;

  if (esChinchon) {
    let esConsecutivo = false;
    const arrayNumero = numero.sort((a, b) => a - b);

    for (let i = 0; i < arrayNumero.length; i++) {
      if (arrayNumero[0] <= 6) {
        if (i === arrayNumero.length - 1) break;
        esConsecutivo = numeroConsecutivo(arrayNumero[i], arrayNumero[i + 1]);
      }
    }

    if (esConsecutivo) puntos = -50;
  }

  /* 
    Con el array combinado, voy matando los que no son iguales
  */

  let arrayRecidual = []
  let contador = 0

  for (let i = 0; i < arrayCombinado.length; i++) {
    contador = i
    if(arrayCombinado.length < arrayCombinado.length-1){
        if (arrayCombinado[i]?.numero !== arrayCombinado[i + 1]?.numero){
            arrayRecidual.push(arrayCombinado[i+1]?.numero)
        }
    }else {
        if (arrayCombinado[i]?.numero !== arrayCombinado[i + 1]?.numero){
            arrayRecidual.push(arrayCombinado[i]?.numero)
        }   
    }
  }

  console.log("aray", arrayRecidual)

  for(let i = 0; i < arrayRecidual.length ; i++){
    puntos = Number(arrayRecidual[i]) + puntos
  }

  return puntos;
}

// console.log(
//   chinchon(["1", "2", "3", "4", "5", "6", "7"], "BBBBBBB")
// ); /* Es chinchón */
// console.log(
//   chinchon(["2", "3", "4", "5", "6", "7", "8"], "BBBBBBB")
// ); /* Es chinchón */
// console.log(
//   chinchon(["2", "3", "4", "5", "11", "7", "8"], "BBBBBBO")
// ); /* No es chinchón */

/* Pierna */

console.log("Pierna (18)", chinchon(["2", "2", "2", "2", "3", "7", "8"], "BBBBBBO"));
