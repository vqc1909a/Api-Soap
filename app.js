const express = require("express"); 
const axios = require("axios");
const bodyParser = require("body-parser");
const soap = require("soap");

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.static("./public"));
app.use(express.json());

app.post("/conectarse-servicio", async (req, res) => {
    // Ruta Prueba: http://www.dneonline.com/calculator.asmx?WSDL
    // Args Prueba: {
    //     "intA": 2, 
    //     "intB": 3
    // }
    try{
        const {url, args} = req.body;
        const client = await soap.createClientAsync(url, {});
        console.log(client.describe());
        // { RepositionValidatorSOAPBindingQSService:
        //     { RepositionValidatorSOAPBindingQSPort: { repositionValidator: [Object], resetProperties: [Object] } } }
        
        // console.log(client.describe().Calculator.CalculatorSoap.Add);
        // { input: { intA: 's:int', intB: 's:int' }, output: { AddResult: 's:int' } }
  
        // console.log(client.describe().RepositionValidatorSOAPBindingQSService.RepositionValidatorSOAPBindingQSPort.repositionValidator);
        
        // Add: [Function (anonymous)],
        // AddAsync: [Function (anonymous)],
        // Subtract: [Function (anonymous)],
        // SubtractAsync: [Function (anonymous)],
        // Multiply: [Function (anonymous)],
        // MultiplyAsync: [Function (anonymous)],
        // Divide: [Function (anonymous)],
        // DivideAsync: [Function (anonymous)],

        const result = await client.AddAsync(args);
        return res.status(200).send(result);

        // return res.status(200).send("Todo ben")
    }catch(err){
        console.log(err);
        return res.status(500).send(err)
    }
})
  
app.get("/number-to-words", async (req, res) => {
    const body = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
            <ubiNum>500</ubiNum>
            </NumberToWords>
        </soap:Body>
        </soap:Envelope>`

    const {data} = await axios.post("https://www.dataaccess.com/webservicesserver/NumberConversion.wso", body, {
        headers: {
            "Content-Type": "text/xml; charset=utf-8"
        }
    })
    console.log(data);
    // <?xml version="1.0" encoding="utf-8"?>
    // <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    // <soap:Body>
    //     <m:NumberToWordsResponse xmlns:m="http://www.dataaccess.com/webservicesserver/">
    //     <m:NumberToWordsResult>five hundred </m:NumberToWordsResult>
    //     </m:NumberToWordsResponse>
    // </soap:Body>
    // </soap:Envelope>

    return res.status(200).send(data);
})

app.get("/number-to-dolars", async (req, res) => {
    const body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <NumberToDollars xmlns="http://www.dataaccess.com/webservicesserver/">
        <dNum>500</dNum>
        </NumberToDollars>
    </soap:Body>
    </soap:Envelope>`

    const {data} = await axios.post("https://www.dataaccess.com/webservicesserver/NumberConversion.wso", body, {
        headers: {
            "Content-Type": "text/xml; charset=utf-8"
        }
    })
    console.log(data);
    // <?xml version="1.0" encoding="utf-8"?>
    // <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    // <soap:Body>
    //     <m:NumberToDollarsResponse xmlns:m="http://www.dataaccess.com/webservicesserver/">
    //     <m:NumberToDollarsResult>five hundred dollars</m:NumberToDollarsResult>
    //     </m:NumberToDollarsResponse>
    // </soap:Body>
    // </soap:Envelope>
    
    return res.status(200).send(data);
})

// const myService = {
//     MyService: {
//         MyPort: {
//             MyFunctionMultiplicar: function(args) {
//                 console.log(args);
//                 return {
//                     name: args.name
//                 };
//             },

//             // This is how to define an asynchronous function with a callback.
//             MyAsyncFunction: function(args, callback) {
//                 // do some work
//                 callback({
//                     name: args.name
//                 });
//             },

//             // This is how to define an asynchronous function with a Promise.
//             MyPromiseFunction: function(args) {
//                 return new Promise((resolve) => {
//                 // do some work
//                 resolve({
//                     name: args.name
//                 });
//                 });
//             },

//             // This is how to receive incoming headers
//             HeadersAwareFunction: function(args, cb, headers) {
//                 return {
//                     name: headers.Token
//                 };
//             },

//             // You can also inspect the original `req`
//             reallyDetailedFunction: function(args, cb, headers, req) {
//                 console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
//                 return {
//                     name: headers.Token
//                 };
//             }
//         }
//     }
// }

