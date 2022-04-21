export default function timeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
