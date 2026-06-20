const mysql = require('mysql2/promise');

const data = {
  cemento: {
    id: 1, name: 'Cemento y Concreto', prefix: 'CEM', img: 'img/cemento_portland.png',
    marcas: ['Sol', 'Andino', 'Pacasmayo', 'Yura', 'Cemex', 'Holcim', 'UNACEM'],
    tipos: [
      { name: 'Cemento Portland Tipo I (42.5kg)', basePrice: 28.50 },
      { name: 'Cemento Portland Tipo V (42.5kg)', basePrice: 32.00 },
      { name: 'Concreto Premezclado (m3)', basePrice: 280.00 },
      { name: 'Arena Fina Lavada (m3)', basePrice: 45.00 },
      { name: 'Grava de construcción (m3)', basePrice: 55.00 }
    ]
  },
  herramientas: {
    id: 2, name: 'Herramientas Manuales', prefix: 'HER', img: 'img/herramientas_manuales.png',
    items: [
      { name: 'Martillo', basePrice: 35.00 },
      { name: 'Comba o mazo', basePrice: 45.00 },
      { name: 'Destornillador', basePrice: 12.50 },
      { name: 'Alicate', basePrice: 18.00 },
      { name: 'Tenaza', basePrice: 22.00 },
      { name: 'Llave inglesa', basePrice: 30.00 },
      { name: 'Llave fija', basePrice: 15.00 },
      { name: 'Llave de tubo', basePrice: 40.00 },
      { name: 'Serrucho', basePrice: 25.00 },
      { name: 'Arco de sierra', basePrice: 18.00 },
      { name: 'Cincel', basePrice: 10.00 },
      { name: 'Lima', basePrice: 14.00 },
      { name: 'Cúter', basePrice: 8.50 },
      { name: 'Flexómetro (cinta métrica 5m)', basePrice: 20.00 },
      { name: 'Nivel', basePrice: 28.00 },
      { name: 'Escuadra', basePrice: 15.00 },
      { name: 'Plomada', basePrice: 12.00 },
      { name: 'Pala', basePrice: 35.00 },
      { name: 'Pico', basePrice: 42.00 },
      { name: 'Carretilla', basePrice: 150.00 },
      { name: 'Badilejo o palustre', basePrice: 18.00 },
      { name: 'Llana', basePrice: 22.00 },
      { name: 'Espátula', basePrice: 10.00 },
      { name: 'Barreta', basePrice: 55.00 },
      { name: 'Rastrillo', basePrice: 28.00 }
    ]
  },
  ferreteria: { 
    id: 3, name: 'Ferretería Industrial', prefix: 'FER', img: 'img/epp_seguridad.png',
    items: [
      { name: 'Casco de seguridad', basePrice: 18.00 },
      { name: 'Guantes de cuero', basePrice: 12.00 },
      { name: 'Lentes de seguridad', basePrice: 8.50 },
      { name: 'Botas con punta de acero', basePrice: 95.00 },
      { name: 'Chaleco reflectante', basePrice: 15.00 },
      { name: 'Protectores auditivos', basePrice: 25.00 },
      { name: 'Ladrillo Rojo 18 Huecos (Millar)', basePrice: 1150.00 },
      { name: 'Ladrillo Pandereta (Millar)', basePrice: 850.00 },
      { name: 'Clavos de acero (Kg)', basePrice: 6.50 },
      { name: 'Alambre de amarre (Rollo)', basePrice: 85.00 }
    ]
  },
  pinturas: {
    id: 4, name: 'Pinturas', prefix: 'PIN', img: 'img/pintura_vinilica.png',
    marcas: ['CPP', 'Anypsa', 'Vencedor', 'American Colors', 'Sherwin-Williams', 'Glidden', 'Comex'],
    tipos: [
      { name: 'Pintura látex', basePrice: 45.00 },
      { name: 'Pintura acrílica', basePrice: 65.00 },
      { name: 'Pintura esmalte', basePrice: 55.00 },
      { name: 'Pintura anticorrosiva', basePrice: 48.00 },
      { name: 'Pintura impermeabilizante', basePrice: 75.00 },
      { name: 'Pintura para tráfico', basePrice: 85.00 },
      { name: 'Pintura epóxica', basePrice: 120.00 }
    ],
    accesorios: [
      { name: 'Brocha 4 pulgadas', basePrice: 15.00 },
      { name: 'Rodillo antigota', basePrice: 22.00 },
      { name: 'Bandeja para pintura', basePrice: 12.00 },
      { name: 'Lija de agua (Pack x10)', basePrice: 15.00 },
      { name: 'Cinta de enmascarar', basePrice: 8.00 },
      { name: 'Pistola para pintar', basePrice: 180.00 }
    ]
  },
  electricos: {
    id: 5, name: 'Eléctricos', prefix: 'ELE', img: 'img/materiales_electricos.png',
    items: [
      { name: 'Cable THW #12 AWG (Rollo 100m)', basePrice: 135.00 },
      { name: 'Cable THW #14 AWG (Rollo 100m)', basePrice: 95.00 },
      { name: 'Tomacorriente doble Ticino', basePrice: 18.50 },
      { name: 'Interruptor termomagnético 20A', basePrice: 28.00 },
      { name: 'Foco LED Philips 12W', basePrice: 14.50 },
      { name: 'Cinta aislante 3M', basePrice: 6.50 },
      { name: 'Tubo PVC Eléctrico 3/4" (3m)', basePrice: 8.00 }
    ]
  }
};

