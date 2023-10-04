const objConfig = {
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
      httpOnly: false,
      secure: false
    },
    rolling: true
  };
  
export default objConfig