import { types } from "../types/types";

const initialState = {
  checking: true,
  servicios: [],
  idSelected: null,
};

export const ServicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.listaServicos:
      return {
        ...state,
        servicios: action.payload,
        checking: false,
      };

    case types.listaServAgregado:
      return {
        ...state,
        servicios: [...state.servicios, action.payload],
        checking: false,
      };

    case types.listaServSelected:
      return {
        ...state,
        idSelected: action.payload,
        checking: false,
      };

    default:
      return state;
  }
};
