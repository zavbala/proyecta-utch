export interface Generic {
    materia: string;
    profesor: string;
}

export interface AttendanceRecord extends Generic {
    color: string;
    asistencias: number[];
}

export interface GradeRecord extends Generic {
    calificaciones: string[];
    estadias: boolean;
    cabecera: string[];
}

type UserFields =
    | "id"
    | "tipo"
    | "foto"
    | "correo"
    | "genero"
    | "usuario"
    | "nombre";

type Base = {
    [key in UserFields]: string;
};

export interface User extends Base {
    alias: string[];
}

export interface Output<T> {
    data: T;
    error: boolean;
}
