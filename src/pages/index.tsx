import React, {useState} from 'react';
import {MachineVisualizer} from "../components/xstate-components/MachineVisualizer";
import {createMachine} from "xstate";
import AutomatonManager from "../components/AutomatonManager/AutomatonManager";
import {Automaton,State,Transition} from "../components/AutomatonManager/AutomatonManager";
import {Button, useToast} from "@chakra-ui/react";
const fetchMachineConfig = {
    'id': 'fetch',
    'initial': '0',
    states: {
        '0': {
            on: {
                'FETCH': 'loading'
            }
        },
        'loading': {
            on: {
                'RESOLVE': 'success',
                'REJECT': 'failure'
            }
        },
        'success': {
            on: {
                'kthehu' : 'success',
                'ik':'loading'
            },
            meta: true,
        },
        'failure': {
            on: {
                'RETRY': '0'
            }
        }
    }
}
const fetchMachine = createMachine(fetchMachineConfig);
const alphabet:string[] = ["E"]
const myAutomaton:Automaton = {
    alphabet:alphabet,
    allTransitions:[],
    states:[]
}

const Index = () => {
    const toast = useToast();
    const [aut,setAut] = useState(myAutomaton);
    const [machine,setMachine] = useState(fetchMachine);
    function addState(value:string){
        if(getStateByValue(value) == null){
            let statesCopy = aut.states;
            let newState:State = {
                value:value,
                isInitial:false,
                isFinal:false
            }
            statesCopy.push(newState);
            setAut(prevState => ({
                allTransitions:prevState.allTransitions,
                states:statesCopy,
                alphabet:prevState.alphabet
            }));
            toast({
                title: `Gjendja u shtua`,
                status: "success",
                isClosable: true,
            })
        }else{
            toast({
                title: `Gjendja ekzistoj`,
                status: "error",
                isClosable: true,
            })
        }
    }
    function removeState(value:string){
        if(getStateByValue(value) != null){
            let statesCopy = aut.states.filter(x=>x.value != value);
            let transitionsCopy = aut.allTransitions.filter(x=> x.from != value && x.to != value);
            setAut(prevState => ({
                states:statesCopy,
                allTransitions:transitionsCopy,
                alphabet:prevState.alphabet
            }));
            toast({
                title: `Gjendja u hoq`,
                status: "success",
                isClosable: true,
            })
        }else{
            toast({
                title: `Gjendja nuk u gjet`,
                status: "error",
                isClosable: true,
            })
        }
    }
    function toggleIsFinal(value:string){
        let stateToUpdate = getStateByValue(value);
        if(stateToUpdate != null){
            let statesCopy = aut.states;
            statesCopy.forEach((s)=>{
                if(s.value == value){
                    s.isFinal = !s.isFinal;
                }
            })
            setAut(prevState => ({
                states:statesCopy,
                allTransitions:prevState.allTransitions,
                alphabet:prevState.alphabet
            }));
            toast({
                title: `Gjendja u ndryshua`,
                status: "success",
                isClosable: true,
            })
        }else{
            toast({
                title: `Gjendja nuk u gjet`,
                status: "error",
                isClosable: true,
            })
        }
    }
    function toggleIsInitial(value:string){
        let stateToUpdate = getStateByValue(value);
        if(stateToUpdate != null){
            let statesCopy = aut.states;
            if(!stateToUpdate.isInitial){
                statesCopy.forEach((st)=>{
                    if(st.isInitial){
                        st.isInitial = false;
                    }
                    if(st.value == value){
                        st.isInitial = true;
                    }
                });
            }else{
                statesCopy.forEach((st)=>{
                    if(st.value == value){
                        st.isInitial = false;
                    }
                });
                toast({
                    title: `Tashme nuk keni gjendje fillestare`,
                    status: "info",
                    isClosable: true,
                });
            }
            setAut(prevState => ({
                states:statesCopy,
                allTransitions:prevState.allTransitions,
                alphabet:prevState.alphabet
            }));
            toast({
                title: `Gjendja u ndryshua`,
                status: "success",
                isClosable: true,
            })

        }else{
            toast({
                title: `Gjendja nuk u gjet`,
                status: "error",
                isClosable: true,
            })
        }
    }
    function removeTransition(t:Transition){
        let currenTransitions = aut.allTransitions;
        let indexToRemove = currenTransitions.indexOf(t);
        if(indexToRemove == -1){
            toast({
                title: `Kalimi nuk u gjet`,
                status: "error",
                isClosable: true,
            })
        }else{
            currenTransitions = currenTransitions.filter(tran=>tran!=t);
            setAut(prevState => ({
                states: prevState.states,
                alphabet: prevState.alphabet,
                allTransitions: currenTransitions
            }));
            toast({
                title: "Kalimi u fshi",
                status: "success",
                isClosable: true,
            })
        }
    }
    function addTransition(fromStateValue:string,toStateValue:string,withInput:string){
        let transitionsCopy = aut.allTransitions;
        if(getTransition(fromStateValue,toStateValue,withInput) == null){
            const newTransition:Transition = {
                from:fromStateValue,
                to:toStateValue,
                withInput:withInput
            };
            transitionsCopy.push(newTransition);
            setAut(prevState => ({
                states:prevState.states,
                alphabet:prevState.alphabet,
                allTransitions:transitionsCopy
            }));
            toast({
                title: `Kalimi u shtua`,
                status: "success",
                isClosable: true,
            })
        }else{
            toast({
                title: `Kalimi ekziston`,
                status: "error",
                isClosable: true,
            })
        }
    }
    function removeCharFromAlphabet(value:string){
        if(value!="E") {
            let alphabetCopy = aut.alphabet;
            let indexToRemove = alphabetCopy.indexOf(value);
            if (indexToRemove == -1) {
                toast({
                    title: `Karakteri nuk u gjet`,
                    status: "error",
                    isClosable: true,
                })
            } else {
                alphabetCopy = alphabetCopy.filter(char => char != value);
                let transitionCopy = aut.allTransitions.filter(tran => tran.withInput != value);
                setAut(prevState => ({
                    states: prevState.states,
                    alphabet: alphabetCopy,
                    allTransitions: transitionCopy
                }));
                toast({
                    title: `Karakteri u fshi`,
                    status: "success",
                    isClosable: true,
                })
            }
        }else{
            toast({
                title: "Nuk mund te fshini ε(epsilon)",
                status: "error",
                isClosable: true,
            })
        }
    }
    function addCharToAlphabet(value:string){
        let alphabetCopy = aut.alphabet;
        let indexOfExistingChar = alphabetCopy.indexOf(value);
        if(indexOfExistingChar!=-1){
            toast({
                title: `Karakteri ekziston ne alfabet`,
                status: "error",
                isClosable: true,
            })
        }else{
            alphabetCopy.push(value);
            setAut(prevState => ({
                states:prevState.states,
                allTransitions:prevState.allTransitions,
                alphabet:alphabetCopy
            }));
            toast({
                title: `Karakteri u shtua ne alfabet`,
                status: "success",
                isClosable: true,
            })
        }
    }
    function getStateByValue(value:string):State|null{
        let filteredStates = aut.states.filter(x=>x.value == value);
        if(filteredStates.length>0){
            return filteredStates[0];
        }else{
            return null;
        }
    }
    function getTransition(fromStateValue:string,toStateValue:string,withInput:string):Transition|null{
        let filteredTransitions = aut.allTransitions.filter(x=>x.to == toStateValue && x.from == fromStateValue && x.withInput == withInput);
        if(filteredTransitions.length>0){
            return filteredTransitions[0];
        }else{
            return null;
        }
    }
    function posto() {
        fetch('Automaton/aut', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aut)
        })
            .then(res => res.json())
            .then((result) => {
                setMachine(prevState => (createMachine(result)));
            }, (error) => {
                toast({
                    title: error.message,
                    status: "error",
                    isClosable: true,
                })
            })
    }
  return (
          <div>
              <Button onClick={()=>posto()}>Posto</Button>
              <AutomatonManager automaton={aut}
                                addState={addState}
                                removeState={removeState}
                                toggleIsFinal={toggleIsFinal}
                                toggleIsInitial={toggleIsInitial}
                                removeTransition={removeTransition}
                                addTransition={addTransition}
                                removeCharFromAlphabet={removeCharFromAlphabet}
                                addCharToAlphabet={addCharToAlphabet}
              ></AutomatonManager>
              <MachineVisualizer machine={machine}></MachineVisualizer>
          </div>
  );
};

export default Index;

