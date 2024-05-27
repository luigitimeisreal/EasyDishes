import { Ingrediente } from "./ingrediente";

export interface Receta {
    nombre: string,
    imagen: string,
    ingredientes: Ingrediente[],
    preparacion: string,
    id?: string,
    fecha: string,
    etapa: string,
    autor: string
}