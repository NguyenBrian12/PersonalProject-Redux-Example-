import axios from "axios";

export function SubmitInfo(payload) {
  return axios.post("/api/chineseZodiacs/", payload);
}
export function GetInfoById(id) {
  return axios.get("/api/chineseZodiacs/" + id);
}
export function UpdateInfo(payload) {
  return axios.put("/api/chineseZodiacs/" + payload.id, payload);
}
export function DeleteInfo(id) {
  return axios.delete("/api/chineseZodiacs/" + id);
}
export function GetZodiac(year, month, day) {
  return axios.get("/api/chineseZodiacs/" + year + "/" + month + "/" + day);
}
export function GetWebScrapper() {
  return axios.get("/api/chineseZodiacs/webScrapper");
}
