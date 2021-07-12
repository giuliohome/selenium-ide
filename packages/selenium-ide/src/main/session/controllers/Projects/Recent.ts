import storage from '../../../storage'
import { Session } from '../../../types'

const addToBeginning = (prevList: string[], entry: string) => {
  const list = prevList.slice()
  const entryIndex = list.indexOf(entry)
  const entryIsIndexed = entryIndex !== -1
  if (entryIsIndexed) {
    list.splice(entryIndex, 1)
  }
  list.unshift(entry)
  while (list.length > 10) {
    list.pop()
  }
  return list
}

export default class RecentProjectsController {
  constructor(session: Session) {
    this.session = session
  }
  session: Session
  add(filepath: string) {
    const entries = storage.get<'recentProjects'>('recentProjects', [])
    const newEntries = addToBeginning(entries, filepath)
    storage.set<'recentProjects'>('recentProjects', newEntries)
    this.session.app.addRecentDocument(filepath)
  }
  clear() {
    storage.set<'recentProjects'>('recentProjects', [])
    this.session.app.clearRecentDocuments()
    return true
  }
  get(): string[] {
    return storage.get<'recentProjects'>('recentProjects', [])
  }
}
