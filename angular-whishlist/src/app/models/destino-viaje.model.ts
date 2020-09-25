export class destinoViaje {
	/* nombre:string;
	imagenUrl:string;

	constructor(n:string, u:string){
		this.nombre = n;
		this.imagenUrl = u;
	} */
	private selected: boolean;
	public servicios: string[];
	//Creación de atajo sintáctico o syntax sugar del codigo anterior
	constructor(public nombre: string, public imagenUrl:string){
		this.servicios = ['pileta', 'desayunos'];
	}
	isSelected(): boolean{
		return this.selected;
	}
	setSelected(s: boolean){
		this.selected = s;
	}
}