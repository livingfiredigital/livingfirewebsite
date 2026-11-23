// hooks/useContactUs.js
import { useMutation, useQuery  } from "@tanstack/react-query";
import { addContactUsData, fetchProductsAndBrands  } from "@/src/server-actions/contact-us/contact-us.action";  // Directly import your server action
import { toast } from "react-toastify";

// Custom hook for submitting form data
export const useContactUs = () => {
  const { mutate, isLoading, isError, isSuccess, error, data } = useMutation({
    mutationFn: addContactUsData,  // Directly call the server action (no need to go through an API route)
    onError: (err) => {
      console.error("Error submitting data:", err);
    },
    onSuccess: (response) => {
      const isAnySuccess = response.success || 
                          response.result || 
                           response.result.emailSuccess || 
                            response.result.hubspotSuccess;
      if (isAnySuccess) {
        toast.success("Enquiry Form submitted successfully!");
        console.log("Data submitted successfully:", response);
      } else {
        console.log("Error message:", response.message);
      }
    },
  });

  return {
    mutate,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
  };
};



export const useProductsAndBrands = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['productsAndBrands'],
    queryFn: async () => {
      const response = await fetchProductsAndBrands();
      if (response.success) {
        return response.result.data;
      } else {
        throw new Error(response.message);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};