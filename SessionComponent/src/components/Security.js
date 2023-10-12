class Security {
  //Preguntar acerca de la RUTA de Objetos de Negocio
  constructor({ controller, pathBO }) {
    this.controller = controller;
    this.pathBO = pathBO;
    this.permissions = new Map();

    //Mejor que al instanciar usemos este metodo, asi nos aseguramos que tengamos el await
    this.loadPermissions();
  }

  loadPermissions = async () => {
    //Esto es por si intentan llamarlo
    if (this.permissions.size > 0) return;

    const permisos = await this.controller.obtenerPermisos();
    this.#putPermissionsMap({ permisos });

    return;
  };

  #verifyLoadPermissions = async () => {
    if (this.permissions.size === 0) {
      console.log("Esperando cargar servicios");
      await this.loadPermissions();
      return true;
    }
    return;
  };

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

  #reloadPermission = async () => {
    this.permissions.clear();
    await this.loadPermissions();
    return true;
  };

  hasPermission = async ({ profile, area, object, method }) => {
    await this.#verifyLoadPermissions();
    // Aqui hay que revisar el mapa y luego encontrar si tiene coincidencia, para devolver true o false

    const permiso = this.permissions
      .get(profile)
      [area][object].includes(method);

    return permiso ? true : false;
  };

  executeMethod = async ({ area, object, method, params = [] }) => {
    try {
      const path = `${this.pathBO}/${area}/${object}.js`;
      const module = await import(path);
      const moduleReady = module.default ?? module[object];
      //Revisar que si tiene constructor con parametros va a dar error
      const obj = new moduleReady();

      //Permite saber si el metodo sera o no static
      const metodoAEjecutar = obj[method] ?? moduleReady[method];

      //Revisar que si son parametros con objeto dara error
      const methodResult = await metodoAEjecutar(...params);
      return methodResult;
    } catch (error) {
      console.error(`Existio un error ${error}`);
    }
  };

  #verifyMethod = async ({ area, object, method }) =>
    await this.controller.verifyMethod({ area, object, method });

  #verifyProfile = async ({ profile }) =>
    await this.controller.verifyProfile({ profile });

  #addPermission = async ({ idProfile, idMethod, profile, method }) => {
    const execute = await this.controller.addPermission({
      idProfile,
      idMethod,
    });
    this.permissions.get(profile)[area][object].push(method);
    return execute;
  };

  #removePermission = async ({ idProfile, idMethod, profile, method }) => {
    const execute = await this.controller.removePermission({
      idProfile,
      idMethod,
    });

    const indiceBorrar = this.permissions
      .get(profile)
      [area][object].indexOf(method);

    if (indiceBorrar === -1) return false;
    this.permissions.get(profile)[area][object].splice(indiceBorrar, 1);
    return execute;
  };

  setPermission = async ({ area, object, method, profile, status }) => {
    //Establecer un update a la BDD y en el mapa para cambiar esto
    const [methodExist] = await this.#verifyMethod({ area, object, method });
    if (!methodExist) return false;
    const idMethod = methodExist.id_method;

    const [profileExist] = await this.#verifyProfile({ profile });
    if (!profileExist) return false;
    const idProfile = profileExist.id_profile;

    return status
      ? await this.#addPermission({ idProfile, idMethod, profile, method })
      : await this.#removePermission({ idProfile, idMethod, profile, method });
  };

  blockProfile = async ({ profile }) => {
    //Establecemos que un perfil no pueda hacer nada
    const [profileExist] = await this.#verifyProfile({ profile });
    if (!profileExist) return false;
    const idProfile = profileExist.id_profile;

    const execute = await this.controller.blockProfile({ idProfile });

    //Aqui hay que borrar del mapa
    this.permissions.set(profile, {});
    return execute;
  };

  #blockMethodMap = ({ method }) => {
    this.permissions.forEach((profile) => {
      for (const key in profile) {
        for (const key2 in profile[key]) {
          const indexBorrar = profile[key][key2].indexOf(method);
          if (indexBorrar !== -1) {
            profile[key][key2].splice(indexBorrar, 1);
          }
        }
      }
    });
  };

  blockMethod = async ({ area, object, method }) => {
    //Establecemos que un metodo no pueda ser ejecutado
    const [methodExist] = await this.#verifyMethod({ area, object, method });
    if (!methodExist) return false;
    const idMethod = methodExist.id_method;

    const execute = await this.controller.blockMethod({ idMethod });

    //Aqui hay que borrar del mapa
    this.#blockMethodMap({ method });

    return execute;
  };
}

export default Security;
