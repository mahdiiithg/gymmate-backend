const { generateToken, verifyToken } = require('../src/utils/jwt');

describe('JWT Utilities', () => {
  // Set environment variables for testing
  process.env.JWT_SECRET = 'test_secret_key';
  process.env.JWT_EXPIRE = '1d';

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = generateToken(userId);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = generateToken(userId);
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(userId);
    });

    it('should return null for invalid token', () => {
      const decoded = verifyToken('invalid.token.here');
      
      expect(decoded).toBeNull();
    });

    it('should return null for expired token', () => {
      // Create token with 0 second expiry
      process.env.JWT_EXPIRE = '0s';
      const userId = '507f1f77bcf86cd799439011';
      const token = generateToken(userId);
      
      // Wait a bit and try to verify
      setTimeout(() => {
        const decoded = verifyToken(token);
        expect(decoded).toBeNull();
      }, 100);
      
      // Reset expire time
      process.env.JWT_EXPIRE = '1d';
    });
  });
});
