import React, {useState} from "react";
import {
    Button, FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    useDisclosure
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {State} from "../AutomatonManager";

export const AddTransitionModal = ({addTransition,states,alphabet}:{addTransition:(from:string,to:string,input:string)=>void,states:State[],alphabet:string[]}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [input,setInput] = useState("")
    const [from,setFrom] = useState("")
    const [to,setTo] = useState("")
    return(
        <>
            <Button bg='green' ref={finalRef} onClick={onOpen}><AddIcon></AddIcon>Shto</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Shto karakter ne alfabet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Gjendja nga vjen kalimi</FormLabel>
                            <Select onChange={(e)=>{setFrom(e.target.value)}} placeholder='Zgjidh gjendje'>
                                {states.map((st)=>{
                                    return(
                                      <option value={st.value}>{st.value}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Inputi</FormLabel>
                            <Select onChange={(e)=>{setInput(e.target.value)}} placeholder='Zgjidh karakter'>
                                {alphabet.map((ch)=>{
                                    return(
                                        <option value={ch}>{ch}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Gjendja ku shkon kalimi</FormLabel>
                            <Select onChange={(e)=>{setTo(e.target.value)}} placeholder='Zgjidh gjendje'>
                                {states.map((st)=>{
                                    return(
                                        <option value={st.value}>{st.value}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>{addTransition(from,to,input)}} colorScheme='blue' mr={3}>
                            Ruaj
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


