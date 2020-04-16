const readXlsxFile = require('read-excel-file/node');
const victimsSchema = require('./schemas/victims');
const familySchema = require('./schemas/family');
const mixer  = require('./domain/mixer');
const excel = require('./driven-adapter/excel-save');


const victimPath = 'victims.xlsx';
const familyPath = 'family.xlsx';

function loadData() {
  readXlsxFile(victimPath, { schema: victimsSchema.schema })
    .then( loadVictims )
    .then( loadFamilyDataAndMix )
    .then( mixer.calculate )
    .then( excel.save )
    .catch( err => console.log(err) )
}

function loadVictims( data ) {
    if(data.errors && data.errors.length > 0) 
      return Promise.reject(data.errors);

    return Promise.resolve(data.rows);
}


function loadFamilyDataAndMix( victimsData ) {
  return readXlsxFile(familyPath, { schema: familySchema.schema })
    .then(data => {
      if(data.errors && data.errors.length > 0) 
        return Promise.reject(data.errors);
        
      return Promise.resolve({victimsData, familyData: data.rows});
    });
}

loadData();

module.exports = {
  loadData,
};