import React from 'react';
import {MachineVisualizer} from "../components/xstate-components/MachineVisualizer";
import {createMachine} from "xstate";
import {Button} from '@chakra-ui/react';
import AutomatonManager from "../components/AutomatonManager";
import {Automaton,State,Transition} from "../components/AutomatonManager";
const fetchMachine = createMachine({
    id: 'fetch',
    initial: '0',
    states: {
        0: {
            on: {
                FETCH: 'loading'
            }
        },
        loading: {
            on: {
                RESOLVE: 'success',
                REJECT: 'failure'
            }
        },
        success: {
            type: 'final'
        },
        failure: {
            on: {
                RETRY: '0'
            }
        }
    }
});
const state1:State = {
    value:"q0",
    isFinal:false,
    isInitial:true
}
const state2:State = {
    value:"q1",
    isFinal:true,
    isInitial:false
}
const trans1:Transition = {
    from:state1,
    to:state2,
    withInput:"a"
}
const alphabet:string[] = ["a","b"]
const allTrans:Transition[] = [trans1]
const aut:Automaton = {
    alphabet:alphabet,
    allTransitions:allTrans,
    states:[state1,state2]
}
export const Index = () => {
  return (
          <div>
              <AutomatonManager automaton={aut}></AutomatonManager>
          </div>
  );
};

export default Index;
