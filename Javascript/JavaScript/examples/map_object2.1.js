
function recipeInstructions(recipe) {
    return recipe.map(function callback(element) {
      return element['step'];
    });

}

//examples:
var recipeCard = [
  {step: '1. Pour milk and eggs into bowl.', ingredients: ['milk', 'eggs'] },
  {step: '2. Mix flour with sugar and baking soda.', ingredients: ['flour', 'sugar', 'baking soda']},
  {step: '3. Mix flour mixture with milk mixture.', ingredients: null},
  {step: '4. Place 2-tablespoon size heaps of batter on grease baking sheet', ingredients: null}
];
console.log(recipeInstructions(recipeCard)); /* =>
  ['1. Pour milk and eggs into bowl.',
  '2. Mix flour with sugar and baking soda.',
  '3. Mix flour mixture with milk mixture.',
  '4. Place 2-tablespoon size heaps of batter on grease baking sheet']

*/
