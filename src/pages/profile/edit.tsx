import { useContext, useEffect } from 'react';
import NextLink from 'next/link'
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { withSSRAuth } from '../../utils/withSSRAuth';
import { UserContext } from '../../contexts/UserContext';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Form/Input'

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Must be a valid email address'),
  bio: yup.string().nullable(),
  avatar: yup.string().nullable()
})

export default function EditProfile() {
  const { user, editUser } = useContext(UserContext)
  
  const { register, setValue, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })
  const errors = formState.errors

  useEffect(() => {
    setValue('name', user?.name)
    setValue('email', user?.email)
    setValue('bio', user?.bio)
    setValue('avatar', user?.avatar)
  }, [user])

  async function handleCreateUser(data: any) {
    
    const updatedUser = {
      name: data.name,
      id: user?.id,
      email: data.email,
      bio: data.bio,
      avatar: data.avatar,
      slug: user?.slug
    }

    await editUser(updatedUser)
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p="6"
          maxW={800}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Update profile</Heading>

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
                {...register('bio')}
                name="bio" 
                type="text" 
                label="Bio" 
                error={errors.bio}
              />
              <Input 
                {...register('avatar')}
                name="avatar" 
                type="text" 
                label="Avatar URL" 
                error={errors.avatar}
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
                Update profile
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
