const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const toCamel = require("./toCamel.js");
const cheerio = require("cheerio");
const axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const getZodiac = (year, month, day) => {
  return axios(
    "https://fengshui-api.com/api/v1/findChineseSignOfYear?token=5m52Ca7e5aD2j9b459Z32523c885765DRZc9587E&year=" +
      year +
      "&month=" +
      month +
      "&day=" +
      day +
      "&gender=0"
  )
    .then(result => {
      console.log(result.data.result);
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
};
const getWebScrapper = () => {
  function cleanString(str) {
    return str
      .replace(/\t+-/g, "")
      .replace(/\s+/g, " ")
      .replace(/^\s+|\s+$/g, "");
  }

  async function process() {
    const response = await axios.get(
      "https://www.travelchinaguide.com/intro/social_customs/zodiac/compatibility.htm"
    );

    const $ = cheerio.load(response.data);

    const table = $(".table1.xxtb");

    const headers = table
      .find("tr:first-child td:not(:first-child)")
      .toArray()
      .map(td => $(td).text());
    console.log(headers);
    const result = {};

    table.find("tr:not(:first-child)").each((i, tr) => {
      const tds = $(tr)
        .find("td")
        .toArray()
        .map(td => cleanString($(td).text()));

      const rowResult = {};
      for (let i = 1; i < tds.length; i++) {
        rowResult[headers[i - 1]] = tds[i];
      }

      console.log(rowResult);
      const rowHeader = tds[0];
      result[rowHeader] = rowResult;
    });
    console.log(JSON.stringify(result));
    await mssql.executeProc("WebScrapper_Insert", sqlRequest => {
      sqlRequest.addParameter(
        "WebScrapper",
        TYPES.NVarChar,
        JSON.stringify(result)
      );
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    });
    return result;
  }

  return process();
};
const getById = id => {
  return mssql
    .executeProc("ChineseZodiacs_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      const convertToCamel = toCamel(response.resultSets[0]);
      return convertToCamel;
    });
};
const post = item => {
  return mssql
    .executeProc("ChineseZodiacs_Insert", sqlRequest => {
      sqlRequest.addParameter("FirstName", TYPES.NVarChar, item.firstName, {
        length: 50
      });
      sqlRequest.addParameter("LastName", TYPES.NVarChar, item.lastName, {
        length: 50
      });
      sqlRequest.addParameter("BirthYear", TYPES.Int, item.birthYear);
      sqlRequest.addParameter("BirthMonth", TYPES.Int, item.birthMonth);
      sqlRequest.addParameter("BirthDay", TYPES.Int, item.birthDay);
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    });
};
const put = item => {
  console.log(item);
  return mssql
    .executeProc("ChineseZodiacs_Update", sqlRequest => {
      sqlRequest.addParameter("FirstName", TYPES.NVarChar, item.firstName, {
        length: 50
      });
      sqlRequest.addParameter("LastName", TYPES.NVarChar, item.lastName, {
        length: 50
      });
      sqlRequest.addParameter("BirthYear", TYPES.Int, item.birthYear);
      sqlRequest.addParameter("BirthMonth", TYPES.Int, item.birthMonth);
      sqlRequest.addParameter("BirthDay", TYPES.Int, item.birthDay);
      sqlRequest.addOutputParameter("Id", TYPES.Int, item.id);
    })
    .then(response => {
      return true;
    });
};
const del = id => {
  return mssql.executeProc("ChineseZodiacs_Delete", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
  });
};
module.exports = {
  getZodiac,
  getWebScrapper,
  getById,
  post,
  put,
  del
};
