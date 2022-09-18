import { useContext, useEffect } from 'react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Flex, Stack, Link, Text, Button} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { UserContext } from '../contexts/UserContext'
import { Input } from '../components/Form/Input'

const LoginFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Must be a valid email address'),
  password: yup.string().required('Password is required')
})

const Home: NextPage = () => {
  const router = useRouter()
  const { user, signIn } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user])
  
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(LoginFormSchema)
  });
  const errors = formState.errors

  function handleSignIn(data: any) {
    signIn(data.email, data.password)
  }

  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
      p="2"
    >
      <Flex
        as="form"
        w="full"
        maxW={380}
        bg="gray.800"
        p="8"
        borderRadius={4}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input 
            {...register('email')}
            name="email" 
            type="email" 
            label="E-mail" 
            error={errors.email}
          />
          <Input 
            {...register('password')}
            name="password" 
            type="password" 
            label="Password"
            error={errors.password}
          />
          <NextLink href="/forgot-password" passHref>
            <Link fontSize="xs" textAlign="right">Forgot your password?</Link>
          </NextLink>
        </Stack>
        <Button 
          type="submit" 
          mt="6" 
          colorScheme="orange" 
          isLoading={formState.isSubmitting}
        >
          Login
        </Button>
        <NextLink href="/register">
          <Text fontSize="xs" textAlign="center" mt="4">
            Don&apos;t have an account?{' '}
            <Link color="orange.500" href="/register">
              Register
            </Link>
          </Text>
        </NextLink>
      </Flex>
    </Flex>
  )
}

export default Home
