import { ErrorMapping } from '@utils/error';
import { isUniqueViolation } from '../utils';
import { DuplicateRecordError } from '../errors';

export const uniqueViolation = (
  constraint: string,
  message: string
): ErrorMapping => ({
  isError: isUniqueViolation(constraint),
  newError: () => new DuplicateRecordError(message),
});
