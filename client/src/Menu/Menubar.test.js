import React from 'react';
import Menubar from './Menubar';
import {create} from 'react-test-renderer'
import {MemoryRouter} from "react-router-dom";

describe('Test Menubar Snapshot', () => {
    test('testing menubar snapshot', () => {
        let tree = create(
            <MemoryRouter>
                <Menubar active="1"/>
            </MemoryRouter>);
        expect(tree.toJSON()).toMatchSnapshot();
    })
});
