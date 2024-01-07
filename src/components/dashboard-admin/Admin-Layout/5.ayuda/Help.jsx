import React from "react";

export const Help = () => {
  return (
    <div className="container-fluid main-content">
      <div className="row">
        <div className="offset-lg-3 offset-md-2 offset-sm-2 col-sm-6 col-md-6 col-lg-6">
          <div className="info-box ">
            <div className="imagen_ayuda helpMitad">
              <img
                src={process.env.PUBLIC_URL + "/assets/ayuda/dashboard.jpg"}
                alt="dashboard"
              />
            </div>
            <div className="derecha_ayuda helpMitad ">
              <p>
                El dashboard es comúnmente una vista que muestra informaciones
                al administrador, en este caso mostrara todos los extranjeros
                que se hallan registrado en el software en una tabla con sus
                informaciones respectivas, en la parte superior tendremos
                informaciones más detalladas a cerca de los extranjeros como por
                ejemplo : los rangos de edad más comunes mostrados en un gráfico
                de pastel , los países de los extranjeros que más se han
                registrado en el software y posterior a ello datos relevantes
                como total de extranjeros de la tabla , cantidad de género
                masculino , femenino y trans genero.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-3 offset-md-2 offset-sm-2 col-sm-6 col-md-6 col-lg-6">
          <div className="info-box">
            <div className="imagen_ayuda helpMitad">
              <img
                src={process.env.PUBLIC_URL + "/assets/ayuda/workbench.jpg"}
                alt="dashboard"
              />
            </div>
            <div className="derecha_ayuda helpMitad ">
              <p>
                Workbench o banco de trabajo donde podremos gestionar los
                pacientes extranjeros que hemos visto en la tabla de dashboard,
                aquí insertaremos, modificaremos y eliminaremos los datos de los
                extranjeros registrados en nuestro sistema para la vista
                administrativa, también contamos con un botón de download de
                descarga para sacar en documento la tabla mostrada.El botón
                insertar que nos permitirá crear un nuevo extranjero.Para el
                botón modificar para ello seleccionamos un usuario extranjero de
                la tabla y se tornara de color verde como que ya esta
                seleccionado, esto habilita pulsar el botón modificar y realizar
                los cambios respectivos.Para el eliminar seleccionamos el
                usuario extranjero a eliminar y habilitamos el botón eliminar
                que nos preguntara si deseamos eliminar el usuario extranjero.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-3 offset-md-2 offset-sm-2 col-sm-6 col-md-6 col-lg-6">
          <div className="info-box">
            <div className="imagen_ayuda helpMitad">
              <img
                src={process.env.PUBLIC_URL + "/assets/ayuda/administrar.jpg"}
                alt="dashboard"
              />
            </div>
            <div className="derecha_ayuda helpMitad ">
              <p>
                Administrar es la más importante de nuestra aplicación web, la
                cual nos dará el control y manejo de la vista pública que
                mostraremos a cada usuario que revise nuestro sitio web para
                buscar cualquier información que necesite , comenzando por lo
                primero , tendremos a la izquierda una lista de las vistas
                existentes ya creadas y en un color azul la vista seleccionada
                que es la que se encuentra activa, a la derecha los botones de
                manejo de seleccionar , insertar , modificar y eliminar las
                vistas.Para hacer activa la vista que se mostrara al público
                debemos seleccionar primero la vista y se tornara de un gris,
                pulsamos seleccionar y nos dirá vista seleccionada
                satisfactoriamente y después al actualizar la página se verá en
                azul muestra de que ya se encuentra activa.El botón insertar
                como su función se nombra agregara una nueva vista a la lista
                rellenando los campos específicos y necesarios para mostrar en
                la vista principal, así como añadiendo las imágenes respectivas
                para mostrar, Las imágenes solo permite subirlas en formato jpg,
                png de otra forma dará warning y no se subirá también debe tener
                límite de peso de hasta 1 mb más de eso dará stop y tendrá que
                reintentar la subida de imagen, El botón Modificar como su
                función se nombra modificara la vista seleccionada pero con una
                funcionalidad importante y especial que es necesaria para ser
                mostrada en la principal , es que esta agregara los servicios
                que se desean mostrar a la vista pública que este seleccionada ,
                he de recalcar que es como si fuese el segundo paso después de
                crear una nueva vista ya que la cargaremos con lo más
                fundamental para dejarla 100% en su finalidad a continuación
                vemos como no solo permite modificar los campos insertados
                anteriormente sino que también tenemos un gestionar de los
                servicios que deseamos que tenga esta vista, Modificar
                Servicios: Vemos un nuevo gestionar con los botones de insertar
                modificar y eliminar, que estarán mostrados con un verde para
                insertar, un azul para modificar y un rojo para
                eliminar.Insertar Servicios: El verde vemos como nos permite
                insertar un nuevo servicio en la tabla , los servicios cuentan
                con tres tipos de categorías a establecer en la tabla ,
                generales , especializados y de emergencia y prevención.El azul
                vemos como nos permite modificar un nuevo servicio en la tabla,
                lo seleccionamos en la tabla y se habilitara el botón modificar
                que carga los campos correspondientes para modificar. Para
                eliminar son los mismos requisitos, seleccionamos el servicio
                que queremos manejar y se habilita pulsar el botón eliminar en
                rojo para eliminar dicho servicio.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-3 offset-md-2 offset-sm-2 col-sm-6 col-md-6 col-lg-6">
          <div className="info-box ">
            <div className="imagen_ayuda helpMitad">
              <img
                src={process.env.PUBLIC_URL + "/assets/ayuda/ajustes.jpg"}
                alt="dashboard"
              />
            </div>
            <div className="derecha_ayuda helpMitad ">
              <p>
                La vista de ajustes nos permitira cambiar el usuario con
                permisos de administrador que accedera a nuestro sitio
                administrativo, colocando todos los campos correspondientes sin
                dejar ninguno vacio y mas importante es necesario la contraseña
                antigua para que permita el cambio , una vez llenado todos los
                campos damos click en el boton guardar cambios y si la
                informacion es correcta se habra modificado el nombre de usuario
                y la contraseña con la cual se podra acceder al sitio
                administrativo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
