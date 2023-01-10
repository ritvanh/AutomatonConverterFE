import React from "react";
import {Automaton} from "./AutomatonManager";
import {Avatar, Box, Button, Checkbox, Table, TableContainer, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {AddStateModal} from "./AddRecordModals/AddStateModal";

export const StateManager = ({aut,addState,removeState,toggleIsFinal,
                                 toggleIsInitial}:{aut:Automaton,
                                addState:(value:string)=>void,
                                removeState:(value:string)=>void,
                                toggleIsFinal:(value:string)=>void,
                                toggleIsInitial:(value:string)=>void}) =>{
    return(
        <Box sx={{maxWidth: 550}} borderRadius='md'>
    <AddStateModal addState={addState}></AddStateModal>
    <TableContainer borderRadius='md' bg='lightgrey' border='2px solid black'>
    <Table variant="simple">
        <Thead>
            <Tr>
                <Td>
                    Gjendja
        </Td>
        <Td>
        Gjendje Finale?
        </Td>
        <Td>
            Gjendje fillestare?
        </Td>
        <Td>
        Veprime
        </Td>
        </Tr>
        </Thead>
        <Tbody>
        {aut.states.map((state) => {
                return(
                    <Tr>
                        <Td>
                            <Avatar
                                bg='gray.500'
                name={" "}
                >
                {state.value}
                </Avatar>
                </Td>
                <Td>
                <Checkbox onChange={() => toggleIsFinal(state.value)} isChecked={state.isFinal}></Checkbox>
                </Td>
                        <Td>
                            <Checkbox onChange={() => toggleIsInitial(state.value)} isChecked={state.value == aut.initialState}></Checkbox>
                        </Td>
                <Td>
                <Button colorScheme='red' onClick={() => removeState(state.value)}><DeleteIcon></DeleteIcon></Button>
                </Td>
                </Tr>
            )
            })}
        </Tbody>
        </Table>
        </TableContainer>
        </Box>
    );
};