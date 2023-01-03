import React, {useState} from "react";
import {grey} from "@mui/material/colors";
import {
    Avatar, Badge,
    Box,
    Button,
    Checkbox, Flex,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr
} from "@chakra-ui/react";
import {DeleteIcon, PlusSquareIcon} from "@chakra-ui/icons";
import {StateManager} from "./StateManager";
import {TransitionManager} from "./TransitionManager";
import {AlphabetManager} from "./AlphabetManager";


const AutomatonManager = ({automaton}:{automaton:Automaton}) =>{
    const [aut,setAut] = useState(automaton);
    function removeState(value:string){
        let stateCopy = aut;
        stateCopy.states = stateCopy.states.filter(state => state.value != value);
        stateCopy.allTransitions = stateCopy.allTransitions.filter(transition => transition.from.value != value && transition.to.value != value);
        setAut(prevState => ({
            alphabet: prevState.alphabet,
            states: stateCopy.states,
            allTransitions: stateCopy.allTransitions
        }));
    }
    function toggleStateType(value:string){
        let stateCopy = aut;
    }
    function removeTransition(t:Transition){

    }
    function removeCharFromAlphabet(value:string){

    }
    return (
        <Flex>
            <StateManager aut={aut} removeState={removeState}></StateManager>
            <TransitionManager aut={aut} removeTransition={removeTransition}></TransitionManager>
            <AlphabetManager aut={aut} removeChar={removeCharFromAlphabet}></AlphabetManager>
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


