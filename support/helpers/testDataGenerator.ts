/* 
   This file contains the TestDataGenerator class which is responsible for generating test data.
   - Faker.js: generate random data.
   - Other: explain here.
*/

import { faker } from '@faker-js/faker';

export class TestDataGenerator {
   async init() {
      // Any initialization logic here
      console.log('TestDataGenerator initialized');
   }

   async generateUser() {
      return {
         name: faker.person.fullName(),
         email: faker.internet.email(),
         password: faker.internet.password(),
      };
   }

   async generateProduct() {
      return {
         name: faker.commerce.productName(),
         price: parseFloat(faker.commerce.price()),
         category: faker.commerce.department(),
         description: faker.commerce.productDescription(),
      };
   }

   async generateLocation() {
      return {
         name: faker.location.city(),
         country: faker.location.country(),
      };
   }

   async generateFood() {
      return {
         dish: faker.food.dish(),
         vegatable: faker.food.vegetable(),
         meat: faker.food.meat(),
         fruit: faker.food.fruit(),
         ingredient: faker.food.ingredient(),
      };
   }

   async generateHotelName() {
      return {
         name: faker.company.name()
      };
   }
}
