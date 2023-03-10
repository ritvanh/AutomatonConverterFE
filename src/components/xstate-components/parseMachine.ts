import * as XState from 'xstate';
import * as XStateModel from 'xstate/lib/model';
import * as XStateActions from 'xstate/lib/actions';
import realmsShim from 'realms-shim';

const realm = realmsShim.makeRootRealm();

const wrapCallbackToPreventThis =
  (callback: (...args: any[]) => void) =>
  (...args: any[]) => {
    return callback(...args);
  };

const windowShim = {
  setInterval: (callback: (...args: any[]) => void, ...args: any[]) => {
    return setInterval(wrapCallbackToPreventThis(callback), ...args);
  },
  setTimeout: (callback: (...args: any[]) => void, ...args: any[]) => {
    return setTimeout(wrapCallbackToPreventThis(callback), ...args);
  },
  clearTimeout: (...args: any[]) => {
    return clearTimeout(...args);
  },
  clearInterval: (...args: any[]) => {
    return clearInterval(...args);
  },
};

export const parseMachine = (source: string) => {
  const machines: Array<XState.StateNode> = [];

  const createMachineCapturer =
    (machineFactory: any) =>
    (...args: any[]) => {
      const machine = machineFactory(...args);
      machines.push(machine);
      return machine;
    };

  realm.evaluate(source, {
    exports: {},
    require: (sourcePath: string) => {
      switch (sourcePath) {
        case 'console':
          return console;
        case 'xstate':
          return {
            ...XState,
            createMachine: createMachineCapturer(XState.createMachine),
            Machine: createMachineCapturer(XState.Machine),
          };
        case 'xstate/lib/actions':
          return XStateActions;
        case 'xstate/lib/model':
          const { createModel } = XStateModel;
          return {
            ...XStateModel,
            createModel(initialContext: any, creators: any) {
              const model = createModel(initialContext, creators);
              return {
                ...model,
                createMachine: createMachineCapturer(model.createMachine),
              };
            },
          };
        default:
          throw new Error(`External module ("${sourcePath}") can't be used.`);
      }
    },
    ...windowShim,
  });

  return machines[0];
};
