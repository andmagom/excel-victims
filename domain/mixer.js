
function calculate( data ) {
  const familyData = data.familyData;
  const victimsData = data.victimsData;
  const adultsData = data.adultsData;
  const sisbenData = data.sisbenData;
  const ruda1Data = data.ruda1Data;
  const ruda2Data = data.ruda2Data;
  const paeData = data.paeData;
  const mercado1Data = data.mercado1Data;
  const CDSolidariaData = data.CDSolidariaData;

  const newVictimsData = victimsData.map(victimsItem => {
    const isInFamily = familyData.find( familyItem => familyItem.documento ==  victimsItem.identificacion );
    if(isInFamily) {
      victimsItem.familias_accion = 'Sí';
    } else {
      victimsItem.familias_accion = 'No';
    }
    const isInAdults = adultsData.find( adultItem => adultItem.cedula ==  victimsItem.identificacion );
    if(isInAdults) {
      victimsItem.adulto_mayor = 'Sí';
    } else {
      victimsItem.adulto_mayor = 'No';
    }
    /*
    const isInSisben = sisbenData.find( sisbenItem => sisbenItem.num_documento ==  victimsItem.identificacion );
    if(isInSisben) {
      victimsItem.sisben_3 = isInSisben.puntaje_s3;
      victimsItem.sisben_4 = isInSisben.puntaje_s4;
    }
    */
    const isInRuda1 = ruda1Data.find( ruda1Item => ruda1Item.documento ==  victimsItem.identificacion );
    if(isInRuda1) {
      victimsItem.ugrd = 'Sí';
    } else {
      victimsItem.ugrd = 'No';
    }
    const isInRuda2 = ruda2Data.find( ruda2Item => ruda2Item.documento ==  victimsItem.identificacion );
    if(isInRuda2) {
      victimsItem.ugrd_2 = 'Sí';
    } else {
      victimsItem.ugrd_2 = 'No';
    }
    const isInPae = paeData.find( paeItem => paeItem.documento ==  victimsItem.identificacion );
    if(isInPae) {
      victimsItem.institucion_educativa = 'Sí';
    } else {
      victimsItem.institucion_educativa = 'No';
    }
    const isInMercado1 = mercado1Data.find( me1Item => me1Item.documento ==  victimsItem.identificacion );
    if(isInMercado1) {
      victimsItem.mercados_400 = 'Sí';
    } else {
      victimsItem.mercados_400 = 'No';
    }
    const isInCDSolidaria = CDSolidariaData.find( Item => Item.documento ==  victimsItem.identificacion );
    if(isInCDSolidaria) {
      victimsItem.caldas_solidaria = 'Sí';
    } else {
      victimsItem.caldas_solidaria = 'No';
    }
    return victimsItem;
  });

  return Promise.resolve(newVictimsData);
}


module.exports = {
  calculate
};