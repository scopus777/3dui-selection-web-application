import React from 'react';
import {create} from 'react-test-renderer'
import Help from "./Help";
import {MemoryRouter} from "react-router-dom";

describe('Test Help Snapshot', () => {
    test('testing Help snapshot', () => {
        let tree = create(<MemoryRouter><Help/></MemoryRouter>);
        expect(tree.toJSON()).toMatchSnapshot();
    })
});

