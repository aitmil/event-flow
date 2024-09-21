import * as fs from 'node:fs';
import path from 'node:path';

import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';

const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export function swaggerDocs() {
  try {
    console.log('Looking for Swagger file at:', SWAGGER_PATH);
    if (!fs.existsSync(SWAGGER_PATH)) {
      throw new Error('Swagger file not found');
    }
    const doc = JSON.parse(
      fs.readFileSync(SWAGGER_PATH, { encoding: 'utf-8' })
    );
    return [...swaggerUI.serve, swaggerUI.setup(doc)];
  } catch (error) {
    console.error('Error loading Swagger docs:', error.message);
    return (req, res, next) => {
      next(createHttpError(500, 'Cannot load swagger docs'));
    };
  }
}
