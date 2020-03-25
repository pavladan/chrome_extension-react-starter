import mjson from "../../manifest.json";

export default chrome.runtime.connect({
  name: mjson.name + "-popup"
});
