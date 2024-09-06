// Ana Massielle Coti Rodas - 2477523
class Producto{
    private codigo:string;
    private nombre:string;
    private precio_costo:number;
    private precio_venta:number;

    constructor(codigo: string, nombre:string, precio_costo:number, precio_venta:number){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio_costo = precio_costo;
        this.precio_venta = precio_venta;
    }

    public get_codigo(): string {
        return this.codigo;
    }

    public get_nombre(): string {
        return this.nombre;
    }

    public get_precio_costo(): number {
        return this.precio_costo;
    }

    public get_precio_venta(): number {
        return this.precio_venta;
    }

    public to_string(){
        return "Codigo: " + this.codigo + " Nombre: " + this.nombre + " Precio Costo: " + this.precio_costo + " Precio Venta: " + this.precio_venta
    }
}

class Nodo {
    producto: Producto;
    siguiente: Nodo | null;

    constructor(producto: Producto) {
        this.producto = producto;
        this.siguiente = null;
    }
}

class Lista {
    public cabeza: Nodo | null;

    constructor() {
        this.cabeza = null;
    }
}

class HashTable {
    private size: number;
    private data: Lista[];

    constructor(size: number) {
        this.size = size;
        this.data = new Array(size);
        for (let i = 0; i < size; i++) {
            this.data[i] = new Lista();
        }
    }

    private hash(key: number): number {
        return key % this.size;
    }

    public insert(producto: Producto): void {
        const [, numericPart] = producto.get_codigo().split(/^([a-zA-Z])/); 
        const index = this.hash(parseInt(numericPart, 10)); 
        if (!this.data[index]) { 
            this.data[index] = {cabeza:null}; 
            console.log("Entre al primer if");
        }
        const nuevoNodo = new Nodo(producto);
        let current = this.data[index].cabeza;
        if (!current) {
            this.data[index].cabeza = nuevoNodo;
            console.log("Entre al segundo if");
        } else {
            console.log("Entre al else");
            while (current.siguiente) {
                current = current.siguiente;
            }
            current.siguiente = nuevoNodo;
        }
    }

    public search(codigo: string): Producto | null {
        const [, numericPart] = codigo.split(/^([a-zA-Z])/); 
        const index = this.hash(parseInt(numericPart, 10)); 
        let actual = this.data[index].cabeza;
        while (actual !== null) {
            if (actual.producto.get_codigo().endsWith(numericPart)) { 
                return actual.producto;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    public print(): void {
        let all_data: string = "";
        for (const lista of this.data) {
            let actual = lista.cabeza; 
            while (actual !== null) {
                all_data += actual.producto.to_string() + " ";
                actual = actual.siguiente;
            }
            all_data += "\n";
        }
        console.log(all_data.trim());
    }
}

// Main
let tablaHash: HashTable = new HashTable(30);

// Insertar
let producto1: Producto = new Producto("P001", "Pepto-Bismol", 50, 65);
let producto2: Producto = new Producto("P002", "Pepto-Bismol", 50, 65);
let producto3: Producto = new Producto("P003", "Pepto-Bismol", 50, 65);
console.log(producto1);
tablaHash.insert(producto1);
console.log(tablaHash.insert(producto1));
// tablaHash.insert(producto2);
// tablaHash.insert(producto3);
tablaHash.print();

// Buscar
let codigo_buscar: string = producto1.get_codigo();
let producto_encontrado = tablaHash.search(codigo_buscar);
if (producto_encontrado !== null) {
    console.log("El producto " + producto_encontrado.to_string() + " esta en la tabla");
} else {
    console.log("El producto con codigo " + codigo_buscar + " no se encontro");
}
