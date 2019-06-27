const dttrans = require('./index');


describe('docs2table',() => {
    describe('supported use', () => {
        test('structural data', () => {
            const docs = [{'A': 1, 'B': 2, 'C':3}, {'A': 4, 'B': 3, 'C':5}];
            const table =dttrans.docs2table(docs);
            const expected = [['A', 'B', 'C'], [1, 2, 3], [4, 3, 5]];
            expect(table).toEqual(expected);
        });
    })

    describe('unsupported use', () => {
        test('properties\'s names are not same', () => {
            const docs = [{'A': 1, 'B': 2, 'C':3}, {'D': 4, 'B': 3, 'C':5}];
            expect(() => {dttrans.docs2table(docs)}).toThrowError('docs aren\'t under same schema');
        });
    
        test('properties\'s orders are not same', () => {
            const docs = [{'A': 1, 'B': 2, 'C':3}, {'B': 1, 'A': 2, 'C':3}];
            expect(() => {dttrans.docs2table(docs)}).toThrowError('docs aren\'t under same schema');
        });
    })

});


describe('table2docs',() => {
    describe('supported use', () => {
        test('structural data', () => {
            const table =  [['A', 'B', 'C'], [1, 2, 3], [4, 3, 5]];
            const docs =dttrans.table2docs(table);
            const expected = [{'A': 1, 'B': 2, 'C':3}, {'A': 4, 'B': 3, 'C':5}];
            expect(docs).toEqual(expected);
        });
    })

    describe('unsupported use', () => {
        test('rows aren\'t under same schema', () => {
            const table =  [['A', 'B', 'C'], [1, 2], [4, 3, 5]];
            expect(() => {dttrans.table2docs(table)}).toThrowError('rows aren\'t under same schema');
        });
    })

});



