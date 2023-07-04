import fs from "fs";
import path from "path";


export default function deleteFile(res, file_name){
    const searched_json = fs.readdirSync("./exports").find((e) => e === file_name)
    fs.unlinkSync(path.resolve("exports", searched_json))
    res.write(`${searched_json} is deleted`)
    res.end()
}