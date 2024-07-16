import { TerapiaI } from "./TerapiaI"

export interface PacienteI {
	_id: string,
	foto: FotoI,
	datosPersonales: DatosPersonalesI,
	diagnosticosYpruebas: DiagnosticosYpruebasI,
	historiaVida: HistoriaVidaI,
	terapias: string[]
}

interface FotoI {
	public_id: string,
	secure_url: string
}

interface DatosPersonalesI {
	fechaNac: string,
	nombre: string,
	apellido1: string,
	apellido2: string,
	fechaInsercion: string,
	institucionalizado: boolean,
	institucion: InstitucionI,
	direccion: DireccionI
}

interface InstitucionI {
	nombre: string,
	localidad: string,
	fechaIngreso: string
}

interface DireccionI {
	nombre: string,
	numero: string,
	pisoYletra: string,
	localidad: string,
	provincia: string
}

interface DiagnosticosYpruebasI {
	diagnosticos: DiagnosticoI[],
	pruebas: PruebaI[]
}

interface DiagnosticoI {
	diagnostico: string,
	profesional: string,
	fechaDiagnostico: string
}

interface PruebaI {
	nombrePrueba: string,
	fechaPrueba: string
}

interface HistoriaVidaI {
	lugarNac: string,
	lugaresResidencia: LugarResidenciaI[],
	nivelEstudios: string,
	estudios: EstudiosI,
	actividadesLaborales: ActividadLaboralI[],
	aficiones: string[]
}

interface LugarResidenciaI {
	fechaInicio: string,
	fechaFin: string,
	localidad: string,
	provincia: string,
	pais: string,
}

interface EstudiosI {
	institucion: string,
	localidad: string,
	titulacion: string,
	fechaInicio: string,
	fechaFin: string
}

interface ActividadLaboralI {
	actividad: string,
	empresa: string,
	localidad: string,
	provincia: string,
	pais: string,
	fechaInicio: string,
	fechaFin: string
}