async function seedRealistic() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'tienda_ihc'
    });

    console.log('Conectado a MySQL. Limpiando catálogo anterior...');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0;');
    await connection.execute('TRUNCATE TABLE sale_order_items');
    await connection.execute('TRUNCATE TABLE products');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1;');

    let idAlmacen = 1;

    // 1. CEMENTOS Y CONCRETO
    for (const marca of data.cemento.marcas) {
      for (const tipo of data.cemento.tipos) {
        const name = `${tipo.name.replace(/\(.*\)/, '').trim()} ${marca} ${tipo.name.match(/\(.*\)/)?.[0] || ''}`.trim();
        const price = (tipo.basePrice + (Math.random() * 4 - 2)).toFixed(2); // +/- S/2 de variación
        const stock = Math.floor(Math.random() * 500) + 50;
        await insert(connection, idAlmacen++, data.cemento, name, price, stock);
      }
    }

    // 2. HERRAMIENTAS MANUALES
    for (const item of data.herramientas.items) {
      for (let j=1; j<=3; j++) { 
        const name = `${item.name} Profesional Tipo ${j}`;
        const price = (item.basePrice + (j * 5) + (Math.random() * 2)).toFixed(2); // Tipo 2 y 3 son más caros
        const stock = Math.floor(Math.random() * 100) + 10;
        await insert(connection, idAlmacen++, data.herramientas, name, price, stock);
      }
    }

    // 3. FERRETERÍA / EPPs
    for (const item of data.ferreteria.items) {
      for (let j=1; j<=3; j++) { 
        const name = `${item.name.replace(/\(.*\)/, '').trim()} Nivel ${j} ${item.name.match(/\(.*\)/)?.[0] || ''}`.trim();
        const price = (item.basePrice + (j * (item.basePrice * 0.1))).toFixed(2); // +10% por nivel
        const stock = Math.floor(Math.random() * 200) + 20;
        await insert(connection, idAlmacen++, data.ferreteria, name, price, stock);
      }
    }

    // 4. PINTURAS
    for (const marca of data.pinturas.marcas) {
      for (const tipo of data.pinturas.tipos) {
        const name = `${tipo.name} ${marca} - Balde 4L`;
        const price = (tipo.basePrice + (Math.random() * 8 - 4)).toFixed(2); // +/- S/4
        const stock = Math.floor(Math.random() * 150) + 10;
        await insert(connection, idAlmacen++, data.pinturas, name, price, stock);
      }
    }
    // Accesorios de pintura
    for (const acc of data.pinturas.accesorios) {
       const price = (acc.basePrice + (Math.random() * 2 - 1)).toFixed(2);
       await insert(connection, idAlmacen++, data.pinturas, acc.name, price, 200);
    }

    // 5. ELECTRICOS
    for (const item of data.electricos.items) {
      for (let j=1; j<=3; j++) { 
        const name = `${item.name.replace(/\(.*\)/, '').trim()} Calidad A${j} ${item.name.match(/\(.*\)/)?.[0] || ''}`.trim();
        const price = (item.basePrice + (j * (item.basePrice * 0.15))).toFixed(2); // +15% por calidad
        const stock = Math.floor(Math.random() * 300) + 15;
        await insert(connection, idAlmacen++, data.electricos, name, price, stock);
      }
    }

    console.log(`¡Éxito! Se insertaron ${idAlmacen - 1} productos con PRECIOS REALES de Perú.`);
    await connection.end();
  } catch (error) {
    console.error('Error insertando datos realistas:', error);
  }
}

function getImageForProduct(name, defaultImg) {
  const n = name.toLowerCase();
  if (n.includes('comba') || n.includes('mazo')) return 'img/comba.png';
  if (n.includes('destornillador')) return 'img/destornillador.png';
  if (n.includes('alicate')) return 'img/alicate.png';
  if (n.includes('tenaza')) return 'img/tenaza.png';
  if (n.includes('llave inglesa')) return 'img/llave_inglesa.png';
  if (n.includes('martillo')) return 'img/martillo_profesional.png';
  if (n.includes('pala')) return 'img/pala_construccion.png';
  if (n.includes('carretilla')) return 'img/carretilla.png';
  if (n.includes('cemento') || n.includes('portland')) return 'img/saco_cemento.png';
  if (n.includes('concreto')) return 'img/concreto_premezclado.png';
  if (n.includes('arena') || n.includes('grava')) return 'img/arena_fina.png';
  if (n.includes('ladrillo')) return 'img/ladrillo_rojo.png';
  if (n.includes('cable')) return 'img/cable_electrico.png';
  if (n.includes('pintura')) return 'img/pintura_balde.png';
  if (n.includes('taladro')) return 'img/taladro_dewalt.png';
  if (n.includes('amoladora')) return 'img/amoladora_angular.png';
  if (n.includes('casco') || n.includes('lentes') || n.includes('auditivo') || n.includes('chaleco') || n.includes('botas') || n.includes('guantes')) return 'img/epp_seguridad.png';
  return defaultImg;
}

async function insert(conn, id, cat, name, price, stock) {
  const idFabrica = `${cat.prefix}-${id.toString().padStart(4, '0')}`;
  const ubicacion = `Almacén Principal`;
  const imgUrl = getImageForProduct(name, cat.img);
  await conn.execute(`
    INSERT INTO products 
    (product_id_almacen, product_id_fabrica, name, ubicacion, producttype_id, producttype_name, price_per_mayor, price_per_minor, image_url, stock, is_active, stock_minimo, stock_vencido, stock_malogrado, stock_roto)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 5, 0, 0, 0)
  `, [id, idFabrica, name, ubicacion, cat.id, cat.name, price, price, imgUrl, stock]);
}

seedRealistic();
