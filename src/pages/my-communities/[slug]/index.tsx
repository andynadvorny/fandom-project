import { useContext, useRef, RefObject } from 'react'
import { useRouter } from "next/router"
import Head from 'next/head'
import NextLink from 'next/link'
import { Flex, Box, Heading, Divider, Button, VStack, HStack, Spinner, useDisclosure, Text, Menu, MenuButton, MenuList, MenuItem, Icon } from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { RiMenuLine } from "react-icons/ri"

import { withSSRAuth } from "../../../utils/withSSRAuth"
import { CommunitiesContext } from '../../../contexts/CommunityContext'
import { useCommunityBySlug } from '../../../hooks/useCommunityBySlug'

import { Header } from "../../../components/Header"
import { Sidebar } from "../../../components/Sidebar"
import { Input } from '../../../components/Form/Input'
import { Select } from '../../../components/Form/Select'
import { Textarea } from '../../../components/Form/Textarea'
import { ConfirmDelete } from '../../../components/Modals/ConfirmDelete'
import { UserContext } from '../../../contexts/UserContext'
import { Breadcrumbs } from '../../../components/Breadcrumbs'

const updateCommunityFormSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  posttype: yup.string().required('You must pick a post type'),
  content: yup.string().required('Content is required'),
})

export default function CommunityPost() {
  const { deleteCommunity, createPost } = useContext(CommunitiesContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const slug = typeof router.query?.slug === "string" ? router.query.slug : ""

  const { data, isSuccess, isLoading, isFetching, error } = useCommunityBySlug(slug)

  const postTypeOptions = [
    {
      value: "post",
      label: "post"
    },
    {
      value: "news",
      label: "news"
    },
    {
      value: "event",
      label: "event"
    }
  ]

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateCommunityFormSchema)
  })
  const errors = formState.errors

  const { isOpen : isDeleteOpen, onClose: onDeleteClose, onOpen : onDeleteOpen } = useDisclosure()
  const cancelDeleteRef = useRef() as RefObject<HTMLButtonElement>

  async function handleCreatePost(formData: any) {
    if (user && data) {
      await createPost.mutateAsync({
        post: {
          title: formData.title,
          text: formData.content,
          type: formData.posttype,
          userId: user.id
        },
        communitySlug: data.community.slug
      })
    }
  }

  async function handleDeleteCommunity() {
    if (data?.community) {
      await deleteCommunity.mutateAsync(data?.community.communityId)
    }
  }

  return (
    <>
      <Head>
          <title>fandom project | {isSuccess && data.community.name}</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Flex flexDir="column" flex="1" maxW={800} gap={2}>
            {isSuccess && (
              <Breadcrumbs 
                isSecondLevel 
                previousPage="My Communities" 
                previousPath="my-communities"
                currentPage={data.community.name} 
              />
            )}
            <Box 
              borderRadius={8} 
              bg="gray.800" 
              p="6"
            >
              <Flex>
                <Heading size="lg" fontWeight="normal">
                  {data?.community.name}
                  {isFetching && <Spinner size="sm" color="grey-500" ml="4" />}
                </Heading>
                <Menu>
                  <MenuButton as={Button} ml="auto" colorScheme="orange" px={0}>
                    <Icon as={RiMenuLine} fontSize={24} mx="auto" mt={1} />
                  </MenuButton>
                  <MenuList>
                    <NextLink href={`/communities/${data?.community.slug}`}>
                      <MenuItem color="gray.900">View Page</MenuItem>
                    </NextLink>
                    <NextLink href={`/my-communities/${data?.community.slug}/edit`}>
                      <MenuItem color="gray.900">Edit</MenuItem>
                    </NextLink>
                    <MenuItem onClick={onDeleteOpen} color="red.500">Delete Community</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>

              <Divider my="6" borderColor="gray.700" />
              
              { isLoading ? (
                <Spinner />
              ) : error ? (
                <Text>Can&apos;t load community data</Text>
              ) : isSuccess && (
                <Box as="form" onSubmit={handleSubmit(handleCreatePost)}>
                  <VStack spacing="6">
                    <Select
                      {...register('posttype')}
                      name="posttype"
                      label="Post Type" 
                      options={postTypeOptions}
                      error={errors.posttype}
                    />

                    <Input
                      {...register('title')}
                      name="title"
                      label="Title" 
                      error={errors.title}
                    />  

                    <Textarea
                      {...register('content')}
                      name="content" 
                      label="Content" 
                      error={errors.content}
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
                        Post
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
              )}

              <ConfirmDelete isOpen={isDeleteOpen} onClose={onDeleteClose} cancelRef={cancelDeleteRef} handleDelete={handleDeleteCommunity} />
            </Box>
          </Flex>
          
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

