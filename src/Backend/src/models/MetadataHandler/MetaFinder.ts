import { Book } from  '../Book';
import { NormalUser } from '../NormalUser';
import { usertype } from '../User';

export class MetaFinder {
  static #instance: MetaFinder;

  public static get instance(): MetaFinder {
      if (!MetaFinder.#instance) MetaFinder.#instance = new MetaFinder();
      return MetaFinder.#instance;
  }

  private constructor() {}
  
  public async findNormalUser(criteria: any, projection: any) {
    criteria = criteria as typeof criteria & {
      username: string,
      password: string,
      email: string
    }
    if (!criteria.username) delete criteria.username
    if (!criteria.password) delete criteria.password
    if (!criteria.email) delete criteria.email
    if (Object.keys(criteria).length === 0) return null
    const res = await NormalUser.find(criteria, projection)
    console.log(res)
    switch (res.length) {
      case 0:
        return null
      case 1:
        return res[0]
      default:
        throw new Error('Database Error: more than 1 user found')
    }
  }

  public findAdmin(criteria: Object) {

  }

  public findAllTagsByUser(username: string) {

  }

  public findAllBooksByUser(username: string) {

  }

  public findBookByUser(username: string, bookId: number) {

  }

  public findAllNotesByBook(username: string, bookId: number) {

  }

  public findAllBookmarksByBook(username: string, bookId: number) {

  }

  public findAllAnnotationsByBook(username: string, bookId: number) {
    this.findAllNotesByBook(username, bookId);
    this.findAllBookmarksByBook(username, bookId);
  }
}

export const finder = MetaFinder.instance;