const serviceObject = {
	Calculator: {
		CalculatorSoap: {
			Add: function(args) {
                let primerArgumento = !isNaN(args.intA) ? parseFloat(args.intA) : 0
                let segundoArgumento = !isNaN(args.intB) ? parseFloat(args.intB) : 0
                console.log({                   
                    primerArgumento,    
                    segundoArgumento
                });
				const result = primerArgumento + segundoArgumento + 3;
                return { AddResult : result };
			}       
		},                                                                                                                                                                      
        CalculatorSoap12: {
			Add: function(args) {
                let primerArgumento = isNaN(args.intA) ? parseFloat(args.intA) : 0
                let segundoArgumento = isNaN(args.intB) ? parseFloat(args.intB) : 0
                console.log({                   
                    primerArgumento,    
                    segundoArgumento
                });
				const result = primerArgumento + segundoArgumento + 3;
                return { AddResult : result };
			}
		}
	}
};

const serviceObject2 = {
    Calculator: {
        CalculatorSoap: {
            Add: function(args) {
				const result = args.intA + args.intB + 1;
                return { AddResult : result };
			}       
        },
        CalculatorSoap12: {
            Add: function(args) {
				const result = args.intA + args.intB + 1;
                return { AddResult : result };
			}       
        }
    }
}

