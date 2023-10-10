class Security {
  constructor({ controller, pathBO }) {
    this.controller = controller;
    this.pathBO = pathBO;
    this.permissions = null;

    //TODO: Preguntar sobre esto, ya que no estoy esperando que cree nada
    //Mejor que al instanciar usemos este metodo, asi nos aseguramos que tengamos el await
    this.loadPermissions();
  }

  hasPermission = async ({ profile, area, object, method }) => {
    // Aqui hay que revisar el mapa y luego encontrar si tiene coincidencia, para devolver true o false
  };

  executeMethod = async ({ area, object, method, params = [] }) => {
    // const path = `${this.pathBO}/${area}/${object}.js`;
    // const module = await import(path);
    // const obj = new (module.default ?? module[object])();
    // const methodResult = await obj[method](...params);
    // return methodResult;

    //* Otra manera es directamente usando la clase Reflect
    // const obj = Reflect.construct(await import(path)[object], []);
    // const result = await obj[method](...params);
    // * O tambien puedo usar Reflect.apply
    // const result = Reflect.apply(obj[method], obj, params)
    // return result;
  };

  // TODO: Ver que hace esto
  sendToClient = () => {};

  loadPermissions = async () => {
    const permisos = await this.controller.obtenerPermisos();
    //Aqui falta convertirlo en mapa
    this.permissions = permisos;
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
