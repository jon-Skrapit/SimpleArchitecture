const DataSchema= {
  name: 'Data',
  primaryKey: 'id',
  properties: {
    id: {type:'int',default: 1},
    one:  {type: 'int', default: 0},
    two: {type: 'int', default: 0},
    three: {type: 'int', default: 0},
    four: {type: 'int', default: 0},
  }
}
export default {DataSchema}