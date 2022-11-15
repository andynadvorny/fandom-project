import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";

interface ConfirmDeleteProps {
  isOpen: boolean;
  cancelRef: any;
  onClose: () => void;
  handleDelete: (event: any) => void;
}

export function ConfirmDelete({isOpen, cancelRef, onClose, handleDelete} : ConfirmDeleteProps) {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bgColor='gray.900'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Community
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete this community? The data will be lost forever.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="whiteAlpha">
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}