import { types } from "../types/types";

const initialState = {
  checking: true,
  extranjeros: [],
  idSelected: null,
  rangoEdad: [],
  paisesComunes: [],
  estadisticas: [],
};

export const extranjerosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.extranjeroUpload:
      return {
        ...state,
        extranjeros: action.payload,
        checking: false,
      };

    case types.extranjeroAgregado:
      return {
        ...state,
        extranjeros: [...state.extranjeros, action.payload],
        checking: false,
      };

    case types.extranjeroSelected:
      return {
        ...state,
        idSelected: action.payload,
        checking: false,
      };

    case types.extranjeroRangoEdad:
      return {
        ...state,
        rangoEdad: action.payload,
        checking: false,
      };

    case types.extranjeroPaisesComunes:
      return {
        ...state,
        paisesComunes: action.payload,
        checking: false,
      };

    case types.extranjeroEstadisticas:
      return {
        ...state,
        estadisticas: action.payload,
        checking: false,
      };

    default:
      return state;
  }
};
