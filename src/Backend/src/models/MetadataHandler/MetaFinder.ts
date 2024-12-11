import { Book } from  '../Book';
import { NormalUser } from '../NormalUser';
import { usertype } from '../User';

export class MetaFinder {
    private static instance: any = null
    public constructor() {
        if (MetaFinder.instance === null) return new MetaFinder();
        else return MetaFinder.instance
    }
    private async findNormalUser(criteria: any) {
      criteria = criteria as typeof criteria & {
        username: string,
        password: string
      }
      if (criteria.username && criteria.password) {
        try {
          const res = await NormalUser.find({username: criteria.username, password: criteria.password})
          switch (res.length) {
            case 0:
              return null
            case 1:
              return true
            default:
              throw new Error('Database Error: more than 1 user found')
          }
        } catch (err) {
          console.error(err)
        }
      }
      return false
    }

    private findAdmin(criteria: Object) {

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

export const finder = new MetaFinder()