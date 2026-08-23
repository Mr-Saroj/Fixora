import { useEffect, useState } from 'react';
import { getAllTechnicians } from '../services/adminService';
import API from '../../../services/api';

const useMiddleContent = () => {
  const [loading, setLoading]               = useState(true);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalTechnicians, setTotalTechnicians] = useState(0);
  const [pendingTechnicians, setPendingTechnicians] = useState([]);
  const [error, setError]                   = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const usersRes = await API.get('/admin/users');
        if (usersRes.data.success) {
          const users = usersRes.data.data;
          setTotalCustomers(
            users.filter((u) => u.role === 'CUSTOMER').length
          );
        }

        const techRes = await getAllTechnicians();
        if (techRes.data.success) {
          const techs = techRes.data.data;
          setTotalTechnicians(techs.length);
          setPendingTechnicians(
            techs.filter((t) => t.loginAccess === 'PENDING')
          );
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { loading, error, totalCustomers, totalTechnicians, pendingTechnicians };
};

export default useMiddleContent;