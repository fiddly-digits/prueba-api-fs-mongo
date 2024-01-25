import fs from 'node:fs/promises';
import createError from 'http-errors';

export const getProduct = async () => {
  let productList = await fs
    .readFile('./products.json', 'utf8')
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  console.log('product list', productList);
  return productList;
};

export const setProduct = async (body) => {
  await fs.readFile('./products.json', 'utf8').then(async (data) => {
    const obj = JSON.parse(data);
    if (obj.products.some((product) => product.id === body.id))
      throw createError(403, 'Product already in list');
    obj.products.push(body);
    const json = JSON.stringify(obj);
    await fs.writeFile('./products.json', json, (err) => {
      if (err) throw err;
    });
  });

  return;
};

export const updateProduct = async (body) => {
  const edited = await fs
    .readFile('./products.json', 'utf8')
    .then(async (data) => {
      const obj = JSON.parse(data);
      let productIndex = obj.products.findIndex(
        (product) => product.id === body.id
      );
      if (productIndex === -1) throw createError(404, 'Product Not Found');
      obj.products[productIndex].title =
        body.title ?? obj.products[productIndex].title;
      obj.products[productIndex].description =
        body.description ?? obj.products[productIndex].description;
      obj.products[productIndex].price =
        body.price ?? obj.products[productIndex].price;
      obj.products[productIndex].rating =
        body.rating ?? obj.products[productIndex].rating;
      obj.products[productIndex].stock =
        body.stock ?? obj.products[productIndex].stock;
      obj.products[productIndex].category =
        body.category ?? obj.products[productIndex].category;
      let editedProduct = obj.products.filter(
        (product) => product.id === body.id
      );
      const json = JSON.stringify(obj);

      await fs.writeFile('./products.json', json, (err) => {
        if (err) throw err;
      });
      return editedProduct;
    });

  return edited;
};

// export const deleteProduct = async (body) => {
//   const deleted = await fs
//     .readFile('./products.json', 'utf8')
//     .then(async (data, err) => {
//       const obj = JSON.parse(data);
//       let productIndex = obj.products.findIndex(
//         (product) => product.id === body.id
//       );
//       console.log('console', productIndex);
//       if (productIndex < 0) throw createError(404, 'Product Not Found');
//       let deletedProduct = obj.products.filter(
//         (product) => product.id === body.id
//       );
//       console.log(deletedProduct);
//       //obj.products.splice(productIndex, 1);
//       const json = JSON.stringify(obj);
//       await fs.writeFile('./products.json', json, (err) => {
//         if (err) throw err;
//       });
//       return deletedProduct;
//     });

//   return deleted;
// };

// export const deleteProduct = async (body) => {
//   const deleted = await fs
//     .readFile('./products.json', 'utf8')
//     .then(async (data) => {
//       const obj = JSON.parse(data);
//       let deletedProduct = obj.products.filter(
//         (product) => product.id === body.id
//       );
//       let productIndex = obj.products.findIndex(
//         (product) => product.id === body.id
//       );
//       const indexValidation = productIndex === -1;
//       if (indexValidation) throw createError(404, 'Not Found');

//       const json = JSON.stringify(obj);
//       obj.products.splice(productIndex, 1);

//       await fs.writeFile('./products.json', json, (err) => {
//         if (err) throw err;
//       });
//       return deletedProduct;
//     })
//     .catch((error) => {
//       throw error;
//     });
//   return deleted;
// };

export const deleteProduct = async (params) => {
  const deleted = await fs
    .readFile('./products.json', 'utf8')
    .then(async (data) => {
      const obj = JSON.parse(data);
      let productIndex = obj.products.findIndex(
        (product) => product.id === Number(params.id)
      );
      let deletedProduct = obj.products.filter(
        (product) => product.id === Number(params.id)
      );
      console.log(productIndex);
      if (productIndex === -1) throw createError(404, 'Product Not Found');
      obj.products.splice(productIndex, 1);
      const json = JSON.stringify(obj);

      await fs.writeFile('./products.json', json, (err) => {
        if (err) throw err;
      });
      return deletedProduct;
    });

  return deleted;
};
