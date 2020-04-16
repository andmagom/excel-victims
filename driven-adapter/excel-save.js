var excel = require('excel4node');

function save(data) {
  // Create a new instance of a Workbook class
  let workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  let worksheet = workbook.addWorksheet('Hoja 1');

  // Create a reusable style
  let headerStyle = workbook.createStyle({
    font: {
      color: '#0c2032',
      name: 'Calibri',
      bold: true,
      size: 12
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center',
      wrapText: true
    }
  });

  let rowStyle = workbook.createStyle({
    font: {
      color: '#1b3147',
      name: 'Calibri',
      size: 10
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center',
    }
  });

  setHeader( worksheet, headerStyle);
  data.forEach( (element, index) => {
    writeElement(worksheet, rowStyle, element, index);
  });

  workbook.write('Excel.xlsx');
}

function setHeader(worksheet, style) {
  worksheet.cell(1, 1).string('FAMILIA').style(style);
  worksheet.cell(1, 2).string('NOMBRE').style(style);
  worksheet.cell(1, 3).string('TIPO DE DOCUMENTO').style(style);
  worksheet.cell(1, 4).string('IDENTIFICACIÓN').style(style);
  worksheet.cell(1, 5).string('PARENTESCO').style(style);
  worksheet.cell(1, 6).string('MUNICIPIO DE PROCEDENCIA').style(style);
  worksheet.cell(1, 7).string('NACIMIENTO').style(style);
  worksheet.cell(1, 8).string('GÉNERO').style(style);
  worksheet.cell(1, 9).string('ETNIA').style(style);
  worksheet.cell(1, 10).string('DISCAPACIDAD').style(style);
  worksheet.cell(1, 11).string('EDAD').style(style);
  worksheet.cell(1, 12).string('HECHO VICTIMIZANTE').style(style);
  worksheet.cell(1, 13).string('SISBÉN III').style(style);
  worksheet.cell(1, 14).string('SISBÉN IV').style(style);
  worksheet.cell(1, 15).string('AYUDAS HUMANITARIAS').style(style);
  worksheet.cell(1, 16).string('INDEMNIZACIÓN ADMINSITRATIVA').style(style);
  worksheet.cell(1, 17).string('AYUDAS RECIBIDAS COVID-19').style(style);
  worksheet.cell(1, 18).string('FAMILIAS EN ACCIÓN').style(style);
  worksheet.cell(1, 19).string('ADULTO MAYOR').style(style);
  worksheet.cell(1, 20).string('INSTITUCIÓN EDUCATIVA').style(style);
  worksheet.cell(1, 21).string('CENTRO VIDA').style(style);
  worksheet.cell(1, 22).string('DE 0 A SIEMPRE').style(style);

}

function writeElement(worksheet, style, element, index) {
  index += 2; // Se añaden 2 posiciones,  para el header y inicializador en 1
  worksheet.cell(index, 1).string( getValue(element.familia) ).style(style);
  worksheet.cell(index, 2).string( getValue(element.nombre) ).style(style);
  worksheet.cell(index, 3).string( getValue(element.tipo_documento) ).style(style);
  worksheet.cell(index, 4).string( getValue(element.identificacion) ).style(style);
  worksheet.cell(index, 5).string( getValue(element.parentesco) ).style(style);
  worksheet.cell(index, 6).string( getValue(element.municipio_procedencia) ).style(style);
  worksheet.cell(index, 7).string( getDate(element.nacimiento) ).style(style);
  worksheet.cell(index, 8).string( getValue(element.genero) ).style(style);
  worksheet.cell(index, 9).string( getValue(element.etnia) ).style(style);
  worksheet.cell(index, 10).string( getValue(element.discapacidad) ).style(style);
  worksheet.cell(index, 11).string( calculateAge(element.nacimiento) ).style(style);
  worksheet.cell(index, 12).string( getValue(element.hecho_victimizante) ).style(style);
  worksheet.cell(index, 13).string( getValue(element.sisben_3) ).style(style);
  worksheet.cell(index, 14).string( getValue(element.sisben_4) ).style(style);
  worksheet.cell(index, 15).string( getValue(element.ayudas_humanitarias) ).style(style);
  worksheet.cell(index, 16).string( getValue(element.indemnizacion_administrativa) ).style(style);
  worksheet.cell(index, 17).string( getValue(element.ayudas_covid) ).style(style);
  worksheet.cell(index, 18).string( getValue(element.familias_accion) ).style(style);
  worksheet.cell(index, 19).string( getValue(element.adulto_mayor) ).style(style);
  worksheet.cell(index, 20).string( getValue(element.institucion_educativa) ).style(style);
  worksheet.cell(index, 21).string( getValue(element.centro_vida) ).style(style);
  worksheet.cell(index, 22).string( getValue(element.cero_siempre) ).style(style);
}

function getValue(value) {
  return (value) ? value.toString() : '' ;
}

function getDate(value) {
  if(!value) return '';
  if(value == 'N/A') return value;
  if(value) {
    const year = value.getFullYear();
    const month = value.getMonth();
    const date = value.getDate();
    return `${year}-${month}-${date}`;
  }
}

function calculateAge(birthday) {
  if(!birthday) return '';
  if(birthday == 'N/A') return birthday;
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return '' + Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
  save
}