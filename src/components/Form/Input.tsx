import { forwardRef, ForwardRefRenderFunction } from "react"
import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
  name: string,
  label?: string,
  error: any
} 

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({ name, label, error, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        { label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <ChakraInput 
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

export const Input = forwardRef(InputBase)