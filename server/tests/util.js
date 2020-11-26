exports.checkForCorrectTechniqueData = function (json) {
    //Check that it contains all the correct data:
    expect(json.id).toBe(1);
    expect(json.name).toBe('Simple Virtual Hand');
    expect(json.description).toBe('Creates a virtual representation of the real hand to allow a direct and natural interaction');
    expect(json.long_description).toBe('The virtual hand technique maps the movements of the real hand to a virtual representation. The virtual representation can be displayed as a human hand, a controller or a simple geometrical object. An object can be selected by intersecting the virtual hand with the object and pressing a button. A similar technique is the Finger-based Virtual Hand where not only the hand is tracked but also the fingers.');
    expect(json.metaphor).toBe('grasping/hand-based');
    expect(json.task).toBe('selection,position,rotation');
    expect(json.bimanual).toBe('single-handed');
    expect(json.min_degree_of_freedom).toBe('x,y,z,&psi;,&phi;,&theta;');
    expect(json.max_degree_of_freedom).toBe('x,y,z,&psi;,&phi;,&theta;');
    expect(json.constr).toBe('none');
    expect(json.cd_ratio_tool).toBe('isomorph');
    expect(json.cd_ratio_target).toBe('isomorph');
    expect(json.spatial_compliance).toBe('positional,directional,nulling');
    expect(json.id_tracked_body_parts).toBe('hand');
    expect(json.buttons).toBe("1");
    expect(json.reference_frame).toBe('egocentric');
    expect(json.action_space).toBe('arm length');
    expect(json.direct_indirect).toBe('direct');
    expect(json.progressive_refinement).toBe('none');
    expect(json.disambiguation_mechanism).toBe('none');
    expect(json.biomechanical_symmetry).toBe('arm,hand');
    expect(json.dimensional_symmetry).toBe('x,y,z,&psi;,&phi;,&theta;');
    expect(json.tf_symmetry_positional).toBe('1-to-1');
    expect(json.tf_symmetry_orientational).toBe('1-to-1');
    expect(json.termination_symmetry).toBe('release button');
    expect(json.overall_interaction_fidelity).toBe(4.5);
};
