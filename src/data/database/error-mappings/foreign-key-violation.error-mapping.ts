import { ErrorMapping } from '@utils/error';
import { isForeignKeyViolation } from '../utils';
import { RecordNotFoundError } from '../errors';

export const foreignKeyViolation = (
  constraint: string,
  message: string
): ErrorMapping => ({
  isError: isForeignKeyViolation(constraint),
  newError: () => new RecordNotFoundError(message),
});
