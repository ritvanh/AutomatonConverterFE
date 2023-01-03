import React from "react";
import {Automaton, Transition} from "./AutomatonManager";
import {grey} from "@mui/material/colors";
import {Avatar, Badge, Box, Button, Table, TableContainer, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import {DeleteIcon, PlusSquareIcon} from "@chakra-ui/icons";

export const TransitionManager = ({aut,removeTransition}:{aut:Automaton,removeTransition:(tran:Transition)=>void}) => {
    return (
        <Box sx={{maxWidth: 400,borderRadius:50,backgroundColor:grey}}>
    <Button bg='green'><PlusSquareIcon></PlusSquareIcon>Shto</Button>
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
                {transition.from.value}
                </Avatar>
                </Td>
                <Td>
                <Badge  colorScheme='purple'>{transition.withInput}</Badge>
                </Td>
                <Td>
                <Avatar
                    bg='gray.500' name=' '
                >
                {transition.to.value}
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