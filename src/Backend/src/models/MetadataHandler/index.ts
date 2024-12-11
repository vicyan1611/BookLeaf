import { MetaAdder, adder as _adder } from "./MetaAdder";
import { MetaFinder, finder as _finder } from "./MetaFinder";

class MetadataHandler {
    public adder: MetaAdder = _adder;
    public finder: MetaFinder = _finder;
}

export const metaHandler = new MetadataHandler()