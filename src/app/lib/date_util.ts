export function formatDateToMySQL(date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}
