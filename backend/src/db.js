const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, 'data')

function readData(filename) {
  const file = path.join(DATA_DIR, filename)
  if (!fs.existsSync(file)) return []
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeData(filename, data) {
  const file = path.join(DATA_DIR, filename)
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

module.exports = { readData, writeData }
