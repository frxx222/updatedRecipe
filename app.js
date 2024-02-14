const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const typeOfRecipes = [
{
    id: 1,
    title: 'Manggo Grahams',
    ingredients: ['mango', 'graham', 'milk'],
    instructions: 'putthat mango to graham',
  },
  {
    id: 2,
    title: 'papaya',
    ingredients: ['papaya', 'langis', 'suka'],
    instructions: 'wag kana magluto',
  },
];

app.get('/api/recipes', (req, res) => {
  res.send(typeOfRecipes);
});

// fetching a single recipe by id
app.get('/api/recipes/:id', (req, res) => {
  const recipe = typeOfRecipes.find((c) => c.id
  === parseInt(req.params.id));
  if(!recipe)
    return res.status(404).send('The recipe was not found.');
  res.send(recipe);
});

// app.get('/api/recipes', (req, res) => {
//   if (req.query.sortBy = 'name') {
//     typeOfRecipes.sort((a, b) => {
//       if (a.name < b.name) return -1;
//       if (a.name > b.name) return 1;
//       return 0;
//     });
//   }
//   res.send(typeOfRecipes);
// });

// adding new recipe
app.post('/api/recipes', (req, res) => {
  // validate the user input
  if(!req.body.title || req.body.title.length < 3){
    res
    .status(400)
    .send('Title is required and should be minimum of 3 characters.');
    return;
  }
  const newRecipe = {
    id: typeOfRecipes.length + 1,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  };
  typeOfRecipes.push(newRecipe);
  res.send(newRecipe);
});

// edit the recipe
app.put('/api/recipes/:id', (req, res) => {
  const recipe = typeOfRecipes.find((c) => c.id === parseInt(req.params.id));
  if(!recipe)
  return res.status(404).send('The recipe with the given id was not found.');

  // const schema = Joi.object({
  //   title: Joi.string().min(3).required()
  // });

  // const result = schema.validate(req.body);
  //   if (result.error) {
  //     res.status(400).send(result.error.details[0].message);
  //     return;
  //   }
// update the recipe
    recipe.title = req.body.title;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions;
    res.send(recipe);
});

// delete the data
app.delete('/api/recipes/:id', (req, res) => {
  const recipe = typeOfRecipes.find((c) => c.id === parseInt(req.params.id));
  if(!recipe)
  return res.status(404).send('The recipe with the given id was not found.');

  const index =typeOfRecipes.indexOf(recipe);
  typeOfRecipes.splice(index, 1);

  res.send(recipe);
});
// const erecipe = typeOfRecipes.find((c) => c.id === parseInt(req.params.id));
// if(!erecipe)
//   return res.status(404).send('The recipe with the given id was not found.');

//     const schema = Joi.object({
//       title: Joi.string().min(3).required(),
//     });

//     const result = schema.validate(req.body);
//     if (result.error) {
//       res.status(400).send(result.error.details[0].message);
//       return;
//     }

//     erecipe.title = req.body.title,
//     res.send(erecipe);




const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listen to http://localhost:${port}...`)
);

