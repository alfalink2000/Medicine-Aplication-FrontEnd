import { types } from "../types/types";

const initialState = {
  checking: true,
  vistaPublicaActiva: [],
  vistaPublicaObtenida: [],
  imagenesCharged: [],
};

export const vistaActivaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.vistaPublicaActiva:
      return {
        ...state,
        vistaPublicaActiva: action.payload,
        checking: false,
      };

    case types.vistaPublicaActivaObtenida:
      return {
        ...state,
        vistaPublicaObtenida: action.payload,
        checking: false,
      };

    case types.imagenesCargadas:
      return {
        ...state,
        imagenesCharged: [...state.imagenesCharged, action.payload],
        checking: false,
      };

    default:
      return state;
  }
};
