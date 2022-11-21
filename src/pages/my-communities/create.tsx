import { useContext, useState } from 'react'
import NextLink from 'next/link'
import { Flex, Box, Heading, Divider, Button, VStack, HStack } from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { withSSRAuth } from "../../utils/withSSRAuth"
import { CommunitiesContext } from '../../contexts/CommunityContext'
import { UserContext } from '../../contexts/UserContext';
import { useCategories } from '../../hooks/useCategories'

import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CommunityPreview } from '../../components/CommunityPreview'
import { Input } from '../../components/Form/Input'
import { Select } from '../../components/Form/Select'
import { Textarea } from '../../components/Form/Textarea'

const createCommunityFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  category: yup.string().required('You must pick a category'),
  coverimage: yup.string(),
  bannerimage: yup.string(),
  description: yup.string(),
})

export default function CreateCommunity() {
  const { createCommunity } = useContext(CommunitiesContext)
  const { user } = useContext(UserContext)
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createCommunityFormSchema)
  })
  const errors = formState.errors

  async function handleCreateCommunity(data: any) {
    if (user) {
      await createCommunity.mutateAsync({
        name: data.name, 
        categoryId: data.category, 
        coverImage: data.coverimage, 
        bannerImage: data.bannerimage, 
        description: data.description, 
        userId: user.id
      })
    }
  }

  const { categories } = useCategories()
  const [ previewName, setPreviewName ] = useState<string>('My Awesome Community')
  const [ previewCoverImage, setPreviewCoverImage ] = useState<string>('')
  const [ previewDescription, setPreviewDescription ] = useState<string>("This is what your community will look like. Don't worry, you can change everything later.")

  const categoryOptions = categories.map(category => ({
    value: category.categoryId,
    label: category.name
  }))

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex flexDir="column" flex="1" maxW={800} gap={2}>
          <Breadcrumbs 
            isSecondLevel 
            previousPage="My Communities" 
            previousPath="my-communities"
            currentPage="Create Community" 
          />

          <Box 
            borderRadius={8} 
            bg="gray.800" 
            p="6"
          >
            <Heading size="lg" fontWeight="normal">Create Community</Heading>

            <Divider my="6" borderColor="gray.700" />

            <CommunityPreview
              name={previewName}
              categoryName="Category"
              coverImage={previewCoverImage}
              description={previewDescription}
            />
            
            <Box as="form" onSubmit={handleSubmit(handleCreateCommunity)}>
              <VStack spacing="6">
                <Input
                  {...register('name')}
                  name="name"
                  label="Name" 
                  error={errors.name}
                  onChange={(e) => {setPreviewName(e.target.value)}}
                />
                
                <Select
                  {...register('category')}
                  name="category"
                  label="Category" 
                  options={categoryOptions}
                  error={errors.category}
                />

                <Input 
                  {...register('coverimage')}
                  name="coverimage" 
                  label="Cover image" 
                  error={errors.coverimage}
                  placeholder="https://yourimage.com/image.jpg"
                  onChange={(e) => {setPreviewCoverImage(e.target.value)}}
                />

                <Input 
                  {...register('bannerimage')}
                  name="bannerimage" 
                  label="Banner image" 
                  error={errors.bannerimage}
                  placeholder="https://yourimage.com/image.jpg"
                />

                <Textarea
                  {...register('description')}
                  name="description" 
                  label="Description" 
                  error={errors.description}
                  onChange={(e) => {setPreviewDescription(e.target.value)}}
                />
              </VStack>

              <Flex mt="8" justify="flex-end">
                <HStack spacing="4">
                  <NextLink href="/my-communities">
                    <Button colorScheme="whiteAlpha">Cancel</Button>
                  </NextLink>
                  <Button 
                    type="submit" 
                    colorScheme="orange"
                    isLoading={formState.isSubmitting}
                  >
                    Create community
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})