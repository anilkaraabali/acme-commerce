import path from 'path';
import fs from 'fs/promises';
import args from 'args';

import Logger from '../logger';
import { ProductResponse } from '@/features/product/services/product.types';
import { ProductListingResponse } from '@/features/product/services/product-listing.types';
import { productTargets } from '@/features/product/constants';

const rootDir = path.resolve(__dirname, '../..');
const publicDir = path.resolve(rootDir, 'public');
const productsDir = path.resolve(publicDir, 'api/v1/products');

args.option('debug', 'Enable debug mode');
const FLAGS = args.parse(process.argv);

Logger.setDebugMode(FLAGS.debug);

async function fetchFileContent(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    Logger.debug(`Read content from ${filePath} successfully.`);
    return content;
  } catch (error) {
    Logger.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

function parseProductData(content: string): ProductListingResponse {
  try {
    return JSON.parse(content);
  } catch (error) {
    Logger.error('Error parsing product data:', error);
    throw error;
  }
}

async function fetchProductData() {
  const targetData: { [key: string]: ProductListingResponse } = {};

  for (const target of productTargets) {
    try {
      const filePath = path.join(productsDir, target, 'index.json');
      Logger.info(`Fetching data for target: ${target}`);
      const content = await fetchFileContent(filePath);
      const parsedData = parseProductData(content);
      targetData[target] = parsedData;
      Logger.info(`Data for target ${target} fetched successfully.`);
    } catch (error) {
      Logger.error(`Error processing target ${target}:`, error);
      continue; // Continue with the next target in case of error
    }
  }
  return targetData;
}

async function mergeAllProducts() {
  try {
    const mergedProducts: ProductResponse[] = [];
    const result = await fetchProductData();
    
    Object.keys(result).forEach((key) => {
      const { data } = result[key];
      mergedProducts.push(...data.products);
    });

    const meta = {
      count: Math.max(mergedProducts.length, 0),
      left: Math.max(mergedProducts.length, 0),
      pagination: {
        page: 1,
        total: Math.max(mergedProducts.length, 0),
      },
    };

    Logger.info('Merging all products into a single list...');
    const targetDir = path.join(productsDir, 'all');
    const targetFilePath = path.join(targetDir, 'index.json');
    
    await fs.mkdir(targetDir, { recursive: true });
    Logger.info(`Directory for 'all' target created or already exists!`);

    const dataToWrite: ProductListingResponse = {
      data: { products: mergedProducts },
      meta,
    };

    Logger.debug('Writing merged products to file:', targetFilePath);
    await fs.writeFile(targetFilePath, JSON.stringify(dataToWrite, null, 2));
    Logger.info(`Successfully wrote merged data to ${targetFilePath}`);

  } catch (error) {
    Logger.error('Error merging product data:', error);
    throw error;
  }
}

mergeAllProducts().catch((error) => {
  Logger.error('Unhandled error in mergeAllProducts function:', error);
});
