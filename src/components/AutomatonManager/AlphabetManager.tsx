import React from "react";
import {Automaton} from "./AutomatonManager";
import {Avatar, Box, Button, Table, TableContainer, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, PlusSquareIcon} from "@chakra-ui/icons";
import {AddCharacterModal} from "./AddRecordModals/AddCharacterModal";


export const AlphabetManager = ({aut,removeCharFromAlphabet,addCharToAlphabet}:{aut:Automaton,
                                removeCharFromAlphabet:(value:string)=>void,
                                addCharToAlphabet:(value:string)=>void}) =>{
    return (
        <Box sx={{maxWidth:230}}>
            <AddCharacterModal addCharacter={addCharToAlphabet}></AddCharacterModal>
            <TableContainer borderRadius='md' bg='lightgrey' border='2px solid black'>
                <Table>
                    <Thead>
                        <Tr>
                            <Td>
                                Karakteri
                            </Td>
                            <Td>
                                Veprime
                            </Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {aut.alphabet.map((char)=>{
                            return(
                                <Tr>
                                    <Td>
                                        <Avatar
                                            bg='gray.500'
                                            name={" "}
                                        >
                                            {char}
                                        </Avatar>
                                    </Td>
                                    <Td>
                                        <Button colorScheme='red' onClick={() => removeCharFromAlphabet(char)}><DeleteIcon></DeleteIcon></Button>
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