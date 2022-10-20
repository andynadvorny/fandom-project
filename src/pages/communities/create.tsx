import { useContext, useState } from 'react'
import NextLink from 'next/link'
import { Flex, Box, Heading, Divider, Button, VStack, HStack } from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

//import { withSSRAuth } from "../../utils/withSSRAuth"
import { CommunitiesContext } from '../../contexts/CommunityContext'
import { useCategories } from '../../hooks/useCategories'
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { CommunityPreview } from '../../components/CommunityPreview'
import { Input } from '../../components/Form/Input'
import { Select } from '../../components/Form/Select'
import { Textarea } from '../../components/Form/Textarea'
import { UserContext } from '../../contexts/UserContext';

const validUrl = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

const createCommunityFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  category: yup.string().required('You must pick a category'),
  coverimage: yup.string().matches(validUrl, {message: 'URL is not valid', excludeEmptyString:true}),
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
      await createCommunity(data.name, data.category, data.coverimage, data.description, user.id)
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

        <Box 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p="6"
          maxW={800}
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
                {...register('cover_image')}
                name="cover_image" 
                label="Cover image" 
                error={errors.coverimage}
                placeholder="https://yourimage.com/image.jpg"
                onChange={(e) => {setPreviewCoverImage(e.target.value)}}
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
                <NextLink href="/communities">
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
  )
}

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   return {
//     props: {}
//   }
// })