const docs2table = (docs) => {
    let table = [];
    let first = true;
    let header = [];
    docs.forEach(doc => {
        let row = [];
        
        // if it is a first doc, save its keys as table's header
        if(first){
            for (const key in doc) {
                if (doc.hasOwnProperty(key)) {
                    header.push(key);
                }
            }
            first = !first;
            table.push(header);
        }

        let keys = [];
        for (const key in doc) {
            if (doc.hasOwnProperty(key)) {
                keys.push(key);
                if(header.indexOf(key) === keys.indexOf(key)){
                    row.push(doc[key]);
                }
                else{
                    throw new Error('docs aren\'t under same schema');
                }
                
            }
        }

        table.push(row);
    });

    return table;
};



const table2docs = (table) => {
    let docs = [];
    let first = true;
    let properties = [];

    table.forEach(row => {
        if(first){
            row.forEach(element => {
                properties.push(element);
            });
            first = !first;
        }
        else{
            if (row.length !== properties.length){
                throw new Error('rows aren\'t under same schema');
            }

            let doc = {};
            for (let i = 0; i < row.length; i++) {
                doc[properties[i]] = row[i];
            }

            docs.push(doc);
        }


    })


    return docs;
};


module.exports = {
    docs2table,
    table2docs
}