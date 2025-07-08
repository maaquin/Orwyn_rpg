export const mapaData = [
    {
        coordinate: "1,1",
        descripcion: "cielo, horizonte",
        terrain: "cielo"
    },
    {
        coordinate: "2,1",
        descripcion: "cielo, horizonte",
        terrain: "cielo"
    },
    {
        coordinate: "3,1",
        descripcion: "cielo, horizonte",
        terrain: "cielo"
    },
    {
        coordinate: "4,1",
        descripcion: "cielo, horizonte",
        terrain: "cielo"
    },
    {
        coordinate: "5,1",
        descripcion: "cielo, horizonte",
        terrain: "cielo"
    },
    {
        coordinate: "6,1",
        descripcion: "cielo, horizonte",
        terrain: "cielo"
    },
    {
        coordinate: "7,1",
        descripcion: "cielo, horizonte",
        terrain: "cielo"
    },
    {
        coordinate: "8,1",
        descripcion: "Cima del Monte Ardak. Volcán activo del noreste. Siempre humeante",
        terrain: "volcán"
    },
    {
        coordinate: "9,1",
        descripcion: "cielo, horizonte",
        terrain: "cielo"
    },
    {
        coordinate: "10,1",
        descripcion: "cielo, horizonte",
        terrain: "cielo"
    },


    {
        coordinate: "1,2",
        descripcion: "Cordillera de Thaldoren. Pico nevado y frío perpetuo.",
        terrain: "montaña"
    },
    {
        coordinate: "2,2",
        descripcion: "Entrada a la mina abandonada de Miokonos. Antiguo complejo minero enano. Abandonado sin explicación. Aquí también nace el río Gonia",
        terrain: "montaña",
        structure: [{ name: "la mina abandonada de Miokonos", key: "abandoned_mine" }]
    },
    {
        coordinate: "3,2",
        descripcion: "Camino empedrado entre picos enanos. Senda de vigía.",
        terrain: "montaña"
    },
    {
        coordinate: "4,2",
        descripcion: "Fontera entre la Corillera Thaldoren y las planicies",
        terrain: "montaña"
    },
    {
        coordinate: "5,2",
        descripcion: "Oeste del bosque fúngico de Fungarlith. Región húmeda con flora fúngica. Setas gigantes. Brillo azul.",
        terrain: "bosque de hongos y setas"
    },
    {
        coordinate: "6,2",
        descripcion: "Al norte planicie con rocas y árboles sueltos. Al sur, más adentrados en el bosque  Fungarlith el inicio del mágico pueblo Myrrwood habitado por duendes y gnomos",
        terrain: "bosque de hongos y setas / planicie"
    },
    {
        coordinate: "7,2",
        descripcion: "Noreste del bosque fúngico de Fungarlith. se dice que en la penumbra de la noche solo la bioluminicencia de los hongos y setas iluminan el bosque",
        terrain: "bosque de hongos y setas"
    },
    {
        coordinate: "8,2",
        descripcion: "Pendiente del Monte Ardak. Actividad sísmica.",
        terrain: "volcán"
    },
    {
        coordinate: "9,2",
        descripcion: "Falda del Monte Ardak. Volcán activo del noreste. Siempre humeante. Criaturas ígneas habitan en su interior.",
        terrain: "volcán"
    },
    {
        coordinate: "10,2",
        descripcion: "Terreno volcánico del Monte Ardak. Grietas con vapor ígneo.",
        terrain: "volcán"
    },


    {
        coordinate: "1,3",
        descripcion: "Cordillera escarpada. Picos de Thaldoren. Águilas vigías.",
        terrain: "montaña"
    },
    {
        coordinate: "2,3",
        descripcion: "Meseta alta. Mirador natural de la región.",
        terrain: "montaña"
    },
    {
        coordinate: "3,3",
        descripcion: "Paso montañoso entre Thaldoren y la Mina Abandonada de Miokonos. separa la cordillera por el río Gonia.",
        terrain: "montaña / río"
    },
    {
        coordinate: "4,3",
        descripcion: "Al suroeste el río Gonia. Al este el inicio de la meseta Elyndor.",
        terrain: "río / meseta"
    },
    {
        coordinate: "5,3",
        descripcion: "Frontera entre la meseta Elyndor y el fúngico y misterioso bosque Fungarlith.",
        terrain: "bosque de hongos y setas / planicie"
    },
    {
        coordinate: "6,3",
        descripcion: "Fungarlith central. Setas gigantes. Brillo azul. El bosque Fungarlith en todo su esplendor. También se vislumbra el oeste del misterioso pueblo Myrrwood, hogar de duendes y gnomos.",
        city: "Myrrwood",
        terrain: "bosque de hongos y setas / ciudad / comuna",
        structure: [
            {
                name: "el restaurante La Sopa de Hongos",
                key: "restaurant"
            },
            {
                name: "la tienda El Brote del Bosque",
                key: "store"
            },
            {
                name: "la tienda rúnica Hojas del Recuerdo",
                key: "magic_store"
            }
        ]
    },
    {
        coordinate: "7,3",
        descripcion: "Entrda del bosque Fungarlith en el sur. Este del pueblo Myrrwood. Casas seta. Puentes vivos.",
        city: "Myrrwood",
        terrain: "bosque de hongos y setas / ciudad / comuna",
        structure: [
            {
                name: "el centro de sanación",
                key: "healing_center"
            },
            {
                name: "la casa comunal",
                key: "community_center"
            }
        ]
    },
    {
        coordinate: "8,3",
        descripcion: "Valle erosionado. Arena fina y restos óseos.",
        terrain: "planicie rocosa",
    },
    {
        coordinate: "9,3",
        descripcion: "Laderas del Monte Ardak. Suelo inestable.",
        terrain: "planicie rocosa / volcán",
    },
    {
        coordinate: "10,3",
        descripcion: "Abismo ardiente dentro del Monte Ardak. Custodiado por salamandras ígneas que protegen un antiguo corazón de fuego.",
        terrain: "planicie rocosa / volcán",
        structure: [{ name: "el Abismo Ardak", key: "temple_fire" }]
    },


    {
        coordinate: "1,4",
        descripcion: "Ciudadela de Drakmir. Túneles secretos y forjas antiguas.",
        city: "Drakmir",
        terrain: "desierto / ciudad / comercial",
        structure: [
            {
                name: "la taberna la arena y el acero",
                key: "tavern"
            },
            {
                name: "la tienda general ojos del desierto",
                key: "store"
            },
            {
                name: "la posada la sombra del sol",
                key: "inn"
            },
            {
                name: "el mercado de especias",
                key: "market"
            }
        ]
    },
    {
        coordinate: "2,4",
        descripcion: "Palacio real de Drakmir. Excavado en piedra roja. Hogar del los líderes enanos y secretos de sangre.",
        city: "Drakmir",
        terrain: "desierto / ciudad / capitolio",
        structure: [
            {
                name: "el palacio de arena rojiza",
                key: "palace"
            },
            {
                name: "el consejo de las dunas",
                key: "palace"
            }
        ]
    },
    {
        coordinate: "3,4",
        descripcion: "Puente de las dunas. Puente de piedra milenario que cruza el río Erial entre el desierto de Thar-Zuun y la planicie de Elyndor. Al oeste del puente se alcanza a ver la entrada de Drakmir",
        terrain: "desierto / río / planicie",
        structure: [{ name: "el puente de las dunas", key: "cobblestone_bridge" }]
    },
    {
        coordinate: "4,4",
        descripcion: "Cascada majestuosa del río Gonia. Decenas de turistas de diferentes razas viajan hasta aqui solo para admirar su majestuosidad",
        terrain: "cascada / planicie",
    },
    {
        coordinate: "5,4",
        descripcion: "Ciudadela de Valdoren, capital del reino de Orwyn. Centro político, comercial y cultural. El río Gonia pasa entre casas de Valdoren, prohibido bañarse en el río",
        city: "Valdoren",
        terrain: "planicie / río / ciudad / ciudadela",
        structure: [
            {
                name: "la taberna el dragón dorado",
                key: "tavern"
            },
            {
                name: "la posada la media luna",
                key: "inn"
            },
            {
                name: "la tienda de armas el yunque de Brann",
                key: "weapon_store"
            },
            {
                name: "la tienda mágica el reflejo de arcana",
                key: "magic_store"
            },
            {
                name: "la tienda el bazar del viajero",
                key: "store"
            }
        ]
    },
    {
        coordinate: "6,4",
        descripcion: "Castillo real de Valdoren. hogar de la alta nobleza de Orwyn. Fortificada, gótica, con puentes de piedra y canales.",
        city: "Valdoren",
        terrain: "planicie / ciudad / castillo",
        structure: [
            {
                name: "el castillo de Valdoren",
                key: "castle"
            },
            {
                name: "el templo de la luz ancestral",
                key: "temple"
            },
            {
                name: "la plaza central de los héroes",
                key: "plaza"
            },
            {
                name: "el cuartel de la guardia real",
                key: "barracks"
            }
        ]

    },
    {
        coordinate: "7,4",
        descripcion: "Sendero entre la planicie. Al norte se dirige al bosque de Fungarlith, donde se encuentra el pueblo de Myrrwood. Al suroeste se encuentra el centro del reino",
        terrain: "planicie / sendero rocoso",
    },
    {
        coordinate: "8,4",
        descripcion: "Páramo de ceniza. Se puede observar la cima del monte Ardak. Transición a la planicie. Se pueden encontrar diversas pidras por el terreno.",
        terrain: "planicie rocosa / volcán",
    },
    {
        coordinate: "9,4",
        descripcion: "Páramo de ceniza. Se puede observar la cima del monte Ardak. Transición a la planicie.",
        terrain: "planicie rocosa / volcán",
    },
    {
        coordinate: "10,4",
        descripcion: "Borde oriental de Altheria. Terreno brumoso.",
        terrain: "planicie rocosa / volcán",
    },


    {
        coordinate: "1,5",
        descripcion: "Arena del desierto de Thar-Zuun. Calor seco y vientos antiguos.",
        terrain: "desierto",
    },
    {
        coordinate: "2,5",
        descripcion: "Dunas del desierto. Arena movediza.",
        terrain: "desierto",
    },
    {
        coordinate: "3,5",
        descripcion: "Ribera y pequeña cascada del río Erial. Afluente seco y traicionero.",
        terrain: "desierto / cascada / planicie",
    },
    {
        coordinate: "4,5",
        descripcion: "Planicie de Elyndor. Al sur el inicio del bosque de Altheria",
        terrain: "planicie",
    },
    {
        coordinate: "5,5",
        descripcion: "Camino entre la planicie de Elyndor. Al oeste el desierto de Thar-Zuun",
        terrain: "planicie / sendero",
    },
    {
        coordinate: "6,5",
        descripcion: "Puente del alba. Puente de madera que conecta el corazón del reino con Valdoren, cruzando el inicio del Lago Virell.",
        terrain: "planicie / lago",
        structure: [{ name: "el puente del alba", key: "wooden_bridge" }]
    },
    {
        coordinate: "7,5",
        descripcion: "Sendero entre la planicie Y grandes rocas. Al oeste el puente de Valdoren. Al oeste el pueblo de Nymbria",
        terrain: "planicie rocosa / sendero",
    },
    {
        coordinate: "8,5",
        descripcion: "Camino por la planicie Y grandes rocas. Al oeste el puente de Valdoren. Al suroeste el pueblo de Nymbria",
        terrain: "planicie rocosa / sendero",
    },
    {
        coordinate: "9,5",
        descripcion: "Páramo de ceniza. Se puede observar la cima del monte Ardak. Transición a la planicie.",
        terrain: "planicie rocosa",
    },
    {
        coordinate: "10,5",
        descripcion: "Borde oriental de Altheria. Terreno brumoso.",
        terrain: "planicie rocosa",
    },


    {
        coordinate: "1,6",
        descripcion: "Centro árido de Thar-Zuun. Eco de ruinas olvidadas.",
        terrain: "desierto",
    },
    {
        coordinate: "2,6",
        descripcion: "Centro de Thar-Zuun. Tótems semi enterrados. Al este el río Erial",
        terrain: "desierto / río",
    },
    {
        coordinate: "3,6",
        descripcion: "Borde de la planicie Elyndor. Al oeste el río Erial. Al este el bosque de Altheria",
        terrain: "río / planicie / bosque",
    },
    {
        coordinate: "4,6",
        descripcion: "Altheria. Árboles sabios y susurros mágicos.",
        terrain: "bosque",
    },
    {
        coordinate: "5,6",
        descripcion: "Puentes naturales de raíces en el denso bosque de Altheria. Aroma limpio. Criaturas mágicas.",
        terrain: "bosque",
    },
    {
        coordinate: "6,6",
        descripcion: "Al oeste, límite norte del lago Virell. Aguas tranquilas. Al este Comienzo del bosque Altheria. En el centro un pasillo despejado.",
        terrain: "bosque / planicie / lago",
    },
    {
        coordinate: "7,6",
        descripcion: "Isla Viviente de Nareen. Solo aparece en luna llena. En el centro del Lago Virell. Se mueve lentamente y su superficie está cubierta de árboles.",
        terrain: "lago",
        structure: [{ name: "la isla viviente de Nareen", key: "island" }]
    },
    {
        coordinate: "8,6",
        descripcion: "Borde y costa del lago Virell. Muy frecuentado por turistas.",
        terrain: "lago / planicie"
    },
    {
        coordinate: "9,6",
        descripcion: "Sendero norte de Nymbria. Camino comercial costero. Área de cultivo del pueblo. Un Santuario tradicional Nymbrio ocupa el lugar.",
        city: "Nymbria",
        terrain: "planicie / ciudad / comercial",
        structure: [
            {
                name: "el santuario de las mareas",
                key: "sanctuary"
            },
            {
                name: "la gran plaza central",
                key: "plaza"
            }
        ]

    },
    {
        coordinate: "10,6",
        descripcion: "Borde oriental de Altheria. Planicie con pocos montículos.",
        terrain: "planicie / montículos",
    },


    {
        coordinate: "1,7",
        descripcion: "Dunas altas del desierto de Thar-Zuun. Imponentes vistas.",
        terrain: "desierto",
    },
    {
        coordinate: "2,7",
        descripcion: "Donde el desierto de Thar-Zuun se encuentra con la planicie de Elyndor, separados por el río Erial.",
        terrain: "desierto / río / planicie",
    },
    {
        coordinate: "3,7",
        descripcion: "Borde de la planicie Elyndor. Al este el bosque de Altheria",
        terrain: "planicie / bosque",
    },
    {
        coordinate: "4,7",
        descripcion: "Altheria. Árboles de tronco negro y frondosas hojas verde oscuro. Elegantes y susurros mágicos.",
        terrain: "bosque",
    },
    {
        coordinate: "5,7",
        descripcion: "Entrada al santuario de Jade Raen. Oculto entre raíces gigantes en Altheria. Monumento antiguo con inscripciones élficas olvidadas.",
        terrain: "bosque",
        structure: [{ name: "el Santuario de Jade Rean", key: "temple_wooden" }]
    },
    {
        coordinate: "6,7",
        descripcion: "Monolito de Sylvareth. Cumbre de una montaña dentro del bosque de Altheria. Monumento de piedra tallado en una lengua élfica ancestral ya olvidada. Resguarda un secreto vinculado al equilibrio del bosque.",
        terrain: "bosque / pico de montaña",
        structure: [
            {
                name: "el monolito de Sylvareth",
                key: "monolith"
            }
        ]
    },
    {
        coordinate: "7,7",
        descripcion: "Altheria. Árboles de corteza negra. Lago Virell al noreste",
        terrain: "bosque / planicie / lago",
    },
    {
        coordinate: "8,7",
        descripcion: "Costa Sur de Nymbria. Puerto marítimo hacia el lago Virell. Remolinos y reflejos. Camino comercial costero.",
        terrain: "lago",
    },
    {
        coordinate: "9,7",
        descripcion: "Ciudadela de Nymbria. Pueblo anfibio costero. Habitantes con escamas iridiscentes. Construcciones rurales pesqueras.",
        city: "Nymbria",
        terrain: "planicie / lago / ciudad / portuario",
        structure: [
            {
                name: "el puerto de Nymbria",
                key: "port"
            },
            {
                name: "el sector de cultivos",
                key: "farmland"
            },
            {
                name: "las barracas de los pescadores",
                key: "fisher_barracks"
            },
            {
                name: "el molino de la plaza",
                key: "windmill"
            }
        ]
    },
    {
        coordinate: "10,7",
        descripcion: "Borde oriental de Nymbria. Comercios con producto marítimo abunda en este macro mercado portual",
        terrain: "planicie / ciudad / comercial",
        city: "Nymbria",
        structure: [
            {
                name: "la posada brisa del mar",
                key: "inn"
            },
            {
                name: "la taberna el kraken azul",
                key: "tavern"
            },
            {
                name: "la tienda de armas el acantilado",
                key: "weapon_store"
            }
        ]
    },


    {
        coordinate: "1,8",
        descripcion: "Dunas altas del desierto de Thar-Zuun. A lo lejos puede verse el contorno de unas ruinas antiguas que emergen y desaparecen entre la arena.",
        terrain: "desierto",
    },
    {
        coordinate: "2,8",
        descripcion: "Cresta de vientos en Thar-Zuun. Arena constante en movimiento. Muy al sur se alzan pirámides semi enterradas, columnas caídas, y un pilar destruido",
        terrain: "desierto",
    },
    {
        coordinate: "3,8",
        descripcion: "Donde el desierto de Thar-Zuun se encuentra con la planicie de Elyndor, separados por el río Erial.",
        terrain: "desierto / desierto / planicie",
    },
    {
        coordinate: "4,8",
        descripcion: "Bosque ralo. Transición a la planicie. Al oeste el río Erial y el desierto Thar-Zuun. Al noreste Altheria",
        terrain: "planicie / bosque",
    },
    {
        coordinate: "5,8",
        descripcion: "Altheria denso. Niebla violeta. Camino a Sylvareth.",
        terrain: "bosque",
    },
    {
        coordinate: "6,8",
        descripcion: "Sendero pedregoso del monticulo de tierra donde el Monolito de Sylvareth se erige en la cima. La pendiente se empina hacia la cumbre, donde asoma la silueta lejana del Monolito de Sylvareth. El aire se torna denso",
        terrain: "bosque / montaña",
    },
    {
        coordinate: "7,8",
        descripcion: "Zona oriental de Sylvareth. Plataforma elevada con salida hacia el sendero del Monolito de Sylvareth. Raíces entrelazadas forman el inicio del ascenso. Ambiente sereno y espiritual.",
        city: "Sylvareth",
        terrain: "bosque / ciudad / ciudadela",
        structure: [
            {
                name: "la escuela de magia Sylvana",
                key: "magic_school"
            },
            {
                name: "las casas residenciales élficas",
                key: "restaurant"
            }
        ]

    },
    {
        coordinate: "8,8",
        descripcion: "Zona occidental de Sylvareth. Camino descendente hacia la salida del bosque de Altheria. Conecta con el puente de Valdoren, que lleva a la ciudad anfibia de Nymbria.",
        city: "Sylvareth",
        terrain: "bosque / ciudad / ciudadela",
        structure: [
            {
                name: "la plaza de los cantos antiguos",
                key: "plaza"
            },
            {
                name: "la tienda de magia y hechicería Sir Lancelot",
                key: "magic_store"
            }
        ]

    },
    {
        coordinate: "9,8",
        descripcion: "Puente del viejo sauce. Puente de madera que conecta el corazón del reino con Valdoren, cruzando el inicio del Lago Virell. Al oeste el bosque élfico de Altheria y su poblado Sylvareth. Al este la ciudad anfibia de Nymbria.",
        terrain: "bosque / río / planicie",
        structure: [{ name: "el puente del viejo sauce", key: "wooden_bridge" }]
    },
    {
        coordinate: "10,8",
        descripcion: "Extremo de Nymbria. Corrientes tibias. Aguas tranquilas. Transición del Lago y el río Gonia",
        terrain: "planicie / río",
    },


    {
        coordinate: "1,9",
        descripcion: "Elevación rocosa en medio de las dunas. Silencio absoluto. Al este, una figura pétrea emerge entre las brumas cálidas: las Ruinas de Zepharos",
        terrain: "desierto",
    },
    {
        coordinate: "2,9",
        descripcion: "Ruinas de Zepharos. Columnas fantasmales visibles al alba. Solo visibles al alba, entre las dunas de Thar-Zuun.",
        terrain: "desierto",
        structure: [{ name: "las Ruinas de Zepharos", key: "temple_desert" }]
    },
    {
        coordinate: "3,9",
        descripcion: "Cruce olvidado de caravanas. Viejas marcas de ruedas aún visibles. Desde aquí, se vislumbra la cúspide de unas antiguas pirámides de piedra dorada, rodeadas de pilares",
        terrain: "desierto",
    },
    {
        coordinate: "4,9",
        descripcion: "Donde el desierto de Thar-Zuun se encuentra con la planicie de Elyndor, separados por el río Erial.",
        terrain: "desierto / río / planicie",
    },
    {
        coordinate: "5,9",
        descripcion: "Tierra abierta de Elyndor. Ligeras ondulaciones. Césped seco y viento constante",
        terrain: "planicie / árboles sueltos / montículos",
    },
    {
        coordinate: "6,9",
        descripcion: "Camino elevado hacia Altheria. Luz tenue. Al sur planicie. Al norte Altheria",
        terrain: "planicie / árboles sueltos / bosque",
    },
    {
        coordinate: "7,9",
        descripcion: "Al extremo norte empieza Silvareth, ciudad élfica entre ramas. Borde del bosque de Altheria. Transición a Elyndor.",
        terrain: "planicie / árboles sueltos / bosque",
    },
    {
        coordinate: "8,9",
        descripcion: "Ciudad élfica oculta. Sylvareth termina aquí. Límite del bosque de Altheria. Transición a la planicie de Elyndor.",
        city: "Sylvareth",
        terrain: "bosque / ciudad / acrópolis",
        structure: [
            {
                name: "el palacio real",
                key: "palace"
            },
            {
                name: "el templo lunar de Éleath",
                key: "temple"
            },
            {
                name: "el archivo de runas y hechizos",
                key: "archive"
            }
        ]

    },
    {
        coordinate: "9,9",
        descripcion: "Altheria. Ramas entrelazadas, hogar de hadas. Borde oriental del bosque. Humedad alta.",
        terrain: "bosque / planicie"
    },
    {
        coordinate: "10,9",
        descripcion: "Desembocadura del río Gonia. Agua estancada entre pasto bajo. Inicio de terreno árido",
        terrain: "planicie / río / planicie"
    },


    {
        coordinate: "1,10",
        descripcion: "Paso estrecho entre dunas encrespadas. Difícil de transitar. Se abre una vista clara hacia Zepharos: los restos de una civilización envueltos en misterio y luz tenue.",
        terrain: "desierto"
    },
    {
        coordinate: "2,10",
        descripcion: "Promontorio arenoso conocido como la Lengua del Sol. Desde su cima, las ruinas se revelan brevemente: una ciudad angular semi devorada por el desierto",
        terrain: "desierto"
    },
    {
        coordinate: "3,10",
        descripcion: "Orilla final del desierto. Tierra agrietada.",
        terrain: "desierto"
    },
    {
        coordinate: "4,10",
        descripcion: "Fin del río Erial. Corriente se desvanece en la planicie. Lecho húmedo y poco profundo",
        terrain: "río / planicie"
    },
    {
        coordinate: "5,10",
        descripcion: "Extensión plana. Rocas dispersas y árboles solitarios. Horizonte amplio",
        terrain: "planicie / árboles sueltos / montículos",
    },
    {
        coordinate: "6,10",
        descripcion: "Planicie despejada. Suelo firme con parches de hierba baja. Sin coberturas naturales.",
        terrain: "planicie / árboles sueltos / montículos",
    },
    {
        coordinate: "7,10",
        descripcion: "Colina baja. Vista parcial del bosque de Altheria al norte. Tierra erosionada.",
        terrain: "planicie / árboles sueltos / montículos",
    },
    {
        coordinate: "8,10",
        descripcion: "Zona pedregosa. Fragmentos de roca gris sobre terreno llano. Vegetación escasa.",
        terrain: "planicie / árboles sueltos / montículos",
    },
    {
        coordinate: "9,10",
        descripcion: "Ladera suave. Algunas raíces expuestas. Espacio abierto en todas direcciones.",
        terrain: "planicie / árboles sueltos / montículos",
    },
    {
        coordinate: "10,10",
        descripcion: "Montículo natural. Punto elevado dentro de la planicie. Extremo sureste de Orwyn.",
        terrain: "planicie / árboles sueltos / montículos",
    }






]