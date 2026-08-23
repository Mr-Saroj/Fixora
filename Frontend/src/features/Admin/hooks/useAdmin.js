// import { useState, useEffect } from 'react';
// import { getAllTechnicians } from '../services/adminService';

// export const useAdmin = () => {
//     const [technicians, setTechnicians] = useState([]);
//     const [isLoading,   setIsLoading]   = useState(false);
//     const [error,       setError]       = useState(null);

//     const fetchTechnicians = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await getAllTechnicians();
//             const data = response.data;

//             if (data.success) {
//                 setTechnicians(data.data);
//             } else {
//                 setError(data.message || 'Failed to fetch technicians.');
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Network error.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTechnicians();
//     }, []);

//     return { technicians, isLoading, error, refetch: fetchTechnicians };
// };