export type User = {
    id: string
    name: string
    email: string
    role: 'Аналитик' | 'Оператор' | 'Администратор'
    accessLevel: number
  }
  
  export type Log = {
    id: string
    message: string
    timestamp: string
  }
  