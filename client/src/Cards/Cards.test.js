import React from 'react';
import Cards from './Cards';
import {create} from 'react-test-renderer'
import Card from "./Card";
import CardImage from "./CardImage";
import CardImageCarousel from "./CardImageCarousel";
import {MemoryRouter} from "react-router-dom";

const testTechnique = {
    id: 1,
    name: "Simple Virtual Hand",
    description: "Creates a virtual representation of the real hand to allow a direct and natural interaction",
};

describe('Test Card Component Snapshots', () => {
    test('testing CardImage snapshot', () => {
        let tree = create(<CardImage image="#" technique={testTechnique}/>);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('testing CardImageCarousel snapshot', () => {
        let tree = create(<CardImageCarousel technique={testTechnique}/>);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('testing Card snapshot', () => {
        let tree = create(
            <MemoryRouter>
                <Card technique={testTechnique}/>
            </MemoryRouter>);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('testing Cards snapshot', () => {
        let tree = create(
            <MemoryRouter>
                <Cards techniques={[
                    testTechnique,
                    testTechnique,
                    testTechnique
                ]}/>
            </MemoryRouter>);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});

