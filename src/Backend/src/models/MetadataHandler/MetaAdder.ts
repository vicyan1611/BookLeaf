import { Book } from  '../Book';
import { NormalUser } from '../NormalUser';
import { usertype } from '../User';

import Bcrypt from "bcrypt"

export class MetaAdder {
    private static instance: any = null
    public constructor() {
        if (MetaAdder.instance === null) return new MetaAdder();
        else return MetaAdder.instance
    }
    private addNormalUser(username: string, password: string, email: string, avatarUrl: string) {
        
    }

    private addAdmin(username: string, password: string, email: string, avatarUrl: string) {

    }

    public addUser(username: string, password: string, email: string, avatarUrl: string, type: usertype) {

    }

    public addTag(username: string, tagName: string, description: string) {

    }

    public addLibrary(username: string, libName: string, libVisibility: boolean, libDownloadability: boolean) {

    }

    public addBook(username: string, description: string) {

    }

    public addNote(username: string, bookId: number, startPage: number, endPage: number, startCol: number, endCol: number, startLine: number, endLine: number, colorCode: string, note: string) {

    }

    public addBookmark(username: string, bookId: number, pageNumber: number) {

    }
}

export const adder = new MetaAdder()