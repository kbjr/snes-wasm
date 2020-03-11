
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { SNES } from '../../lib';

describe('SNES', () => {
    it('should exist', () => {
        expect(typeof SNES).to.eq('function');
    });
});
