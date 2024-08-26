import { error } from "console";
import { readFile } from "fs/promises";
import path from "path";

const json = [];

function getValuesFromLine(line) {
  const isLocalityNameInQuotes = line.includes('"');
  if (!isLocalityNameInQuotes) {
    return line.trim().split(",");
  }
  const [cityNameWithComma, localityName, restData] = line.split('"');
  const cityName = cityNameWithComma.replace(",", "");
  const rest = restData.split(",").slice(1);
  return [cityName, localityName, ...rest];
}

const CSVtoJson = async () => {
  const isDataEmpty = json.length === 0;
  if (!isDataEmpty) {
    return json;
  }
  const filePath = path.join(process.cwd(), "src", "app", "util", "data.csv");
  try {
    const data = await readFile(filePath, { encoding: "utf-8" });
    const lines = data.split("\r\n");
    let attributes = [];

    lines.forEach((line, index) => {
      if (index === 0) {
        attributes = line.split(",");
      }

      const values = getValuesFromLine(line);

      const item = {};

      values.forEach((value, index) => {
        if (!value) {
          return;
        }
        const attribute = attributes[index];
        item[attribute] = value;
      });
      json.push(item);
    });
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default CSVtoJson;
