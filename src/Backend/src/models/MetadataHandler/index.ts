import { MetaAdder, adder as _adder } from "./MetaAdder";
import { MetaFinder, finder as _finder } from "./MetaFinder";
import { MetaUpdater, updater as _updater } from './MetaUpdater'

class MetadataHandler {
    public adder: MetaAdder = _adder;
    public finder: MetaFinder = _finder;
    public updater: MetaUpdater = _updater;
}

export const metaHandler = new MetadataHandler()