const baseUrl = process.env.REACT_APP_API_URL;

export const fetchPublic = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`; //  https://localhost:4000/api/usuario
  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      // headers: {
      //   "Content-type":
      //     "multipart/form-data; boundary=----WebKitFormBoundarywSBBNxnXXBXLc7ns",
      // },
      body: data,
    });
  }
};
