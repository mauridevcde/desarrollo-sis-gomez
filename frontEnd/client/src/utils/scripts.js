export function validaObject(datos) {
  let conta = 0;
  const regx1 = /^\s*$/;

  const esVacioOConEspacios = (cadena) => regx1.test(cadena);

  for (const property in datos) {
    if (esVacioOConEspacios(datos[property])) {
      conta++;
    }

    if (
      datos[property] == "" ||
      datos[property] == null ||
      datos[property] == undefined
    ) {
      conta++;
    }
  }

  if (conta > 0) {
    return false;
  } else {
    return true;
  }
}
