function emptyAction() {
  // console.warn("Current execute action is empty!");
}

class Actions {
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction
  };

  setActions(actions) {
    this.actions = actions;
  }

  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange ? this.actions.onGlobalStateChange(...args) : emptyAction();
  }

  setGlobalState(...args) {
    return this.actions.setGlobalState ? this.actions.setGlobalState(...args) : emptyAction();
  }
}

const actions = new Actions();
export default actions;