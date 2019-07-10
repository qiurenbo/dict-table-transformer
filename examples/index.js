const dttrans = require('dttrans');
const xlsx = require('node-xlsx');
const jinqJs = require('jinq');
const planWorkbook = xlsx.parse('./plan.xlsx');
const planSheet = planWorkbook[0].data;
const planDocs = dttrans.table2docs(planSheet, mode='loose');
const payedWorkbook = xlsx.parse('./payed.xlsx');
const payedSheet = payedWorkbook[0].data;
const payedDocs = dttrans.table2docs(payedSheet, mode='loose');
const fs = require('fs');

const result = new jinqJs()
.from(planDocs)
.join(payedDocs)
.on( function( left, right ) {
    return (left['职位代码'] === right['职位代码']);
})
.select();

const data = dttrans.docs2table(result, mode='loose');
const buffer = xlsx.build([{name: 'default', data: data}]);
fs.writeFileSync('./plan-payed.xlsx', buffer);
