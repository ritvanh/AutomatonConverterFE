import React, {useState} from "react";
import {
    Button, FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

export const AddCharacterModal = ({addCharacter}:{addCharacter:(value:string)=>void}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [input,setInput] = useState("")
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
                            <FormLabel>Karakteri</FormLabel>
                            <Input value={input} onChange={e => setInput(e.target.value)} ref={initialRef} placeholder='shkruani karakterin ketu' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>{addCharacter(input)}} colorScheme='blue' mr={3}>
                            Ruaj
                        </Button>
                        <Button onClick={onClose}>Anulo</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


