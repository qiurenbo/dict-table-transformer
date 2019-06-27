# dttrans
transform doc to table and vice versa
## Install
```
$ npm install dttrans
```

## Usage
```
const dtransformer = require('dttrans');


const docs = [{'A': 1, 'B': 2, 'C':3}, {'A': 4, 'B': 3, 'C':5}];
const table = dtransformer.docs2table(docs);
//table: [['A', 'B', 'C'], [1, 2, 3], [4, 3, 5]];
```

```
const dtransformer = require('dtransformer');


const table =  [['A', 'B', 'C'], [1, 2, 3], [4, 3, 5]];
const docs = dtransformer.table2docs(table);
//docs = [{'A': 1, 'B': 2, 'C':3}, {'A': 4, 'B': 3, 'C':5}];
```

## License
MIT © [qiurenbo](https://www.imwhite.com.cn/)