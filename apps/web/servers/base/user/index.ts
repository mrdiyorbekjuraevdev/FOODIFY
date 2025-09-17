import { useFetch } from "@foodify/api/hooks/useFetch";
import { useQuery } from "@foodify/api/query";
import { toast } from "sonner";
import { TData, TUser, TUserMe } from "@/types/base";
import { QueryResult } from "@foodify/api/types";

/**
 * @typedef { Object } TUserMeCache
 * @property { QueryResult<TUser> } user - Query result containing user data
 */

/**
 * Custom hook for fetching and caching the current authenticated user's data
 * 
 * This hook provides a cached query result of the current user's information
 * fetched from the API endpoint. It handles authentication and user data retrieval
 * with built-in error handling and toast notifications.
 * 
 * @module useUserMeCache
 * 
 * @returns {TUserMeCache} Object containing the user query result
 * 
 * @example
 * // Basic usage in a React component
 * function UserProfile() {
 *   const { user } = useUserMeCache();
 *   
 *   if (user.isLoading) return <div>Loading...</div>;
 *   if (user.error) return <div>Error loading user</div>;
 *   
 *   return (
 *     <div>
 *       <h1>Welcome, {user.data?.fullname}</h1>
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Using with TypeScript
 * const { user } = useUserMeCache();
 * const userData: TUser | undefined = user.data;
 * 
 * @throws {Error} Displays toast notification on fetch error
 * 
 * @see {@link useFetch} for HTTP request handling
 * @see {@link useQuery} for React Query integration
 * @see {@link TUser} for user data structure
 */


/**
 * User data type definition
 * @typedef {Object} TUser
 * @property {string} user_id - Unique identifier for the user
 * @property {string} fullname - User's full name
 * @property {string} phone - User's phone number
 * @property {TRole} role - User's role information
 * @property {TBranch[]} branches - Array of branches user has access to
 * @property {TPermission[]} permissions - Array of user permissions
 */

/**
 * Query result type from React Query
 * @typedef {Object} QueryResult<T>
 * @property {T|undefined} data - The successfully fetched data
 * @property {boolean} isLoading - True while the query is fetching
 * @property {boolean} isError - True if the query encountered an error
 * @property {Error|null} error - Error object if query failed
 * @property {boolean} isSuccess - True if query completed successfully
 * @property {function} refetch - Function to manually refetch the data
 */


type TUserMeCache = {
    user: QueryResult<TUserMe>;
}

export const useUserMeCache = (): TUserMeCache => {
    const { functionInvoke } = useFetch();

    /**
    * Query for fetching current user data
    * @type {QueryResult<TUserMe>}
    */
    const user = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            try {
                const { data } = await functionInvoke<TData<TUserMe>>({
                    functionName: "get/me",
                    method: "GET",
                });

                return data?.data;
            } catch (error: unknown) {
                toast.error("Error when fetching users");
                // Optional: re-throw the error if you want query to handle it
                // throw error;
            }
        },
    });

    return {
        user,
    }
}


