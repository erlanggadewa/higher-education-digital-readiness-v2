import * as bcrypt from 'bcrypt';

export class HelperClass {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  static paginateArray(array: unknown[], pageNumber: number, pageSize: number) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
      paginatedArray: array.slice(startIndex, endIndex),
      totalPage: Math.ceil(array.length / pageSize),
    };
  }
}
