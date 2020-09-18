# Bienvenido
## Desarrollo de páginas con Angular
En este repositorio se alojara lo visto en el curso.

### Comandos basicos de git
- git status -> Nos indica que cambios han ocurrido en la rama.
- git add -A -> (para tener control) queda en stage.
- git commit -m "Comentario"-> Guardar los cambios en una linea de tiempo.
- git push -> Para subir los cambios al servidor remoto.
- git pull -> Me trae los cambios que esten en el servidor remoto al repositorio local.

### Información de los modulos
En el index.html invoca, carga, referencia al componente principal. Lo que hace Angular por dentro es venir a este archivo, al component TypeScript, que es donde se define el componente y acá uno dice, define el selector, es decir, cómo va a ser ese tag. Yo acá le puedo poner lo que yo quiera. Lo tendría que cambiar en el index.html, obviamente, porque si no, se va a romper. Uno especifica donde se levanta el template y especifica donde se levantan los estilos. Bien, y luego uno define el comportamiento porque la gracia de los componentes es que no solamente van a ser una plantilla html, sino que van a ser también un encapsulado de comportamiento. Van a ser un componente que va a tener comportamiento encapsulado.