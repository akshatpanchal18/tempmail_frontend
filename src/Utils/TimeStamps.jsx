import moment from "moment";

function Timestamp({timestamp}) {
  return moment(timestamp).fromNow();
}
export default Timestamp
// Example usage
// const timestamp = "2024-12-01T14:11:12.166Z";
// console.log(getRelativeTime(timestamp)); // Output: "2 minutes ago"
