import * as bcrypt from 'bcrypt';

export class HelperClass {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
