import { Book } from  '../Book';
import { NormalUser } from '../NormalUser';
import { usertype } from '../User';

export class MetaUpdater {
  static #instance: MetaUpdater;

  public static get instance(): MetaUpdater {
      if (!MetaUpdater.#instance) MetaUpdater.#instance = new MetaUpdater();
      return MetaUpdater.#instance;
  }

  private constructor() {}
}

export const updater = MetaUpdater.instance;