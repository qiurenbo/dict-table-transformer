const dttrans = require('./index');


describe('docs2table',() => {
    describe('stric mode', () => {
        test('structural data should be transformed right', () => {
            const docs = [{'A': 1, 'B': 2, 'C':3}, {'A': 4, 'B': 3, 'C':5}];
            const table =dttrans.docs2table(docs);
            const expected = [['A', 'B', 'C'], [1, 2, 3], [4, 3, 5]];
            expect(table).toEqual(expected);
        });

        test('the name of row property with same postion should be same', () => {
            const docs = [{'A': 1, 'B': 2, 'C': 3}, {'D': 4, 'B': 3, 'C': 5}];
            expect(() => {dttrans.docs2table(docs)}).toThrowError('docs aren\'t under same schema');
        });
    
        test('the order of row property should not influence the result', () => {
            const docs = [{'A': 1, 'B': 2, 'C':3}, {'B': 1, 'A': 2, 'C': 3}];
            const expected = [['A', 'B', 'C'], [1, 2, 3], [2, 1, 3]];
            expect(dttrans.docs2table(docs)).toEqual(expected);
        });

        test('the number of row properties should not be smaller to header\'s', () => {
            const docs = [{'A': 1, 'B': 2, 'C': 3}, {'A': 4, 'B': 3}];
            expect(() => {dttrans.docs2table(docs)}).toThrowError('docs aren\'t under same schema');
        });

        test('the number of row properties should not be larger to header\'s', () => {
            const docs = [{'A': 1, 'B': 2, 'C': 3}, {'A': 1, 'B': 2, 'C': 3, 'D': 4}];
            expect(() => {dttrans.docs2table(docs)}).toThrowError('docs aren\'t under same schema');
        });

    });

    describe('loose mode', () => {
        test('structural data should be transformed right', () => {
            const docs = [{'A': 1, 'B': 2, 'C':3}, {'A': 4, 'B': 3, 'C':5}];
            const table = dttrans.docs2table(docs, mode='loose');
            const expected = [['A', 'B', 'C'], [1, 2, 3], [4, 3, 5]];
            expect(table).toEqual(expected);
        });

        test('missing data should be filled right', () => {
            const docs = [{'A': 1, 'B': 2, 'C':3}, {'C': 4, 'B': 3}];
            const table = dttrans.docs2table(docs, mode='loose');
            const expected = [['A', 'B', 'C'], [1, 2, 3], ['', 3, 4]];
            expect(table).toEqual(expected);
        });

        test('the name of row property with same postion should be same', () => {
            const docs = [{'A': 1, 'B': 2, 'C': 3}, {'D': 4, 'B': 3, 'C': 5}];
            expect(() => {dttrans.docs2table(docs, mode='loose')}).toThrowError('docs aren\'t under same schema');
        });
    
        test('the order of row property should not influence the result', () => {
            const docs = [{'A': 1, 'B': 2, 'C':3}, {'B': 1, 'A': 2, 'C': 3}];
            const expected = [['A', 'B', 'C'], [1, 2, 3], [2, 1, 3]];
            expect(dttrans.docs2table(docs, mode='loose')).toEqual(expected);
        });

        test('the number of row properties should be smaller then header\'s', () => {
            const docs = [{'A': 1, 'B': 2, 'C': 3}, {'A': 1, 'B': 2, 'C': 3, 'D': 5}];
            expect(() => {dttrans.docs2table(docs, mode='loose')}).toThrowError('docs aren\'t under same schema');
        });
    });

});


describe('table2docs',() => {
    describe('stric mode',() => {
        test('structural data should be transformed right', () => {
            const table =  [['A', 'B', 'C'], [1, 2, 3], [4, 3, 5]];
            const docs =dttrans.table2docs(table);
            const expected = [{'A': 1, 'B': 2, 'C':3}, {'A': 4, 'B': 3, 'C':5}];
            expect(docs).toEqual(expected);
        });
       
        test('the number of row elements should be equal to header\'s', () => {
            const table =  [['A', 'B', 'C'], [1, 2], [4, 3, 5]];
            expect(() => {dttrans.table2docs(table)}).toThrowError('rows aren\'t under same schema');
        });
    });

    describe('loose mode',() => {
        test('missing data should be filled right', () => {
            const table =  [['A', 'B', 'C'], [1, 2], [4, 3, 5]];
            const docs =dttrans.table2docs(table, mode='loose');
            const expected = [{'A': 1, 'B': 2, 'C':''}, {'A': 4, 'B': 3, 'C':5}];
            expect(docs).toEqual(expected);
        });
       
        test('the number of row elements should be smaller than header\'s', () => {
            const table =  [['A', 'B', 'C'], [1, 2, 4, 5], [4, 3, 5]];
            expect(() => {dttrans.table2docs(table, mode='loose');}).toThrowError('rows aren\'t under same schema');
        });
    });
});



