
function calculate( data ) {
  const familyData = data.familyData;
  const victimsData = data.victimsData;
  const adultsData = data.adultsData;

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
    return victimsItem;
  });

  return Promise.resolve(newVictimsData);
}


module.exports = {
  calculate
};