import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { RiArrowRightSLine } from "react-icons/ri"

interface BreadcrumbsProps {
  currentPage: string;
  previousPage?: string;
  previousPath?: string;
  isSecondLevel?: boolean;
}

export function Breadcrumbs({ previousPage, previousPath, currentPage, isSecondLevel = false }: BreadcrumbsProps) {
  return (
    <Breadcrumb spacing='8px' separator={<RiArrowRightSLine color='gray.500' />} fontSize="sm" mb={2}>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
      </BreadcrumbItem>

      {isSecondLevel && (
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${previousPath}`}>{previousPage}</BreadcrumbLink>
        </BreadcrumbItem>
      )}

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#' color="orange.400">{currentPage}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}