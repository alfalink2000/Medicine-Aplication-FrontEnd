const baseUrl = process.env.REACT_APP_API_URL;

export const fetchImages = (endpoint, data, method = "GET") => {
  const url = new URL(`${baseUrl}/${endpoint}`);

  if (method === "GET") {
    // Agregar los parámetros a la URL si el método es GET
    Object.keys(data).forEach((key) => {
      url.searchParams.append(key, data[key]);
    });

    // Si el método es GET, no incluyas el cuerpo en la solicitud
    return fetch(url.toString(), {
      method,
      headers: {
        "Content-type": "application/json",
      },
    });
  } else {
    return fetch(url.toString(), {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};
