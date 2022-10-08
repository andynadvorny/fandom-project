import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import axios from '../api/axios';

interface Category {
  categoryId: number;
  name: string;
  communityCount: number;
}

interface CategoriesProviderProps {
  children: ReactNode;
}

interface CategoriesContextData {
  categories: Category[];
}

const CategoriesContext = createContext({} as CategoriesContextData);

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
  }, []);

  async function getCategories() {
    try {
      const response = await axios.get('/categories')

      if (response.status === 200) {
  
        const categoryList = response.data.body
  
        setCategories(categoryList)
      }
    } catch (e: any) {
      const errorMessage = e.response.data == undefined ? e.message : e.response.data.message       

      toast.error(errorMessage)
    }
  }

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext);

  return context;
}