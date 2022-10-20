import { useContext, useEffect, useState, useRef, RefObject } from 'react'
import { useRouter } from "next/router"
import NextLink from 'next/link'
import { Flex, Box, Heading, Divider, Button, VStack, HStack, Spinner, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure } from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { RiDeleteBinFill } from "react-icons/ri"

//import { withSSRAuth } from "../../utils/withSSRAuth"
import { CommunitiesContext } from '../../contexts/CommunityContext'
import { UserContext } from '../../contexts/UserContext'
import { useCategories } from '../../hooks/useCategories'

import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { Input } from '../../components/Form/Input'
import { Select } from '../../components/Form/Select'
import { Textarea } from '../../components/Form/Textarea'

type Community = {
  name: string;
  communityId: number;
  slug: string;
  categoryName: string;
  categoryId: number;
  coverImage: string;
  description: string; 
  memberCount: number;
}

const validUrl = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

const createCommunityFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  category: yup.string().required('You must pick a category'),
  coverimage: yup.string().matches(validUrl, {message: 'URL is not valid', excludeEmptyString:true}),
  description: yup.string(),
})

export default function CreateCommunity() {
  const { getCommunityBySlug, editCommunity, deleteCommunity } = useContext(CommunitiesContext)
  const { user } = useContext(UserContext)
  const [community, setCommunity] = useState<Community>()
  const { categories } = useCategories()

  const categoryOptions = categories.map(category => ({
    value: category.categoryId,
    label: category.name
  }))

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    if (!slug) {
      return
    }

    const myCommunity = getCommunityBySlug(String(slug))
  
    setCommunity(myCommunity)

    setValue('name', myCommunity?.name)
    setValue('category',  {label: myCommunity?.categoryName , value: String(myCommunity?.categoryId)})
    setValue('coverImage', myCommunity?.coverImage)
    setValue('description', myCommunity?.description)
  }, [slug])

  const { register, handleSubmit, setValue, formState } = useForm({
    resolver: yupResolver(createCommunityFormSchema)
  })
  const errors = formState.errors

  const { isOpen, onClose, onOpen } = useDisclosure()
  const cancelRef = useRef() as RefObject<HTMLButtonElement>

  async function handleUpdateCommunity(data: any) {
    if (community && user) {
      const updatedCommunity = {
        ...community,
        name: data.name,
        id: community.communityId,
        categoryId: data.category,
        coverImage: data.coverImage,
        description: data.description,
        userId: user.id
      }
  
      await editCommunity(updatedCommunity)
    }
  }

  async function handleDeleteCommunity() {
    if (community) {
      await deleteCommunity(community?.communityId)
    }
  }

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
          <Flex>
            <Heading size="lg" fontWeight="normal">{community?.name}</Heading>
            <Button 
              onClick={onOpen}
              colorScheme="red"
              ml="auto"
              px={0}
              title="Delete"
            >
              <RiDeleteBinFill size={20} />
            </Button>
          </Flex>

          <Divider my="6" borderColor="gray.700" />
          
          { community != undefined ? (
            <Box as="form" onSubmit={handleSubmit(handleUpdateCommunity)}>
              <VStack spacing="6">
                <Input
                  {...register('name')}
                  name="name"
                  label="Name" 
                  error={errors.name}
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
                />

                <Textarea
                  {...register('description')}
                  name="description" 
                  label="Description" 
                  error={errors.description}
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
                    Update
                  </Button>
                </HStack>
              </Flex>
            </Box>
          ) : (
            <Spinner />
          )}

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
                  <Button colorScheme='red' onClick={handleDeleteCommunity} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
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

