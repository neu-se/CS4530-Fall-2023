
// assumes starting ID of 4, leaves an extra Avery in the application
describe('Create student', () => {
    it('should return an ID', async () => {
        const createdStudent = await client.addStudent('Avery');
        expect(createdStudent.studentID).toBeGreaterThan(4);
    });
})

// BRITTLE!
// Assumes the application shows this specific error message
// Does the specification require this?
it('Should an error if there is no layer called "objects"', async () => {
    expect(() => town.initializeFromMap(testingMaps.noObjects))
        .toThrowError('There is no layer called "objects"');
});

// not clear: if this fails, it's hard to know why
it('remove() only removes one', () =>{
        const tree = makeBST();
        for (let i = 0; i < 1000; ++i) {
          tree.add(i);
        }
        for (let j = 0; j < 1000; ++j) {
          for (let i = 0; i < 1000; ++i) {
            if (i != j) tree.remove(i);
          }
          expect(tree.contains(j)).
            toBe(true);
        }
      });

class Foo {

    public initializeFromMap(map: ITiledMap) {
        ...
        this._validateInteractables();
    }

    // can't test this directly..
    // instead, test via inititalizeFromMap
    private _validateInteractables() {
        // Test Me!
    }

}

    