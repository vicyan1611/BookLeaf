import https from 'https';
import url from 'url';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import { resolve } from 'path';

class Metadata{
    title?: string;
    publisher?: string;
    description?: string;
    language?: string;
    author?: string[];
    date?: string;
    coverImage?: string;
    subjects?: string[];
    
    constructor(title?: string, publisher?: string, description?: string, language?: string, author?: string[], date?: string, subjects?: string[], coverImage?: string){
        this.title = title;
        this.publisher = publisher;
        this.description = description;
        this.language = language;
        this.author = author;
        this.date = date;
        this.subjects = subjects;
        this.coverImage = coverImage;
    }
    static async getEPUBMetadata(filepath: string): Promise<Object>{
        let data: Buffer[] = [], dataLen = 0, container;
        const fetchEPUB = async (filepath: string) => {
            return new Promise((resolve, reject) => {
                https.get(url.parse(filepath), (res) => {
                    if (res.statusCode !== 200) {
                        console.error("Error fetching EPUB file");
                        throw new Error("Error fetching EPUB file");
                    }
                    res.on("data", (chunk) => {
                        data.push(chunk);
                        dataLen += chunk.length;
                    });
                    res.on("end", () => {
                        resolve(Buffer.concat(data, dataLen));
                    });
                }).on("error", (error) => {
                    console.error("Error fetching EPUB file:", error);
                    throw error;
                });
            });
        }

        try{
            const epub = await fetchEPUB(filepath);
            const zip = new JSZip();
            const content = await zip.loadAsync(epub as Buffer);
            const containerPath = content.file("META-INF/container.xml");
            if(!containerPath){
                console.error("Error reading container.xml");
                throw new Error("Error reading container.xml");
            }
            const containerData = await containerPath.async("text");
            const parser = new XMLParser({
                ignoreAttributes: false,
                attributeNamePrefix: "",
                parseAttributeValue: true,
                allowBooleanAttributes: true
            });
            container = parser.parse(containerData);
            const rootfile = container.container.rootfiles.rootfile;
            const rootfilePath = rootfile["full-path"];
            if(!rootfilePath || !rootfile){
                console.error("Error reading rootfile path");
                throw new Error("Error reading rootfile path");
            }
            const opfPath = content.file(rootfilePath);
            if(!opfPath){
                console.error("Error reading OPF file");
                throw new Error("Error reading OPF file");
            }
            const opfData = await opfPath.async("text");
            const opf = parser.parse(opfData);
            const data = opf.package.metadata;
            const metadata = {
                title: data["dc:title"],
                publisher: data["dc:publisher"],
                description: data["dc:description"],
                language: data["dc:language"],
                author: data["dc:creator"],
                date: data["dc:date"],
                subjects: data["dc:subject"],
                coverImage: data.meta.find((meta: any) => meta.name === "cover")?.content + ".jpg"
            }
            return metadata;
        }
        catch(error){
            console.error("Error fetching EPUB metadata:", error);
            throw error;
        }
    }
}

export default Metadata;