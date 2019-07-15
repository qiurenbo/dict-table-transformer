# dict-table-transformer
transform doc to table and vice versa
## Install
```
$ npm install dttrans
```

## Usage
It is very easy to use.
```
const dttrans = require('dttrans');

const docs = [{'A': 1, 'B': 2, 'C':3}, {'A': 4, 'B': 3, 'C':5}];
const table = dttrans.docs2table(docs);
//table: [['A', 'B', 'C'], [1, 2, 3], [4, 3, 5]];
```

```
const dttrans = require('dttrans');

const table =  [['A', 'B', 'C'], [1, 2, 3], [4, 3, 5]];
const docs = dttrans.table2docs(table);
//docs = [{'A': 1, 'B': 2, 'C':3}, {'A': 4, 'B': 3, 'C':5}];
```

Normal transform mode is strict. That means you must ensure your docs or table is well-structrualed and all of them have default value for missing fields. Otherwise dttrans will throw an error.
```
const dttrans = require('dttrans');

const docs = [{'A': 1, 'B': 2, 'C': 3}, {'A': 4, 'B': 3}];
const table = dttrans.docs2table(docs);
//ThrowError('docs aren\'t under same schema');
```
```
const dttrans = require('dttrans');

const table =  [['A', 'B', 'C'], [1, 2], [4, 3, 5]];
const docs = dttrans.table2docs(table);
//ThrowError('rows aren\'t under same schema');
```

If you want to dttrans to handle these missing fields, you can use mode loose.
```
const dttrans = require('dttrans');

const docs = [{'A': 1, 'B': 2, 'C': 3}, {'A': 4, 'B': 3}];
const table = dttrans.docs2table(docs, mode='loose');
//table = [['A', 'B', 'C'], [1, 2, 3], [4, 3, '']];
```
```
const dttrans = require('dttrans');

const table =  [['A', 'B', 'C'], [1, 2], [4, 3, 5]];
const docs = dttrans.table2docs(table, mode='loose');
//docs = [{'A': 1, 'B': 2, 'C':''}, {'A': 4, 'B': 3, 'C':5}];
```



## License
MIT © [qiurenbo](https://www.imwhite.com.cn/)