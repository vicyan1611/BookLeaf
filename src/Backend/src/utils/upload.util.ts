import multer from "multer";
import { decode } from "base64-arraybuffer";
import supabase from "./storage.util";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadSupabase = async (file: Array<Express.Multer.File>) => {
    const urls = [];
    for (let i = 0; i < file.length; i++) {
        const buffer = decode(file[i].buffer.toString("base64"));
        const filename = `${Date.now()}-${file[i].originalname.replace(/\s/g, "")}`;
        const { data, error } = await supabase.storage.from("books").upload(filename, buffer);
        if (error) {
            throw error;
        }
        const {data: publicURL} = await supabase.storage.from("books").getPublicUrl(filename);
        urls.push(publicURL);
    }
    return urls;
}

export { uploadSupabase };
export default upload;