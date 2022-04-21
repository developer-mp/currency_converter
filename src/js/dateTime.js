export default function dateTime() {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let minAdj = [min].map((x) => `${x}`.padStart(2, "0")).join(":");
  let secAdj = [sec].map((x) => `${x}`.padStart(2, "0")).join(":");
  let day = today.getDate();
  let month = monthNames[today.getMonth()];
  let year = today.getFullYear();
  let dateTime =
    month + " " + day + ", " + year + " " + hour + ":" + minAdj + ":" + secAdj;
  return dateTime;
}
