import 'mocha';
import { expect } from 'chai';

import Movimento from '../../../src/database/models/movimentos.model';

describe('Model "Movimento":', () => {
  const movimento = new Movimento();

  it('should have the follow properties: "tipo"', () => {
    ['tipo'].forEach((property) => {
      expect(movimento).to.have.property(property);
    });
  });
});
