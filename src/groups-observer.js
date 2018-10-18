const store = {}

export default {
  methods: {
    registerNestable (nestable) {
      let storeGroup = this._getByGroup(nestable.group)

      storeGroup.onDragStartListeners.push(nestable.onDragStart)
      storeGroup.onMouseEnterListeners.push(nestable.onMouseEnter)
    },

    notifyDragStart (group, event, item) {
      let storeGroup = this._getByGroup(group)

      for (let listener of storeGroup.onDragStartListeners) {
        listener(event, item)
      }
    },

    notifyMouseEnter (group, event, eventList, item) {
      let storeGroup = this._getByGroup(group)

      for (let listener of storeGroup.onMouseEnterListeners) {
        listener(event, eventList, item)
      }
    },

    _getByGroup (group) {
      // the group already exists, return the reference
      if (store[group]) {
        return store[group]
      }

      // otherwise create a new object for the group
      store[group] = {
        onDragStartListeners: [],
        onMouseEnterListeners: [],
        onDragStart: [],
        dragItem: null
      }

      return store[group]
    }
  }
}
