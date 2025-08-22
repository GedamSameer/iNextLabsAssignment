export function nanoid(size = 12){
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''
  for (let i=0; i<size; i++){
    const idx = Math.floor(Math.random() * chars.length)
    id += chars[idx]
  }
  return id
}
