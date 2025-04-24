import { User } from '../types'

export const getUserChanges = (original: User, updated: User): string[] => {
  const changes: string[] = []

  if (original.name !== updated.name) {
    changes.push(`имя пользователя с "${original.name}" на "${updated.name}"`)
  }

  if (original.role !== updated.role) {
    changes.push(`роль пользователя ${updated.name} с "${original.role}" на "${updated.role}"`)
  }

  if (original.accessLevel !== updated.accessLevel) {
    changes.push(`уровень доступа пользователя ${updated.name} с ${original.accessLevel} на ${updated.accessLevel}`)
  }

  return changes
}

export const isNameValid = (name: string): boolean => !!name.trim()

export const isAccessLevelValid = (level: number): boolean => level >= 1 && level <= 5

export const isEmailValid = (email: string): boolean => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

export const createLogMessage = (changes: string[]): string =>
  `Admin изменил ${changes.join(', ')} в ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`
