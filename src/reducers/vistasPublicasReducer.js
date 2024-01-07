import { types } from "../types/types";

const initialState = {
  checking: true,
  vistasPublicas: [],
  idPublicSelected: null,
};

export const vistasPublicasReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.listaVistasPublicas:
      return {
        ...state,
        vistasPublicas: action.payload,
        checking: false,
      };

    case types.vistaPublicaSelected:
      return {
        ...state,
        idPublicSelected: action.payload,
        checking: false,
      };

    case types.vistaPublicaInsertada:
      return {
        ...state,
        vistasPublicas: [...state.vistasPublicas, action.payload],
        checking: false,
      };

    default:
      return state;
  }
};
