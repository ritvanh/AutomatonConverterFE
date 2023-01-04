import React, {useState} from "react";
import {
Flex
} from "@chakra-ui/react";;
import {StateManager} from "./StateManager";
import {TransitionManager} from "./TransitionManager";
import {AlphabetManager} from "./AlphabetManager";


const AutomatonManager = ({automaton}:{automaton:Automaton}) =>{
    function addState(value:string){

    }
    function removeState(value:string){
    }
    function toggleIsFinal(value:string){
    }
    function toggleIsInitial(value:string){

    }

    function removeTransition(t:Transition){

    }
    function addTransition(fromStateValue:string,toStateValue:string,withInput:string){

    }

    function removeCharFromAlphabet(value:string){

    }
    function addCharToAlphabet(value:string){

    }
    return (
        <Flex>
            <StateManager aut={automaton} removeState={removeState}></StateManager>
            <TransitionManager aut={automaton} removeTransition={removeTransition}></TransitionManager>
            <AlphabetManager aut={automaton} removeChar={removeCharFromAlphabet}></AlphabetManager>
        </Flex>
    );
};

export default AutomatonManager;

export interface State{
    value:string;
    isFinal:boolean;
    isInitial:boolean;
    stateTransitions?:Transition[];
}
export interface Transition{
    from:State;
    to:State;
    withInput:string;
}
export interface Automaton{
    states:State[];
    allTransitions:Transition[];
    alphabet:string[];
}


