import fs from 'fs';
import http from "http";
import exportFiles from './postFile.js';
import { getConvertedFiles, getFileData } from './getFile.js';
import deleteFile from './delete.js';

const server = http.createServer((req, res) => {

    res.writeHead(200)
    let url = req.url;
    let file_name = url.slice(7)
    const method = req.method;

    if (url === "/exports" && method === "POST") {
        //   postFile Function  // ---------------------------------------------------------------------------------
        exportFiles(url)
        //     // --------------------------------------------------------------------------------------------------
        return res.end("You've successfully converted files")
    } else if (url === "/files" && method === "GET") {
        // GET function 1-------------------------------------------------------------------------------------------------
        getConvertedFiles(res, file_name)
        // -----------------------------------------------------------------------------------------------------------
    } else if (url.startsWith("/files/") && method === "GET") {

        if (fs.existsSync(`./exports/${file_name}`)) {
            // GET function 2-----------------------------------------------------------------
            getFileData(res, file_name)
            // --------------------------------------------------------------------------------------------------------------------
        } else {
            return res.end("File doesn't found")
        }

    } else if (url.startsWith("/files/") && method === "DELETE") {
        if (fs.existsSync(`./exports/${file_name}`)) {
            // DELETE function deleteFile -----------------------------------------------------------------
            deleteFile(res, file_name)
            // --------------------------------------------------------------------------------------------------------------------
        } else {
            return res.end("File doesn't found")
        }
    } else {
        return res.end("File doesn't found")
    }
})


server.listen(3000, (err) => {
    if (err) {
        console.log("Sth went wrong");
    } else {
        console.log("the Server is listening to given port");
    }
})