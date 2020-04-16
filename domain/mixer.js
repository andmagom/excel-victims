
function calculate( data ) {
  const familyData = data.familyData;
  const victimsData = data.victimsData;

  const newVictimsData = victimsData.map(victimsItem => {
    const isInFamily = familyData.find( familyItem => familyItem.documento ==  victimsItem.identificacion );
    if(isInFamily) {
      victimsItem.familias_accion = 'Sí';
    } else {
      victimsItem.familias_accion = 'No';
    }
    return victimsItem;
  });

  return Promise.resolve(newVictimsData);
}


module.exports = {
  calculate
};