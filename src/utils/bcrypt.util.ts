import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => (
  bcrypt.hash(password, 2)
);

const comparePassword = async (password: string, hash: string): Promise<boolean> => (
  bcrypt.compare(password, hash)
);

const bcryptUtils = {
  hashPassword,
  comparePassword,
};

export default bcryptUtils;
