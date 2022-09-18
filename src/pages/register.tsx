import { useContext, useEffect } from 'react';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { UserContext } from '../contexts/UserContext';
import { Input } from '../components/Form/Input'

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Must be a valid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must have at least 6 characters'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'Password and validation must match')
})

export default function SignUp() {
  const router = useRouter()
  const { user, createUser } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user])
  
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })
  const errors = formState.errors

  function handleCreateUser(data: any) {
    createUser(data.name, data.email, data.password)
  }

  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
      p="2"
    >
      <Box 
        as="form" 
        flex="1" 
        borderRadius={8} 
        bg="gray.800" 
        p="6"
        maxW={800}
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <Heading size="lg" fontWeight="normal">Create your fandom project account</Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="6">
          <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
            <Input
              {...register('name')}
              name="name"
              label="Full name" 
              error={errors.name}
            />
            <Input 
              {...register('email')}
              name="email" 
              type="email" 
              label="Email" 
              error={errors.email}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
            <Input 
              {...register('password')}
              name="password" 
              type="password" 
              label="Password" 
              error={errors.password}
            />
            <Input 
              {...register('password_confirmation')}
              name="password_confirmation" 
              type="password" 
              label="Confirm Password" 
              error={errors.password_confirmation}
            />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <NextLink href="/">
              <Button colorScheme="whiteAlpha">Cancel</Button>
            </NextLink>
            <Button 
              type="submit" 
              colorScheme="orange"
              isLoading={formState.isSubmitting}
            >
              Create user
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  )
}
