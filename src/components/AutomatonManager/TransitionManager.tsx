import React from "react";
import {Automaton, Transition} from "./AutomatonManager";
import {grey} from "@mui/material/colors";
import {Avatar, Badge, Box, Button, Table, TableContainer, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import {DeleteIcon, PlusSquareIcon} from "@chakra-ui/icons";
import {AddTransitionModal} from "./AddRecordModals/AddTransitionModal";

export const TransitionManager = ({aut,removeTransition,addTransition}:{aut:Automaton,
                                removeTransition:(t:Transition)=>void,
                                addTransition:(fromStateValue:string,toStateValue:string,withInput:string)=>void,}) => {
    return (
        <Box sx={{maxWidth: 400,borderRadius:50,backgroundColor:grey}}>
    <AddTransitionModal addTransition={addTransition} states={aut.states} alphabet={aut.alphabet}></AddTransitionModal>
    <TableContainer borderRadius='md' bg='lightgrey' border='2px solid black'>
        <Table>
            <Thead>
                <Tr>
                    <Td>Nga</Td>
        <Td>Inputi</Td>
        <Td>Tek</Td>
        <Td>Veprime</Td>
        </Tr>
        </Thead>
        <Tbody>
        {aut.allTransitions.map((transition)=>{
                return(
                    <Tr>
                        <Td>
                            <Avatar
                                bg='gray.500' name=' '
                >
                {transition.from}
                </Avatar>
                </Td>
                <Td>
                <Badge  colorScheme='purple'>{transition.withInput}</Badge>
                </Td>
                <Td>
                <Avatar
                    bg='gray.500' name=' '
                >
                {transition.to}
                </Avatar>
                </Td>
                <Td>
                <Button colorScheme='red' onClick={() => removeTransition(transition)}><DeleteIcon></DeleteIcon></Button>
                </Td>
                </Tr>
            );
            })}
        </Tbody>
        </Table>
        </TableContainer>
        </Box>
    );
};