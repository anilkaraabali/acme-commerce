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

    // Group products by target
    Logger.info('Starting to group products...');
    const groupedByTarget = products.reduce(
      (acc: { [key: string]: ProductResponse[] }, product) => {
        const target = product.target;

        if (!acc[target]) {
          acc[target] = [];
        }

        acc[target].push(product);
        return acc;
      },
      {}
    );

    Logger.info('Products grouped successfully!');
    Logger.debug('Grouped products:', JSON.stringify(groupedByTarget, null, 2));

    // Write grouped products to their respective directories
    for (const target in groupedByTarget) {
      const targetDir = path.join(productsDir, target);

      // Ensure the directory exists
      await fs.mkdir(targetDir, { recursive: true });
      Logger.info(`Directory for target ${target} created!`);

      const meta = {
        count: groupedByTarget[target].length,
        left: groupedByTarget[target].length,
        pagination: {
          page: 1,
          total: groupedByTarget[target].length,
        },
      };

      const filePath = path.join(targetDir, 'index.json');
      const dataToWrite: ProductListingResponse = {
        data: {
          products: groupedByTarget[target],
        },
        meta,
      };

      // Write the grouped product data to the 'index.json' file
      try {
        await fs.writeFile(filePath, JSON.stringify(dataToWrite, null, 2));
        Logger.info(`Successfully wrote data for target: ${target}`);
      } catch (writeError) {
        Logger.error(`Error writing file for target ${target}:`, writeError);
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
