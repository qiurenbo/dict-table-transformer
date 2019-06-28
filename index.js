const docs2table = (docs, mode='stric') => {
    let table = [];
    let first = true;
    let header = [];
    docs.forEach((doc) => {

        // If it is a first doc, save its keys as table's header.
        if(first){
            for (const key in doc) {
                if (doc.hasOwnProperty(key)) {
                    header.push(key);
                }
            }
            first = !first;
            table.push(header);
        }

        let row = [];
        let keys = {};
        for (const key in doc) {
            if (doc.hasOwnProperty(key)) {
                if(header.indexOf(key) > -1){
                    row[header.indexOf(key)] = doc[key];
                }
                else{
                    throw new Error('docs aren\'t under same schema');
                }
            }
            keys[key] = 1;
        }


        // Keys include key in both doc and header. iterate key in header to find
        // the key in header and not in doc.
        switch(mode){
            case 'stric':
                header.forEach(key => {
                    if(!keys[key]){
                        throw new Error('docs aren\'t under same schema');
                    }
                });
                break;
            case 'loose':
                header.forEach(key => {
                    if(!keys[key]){
                        row[header.indexOf(key)] = '';
                    }
                });
                break;
        }

        table.push(row);
    });

    return table;
};



const table2docs = (table, mode='stric') => {
    let docs = [];
    let first = true;
    let properties = [];

    table.forEach(row => {
        // First line is used to be properties.
        if(first){
            row.forEach(element => {
                properties.push(element);
            });
            first = !first;
        }
        else{

            let doc = {};

            switch (mode) {
                case 'stric':
                    if (row.length !== properties.length){
                        throw new Error('rows aren\'t under same schema');
                    };             
                    break;
                case 'loose':
                    if (row.length > properties.length){
                        throw new Error('rows aren\'t under same schema');
                    }
                    else if (row.length < properties.length){
                        properties.forEach(property => {
                            doc[property] = '';
                        });                   
                    }
                    
                    // if row.length == properties.length do nothing
                    break;  
            }


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