//http://172.24.160.134:8080/WsPerfilamientoCliente/wsPerfilamientoCliente
const serviceObject3 = {
    wsPerfilamientoCliente: {
        WsPerfilamientoClientePort: {
            adicionarServicio: function(args){
                let argumentos = args.requestAdicionarServicios;
                let canal = argumentos.canal;
                let cuenta = argumentos.cuenta;
                let itClass = argumentos.itClass;
                let manClass = argumentos.manClass;
                let serial = argumentos.serial;
                let servicio = argumentos.servicio;
                let usuario = argumentos.usuario;

                console.log("Ejecutando función adicionarServicio");
                console.log({
                    canal,
                    cuenta,
                    itClass,
                    manClass,
                    serial,
                    servicio,
                    usuario
                })
                //LOGICA DE NEGOCIO

                //---------------

                return {
                    adicionarResponse: {
                        codigoError: "0",
                        mensajeError: "Esto es un mensaje de error",
                        r15min: "r15min"
                    }
                }
            },
            consultaBiograficos: function(args){
                let tipoDoc = args.tipoDoc;
                let numDoc = args.numDoc;
                console.log("Ejecutando función consultaBiograficos");
                console.log({
                    tipoDoc,
                    numDoc
                })
                //LOGICA DE NEGOCIO

                //---------------

                return {
                    Biograficos: {
                        datosBiograficos: {
                            cuenta: "Mi cuenta",
                            estado: "Mi estado",
                            nombre: "Mi nombre",
                            numDoc: "71067825",
                            segmentoCliente: "Mi segmentoCliente",
                            tipoDoc: "CC",
                            tipoSegmento: "Mi tipoSegmento",
                        },
                        errorService: {
                            codError: "0",
                            msgError: "Esto es un mensaje de error"
                        }
                    }
                }

            },
            consultaDemograficos: function(args){
                let tipoDoc = args.tipoDoc;
                let numDoc = args.numDoc;
                console.log("Ejecutando función consultaDemograficos");
                console.log({
                    tipoDoc,
                    numDoc
                })
                //LOGICA DE NEGOCIO

                //---------------

                return {
                    Demograficos: {
                        datosDemograficos: {
                            ciudad: "Mi ciudad",
                            direccion: "Mi direccion",
                            email: "Mi email",
                            telefono: "Mi telefono",
                        },
                        errorService: {
                            codError: "0",
                            msgError: "Esto es un mensaje de error"
                        }
                    }
                }
            },
            consultaProductos: function(args){
                let tipoDoc = args.tipoDoc;
                let numDoc = args.numDoc;
                console.log("Ejecutando función consultaProductos");
                console.log({
                    tipoDoc,
                    numDoc
                })
                //LOGICA DE NEGOCIO

                //---------------

                return {
                    Productos: {
                        errorService: {
                            codError: "0",
                            msgError: "Esto es un mensaje de error"
                        },
                        productosYServicios: {
                            cantidadServicios: "Mi cantidadServicios",
                            cicloFacturacion: "Mi cicloFacturacion",
                            cmf: "Mi cmf",
                            codigoError: "0",
                            cuenta: "Mi cuenta",
                            descripcionTarifa: "Mi descripcionTarifa",
                            direccionPrincipal: "Mi direccionPrincipal",
                            fechaActivacion: "Mi fechaActivacion",
                            listadoInventarios: {
                                inventarios: {
                                    itemClass: "Mi itemClass",
                                    manufactureClass: "Mi manufactureClass",
                                    serial: "Mi serial"
                                }
                            },
                            mensajeError: "Este es un mensaje de error",
                            serviciosAdicionales: "Mi serviciosAdicionales",
                            serviciosDisponibles: "Mi serviciosDisponibles",
                            serviciosPrincipales: "Mi serviciosPrincipales",
                            tipoRed: "Mi tipoRed",
                            tipoServicio: "Mi tipoServicio",
                            ultimaFactura: "Mi ultimaFactura",
                        }
                    }
                }
            },
            consultaProductosListados: function(args){
                let tipoDoc = args.tipoDoc;
                let numDoc = args.numDoc;
                console.log("Ejecutando función consultaProductosListados");
                console.log({
                    tipoDoc,
                    numDoc
                })
                //LOGICA DE NEGOCIO

                //---------------

                return {
                    ProductosListado: {
                        errorService: {
                            codError: "0",
                            msgError: "Esto es un mensaje de error"
                        },
                        productosYServiciosLista: {
                           codigoError: "0", 
                           listadoProductos: {
                                cantidadServicios: "Mi cantidadServicios",
                                cicloFacturacion: "Mi cicloFacturacion",
                                cmf: "Mi cmf",
                                cuenta: "Mi cuenta",
                                descripcionTarifa: "Mi descripcionTarifa",
                                direccionPrincipal: "Mi direccionPrincipal",
                                fechaActivacion: "Mi fechaActivacion",
                                listadoInventarios: {
                                    inventarios: {
                                        itemClass: "Mi itemClass",
                                        manufactureClass: "Mi manufactureClass",
                                        serial: "Mi serial",
                                    }
                                },
                                serviciosAdicionales: "Mis serviciosAdicionales", 
                                serviciosDisponibles: "Mis serviciosDisponibles", 
                                serviciosPrincipales: "Mis serviciosPrincipales", 
                                tipoRed: "Mi tipoRed", 
                                tipoServicio: "Mi tipoServicio", 
                                ultimaFactura: "Mi ultimaFactura", 
                           },
                           mensajeError: "Esto es un mensaje de error" 
                        }
                    }
                }
            },
            descripcionServiciosListado: function(args){
                let cuenta = args.cuenta;
                console.log("Ejecutando función descripcionServiciosListado");
                console.log({
                    cuenta
                })
                //LOGICA DE NEGOCIO

                //---------------

                return {
                    descripcionServiciosListado: {
                        descripcionServicios: {
                            codError: "0", 
                            cuenta: "Mi cuenta", 
                            descAdicionales: {
                                descripcionAdicionales: {
                                    codigoServicio: "Mi codigo de servicio",
                                    descripcionServicio: "Mi descripcion de servicio"
                                }
                            }, 
                            descDisponibles: {
                                descripcionDisponibles: {
                                    codigoServicio: "Mi codigo de servicio",
                                    descripcionServicio: "Mi descripcion de servicio",
                                }
                            }, 
                            descPrincipales: {
                                descripcionPrincipales: {
                                    codigoServicio: "Mi codigo de servicio",
                                    descripcionServicio: "Mi descripcion de servicio",
                                }
                            }, 
                            mesError: "Esto es un mensaje de error", 
                        },
                        errorService: {
                            codError: "0",
                            msgError: "Esto es un mensaje de error"
                        },
                    }
                }
            },

            resetPropiedades: function(args){
                let usuario = args.usuario;
                let psw = args.psw;
                console.log("Ejecutando función resetPropiedades");
                console.log({
                    usuario,
                    psw
                })
                //LOGICA DE NEGOCIO

                //---------------
                return {return: "Mi return"}
            }
        }
    }
}

// Ruta: http://localhost:4000/wsdl?wsdl
const xml = require("fs").readFileSync("./calculator_prueba.xml", "utf8");

// Ruta: http://localhost:4000/wsdl2?wsdl
const xml2 = require("fs").readFileSync("./calculator_original.xml",  "utf8");

// Ruta: http://localhost:4000/wsdl3?wsdl
const xml3 = require("fs").readFileSync("./wsPerfilamientoCliente.xml",  "utf8");

app.use(bodyParser.raw({type: function(){return true;}, limit: '100mb'}));
app.listen(4000, function(){

    soap.listen(app, "/wsdl", serviceObject, xml, function(){
        console.log("Server initialized");
    })
    soap.listen(app, "/wsdl2", serviceObject2, xml2, function(){
        console.log("Server initialized 2");
    })
    soap.listen(app, "/wsdl3", serviceObject3, xml3, function(){
        console.log("Server initialized 3");
    })
})





// app.listen(PORT, () => {
//     console.log(`Server run on port ${PORT}`)
// })

