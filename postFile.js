import fs from 'fs'
import csv from "csv-parser";
import path from 'path'

export default function exportFiles(url) {
  const data = "./files"
  let csvs = fs.readdirSync(data).filter((e) => path.extname(e) === ".csv")
  if (!csvs.length) {
    throw "There isn't any csv files"
  }

  csvs.forEach((file) => {
    let parsedData = [];

    fs.createReadStream(path.join(data, file))
      .pipe(csv())
      .on("data", (data) => {
        parsedData.push(data);
      })
      .on("end", () => {
        if (!fs.existsSync(path.join("./", url))) {
          fs.mkdirSync(`./${url}`);
        }
        let fileName = `${path.basename(file, ".csv")}.json`;
        const writableFile = fs.createWriteStream(path.resolve(`./${url}`, fileName));
        writableFile.write(JSON.stringify(parsedData));
        writableFile.on("error", (err) => console.error(err));
        writableFile.on("finish", () => console.log(`Converted ${file} to JSON`));
        writableFile.end();
      });
  });

}

