import path from 'path';
import fs from 'fs/promises';
import args from 'args';

import Logger from '../logger';
import { ProductDetailResponse } from '@/features/product/services/product-detail.types';
import { ProductResponse } from '@/features/product/services/product.types';
import { ProductListingResponse } from '@/features/product/services/product-listing.types';

const rootDir = path.resolve(__dirname, '../..');
const publicDir = path.resolve(rootDir, 'public');
const productsDir = path.resolve(publicDir, 'api/v1/products');

// Parsing command line arguments for debug flag
args.option('debug', 'Enable debug mode');
const FLAGS = args.parse(process.argv);

Logger.setDebugMode(FLAGS.debug);

async function mergeProducts() {
  Logger.info('Merging products...');

  try {
    // Fetch all files in the products directory
    const files = await fs.readdir(productsDir);
    Logger.debug(`Found files: ${files.join(', ')}`);

    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    Logger.debug(`Filtered JSON files: ${jsonFiles.join(', ')}`);

    // Fetch product data from each JSON file
    const products = await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const filePath = path.join(productsDir, file);
          const content = await fs.readFile(filePath, 'utf-8');

          const { data }: ProductDetailResponse = JSON.parse(content);
          return data.product;
        } catch (error) {
          Logger.error(`Error parsing file ${file}:`, error);
          throw error;
        }
      })
    );

    Logger.info('Products fetched successfully!');
    Logger.debug('Fetched products:', JSON.stringify(products, null, 2));

    // Group products by gender
    Logger.info('Starting to group products...');
    const groupedByGender = products.reduce(
      (acc: { [key: string]: ProductResponse[] }, product) => {
        const gender = product.gender;

        if (!acc[gender]) {
          acc[gender] = [];
        }

        acc[gender].push(product);
        return acc;
      },
      {}
    );

    Logger.info('Products grouped successfully!');
    Logger.debug('Grouped products:', JSON.stringify(groupedByGender, null, 2));

    // Write grouped products to their respective directories
    for (const gender in groupedByGender) {
      const genderDir = path.join(productsDir, gender);

      // Ensure the directory exists
      await fs.mkdir(genderDir, { recursive: true });
      Logger.info(`Directory for gender ${gender} created!`);

      const meta = {
        count: groupedByGender[gender].length,
        left: groupedByGender[gender].length,
        pagination: {
          page: 1,
          total: groupedByGender[gender].length,
        },
      };

      const filePath = path.join(genderDir, 'index.json');
      const dataToWrite: ProductListingResponse = {
        data: {
          products: groupedByGender[gender],
        },
        meta,
      };

      // Write the grouped product data to the 'index.json' file
      try {
        await fs.writeFile(filePath, JSON.stringify(dataToWrite, null, 2));
        Logger.info(`Successfully wrote data for gender: ${gender}`);
      } catch (writeError) {
        Logger.error(`Error writing file for gender ${gender}:`, writeError);
      }
    }

    Logger.info('Product merge process completed!');
  } catch (error) {
    Logger.error('Error during product merging process:', error);
  }
}

// Execute the merging function
mergeProducts().catch((error) => {
  Logger.error('Unhandled error in mergeProducts function:', error);
});
