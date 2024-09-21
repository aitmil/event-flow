import * as fs from 'node:fs';
import path from 'node:path';

import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';

const SWAGGER_PATH = path.resolve('docs', 'swagger.json');

export function swaggerDocs() {
  try {
    const doc = JSON.parse(
      fs.readFileSync(SWAGGER_PATH, { encoding: 'utf-8' })
    );
    return [...swaggerUI.serve, swaggerUI.setup(doc)];
  } catch {
    return (req, res, next) => {
      next(createHttpError(500, 'Cannot load swagger docs'));
    };
  }
}
