const readXlsxFile = require('read-excel-file/node');
const victimsSchema = require('./schemas/victims');
const adultsSchema = require('./schemas/adults');
const familySchema = require('./schemas/family');
const sisbenSchema = require('./schemas/sisben');
const mixer  = require('./domain/mixer');
const excel = require('./driven-adapter/excel-save');


const victimPath = 'victims.xlsx';
const familyPath = 'family.xlsx';
const adultsPath = 'adults.xlsx';
const sisbenPath = 'sisben.xlsx';

function loadData() {
  readXlsxFile(victimPath, { schema: victimsSchema.schema })
    .then( loadVictims )
    .then( loadFamilyDataAndMix )
    .then( loadAdultsDataAndMix )
    .then( loadSisbenDataAndMix )
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

function loadAdultsDataAndMix( vicFamData ) {
  return readXlsxFile(adultsPath, { schema: adultsSchema.schema })
    .then(data => {
      if(data.errors && data.errors.length > 0) 
        return Promise.reject(data.errors);

      vicFamData.adultsData = data.rows;
      return Promise.resolve(vicFamData);
    });
}

function loadSisbenDataAndMix( vicFamAduData ) {
  return readXlsxFile(sisbenPath, { schema: sisbenSchema.schema })
    .then(data => {
      if(data.errors && data.errors.length > 0) 
        return Promise.reject(data.errors);

      vicFamAduData.sisbenData = data.rows;
      return Promise.resolve(vicFamAduData);
    });
}

loadData();

module.exports = {
  loadData,
};