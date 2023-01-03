import React from "react";
import {Automaton} from "./AutomatonManager";
import {Avatar, Box, Button, Checkbox, Table, TableContainer, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import {DeleteIcon, PlusSquareIcon} from "@chakra-ui/icons";

export const StateManager = ({aut,removeState}:{aut:Automaton,removeState:(value:string)=>void}) =>{
    return(
        <Box sx={{maxWidth: 400}} borderRadius='md'>
    <Button bg='green'><PlusSquareIcon></PlusSquareIcon>Shto</Button>
    <TableContainer borderRadius='md' bg='lightgrey' border='2px solid black'>
    <Table variant="simple">
        <Thead>
            <Tr>
                <Td>
                    Gjendja
        </Td>
        <Td>
        Eshte gjendje finale?
        </Td>
        <Td>
        Hiqe
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
                <Checkbox isChecked={state.isFinal}></Checkbox>
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