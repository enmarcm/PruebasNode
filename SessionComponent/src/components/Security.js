class Security {
  //Preguntar acerca de la RUTA de Objetos de Negocio
  constructor({ controller, pathBO }) {
    this.controller = controller;
    this.pathBO = pathBO;
    this.permissions = new Map();

    //TODO: Preguntar sobre esto, ya que no estoy esperando que cree nada
    //Mejor que al instanciar usemos este metodo, asi nos aseguramos que tengamos el await
    this.loadPermissions();
  }

  #verifyLoadPermissions = async () => {
    if (this.permissions.size === 0) {
      console.log("Esperando cargar servicios");
      await this.loadPermissions();
      return true;
    }
    return;
  };

  hasPermission = async ({ profile, area, object, method }) => {
    await this.#verifyLoadPermissions();
    // Aqui hay que revisar el mapa y luego encontrar si tiene coincidencia, para devolver true o false

    const permiso = this.permissions.get(profile)[area][object].includes(method);

    return permiso ? true : false;
  };

  executeMethod = async ({ area, object, method, params = [] }) => {
    const path = `${this.pathBO}/${area}/${object}.js`;
    const module = await import(path);
    const moduleReady = module.default ?? module[object]
    //Revisar que si tiene constructor va a dar error
    const obj = new moduleReady();

    //Permite saber si el metodo sera o no static
    const metodoAEjecutar = obj[method] ?? moduleReady[method]

    const methodResult = await metodoAEjecutar(...params) ;
    return methodResult;

    //* Otra manera es directamente usando la clase Reflect
    // const obj = Reflect.construct(await import(path)[object], []);
    // const result = await obj[method](...params);
    // * O tambien puedo usar Reflect.apply
    // const result = Reflect.apply(obj[method], obj, params)
    // return result;
  };

  // TODO: Ver que hace esto
  sendToClient = () => {};

  #putPermissionsMap = ({ permisos }) => {
    //Aqui ya tengo clara mi estructura, por eso, voy verificando si cada una de las partes existe, si no la creo, para al final pushear los emtodos que es el unico array
    const result = permisos.reduce((acc, permiso) => {
      const { profile, object, method, area } = permiso;
      acc[profile] = acc[profile] || {};
      acc[profile][area] = acc[profile][area] || {};
      acc[profile][area][object] = acc[profile][area][object] || [];
      acc[profile][area][object].push(method);
      return acc;
    }, {});

    for (const profile in result) {
      const porArea = result[profile];
      this.permissions.set(profile, porArea);
    }
    return;
  };

  loadPermissions = async () => {
    //Esto es por si intentan llamarlo
    if (this.permissions.size > 0) return;

    const permisos = await this.controller.obtenerPermisos();
    this.#putPermissionsMap({ permisos });
    return;
  };

  reloadPermission = async () => {
    this.permissions.clear();
    await this.loadPermissions();
    return true;
  };

  setPermission = async ({ area, object, method, profile, status }) => {
    //Establecer un update a la BDD y en el mapa para cambiar esto
  };

  blockProfile = async ({ profile }) => {
    //Establecemos que un perfil no pueda hacer nada
  };

  blockMethod = async ({ area, object, method }) => {
    //Establecemos que un metodo no pueda ser ejecutado
  };
}

export default Security;
