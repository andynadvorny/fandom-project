import { forwardRef, ForwardRefRenderFunction } from "react"
import { FormControl, FormErrorMessage, FormLabel, Select as ChakraSelect, SelectProps as ChakraSelectProps } from "@chakra-ui/react"

interface SelectProps extends ChakraSelectProps {
  name: string,
  label?: string,
  options: {
    value: number,
    label: string,
  }[],
  error: any
} 

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> 
  = ({ name, label, options, error, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        { label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <ChakraSelect 
          placeholder=" "
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
        >
          {options.map( option => (
            <option id={option.label} value={option.value} key={option.value}>{option.label}</option>
          ))}
        </ChakraSelect>

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
}

export const Select = forwardRef(SelectBase)