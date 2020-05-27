const readXlsxFile = require('read-excel-file/node');
const victimsSchema = require('./schemas/victims');
const adultsSchema = require('./schemas/adults');
const familySchema = require('./schemas/family');
const sisbenSchema = require('./schemas/sisben');
const rudaXSchema = require('./schemas/rudaX');
const mercado1Schema = require('./schemas/mercado1');
const paeSchema = require('./schemas/pae');
const mixer  = require('./domain/mixer');
const excel = require('./driven-adapter/excel-save');


const victimPath = 'victims.xlsx';
const familyPath = 'family.xlsx';
const adultsPath = 'adults.xlsx';
const sisbenPath = 'sisben.xlsx';
const ruda1Path = 'ruda1.xlsx';
const ruda2Path = 'ruda2.xlsx';
const paePath = 'PAE.xlsx';
const mercado1Path = 'mercado1.xlsx';
const caldasSolidariaPath = 'caldasSolidaria.xlsx';

function loadData() {
  readXlsxFile(victimPath, { schema: victimsSchema.schema })
    .then( loadVictims )
    .then( loadFamilyDataAndMix )
    .then( loadAdultsDataAndMix )
    // .then( loadSisbenDataAndMix )
    .then( loadRuda1DataAndMix )
    .then( loadRuda2DataAndMix )
    .then( loadPaeDataAndMix )
    .then( loadMercado1DataAndMix )
    .then( loadCaldasSolidariaDataAndMix )
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


function loadRuda1DataAndMix( vicFamAduSisData ) {
  return readXlsxFile(ruda1Path, { schema: rudaXSchema.schema })
    .then(data => {
      if(data.errors && data.errors.length > 0) 
        return Promise.reject(data.errors);

        vicFamAduSisData.ruda1Data = data.rows;
      return Promise.resolve(vicFamAduSisData);
    });
}

function loadRuda2DataAndMix( vicFamAduSisRu1Data ) {
  return readXlsxFile(ruda2Path, { schema: rudaXSchema.schema })
    .then(data => {
      if(data.errors && data.errors.length > 0) 
        return Promise.reject(data.errors);

        vicFamAduSisRu1Data.ruda2Data = data.rows;
      return Promise.resolve(vicFamAduSisRu1Data);
    });
}

function loadPaeDataAndMix(vicFamAduSisRu1Ru2Data) {
  return readXlsxFile(paePath, { schema: paeSchema.schema })
    .then(data => {
      if(data.errors && data.errors.length > 0) 
        return Promise.reject(data.errors);

        vicFamAduSisRu1Ru2Data.paeData = data.rows;
      return Promise.resolve(vicFamAduSisRu1Ru2Data);
    });
}

function loadMercado1DataAndMix( vicFamAduSisRu1Ru2PaeData ) {
  return readXlsxFile(mercado1Path, { schema: mercado1Schema.schema })
    .then(data => {
      if(data.errors && data.errors.length > 0) 
        return Promise.reject(data.errors);

        vicFamAduSisRu1Ru2PaeData.mercado1Data = data.rows;
      return Promise.resolve(vicFamAduSisRu1Ru2PaeData);
    });
}

function loadCaldasSolidariaDataAndMix( vicFamAduSisRu1Ru2PaeMer1Data ) {
  return readXlsxFile(caldasSolidariaPath, { schema: rudaXSchema.schema })
    .then(data => {
      if(data.errors && data.errors.length > 0) 
        return Promise.reject(data.errors);

        vicFamAduSisRu1Ru2PaeMer1Data.CDSolidariaData = data.rows;
      return Promise.resolve(vicFamAduSisRu1Ru2PaeMer1Data);
    });
}

loadData();

module.exports = {
  loadData,
};