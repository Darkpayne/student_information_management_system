import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React from 'react'

const ConfirmationDialog = ({
  onDelete,
  isDeleting,
}: {
  onDelete: () => void;
  isDeleting: boolean;
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button colorPalette="red" variant="solid" size="sm">
          Delete
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure you want to Delete?</Dialog.Title>
            </Dialog.Header>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" size={"sm"}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                loading={isDeleting}
                colorPalette={"red"}
                variant="solid"
                size="sm"
                onClick={onDelete}
              >
                Yes, Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmationDialog