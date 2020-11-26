import React from 'react';
import Filter from './Filter';
import {create} from 'react-test-renderer'
import {MemoryRouter} from "react-router-dom";

describe('Test Filter Snapshot', () => {
    //This tests the underlying components as well
    test('testing filter snapshot', () => {
        let tree = create(
            <MemoryRouter>
                <Filter/>
            </MemoryRouter>);
        expect(tree.toJSON()).toMatchSnapshot();
    })
});

