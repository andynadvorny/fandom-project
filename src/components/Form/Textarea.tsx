import { forwardRef, ForwardRefRenderFunction } from "react"
import { FormControl, FormErrorMessage, FormLabel, Textarea as ChakraTextarea, TextareaProps as ChakraTextareaProps } from "@chakra-ui/react"

interface TextareaProps extends ChakraTextareaProps {
  name: string,
  label?: string,
  error: any
} 

const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> 
  = ({ name, label, error, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        { label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <ChakraTextarea 
          name={name} 
          id={name} 
          focusBorderColor="orange.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgCoolor: "gray.900"
          }}
          ref={ref}
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
}

export const Textarea = forwardRef(TextareaBase)