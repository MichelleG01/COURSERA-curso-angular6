import {
    reducerDestinosViajes,
    DestinosViajesState,
    intializeDestinosViajesState,
    InitMyDataAction,
    NuevoDestinoAction
  } from './destinos-viajes-state.modules';
  import { destinoViaje } from './destino-viaje.model';
  
  //Esto seria el text spec de reducerDestinoViajes, el que muta el estado
  //Para algunas acciones
  describe('reducerDestinosViajes', () => {
      //Los it son los text
    it('should reduce init data', () => {
        // Setup, uno arma el objeto que va a necesitar para testear
        const prevState: DestinosViajesState = intializeDestinosViajesState();
        const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);
        
        // Action, hacer interactuar los objetos (actuar sobre nuestro modelo productivo)
        //En la sigt linea le solicitamos a nuestro codigo productio que realice una accion
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        
        // Assert, verificaciones. Que salida esperamos
        expect(newState.items.length).toEqual(2); //validamos que el nuevo estado haya creado los dos destinos
        expect(newState.items[0].nombre).toEqual('destino 1');
        
        //Tear down, volver hacia atras las acciones que hayamos generado
        //si en el action tuvieramos una accion sobre una db aqui se escribiria el codigo para borrar
        //lo que se inserto en la db
    });
  
    it('should reduce new item added', () => {
        const prevState: DestinosViajesState = intializeDestinosViajesState();
        const action: NuevoDestinoAction = new NuevoDestinoAction(new destinoViaje('barcelona', 'url'));
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].nombre).toEqual('barcelona');
    });
  });