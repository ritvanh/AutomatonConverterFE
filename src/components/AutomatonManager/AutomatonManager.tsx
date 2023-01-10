import React, {useState} from "react";
import {
Flex
} from "@chakra-ui/react";;
import {StateManager} from "./StateManager";
import {TransitionManager} from "./TransitionManager";
import {AlphabetManager} from "./AlphabetManager";


const AutomatonManager = ({automaton, addState,removeState,toggleIsFinal,
                              toggleIsInitial,removeTransition,addTransition,
                              removeCharFromAlphabet,addCharToAlphabet}
                              :{automaton:Automaton,addState:(value:string)=>void,
                                removeState:(value:string)=>void,
                                toggleIsFinal:(value:string)=>void,
                                toggleIsInitial:(value:string)=>void,
                                removeTransition:(t:Transition)=>void,
                                addTransition:(fromStateValue:string,toStateValue:string,withInput:string)=>void,
                                removeCharFromAlphabet:(value:string)=>void,
                                addCharToAlphabet:(value:string)=>void
}) =>{
    return (
        <Flex>
            <StateManager aut={automaton} removeState={removeState}
                          addState={addState}
                          toggleIsFinal={toggleIsFinal}
                          toggleIsInitial={toggleIsInitial}></StateManager>
            <TransitionManager aut={automaton} removeTransition={removeTransition} addTransition={addTransition}></TransitionManager>
            <AlphabetManager aut={automaton} removeCharFromAlphabet={removeCharFromAlphabet} addCharToAlphabet={addCharToAlphabet}></AlphabetManager>
        </Flex>
    );
};

export default AutomatonManager;

export interface State{
    value:string;
    isFinal:boolean;
}
export interface Transition{
    from:string;
    to:string;
    withInput:string;
}
export interface Automaton{
    states:State[];
    initialState:string|null;
    allTransitions:Transition[];
    alphabet:string[];
}


